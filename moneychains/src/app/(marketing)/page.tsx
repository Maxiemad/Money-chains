import {
  Plug,
  Compass,
  LineChart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  Badge,
  IconCircle,
  SectionHeading,
} from "@/components/ui/primitives";
import { ChainFlow } from "@/components/brand/chain-flow";
import { TemplateCard } from "@/components/brand/template-card";
import { TEMPLATES } from "@/data/templates";
import { PLANS } from "@/data/plans";
import { inr } from "@/lib/utils";

const PILLARS = [
  {
    icon: Plug,
    title: "Connect",
    body: "Securely link the platforms a chain needs — Pinterest, your blog, Amazon. We use OAuth, so we never see your passwords.",
  },
  {
    icon: Compass,
    title: "Guide",
    body: "A step-by-step workspace walks you through every action: write the post, insert links, schedule the pins. No guesswork.",
  },
  {
    icon: LineChart,
    title: "Track",
    body: "Every click, sale, and rupee lands in one dashboard — attributed back to the exact content that earned it.",
  },
];

const STEPS = [
  "Pick a proven money chain",
  "Connect your accounts (OAuth — no passwords)",
  "Let AI draft your content, you approve it",
  "Publish across platforms",
  "Track real revenue in one place",
];

const FAQ = [
  {
    q: "Is this another get-rich-quick thing?",
    a: "No. MoneyChains is a toolset and a set of proven workflows. It removes the guesswork and the busywork — but the work and the consistency are still yours. We show realistic ranges, never guarantees.",
  },
  {
    q: "Do you need my platform passwords?",
    a: "Never. We connect through official OAuth flows and store only encrypted, revocable tokens. You can disconnect any platform in one click.",
  },
  {
    q: "How long until I earn?",
    a: "It varies a lot by niche and effort. For the flagship Pinterest → Blog → Amazon chain, people typically see first commissions in 3–6 weeks of consistent posting. Some sooner, some never — that's honest.",
  },
  {
    q: "What if a platform has no API?",
    a: "Some platforms (like certain newsletters) have no public API. For those, the chain runs in guided mode: we draft everything and you paste & send, then log results so tracking still works.",
  },
];

export default function HomePage() {
  const flagship = TEMPLATES[0];
  const featured = TEMPLATES.slice(0, 6);

  return (
    <>
      {/* ---------------------------------- HERO --------------------------------- */}
      <section className="relative overflow-hidden bg-navy">
        <div className="mesh pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge tone="mint" className="mb-5">
                <Sparkles className="h-3 w-3" /> The Zapier for making money
                online
              </Badge>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Pick a proven money chain.{" "}
                <span className="text-mint">We guide you to real income.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
                Stop staring at a blank screen. Choose a template that connects
                platforms into one working income engine, connect your accounts,
                and let MoneyChains walk you from first step to first rupee.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
              <p className="mt-4 text-sm text-ink/50">
                Free plan · no card required · 1 chain to start
              </p>
            </div>

            {/* Flagship chain preview card */}
            <Card className="glass border-white/10 bg-white/[0.03] p-6 text-ink">
              <div className="flex items-center justify-between">
                <Badge tone="mint">Flagship chain</Badge>
                <span className="text-xs text-ink/50">{flagship.difficulty}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {flagship.name}
              </h3>
              <div className="mt-5 rounded-xl bg-white/5 p-4">
                <ChainFlow flow={flagship.flow} size={40} labels light />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-ink/50">Typical first earning</dt>
                  <dd className="mt-0.5 font-medium text-ink">3–6 weeks</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Range / mo</dt>
                  <dd className="mt-0.5 font-medium text-mint">
                    ₹2k–₹40k
                  </dd>
                </div>
              </dl>
              <ButtonLink
                href={`/templates/${flagship.slug}`}
                variant="mint"
                className="mt-6 w-full"
              >
                See how it works
              </ButtonLink>
            </Card>
          </div>

          {/* trust strip */}
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink/50">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-mint" /> OAuth only — never your
              password
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-mint" /> 12,000+ builders started a
              chain
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LineChart className="h-4 w-4 text-mint" /> ₹3.2 Cr+ tracked for
              users
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------- PILLARS -------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="How it works"
            title="Connect · Guide · Track"
            subtitle="Three jobs, one platform. We handle the plumbing so you can focus on the work that actually earns."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <Card key={p.title} className="p-6">
                <IconCircle className="h-12 w-12">
                  <p.icon className="h-5 w-5" />
                </IconCircle>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- 5-STEP STRIP ------------------------------ */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="The path"
            title="From zero to your first rupee"
            subtitle="Every chain follows the same simple arc."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s} className="relative">
                <Card className="h-full p-5">
                  <span className="font-display text-3xl font-semibold text-mint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm font-medium text-navy">{s}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------- FEATURED CHAINS ---------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Templates"
              title="Proven money chains, ready to start"
              subtitle="Each chain is a tested workflow connecting real platforms. Preview any of them free."
            />
            <ButtonLink
              href="/templates"
              variant="outline"
              size="sm"
              className="hidden shrink-0 sm:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ TRUST / HONEST --------------------------- */}
      <section className="bg-navy py-20 text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Why trust us"
              title="Honest by design. Secure by default."
              subtitle="We'd rather keep you for years than hype you for a month."
            />
            <ul className="mt-8 space-y-4">
              {[
                "We never store your platform passwords — OAuth tokens only, encrypted and revocable.",
                "We show realistic earning ranges, not screenshots of someone's best month.",
                "Your data is yours: export or delete your account any time.",
                "No fake urgency, no guaranteed-income claims. Ever.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                  <span className="text-sm leading-relaxed text-ink/80">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="glass border-white/10 bg-white/[0.03] p-8">
            <ShieldCheck className="h-10 w-10 text-mint" />
            <p className="mt-5 font-display text-2xl font-semibold leading-snug text-ink">
              &ldquo;I'd tried five courses that promised lakhs. MoneyChains just
              showed me the next button to click — and the money was real, even
              if small at first.&rdquo;
            </p>
            <p className="mt-5 text-sm text-ink/60">
              Priya · started Pinterest → Blog → Amazon · earning since week 4
            </p>
          </Card>
        </div>
      </section>

      {/* ----------------------------- PRICING TEASER ---------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Pricing"
            title="Start free. Upgrade when you're earning."
            subtitle="Four simple plans. Cancel anytime."
            className="mx-auto text-center"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <Card
                key={p.id}
                className={`relative p-6 ${
                  p.highlight ? "ring-2 ring-mint" : ""
                }`}
              >
                {p.highlight && (
                  <Badge tone="mint" className="absolute -top-2.5 left-6">
                    Most popular
                  </Badge>
                )}
                <h3 className="font-display text-lg font-semibold text-navy">
                  {p.name}
                </h3>
                <p className="mt-2">
                  <span className="font-display text-3xl font-semibold text-navy">
                    {p.priceMonthly === 0 ? "₹0" : inr(p.priceMonthly)}
                  </span>
                  <span className="text-sm text-muted">/mo</span>
                </p>
                <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                <ButtonLink
                  href="/signup"
                  variant={p.highlight ? "primary" : "outline"}
                  size="sm"
                  className="mt-5 w-full"
                >
                  {p.priceMonthly === 0 ? "Start free" : "Choose " + p.name}
                </ButtonLink>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            <a href="/pricing" className="font-medium text-teal hover:underline">
              Compare all features →
            </a>
          </p>
        </div>
      </section>

      {/* --------------------------------- FAQ ----------------------------------- */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered honestly"
            className="mx-auto text-center"
          />
          <div className="mt-10 space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-white p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-navy">
                  {f.q}
                  <span className="text-teal transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------- CTA ----------------------------------- */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Your skills are already worth something.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
            Let's turn them into income — one proven chain at a time.
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
