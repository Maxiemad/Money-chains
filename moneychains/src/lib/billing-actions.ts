"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/services/auth";
import { getPlan } from "@/data/plans";
import { db, usageFor } from "./store";
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
 * In production this would create a Checkout Session, redirect to Stripe, and
 * the plan/usage mutation below would happen in the `checkout.session.completed`
 * webhook handler. Here we apply it inline against the in-memory store.
 */
export async function changePlanAction(formData: FormData) {
  const user = await currentUser();
  const choice = String(formData.get("plan") || "") as Plan;
  if (!VALID_PLANS.includes(choice)) return;

  const plan = getPlan(choice);
  if (!plan) return;

  // Update the user's plan in the store.
  const dbUser = db.users.find((u) => u.id === user.id);
  if (!dbUser) return;
  dbUser.plan = choice;

  // Reset this user's usage limits to the chosen plan's limits. We keep the
  // "used" counters (a real billing cycle would reset them on the period
  // boundary, not on upgrade) but raise/lower the caps to the new plan.
  const usage = usageFor(user.id);
  usage.aiCreditsLimit = toLimit(plan.limits.aiCredits);
  usage.automationRunsLimit = toLimit(plan.limits.automationRuns);

  // If the usage record wasn't yet in the store (e.g. the seeded admin), add it.
  if (!db.usage.some((u) => u.userId === user.id)) {
    db.usage.push({
      userId: user.id,
      aiCreditsUsed: usage.aiCreditsUsed,
      aiCreditsLimit: usage.aiCreditsLimit,
      automationRunsUsed: usage.automationRunsUsed,
      automationRunsLimit: usage.automationRunsLimit,
    });
  }

  revalidatePath("/app/billing");
  revalidatePath("/app");
}
