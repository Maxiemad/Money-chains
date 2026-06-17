"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/services/auth";
import { getDb, persist } from "./store";

const DEMO_ID = "u_demo";

/** Update the current user's display name. */
export async function updateProfileAction(formData: FormData) {
  const user = await currentUser();
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const db = await getDb();
  const dbUser = db.users.find((u) => u.id === user.id);
  if (dbUser) dbUser.name = name;
  await persist(db);

  revalidatePath("/app/settings");
  revalidatePath("/app");
}

/**
 * Delete the current user's account and all associated data.
 *
 * Real deletion fulfils the GDPR / India DPDP "right to erasure": we purge the
 * user row plus every record keyed to them (connections, chains, content,
 * earnings, achievements, usage). In production this would also revoke OAuth
 * tokens and enqueue deletion in downstream systems.
 *
 * For safety in this mock we do NOT clear the session here — the page handles
 * sign-out / redirect separately.
 */
export async function deleteAccountAction() {
  const user = await currentUser();

  if (user.id === DEMO_ID) {
    // No-op for the seeded demo user so the demo stays clickable on next run.
    revalidatePath("/app/settings");
    return;
  }

  const db = await getDb();
  db.users = db.users.filter((u) => u.id !== user.id);
  db.connections = db.connections.filter((c) => c.userId !== user.id);
  db.userChains = db.userChains.filter((c) => c.userId !== user.id);
  db.content = db.content.filter((c) => c.userId !== user.id);
  db.earnings = db.earnings.filter((e) => e.userId !== user.id);
  db.achievements = db.achievements.filter((a) => a.userId !== user.id);
  db.usage = db.usage.filter((u) => u.userId !== user.id);
  await persist(db);

  revalidatePath("/app/settings");
  revalidatePath("/app");
}

/**
 * Export the user's data (GDPR / DPDP "right to access / data portability").
 * MOCK — a real implementation would assemble a JSON bundle and email a signed
 * download link. Here we just revalidate so the page can show a confirmation.
 */
export async function exportDataAction() {
  await currentUser();
  revalidatePath("/app/settings");
}
