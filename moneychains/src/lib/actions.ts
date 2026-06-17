"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser, clearSession, login, signup } from "@/services/auth";
import { generateContent } from "@/services/ai";
import { getProvider } from "@/services/oauth";
import { getTemplate } from "@/data/templates";
import { getPlatform } from "@/data/platforms";
import { canStartChain, canGenerateContent } from "./limits";
import { getDb, persist, newId, type DB } from "./store";
import type { ChainTemplate, UserChain } from "./types";

const XP_PER_STEP = 25;

function award(db: DB, userId: string, key: string, label: string) {
  const has = db.achievements.some((a) => a.userId === userId && a.key === key);
  if (!has) {
    db.achievements.push({
      id: newId("a"),
      userId,
      key,
      label,
      earnedAt: new Date().toISOString(),
    });
  }
}

/** Advance a chain: mark `stepId` done and unlock the next locked step. */
function advance(
  db: DB,
  uc: UserChain,
  template: ChainTemplate,
  stepId: string
) {
  const idx = uc.steps.findIndex((s) => s.stepId === stepId);
  if (idx === -1) return;
  if (uc.steps[idx].state !== "done") {
    uc.steps[idx].state = "done";
    uc.steps[idx].completedAt = new Date().toISOString();
    const u = db.users.find((x) => x.id === uc.userId);
    if (u) u.xp += XP_PER_STEP;
  }
  const next = uc.steps.find((s) => s.state === "locked");
  if (next) next.state = "active";
  if (uc.steps.every((s) => s.state === "done")) uc.status = "completed";
}

/* ------------------------------- chains ------------------------------- */

export async function startChainAction(slug: string) {
  const user = await currentUser();
  const template = getTemplate(slug);
  if (!template) throw new Error("Unknown template");

  const db = await getDb();
  const existing = db.userChains.find(
    (c) => c.userId === user.id && c.templateId === template.id
  );
  if (existing) redirect(`/app/chains/${existing.id}`);

  const check = await canStartChain(user);
  if (!check.allowed) redirect(`/app/billing?gated=chains`);

  const uc: UserChain = {
    id: newId("uc"),
    userId: user.id,
    templateId: template.id,
    status: "active",
    startedAt: new Date().toISOString(),
    steps: template.steps.map((s, i) => ({
      stepId: s.id,
      state: i === 0 ? "active" : "locked",
    })),
  };
  db.userChains.push(uc);
  await persist(db);
  revalidatePath("/app");
  redirect(`/app/chains/${uc.id}`);
}

export async function setNicheAction(userChainId: string, niche: string) {
  const db = await getDb();
  const uc = db.userChains.find((c) => c.id === userChainId);
  if (!uc) return;
  uc.niche = niche;
  await persist(db);
  revalidatePath(`/app/chains/${userChainId}`);
}

export async function completeStepAction(userChainId: string, stepId: string) {
  const db = await getDb();
  const uc = db.userChains.find((c) => c.id === userChainId);
  if (!uc) return;
  const template = getTemplate(uc.templateId);
  if (!template) return;
  advance(db, uc, template, stepId);
  if (uc.status === "completed")
    award(db, uc.userId, "chain_complete", "Chain Complete");
  await persist(db);
  revalidatePath(`/app/chains/${userChainId}`);
  revalidatePath("/app");
}

export async function generateContentAction(
  userChainId: string,
  stepId: string
) {
  const user = await currentUser();
  const db = await getDb();
  const uc = db.userChains.find((c) => c.id === userChainId);
  const template = getTemplate(uc?.templateId ?? "");
  if (!uc || !template) return;
  const step = template.steps.find((s) => s.id === stepId);
  if (!step) return;

  const draft = await generateContent({ step, niche: uc.niche ?? "" });

  const check = await canGenerateContent(user, draft.creditsUsed);
  if (!check.allowed) redirect(`/app/billing?gated=credits`);

  const usage = db.usage.find((u) => u.userId === user.id);
  if (usage) usage.aiCreditsUsed += draft.creditsUsed;

  const content = {
    id: newId("gc"),
    userId: user.id,
    userChainId,
    stepId,
    kind: draft.kind,
    title: draft.title,
    body: draft.body,
    approved: false,
    creditsUsed: draft.creditsUsed,
    createdAt: new Date().toISOString(),
  };
  db.content.push(content);
  const ucStep = uc.steps.find((s) => s.stepId === stepId);
  if (ucStep) ucStep.outputContentId = content.id;
  await persist(db);
  revalidatePath(`/app/chains/${userChainId}`);
}

export async function approveContentAction(
  contentId: string,
  userChainId: string,
  stepId: string
) {
  const db = await getDb();
  const c = db.content.find((x) => x.id === contentId);
  if (c) c.approved = true;
  await persist(db);
  await completeStepAction(userChainId, stepId);
}

/* ----------------------------- connections ----------------------------- */

export async function connectAction(formData: FormData) {
  const user = await currentUser();
  const platformId = String(formData.get("platformId"));
  const key = String(formData.get("key") ?? "");
  const platform = getPlatform(platformId);
  if (!platform) return;
  const provider = getProvider(platformId);

  let label = `@${platformId}_demo`;
  let token = `enc::oauth::${platformId}::•••`;

  if (platform.type === "api_key" && provider.validateKey) {
    const res = await provider.validateKey(key);
    if (!res.ok) return;
    label = res.label;
    token = `enc::apikey::${platformId}::${key}`;
  } else if (platform.type === "oauth" && provider.exchangeCode) {
    const res = await provider.exchangeCode("sandbox-code");
    token = res.accessToken;
    label = res.label;
  }

  const db = await getDb();
  const existing = db.connections.find(
    (c) => c.userId === user.id && c.platformId === platformId
  );
  if (existing) {
    existing.status = "connected";
    existing.accessTokenEnc = token;
    existing.accountLabel = label;
    existing.lastSyncedAt = new Date().toISOString();
  } else {
    db.connections.push({
      id: newId("c"),
      userId: user.id,
      platformId,
      type: platform.type,
      status: "connected",
      accessTokenEnc: token,
      accountLabel: label,
      lastSyncedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
  }
  award(db, user.id, "first_connection", "First Connection");
  await persist(db);
  revalidatePath("/app/connections");
  const redirectTo = formData.get("redirectTo");
  if (redirectTo) redirect(String(redirectTo));
}

export async function disconnectAction(connectionId: string) {
  const db = await getDb();
  const c = db.connections.find((x) => x.id === connectionId);
  if (c) c.status = "disconnected";
  await persist(db);
  revalidatePath("/app/connections");
}

/* ------------------------------- earnings ------------------------------- */

export async function addEarningAction(formData: FormData) {
  const user = await currentUser();
  const amount = Number(formData.get("amount"));
  if (!amount || amount <= 0) return;
  const userChainId = String(formData.get("userChainId") || "") || undefined;
  const db = await getDb();
  db.earnings.push({
    id: newId("e"),
    userId: user.id,
    userChainId,
    platformId: String(formData.get("platformId") || "") || undefined,
    source: "manual",
    amount,
    note: String(formData.get("note") || "Manual entry"),
    occurredAt: new Date().toISOString(),
  });
  award(db, user.id, "first_rupee", "First ₹ Earned");
  await persist(db);
  revalidatePath("/app/earnings");
  revalidatePath("/app");
}

/* --------------------------------- auth --------------------------------- */

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const user = await login(email);
  if (!user) redirect("/login?error=notfound");
  redirect("/app");
}

export async function signupAction(formData: FormData) {
  const name = String(formData.get("name") || "New Builder");
  const email = String(formData.get("email") || "");
  await signup(name, email);
  redirect("/app");
}

export async function demoLoginAction() {
  await login("demo@moneychains.app");
  redirect("/app");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
