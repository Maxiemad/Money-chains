import type {
  Achievement,
  Connection,
  Earning,
  GeneratedContent,
  User,
  UserChain,
  UsageRecord,
} from "./types";
import { TEMPLATES } from "@/data/templates";

/**
 * MOCK DATA STORE (server-side, in-memory).
 *
 * This is the single seam between MoneyChains and its database. Every read /
 * write in the app goes through this module. To go live, replace the bodies
 * of these functions with Supabase/Prisma queries — the rest of the app is
 * untouched. State is held on `globalThis` so it survives dev hot-reloads.
 *
 * Seed data deliberately drops the demo user mid-journey through the flagship
 * chain so the whole "start → publish → see ₹" loop is clickable on first run.
 */

export interface DB {
  users: User[];
  connections: Connection[];
  userChains: UserChain[];
  content: GeneratedContent[];
  earnings: Earning[];
  achievements: Achievement[];
  usage: UsageRecord[];
}

const FLAGSHIP = TEMPLATES.find((t) => t.id === "tpl_pin_blog_amazon")!;

function seed(): DB {
  const demo: User = {
    id: "u_demo",
    name: "Aanya Sharma",
    email: "demo@moneychains.app",
    avatarColor: "#27d8a0",
    role: "user",
    plan: "starter",
    createdAt: "2026-05-01T09:00:00.000Z",
    xp: 320,
    streak: 5,
  };
  const admin: User = {
    id: "u_admin",
    name: "MoneyChains Admin",
    email: "admin@moneychains.app",
    avatarColor: "#02a37a",
    role: "admin",
    plan: "agency",
    createdAt: "2026-01-01T09:00:00.000Z",
    xp: 9999,
    streak: 40,
  };

  // Demo user has connected Amazon + Blog, but NOT Pinterest yet — so the
  // workspace has a live, do-able next step.
  const connections: Connection[] = [
    {
      id: "c_amz",
      userId: demo.id,
      platformId: "amazon_associates",
      type: "api_key",
      status: "connected",
      accessTokenEnc: "enc::amzn-tag::aanyahome-21",
      accountLabel: "aanyahome-21",
      lastSyncedAt: "2026-06-16T18:30:00.000Z",
      createdAt: "2026-06-02T10:00:00.000Z",
    },
    {
      id: "c_blog",
      userId: demo.id,
      platformId: "blog",
      type: "oauth",
      status: "connected",
      accessTokenEnc: "enc::oauth::blog::•••",
      accountLabel: "aanya.moneychains.blog",
      lastSyncedAt: "2026-06-16T18:30:00.000Z",
      createdAt: "2026-06-02T10:05:00.000Z",
    },
  ];

  // Flagship chain instance: first 6 steps done, step 7 (connect Pinterest) active.
  const doneStepIds = [
    "s_niche",
    "s_connect_amazon",
    "s_connect_blog",
    "s_write_post",
    "s_insert_links",
    "s_publish_blog",
  ];
  const userChain: UserChain = {
    id: "uc_demo_flagship",
    userId: demo.id,
    templateId: FLAGSHIP.id,
    status: "active",
    niche: "budget home office setups",
    startedAt: "2026-06-02T10:00:00.000Z",
    steps: FLAGSHIP.steps.map((s, i) => {
      const done = doneStepIds.includes(s.id);
      const firstUndoneIndex = FLAGSHIP.steps.findIndex(
        (x) => !doneStepIds.includes(x.id)
      );
      return {
        stepId: s.id,
        state: done ? "done" : i === firstUndoneIndex ? "active" : "locked",
        completedAt: done ? "2026-06-10T12:00:00.000Z" : undefined,
      };
    }),
  };

  const content: GeneratedContent[] = [
    {
      id: "gc_1",
      userId: demo.id,
      userChainId: userChain.id,
      stepId: "s_write_post",
      kind: "blog_post",
      title: "7 Budget Home Office Setups Under ₹15,000 (2026)",
      body: "Working from home doesn't have to drain your savings...\n\nIn this guide I break down seven complete desk setups that look great, feel ergonomic, and stay under ₹15,000 — each with the exact products I'd buy today.",
      approved: true,
      creditsUsed: 8,
      createdAt: "2026-06-08T11:00:00.000Z",
    },
  ];

  const earnings: Earning[] = [
    { id: "e1", userId: demo.id, userChainId: userChain.id, platformId: "amazon_associates", source: "affiliate", amount: 240, note: "USB-C hub", utm: "pin_blog_amazon", occurredAt: "2026-06-12T08:00:00.000Z" },
    { id: "e2", userId: demo.id, userChainId: userChain.id, platformId: "amazon_associates", source: "affiliate", amount: 510, note: "Desk lamp x2", utm: "pin_blog_amazon", occurredAt: "2026-06-13T14:00:00.000Z" },
    { id: "e3", userId: demo.id, userChainId: userChain.id, platformId: "amazon_associates", source: "affiliate", amount: 180, note: "Laptop stand", utm: "pin_blog_amazon", occurredAt: "2026-06-14T19:00:00.000Z" },
    { id: "e4", userId: demo.id, userChainId: userChain.id, platformId: "amazon_associates", source: "manual", amount: 920, note: "Ergonomic chair (logged manually)", utm: "pin_blog_amazon", occurredAt: "2026-06-15T10:00:00.000Z" },
    { id: "e5", userId: demo.id, userChainId: userChain.id, platformId: "amazon_associates", source: "affiliate", amount: 365, note: "Monitor riser", utm: "pin_blog_amazon", occurredAt: "2026-06-16T16:00:00.000Z" },
  ];

  const achievements: Achievement[] = [
    { id: "a1", userId: demo.id, key: "first_connection", label: "First Connection", earnedAt: "2026-06-02T10:00:00.000Z" },
    { id: "a2", userId: demo.id, key: "first_publish", label: "First Publish", earnedAt: "2026-06-10T12:00:00.000Z" },
    { id: "a3", userId: demo.id, key: "first_rupee", label: "First ₹ Earned", earnedAt: "2026-06-12T08:00:00.000Z" },
  ];

  userChain.firstEarningAt = "2026-06-12T08:00:00.000Z";

  const usage: UsageRecord[] = [
    {
      userId: demo.id,
      aiCreditsUsed: 86,
      aiCreditsLimit: 500,
      automationRunsUsed: 12,
      automationRunsLimit: 100,
    },
  ];

  return {
    users: [demo, admin],
    connections,
    userChains: [userChain],
    content,
    earnings,
    achievements,
    usage,
  };
}

/* --------------------------- persistence layer --------------------------- */
import { cache } from "react";
import { getStateCollection, STATE_ID } from "./mongo";

/**
 * The entire app state is one MongoDB document. `getDb()` loads it (deduped
 * per request via React cache, seeded on first run). `persist()` saves it back.
 * With no database configured it falls back to a fresh in-memory seed so local
 * dev and the build still work.
 */
const loadState = cache(async (): Promise<DB> => {
  const col = await getStateCollection();
  if (!col) return seed();
  const doc = await col.findOne({ _id: STATE_ID });
  if (doc?.data) return doc.data as DB;
  const seeded = seed();
  await col.updateOne(
    { _id: STATE_ID },
    { $set: { data: seeded } },
    { upsert: true }
  );
  return seeded;
});

export async function getDb(): Promise<DB> {
  return loadState();
}

export async function persist(state: DB): Promise<void> {
  const col = await getStateCollection();
  if (!col) return;
  await col.updateOne(
    { _id: STATE_ID },
    { $set: { data: state } },
    { upsert: true }
  );
}

/* ----------------------------- read helpers ----------------------------- */

export async function getUser(id: string): Promise<User | undefined> {
  return (await getDb()).users.find((u) => u.id === id);
}
export async function getUserByEmail(email: string): Promise<User | undefined> {
  return (await getDb()).users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}
export async function connectionsFor(userId: string): Promise<Connection[]> {
  return (await getDb()).connections.filter((c) => c.userId === userId);
}
export async function userChainsFor(userId: string): Promise<UserChain[]> {
  return (await getDb()).userChains.filter((c) => c.userId === userId);
}
export async function userChain(id: string): Promise<UserChain | undefined> {
  return (await getDb()).userChains.find((c) => c.id === id);
}
export async function contentFor(userId: string): Promise<GeneratedContent[]> {
  return (await getDb()).content.filter((c) => c.userId === userId);
}
export async function earningsFor(userId: string): Promise<Earning[]> {
  return (await getDb()).earnings
    .filter((e) => e.userId === userId)
    .sort((a, b) => +new Date(a.occurredAt) - +new Date(b.occurredAt));
}
export async function achievementsFor(userId: string): Promise<Achievement[]> {
  return (await getDb()).achievements.filter((a) => a.userId === userId);
}
export async function usageFor(userId: string): Promise<UsageRecord> {
  return (
    (await getDb()).usage.find((u) => u.userId === userId) ?? {
      userId,
      aiCreditsUsed: 0,
      aiCreditsLimit: 50,
      automationRunsUsed: 0,
      automationRunsLimit: 0,
    }
  );
}

/** Simple id generator. */
export function newId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
