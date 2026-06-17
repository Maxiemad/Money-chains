"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/services/auth";
import { getPlan } from "@/data/plans";
import { getDb, persist } from "./store";
import type { Plan } from "./types";

const VALID_PLANS: Plan[] = ["free", "starter", "pro", "agency"];

/** "Unlimited" caps map to a large finite number for the usage meters. */
const UNLIMITED = 1_000_000;

function toLimit(value: number | "Unlimited"): number {
  return value === "Unlimited" ? UNLIMITED : value;
}

/**
 * Switch the current user's plan.
 *
 * MOCK of Stripe Checkout — swap for a real Checkout Session + webhook.
 * In production the plan/usage mutation would happen in the
 * `checkout.session.completed` webhook handler. Here we apply it inline and
 * persist to the database.
 */
export async function changePlanAction(formData: FormData) {
  const user = await currentUser();
  const choice = String(formData.get("plan") || "") as Plan;
  if (!VALID_PLANS.includes(choice)) return;

  const plan = getPlan(choice);
  if (!plan) return;

  const db = await getDb();

  const dbUser = db.users.find((u) => u.id === user.id);
  if (!dbUser) return;
  dbUser.plan = choice;

  // Raise/lower the caps to the new plan, keeping the "used" counters.
  let usage = db.usage.find((u) => u.userId === user.id);
  if (!usage) {
    usage = {
      userId: user.id,
      aiCreditsUsed: 0,
      aiCreditsLimit: 0,
      automationRunsUsed: 0,
      automationRunsLimit: 0,
    };
    db.usage.push(usage);
  }
  usage.aiCreditsLimit = toLimit(plan.limits.aiCredits);
  usage.automationRunsLimit = toLimit(plan.limits.automationRuns);

  await persist(db);
  revalidatePath("/app/billing");
  revalidatePath("/app");
}
