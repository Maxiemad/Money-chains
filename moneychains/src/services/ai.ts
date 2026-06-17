import type { ChainStep, ContentKind } from "@/lib/types";

/**
 * AI content service.
 *
 * `generateContent()` is provider-agnostic. The default provider is Claude
 * (set CLAUDE_API_KEY in .env). With no key, a deterministic mock provider
 * returns realistic, niche-aware drafts so the whole flow is demonstrable.
 */

export interface GenerateArgs {
  step: ChainStep;
  niche: string;
  userInputs?: Record<string, string>;
}

export interface GeneratedDraft {
  kind: ContentKind;
  title: string;
  body: string;
  creditsUsed: number;
}

interface ContentProvider {
  name: string;
  generate(args: GenerateArgs): Promise<GeneratedDraft>;
}

function kindForStep(step: ChainStep): ContentKind {
  switch (step.platformId) {
    case "pinterest":
      return "pin";
    case "instagram":
    case "tiktok":
    case "youtube":
      return "caption";
    case "etsy":
    case "gumroad":
    case "shopify":
      return "product_blurb";
    case "substack":
      return "newsletter";
    default:
      return "blog_post";
  }
}

/** Deterministic, niche-aware mock. No external calls. */
const mockProvider: ContentProvider = {
  name: "mock",
  async generate({ step, niche }) {
    const kind = kindForStep(step);
    const n = niche.trim() || "your niche";
    const Cap = n.charAt(0).toUpperCase() + n.slice(1);

    const drafts: Record<ContentKind, GeneratedDraft> = {
      blog_post: {
        kind,
        title: `7 ${Cap} Picks That Are Actually Worth It (2026)`,
        body: `If you're getting into ${n}, the hardest part is knowing what's worth your money. I spent weeks testing options so you don't have to.\n\nBelow are seven picks I'd genuinely recommend today, with who each one is for and the trade-offs. Each links to where I'd buy it — and yes, those are affiliate links, which is how this guide stays free.\n\n## 1. The all-rounder\nGreat if you want one solid choice and done.\n\n## 2. The budget hero\nFor when every rupee counts but you refuse to settle.\n\n*(...edit this draft to add your real experience — posts with a genuine point of view earn far more.)*`,
        creditsUsed: 8,
      },
      pin: {
        kind,
        title: `${Cap}: 7 picks under budget →`,
        body: `Save this! The exact ${n} picks I'd buy in 2026 — ranked, with honest pros & cons. Tap to read the full guide. #${n.replace(/\s+/g, "")} #budgetfinds`,
        creditsUsed: 2,
      },
      caption: {
        kind,
        title: `Hook: "Stop overpaying for ${n}"`,
        body: `POV: you just found the ${n} setup that actually works 👀\n\nFull breakdown + links in bio. Save this for later 🔖\n\n#${n.replace(/\s+/g, "")} #howto`,
        creditsUsed: 3,
      },
      product_blurb: {
        kind,
        title: `${Cap} — Printable Pack`,
        body: `An instant-download ${n} pack designed to save you hours. Print at home, use forever. Includes editable templates and a quick-start guide.\n\nTags: ${n}, printable, digital download, template`,
        creditsUsed: 3,
      },
      newsletter: {
        kind,
        title: `${Cap} Weekly — Issue #1`,
        body: `Welcome to ${Cap} Weekly. Every week: one useful idea, two resources, and a thing worth your time.\n\nThis week's idea: start before you feel ready. Here's why that compounds...`,
        creditsUsed: 5,
      },
    };

    return drafts[kind];
  },
};

function creditsForKind(kind: ContentKind): number {
  switch (kind) {
    case "blog_post":
      return 8;
    case "newsletter":
      return 5;
    case "caption":
      return 3;
    case "product_blurb":
      return 3;
    default:
      return 2;
  }
}

/**
 * Real Groq provider — fast Llama-based generation via the Groq API. Used
 * whenever GROQ_API_KEY is set. Any failure falls back to the deterministic
 * mock so the content flow never breaks.
 */
const groqProvider: ContentProvider = {
  name: "groq",
  async generate(args) {
    const key = process.env.GROQ_API_KEY;
    if (!key) return mockProvider.generate(args);
    const { step, niche } = args;
    const kind = kindForStep(step);
    const n = niche.trim() || "your niche";
    try {
      const { default: Groq } = await import("groq-sdk");
      const client = new Groq({ apiKey: key });
      const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
      const completion = await client.chat.completions.create({
        model,
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'You are MoneyChains\' content engine. You write honest, useful, conversion-aware content for creators monetizing their skills. Never promise guaranteed income. Always reply as strict JSON: {"title": string, "body": string}. Body may use markdown.',
          },
          {
            role: "user",
            content: `Task: ${step.title}\nDescription: ${step.description}\nContent type: ${kind}\nNiche: ${n}\n\nWrite a ready-to-edit draft for this exact step. Keep it specific to the niche and platform.`,
          },
        ],
      });
      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw) as { title?: string; body?: string };
      if (!parsed.title || !parsed.body) return mockProvider.generate(args);
      return {
        kind,
        title: parsed.title,
        body: parsed.body,
        creditsUsed: creditsForKind(kind),
      };
    } catch {
      return mockProvider.generate(args);
    }
  },
};

function provider(): ContentProvider {
  return process.env.GROQ_API_KEY ? groqProvider : mockProvider;
}

export async function generateContent(
  args: GenerateArgs
): Promise<GeneratedDraft> {
  return provider().generate(args);
}

export function activeProviderName(): string {
  return provider().name;
}
