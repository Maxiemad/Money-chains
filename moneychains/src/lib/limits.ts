import type { User } from "./types";
import { getPlan } from "@/data/plans";
import { userChainsFor, usageFor } from "./store";

/**
 * Server-side plan-limit enforcement. The UI may hide gated actions, but
 * these are the checks that actually allow/deny a mutation.
 */

export interface LimitCheck {
  allowed: boolean;
  reason?: string;
  upgradeTo?: string;
}

export async function canStartChain(user: User): Promise<LimitCheck> {
  const plan = getPlan(user.plan)!;
  const active = (await userChainsFor(user.id)).filter(
    (c) => c.status === "active"
  ).length;
  if (plan.limits.activeChains === "Unlimited") return { allowed: true };
  if (active < plan.limits.activeChains) return { allowed: true };
  return {
    allowed: false,
    reason: `Your ${plan.name} plan allows ${plan.limits.activeChains} active chain${plan.limits.activeChains === 1 ? "" : "s"}.`,
    upgradeTo: user.plan === "free" ? "starter" : "pro",
  };
}

export async function canGenerateContent(
  user: User,
  credits: number
): Promise<LimitCheck> {
  const usage = await usageFor(user.id);
  if (usage.aiCreditsUsed + credits <= usage.aiCreditsLimit) return { allowed: true };
  return {
    allowed: false,
    reason: `You've used your ${usage.aiCreditsLimit} AI credits this month.`,
    upgradeTo: user.plan === "free" ? "starter" : "pro",
  };
}

export function canAutoPublish(user: User): LimitCheck {
  const plan = getPlan(user.plan)!;
  if (plan.limits.automationRuns === 0) {
    return {
      allowed: false,
      reason: "Automated publishing isn't on the Free plan.",
      upgradeTo: "starter",
    };
  }
  return { allowed: true };
}
