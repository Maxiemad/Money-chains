import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Clock,
  Gauge,
  Zap,
  Hand,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Card, Badge, IconCircle } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { ChainFlow } from "@/components/brand/chain-flow";
import { PlatformIcon } from "@/components/brand/platform-icon";
import { TEMPLATES, getTemplate } from "@/data/templates";
import { getPlatform } from "@/data/platforms";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return { title: "Template not found" };
  return { title: t.name, description: t.tagline };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  return (
    <div className="bg-white">
      {/* hero */}
      <section className="bg-navy py-16 text-ink">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="teal">{t.category}</Badge>
            {t.proven && (
              <Badge tone="mint">
                <CheckCircle2 className="h-3 w-3" /> Proven
              </Badge>
            )}
            <Badge tone="navy" className="border border-white/15">
              {t.automated ? (
                <>
                  <Zap className="h-3 w-3" /> Automated
                </>
              ) : (
                <>
                  <Hand className="h-3 w-3" /> Guided
                </>
              )}
            </Badge>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            {t.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink/70">{t.description}</p>

          <div className="mt-7 rounded-2xl bg-white/5 p-5">
            <ChainFlow flow={t.flow} size={44} labels light />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/signup" variant="mint" size="lg">
              Start this chain free
            </ButtonLink>
            <ButtonLink
              href="/templates"
              size="lg"
              className="border border-white/15 bg-white/5 text-ink hover:bg-white/10"
            >
              Browse other chains
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* facts */}
      <section className="border-b border-line py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, label: "Effort", value: t.effort },
            { icon: Gauge, label: "Difficulty", value: t.difficulty },
            { icon: TrendingUp, label: "Earning range", value: t.earningRange },
            { icon: ShieldCheck, label: "Typical first earning", value: t.timeToFirstEarning },
          ].map((f) => (
            <Card key={f.label} className="p-5">
              <IconCircle className="h-9 w-9">
                <f.icon className="h-4 w-4" />
              </IconCircle>
              <p className="mt-3 text-xs text-muted">{f.label}</p>
              <p className="mt-0.5 text-sm font-medium text-navy">{f.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* steps + connections */}
      <section className="py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              What you'll do
            </h2>
            <ol className="mt-6 space-y-4">
              {t.steps.map((s, i) => (
                <li key={s.id} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 font-display text-sm font-semibold text-teal">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-navy">
                      {s.title}
                      {!s.required && (
                        <span className="ml-2 text-xs text-muted">optional</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Accounts you'll connect
            </h2>
            <div className="mt-6 space-y-3">
              {t.requiredConnections.map((id) => {
                const p = getPlatform(id)!;
                return (
                  <Card key={id} className="flex items-center gap-3 p-4">
                    <PlatformIcon platformId={id} size={40} />
                    <div>
                      <p className="text-sm font-medium text-navy">{p.name}</p>
                      <p className="text-xs text-muted capitalize">
                        {p.type.replace("_", " ")} connection
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-6 border-0 bg-cloud p-5">
              <p className="text-sm font-medium text-navy">Honest expectations</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                These ranges are illustrative, not promises. Your results depend
                on your niche, effort, and consistency. Many people earn little
                at first; some earn nothing. We'll never tell you otherwise.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="bg-cloud py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Ready to start {t.name.split(" → ")[0]}?
          </h2>
          <p className="mt-2 text-muted">
            Set it up in minutes. We'll guide every step.
          </p>
          <ButtonLink href="/signup" size="lg" className="mt-6">
            Start free
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
