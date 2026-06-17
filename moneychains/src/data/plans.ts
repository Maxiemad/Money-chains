import type { PlanTier } from "@/lib/types";

/** Pricing tiers. Limits are enforced server-side in lib/limits.ts. */
export const PLANS: PlanTier[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceAnnual: 0,
    blurb: "Start one chain and earn your first rupee.",
    features: [
      { label: "1 active money chain", included: true },
      { label: "50 AI content credits / mo", included: true },
      { label: "Manual publishing", included: true },
      { label: "Earnings dashboard", included: true },
      { label: "Automated publishing", included: false },
      { label: "Multi-account", included: false },
      { label: "Watermark on output", included: "Yes" },
    ],
    limits: {
      activeChains: 1,
      aiCredits: 50,
      automationRuns: 0,
      multiAccount: false,
      whiteLabel: false,
    },
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 999,
    priceAnnual: 799,
    blurb: "For serious side-income builders.",
    features: [
      { label: "3 active money chains", included: true },
      { label: "500 AI content credits / mo", included: true },
      { label: "Automated publishing", included: "100 runs/mo" },
      { label: "Full earnings analytics", included: true },
      { label: "Multi-account", included: false },
      { label: "No watermark", included: true },
      { label: "Email support", included: true },
    ],
    limits: {
      activeChains: 3,
      aiCredits: 500,
      automationRuns: 100,
      multiAccount: false,
      whiteLabel: false,
    },
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 2499,
    priceAnnual: 1999,
    blurb: "Go full-time. Scale multiple income engines.",
    highlight: true,
    features: [
      { label: "Unlimited active chains", included: true },
      { label: "2,500 AI content credits / mo", included: true },
      { label: "Automated publishing", included: "500 runs/mo" },
      { label: "Advanced analytics + funnels", included: true },
      { label: "Multi-account", included: true },
      { label: "No watermark", included: true },
      { label: "Priority support", included: true },
    ],
    limits: {
      activeChains: "Unlimited",
      aiCredits: 2500,
      automationRuns: 500,
      multiAccount: true,
      whiteLabel: false,
    },
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 7999,
    priceAnnual: 6499,
    blurb: "Run chains for clients, white-labelled.",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "10,000 AI content credits / mo", included: true },
      { label: "Unlimited automation runs", included: true },
      { label: "White-label reports", included: true },
      { label: "Client workspaces", included: true },
      { label: "Dedicated manager", included: true },
    ],
    limits: {
      activeChains: "Unlimited",
      aiCredits: 10000,
      automationRuns: "Unlimited",
      multiAccount: true,
      whiteLabel: true,
    },
  },
];

export function getPlan(id: string): PlanTier | undefined {
  return PLANS.find((p) => p.id === id);
}
