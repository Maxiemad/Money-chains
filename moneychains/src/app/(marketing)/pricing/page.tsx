import type { Metadata } from "next";
import { Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge, SectionHeading } from "@/components/ui/primitives";
import { PricingTable } from "@/components/marketing/pricing-table";
import { PLANS } from "@/data/plans";

export const metadata: Metadata = {
  title: "Pricing — Start free, upgrade when you're earning",
  description:
    "Simple, honest pricing for MoneyChains. Start free with no card, then upgrade when your chains are earning. Monthly or annual — cancel anytime.",
};

const FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no lock-in contracts. Cancel from your settings whenever you like and you'll keep access until the end of the period you've already paid for. Downgrade to Free and your chains stay — they just respect the Free limits.",
  },
  {
    q: "What are AI content credits?",
    a: "One credit covers a single AI generation — a blog draft, a batch of pins, a product blurb, a newsletter section. Every plan includes a monthly allowance that resets each billing cycle. You always review and approve content before it publishes; nothing goes out automatically without your say-so.",
  },
  {
    q: "What happens when I hit a limit?",
    a: "We never bill you surprise overages. If you reach your active-chain, AI-credit, or automation-run limit, that capability simply pauses until the next cycle — or you can upgrade to lift the limit instantly. Your existing chains and earnings data are never touched.",
  },
  {
    q: "Do you offer refunds?",
    a: "Because every plan starts free, you can fully evaluate MoneyChains before paying a rupee. If something goes wrong on a paid plan within 7 days of a charge, email us and we'll make it right — usually a refund of that charge. We'd rather keep you happy than keep your money.",
  },
  {
    q: "Is income guaranteed on any plan?",
    a: "No — and we'll never claim otherwise. MoneyChains gives you proven workflows, tools, and tracking. The work and consistency are yours, and results vary by niche and effort. A higher plan gives you more capacity, not a guarantee.",
  },
  {
    q: "Can I switch plans later?",
    a: "Anytime. Upgrades take effect immediately and are pro-rated; downgrades apply at your next renewal. Switching between monthly and annual is just as easy.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ---------------------------------- HERO --------------------------------- */}
      <section className="relative overflow-hidden bg-navy">
        <div className="mesh pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
          <Badge tone="mint" className="mb-5">
            <Sparkles className="h-3 w-3" /> Simple, honest pricing
          </Badge>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Start free.{" "}
            <span className="text-mint">Upgrade when you&apos;re earning.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            No card to begin, no lock-in, no surprise overages. Every plan starts
            free so you can prove a chain works before you pay for more capacity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-ink/55">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-mint" /> Cancel anytime
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-mint" /> No card to start
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-mint" /> No income guarantees — ever
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------- PLANS + COMPARISON -------------------------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <PricingTable plans={PLANS} />
        </div>
      </section>

      {/* --------------------------------- FAQ ----------------------------------- */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHeading
            eyebrow="Pricing FAQ"
            title="The fine print, in plain words"
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
            Pick a chain. Earn your first rupee. Then upgrade.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
            That&apos;s the whole pitch. Start on Free today — no card, no risk.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/signup" variant="mint" size="lg">
              Start free <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-ink/50">
            Questions about a bigger plan?{" "}
            <a
              href="mailto:hello@moneychains.app"
              className="font-medium text-mint hover:underline"
            >
              Talk to us
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
