import type { Metadata } from "next";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Lock,
  Database,
  Sprout,
  Users,
  IndianRupee,
  LayoutTemplate,
  Star,
  ArrowRight,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  Badge,
  IconCircle,
  SectionHeading,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "MoneyChains is a tiny team in India building in public — real tools and honest ranges to help people turn their skills into income, without the scammy courses.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Honesty over hype",
    body: "We show realistic ranges, not screenshots of someone's best month. No guaranteed-income claims, no fake urgency — ever. If something usually earns little at first, we say so.",
  },
  {
    icon: Lock,
    title: "Security by default",
    body: "We connect through official OAuth flows and store only encrypted, revocable tokens. We never see or store your platform passwords, and you can disconnect in one click.",
  },
  {
    icon: Database,
    title: "Your data is yours",
    body: "Your content, connections, and earnings belong to you. Export everything or delete your account any time. We earn your trust by being easy to leave.",
  },
  {
    icon: Sprout,
    title: "Start small & real",
    body: "Small, real income beats imaginary lakhs. We help you ship one chain, earn one honest rupee, and build from there — momentum over moonshots.",
  },
];

const STATS = [
  { icon: Users, value: "12,000+", label: "builders started a chain" },
  { icon: IndianRupee, value: "₹3.2 Cr+", label: "tracked for our users" },
  { icon: LayoutTemplate, value: "40+", label: "proven chain templates" },
  { icon: Star, value: "4.9★", label: "average builder rating" },
];

export default function AboutPage() {
  return (
    <>
      {/* --------------------------------- MISSION ------------------------------- */}
      <section className="relative overflow-hidden bg-navy">
        <div className="mesh pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:py-28">
          <Badge tone="mint" className="mb-5">
            <Heart className="h-3 w-3" /> Our mission
          </Badge>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Turn skills into income,{" "}
            <span className="text-mint">honestly.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            Most people already have a skill worth something. What they don&rsquo;t
            have is a clear, honest path from that skill to real money online.
            MoneyChains exists to be that path — proven workflows, real tools, and
            numbers you can trust.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/signup" variant="mint" size="lg">
              Start free <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/how-it-works"
              size="lg"
              className="border border-white/15 bg-white/5 text-ink hover:bg-white/10"
            >
              How it works
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------- ORIGIN STORY ---------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Why we built this"
              title="Real skills, earning ₹0 — drowning in scammy courses"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                We kept meeting the same person: talented, hard-working, full of
                ideas — and earning nothing online. Not for lack of effort, but
                because the internet pointed them at a wall of get-rich-quick
                courses promising lakhs, screenshots of someone else&rsquo;s best
                month, and &ldquo;secrets&rdquo; that turned out to be ads.
              </p>
              <p>
                Every one of those courses sold a feeling. None of them showed
                the next button to click. So people bought another course, then
                another, and stayed exactly where they started — except poorer
                and more cynical.
              </p>
              <p>
                We built the opposite. Not a course. A toolset of proven money
                chains — tested workflows that connect real platforms — with
                honest ranges instead of promises, security instead of password
                grabs, and a guided workspace that shows you the next step until
                the money is real, even if it&rsquo;s small at first.
              </p>
            </div>
          </div>

          <Card className="border-0 bg-cloud p-8">
            <Sparkles className="h-9 w-9 text-teal" />
            <p className="mt-5 font-display text-2xl font-semibold leading-snug text-navy">
              &ldquo;We&rsquo;d rather show you one real rupee than promise you
              imaginary lakhs.&rdquo;
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              That single sentence is on the wall of our (small) office. It
              decides what we build, what we refuse to build, and how we talk to
              you about money.
            </p>
          </Card>
        </div>
      </section>

      {/* --------------------------------- VALUES -------------------------------- */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="What we stand for"
            title="Four values we won't trade away"
            subtitle="When a growth tactic conflicts with one of these, the tactic loses. Every time."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <Card key={v.title} className="flex gap-5 p-6">
                <IconCircle className="h-12 w-12">
                  <v.icon className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {v.body}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- BY THE NUMBERS ---------------------------- */}
      <section className="bg-navy py-20 text-ink">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            light
            eyebrow="By the numbers"
            title="Honest progress, openly shared"
            subtitle="We track what matters and show it as it is — no rounding up the truth."
            className="mx-auto text-center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <Card
                key={s.label}
                className="glass border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <IconCircle className="mx-auto h-12 w-12 bg-mint/15 text-mint">
                  <s.icon className="h-5 w-5" />
                </IconCircle>
                <p className="mt-4 font-display text-3xl font-semibold text-ink">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-ink/60">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------- TEAM --------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <IconCircle className="mx-auto h-14 w-14">
            <Users className="h-6 w-6" />
          </IconCircle>
          <h2 className="mt-6 font-display text-3xl font-semibold text-navy sm:text-4xl">
            A tiny team in India, building in public
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            We&rsquo;re a small group of builders who got tired of watching good
            people get sold dreams. We ship in the open, listen hard to our
            users, and would rather grow slowly with your trust than fast without
            it.
          </p>
          <div className="mt-7 flex justify-center">
            <Badge tone="mint">
              <Sparkles className="h-3 w-3" /> Building in public · since day one
            </Badge>
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
            Let&rsquo;s turn them into income — one proven chain at a time, the
            honest way.
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
