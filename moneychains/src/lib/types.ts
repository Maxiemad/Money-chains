/**
 * MoneyChains core domain model.
 *
 * These types mirror the Postgres schema (see prisma/schema.prisma). The
 * mock store in `src/lib/store.ts` implements the same shapes so the entire
 * product works end-to-end without a live database; swapping in Supabase is
 * a matter of replacing the store's read/write functions.
 */

export type Plan = "free" | "starter" | "pro" | "agency";

export type Role = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarColor: string; // deterministic avatar tint
  role: Role;
  plan: Plan;
  createdAt: string;
  xp: number;
  streak: number; // consecutive active days
}

/** How a platform connection is established. */
export type ConnectionType = "oauth" | "api_key" | "manual";

export type ConnectionStatus = "connected" | "disconnected" | "needs_reauth";

/** A platform the product can talk to. */
export interface Platform {
  id: string; // e.g. "pinterest"
  name: string;
  type: ConnectionType;
  /** What we get to do once connected. */
  capabilities: ("publish" | "track" | "auth")[];
  blurb: string;
}

/** A user's connection to a platform. Stores TOKENS, never passwords. */
export interface Connection {
  id: string;
  userId: string;
  platformId: string;
  type: ConnectionType;
  status: ConnectionStatus;
  /** Encrypted at rest in production. Mock stores an opaque string. */
  accessTokenEnc?: string;
  refreshTokenEnc?: string;
  accountLabel?: string; // e.g. "@jane_creates"
  lastSyncedAt?: string;
  createdAt: string;
}

export type StepAction =
  | "connect_account"
  | "create_content"
  | "publish"
  | "insert_affiliate_link"
  | "manual_task"
  | "track";

/** One ordered step inside a chain template. */
export interface ChainStep {
  id: string;
  title: string;
  description: string;
  platformId?: string;
  action: StepAction;
  /** Must be completed before later steps unlock. */
  required: boolean;
  /** Help text shown in the workspace right rail. */
  help: string;
}

export type ChainCategory =
  | "Affiliate"
  | "Content/Video"
  | "Digital Products"
  | "Newsletter"
  | "E-commerce"
  | "Lead-gen";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ChainTemplate {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ChainCategory;
  /** Platform ids that flow into one another: A → B → C → ₹ */
  flow: string[];
  requiredConnections: string[]; // platform ids
  steps: ChainStep[];
  effort: string; // e.g. "3–4 hrs / week"
  difficulty: Difficulty;
  /** Honest, range-based expectation. NEVER a guarantee. */
  timeToFirstEarning: string;
  earningRange: string; // e.g. "₹2,000–₹15,000 / mo"
  automated: boolean; // automated vs guided
  proven: boolean;
}

export type StepState = "locked" | "active" | "done";

export interface UserChainStep {
  stepId: string;
  state: StepState;
  outputContentId?: string;
  completedAt?: string;
}

export type UserChainStatus = "active" | "paused" | "completed";

/** An instance of a template that a user has started. */
export interface UserChain {
  id: string;
  userId: string;
  templateId: string;
  status: UserChainStatus;
  steps: UserChainStep[];
  niche?: string;
  startedAt: string;
  firstEarningAt?: string;
}

export type ContentKind =
  | "blog_post"
  | "pin"
  | "caption"
  | "product_blurb"
  | "newsletter";

export interface GeneratedContent {
  id: string;
  userId: string;
  userChainId: string;
  stepId: string;
  kind: ContentKind;
  title: string;
  body: string;
  approved: boolean;
  creditsUsed: number;
  createdAt: string;
}

export type EarningSource = "affiliate" | "stripe" | "manual" | "ad_revenue";

export interface Earning {
  id: string;
  userId: string;
  userChainId?: string;
  platformId?: string;
  source: EarningSource;
  amount: number; // in INR
  note?: string;
  /** Attribution: every generated link is UTM + chain tagged. */
  utm?: string;
  occurredAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  key: string; // "first_connection", "first_publish", "first_rupee"...
  label: string;
  earnedAt: string;
}

export interface UsageRecord {
  userId: string;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
  automationRunsUsed: number;
  automationRunsLimit: number;
}

export interface PlanTier {
  id: Plan;
  name: string;
  priceMonthly: number; // INR
  priceAnnual: number; // INR / month billed annually
  blurb: string;
  highlight?: boolean;
  features: { label: string; included: boolean | string }[];
  limits: {
    activeChains: number | "Unlimited";
    aiCredits: number | "Unlimited";
    automationRuns: number | "Unlimited";
    multiAccount: boolean;
    whiteLabel: boolean;
  };
}
