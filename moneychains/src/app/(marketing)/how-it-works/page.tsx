import type { Metadata } from "next";
import {
  Compass,
  Plug,
  PenLine,
  Send,
  LineChart,
  KeyRound,
  Hand,
  Lock,
  ShieldCheck,
  RefreshCw,
  EyeOff,
  Scale,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  Badge,
  IconCircle,
  SectionHeading,
} from "@/components/ui/primitives";
import { ChainFlow } from "@/components/brand/chain-flow";
import { PlatformIcon } from "@/components/brand/platform-icon";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See exactly how MoneyChains turns a proven money chain into real income — from picking a template to tracking your first rupee. Honest, secure, step by step.",
};

const JOURNEY = [
  {
    icon: Compass,
    title: "Pick a chain",
    body: "Start from a proven template — a tested workflow that connects real platforms into one income engine. Browse by category, effort, and honest earning range, then choose the one that fits your skills and time.",
    note: "No blank screen. No guesswork about what actually works.",
  },
  {
    icon: Plug,
    title: "Connect accounts",
    body: "Securely link the platforms your chain needs. Most connect via OAuth, so we never see your password — just a revocable token. Others use an API key or run in guided mode. You're always in control.",
    note: "Disconnect any platform in one click, any time.",
  },
  {
    icon: PenLine,
    title: "AI drafts, you approve",
    body: "We draft the blog posts, pins, scripts, and product copy your chain needs — genuinely useful, SEO-aware, and on-brand. Nothing publishes until you review and edit it. Your voice, your call.",
    note: "The best-earning content adds your real experience on top.",
  },
  {
    icon: Send,
    title: "Publish across platforms",
    body: "Approve once and we publish where the chain says to — scheduling pins across the week, pushing posts live, queueing reels. For platforms without an API, we hand you ready-to-send content.",
    note: "Consistency is automated so you can focus on the work that earns.",
  },
  {
    icon: LineChart,
    title: "Track real revenue",
    body: "Every click, visit, and sale lands in one dashboard — attributed back to the exact pin or post that earned it. Log anything the API hasn't synced yet and we'll reconcile it later.",
    note: "Real numbers, not screenshots of someone's best month.",
  },
];

const CONNECTIONS = [
  {
    icon: ShieldCheck,
    tone: "mint" as const,
    label: "OAuth",
    title: "Auto publish + track",
    body: "The platform hands us a revocable token through its official login screen. We can publish and read analytics on your behalf — and we never see or store your password.",
    examples: ["pinterest", "instagram", "youtube"],
    foot: "Best for: Pinterest, Instagram, YouTube, Shopify, Stripe",
  },
  {
    icon: KeyRound,
    tone: "teal" as const,
    label: "API key",
    title: "Paste an id, track sales",
    body: "Some platforms identify you with a key or tag instead of a login — like your Amazon Associates tag. You paste it once and we build correctly-tagged links and attribute every sale.",
    examples: ["amazon_associates", "etsy", "gumroad"],
    foot: "Best for: Amazon Associates, Etsy, Gumroad",
  },
  {
    icon: Hand,
    tone: "neutral" as const,
    label: "Manual",
    title: "We draft, you send",
    body: "A few platforms (like some newsletters) have no public API. For those the chain runs in guided mode: we draft everything, you paste and send, then log the results so tracking still works.",
    examples: ["substack"],
    foot: "Best for: Substack & other newsletters",
  },
];

const TRUST = [
  {
    icon: Lock,
    title: "No passwords, ever",
    body: "We connect through official OAuth flows. You log in on the platform's own page — we only receive a token, never your credentials.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted tokens",
    body: "Every connection token is encrypted at rest. They're scoped to exactly what the chain needs — nothing more.",
  },
  {
    icon: RefreshCw,
    title: "Revocable in one click",
    body: "Disconnect any platform whenever you like, from your Connections page. Export or delete your account any time too.",
  },
  {
    icon: Scale,
    title: "Honest ranges, not guarantees",
    body: "We show realistic earning ranges that vary by niche and effort. Many people earn little at first; some earn nothing. We'll never tell you otherwise.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ---------------------------------- HERO --------------------------------- */}
      <section className="relative overflow-hidden bg-navy">
        <div className="mesh pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:py-28">
          <Badge tone="mint" className="mb-5">
            <Sparkles className="h-3 w-3" /> How MoneyChains works
          </Badge>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            From a proven chain to{" "}
            <span className="text-mint">your first real rupee.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            No hype, no magic button. Just a clear path: pick a chain, connect
            your accounts, approve AI-drafted content, publish, and track real
            revenue — all in one place, all on your terms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/signup" variant="mint" size="lg">
              Start free <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/templates"
              size="lg"
              className="border border-white/15 bg-white/5 text-ink hover:bg-white/10"
            >
              Browse templates
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------- THE JOURNEY ----------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="The 5-step journey"
            title="Every chain follows the same simple arc"
            subtitle="Five steps, start to finish. We handle the plumbing so you can focus on the work that actually earns."
          />
          <div className="mt-12 space-y-5">
            {JOURNEY.map((s, i) => (
              <Card
                key={s.title}
                className="grid items-start gap-5 p-6 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                  <span className="font-display text-4xl font-semibold text-mint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <IconCircle className="h-12 w-12">
                    <s.icon className="h-5 w-5" />
                  </IconCircle>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
                    {s.body}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1 text-sm font-medium text-teal">
                    <Check className="h-4 w-4 shrink-0" /> {s.note}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- CONNECTION TYPES -------------------------- */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Connections"
            title="Three ways to connect — you stay in control"
            subtitle="Different platforms work differently. Whichever path a chain uses, you never hand us a password, and you can disconnect any time."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {CONNECTIONS.map((c) => (
              <Card key={c.label} className="flex flex-col p-6">
                <div className="flex items-center gap-3">
                  <IconCircle
                    className={
                      c.tone === "mint"
                        ? "h-11 w-11 bg-mint/20 text-teal"
                        : c.tone === "teal"
                        ? "h-11 w-11"
                        : "h-11 w-11 bg-cloud text-muted"
                    }
                  >
                    <c.icon className="h-5 w-5" />
                  </IconCircle>
                  <Badge tone={c.tone}>{c.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
                <div className="mt-5 flex items-center gap-2">
                  {c.examples.map((id) => (
                    <PlatformIcon key={id} platformId={id} size={34} />
                  ))}
                </div>
                <p className="mt-auto pt-5 text-xs font-medium uppercase tracking-wide text-muted">
                  {c.foot}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ SECURITY / TRUST ------------------------- */}
      <section className="bg-navy py-20 text-ink">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              light
              eyebrow="Security & trust"
              title="Secure by default. Honest by design."
              subtitle="We'd rather keep you for years than hype you for a month. Here's exactly how your accounts and data are protected."
            />
            <Card className="glass mt-8 border-white/10 bg-white/[0.03] p-6">
              <EyeOff className="h-9 w-9 text-mint" />
              <p className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
                We never store your platform passwords.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                You log in on each platform&rsquo;s own page. MoneyChains only
                receives an encrypted, revocable token — scoped to exactly what
                your chain needs, and nothing more.
              </p>
            </Card>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {TRUST.map((t) => (
              <Card
                key={t.title}
                className="glass border-white/10 bg-white/[0.03] p-6"
              >
                <IconCircle className="h-11 w-11 bg-mint/15 text-mint">
                  <t.icon className="h-5 w-5" />
                </IconCircle>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {t.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- FLAGSHIP IN ACTION ------------------------ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading
            eyebrow="See it in action"
            title="The flagship chain, end to end"
            subtitle="Pinterest drives free traffic to a blog post, the post recommends Amazon products, and every sale is traced back to the pin that earned it."
            className="mx-auto text-center"
          />
          <Card className="mt-10 p-8 sm:p-10">
            <div className="rounded-2xl bg-cloud p-6 sm:p-8">
              <ChainFlow
                flow={["pinterest", "blog", "amazon_associates"]}
                size={48}
                labels
              />
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "Pinterest",
                  body: "We design and schedule pins that send free, intent-rich traffic to your post.",
                },
                {
                  step: "Blog",
                  body: "A genuinely useful, SEO-aware post recommends the products readers are looking for.",
                },
                {
                  step: "Amazon",
                  body: "Correctly-tagged affiliate links earn commission, attributed back to the exact pin.",
                },
              ].map((c, i) => (
                <div key={c.step}>
                  <span className="font-display text-2xl font-semibold text-mint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-medium text-navy">{c.step}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="text-sm text-muted">
                Typical first earning{" "}
                <span className="font-medium text-navy">3–6 weeks</span> · Range{" "}
                <span className="font-medium text-teal">₹2k–₹40k / mo</span>
              </div>
              <ButtonLink
                href="/templates/pinterest-blog-amazon"
                variant="outline"
                size="sm"
              >
                See the full chain <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Card>
        </div>
      </section>

      {/* --------------------------------- CTA ----------------------------------- */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Now you know how it works.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
            Pick a proven chain and let MoneyChains guide you from the first
            step to the first rupee.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/signup" variant="mint" size="lg">
              Start your first chain free <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
