import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  TrendingUp,
  Target,
  Flame,
  Sparkles,
} from "lucide-react";
import { Card, Badge, IconCircle } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { ChainFlow } from "@/components/brand/chain-flow";
import { currentUser } from "@/services/auth";
import { userChainsFor, earningsFor } from "@/lib/store";
import { getTemplate } from "@/data/templates";
import { inr } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await currentUser();
  const chains = await userChainsFor(user.id);
  const earnings = await earningsFor(user.id);

  const total = earnings.reduce((s, e) => s + e.amount, 0);
  const now = new Date();
  const monthTotal = earnings
    .filter((e) => {
      const d = new Date(e.occurredAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((s, e) => s + e.amount, 0);

  const active = chains.filter((c) => c.status === "active");

  // North-star: the next concrete action across the user's active chains.
  const primary = active[0];
  const primaryTemplate = primary ? getTemplate(primary.templateId) : undefined;
  const nextStep = primary
    ? primary.steps.find((s) => s.state === "active")
    : undefined;
  const nextStepDef = primaryTemplate?.steps.find(
    (s) => s.id === nextStep?.stepId
  );

  const stats = [
    {
      label: "Total earned",
      value: inr(total),
      icon: TrendingUp,
      sub: "tracked across all chains",
      glow: true,
    },
    {
      label: "This month",
      value: inr(monthTotal),
      icon: Sparkles,
      sub: "June 2026",
    },
    {
      label: "Active chains",
      value: String(active.length),
      icon: Boxes,
      sub: `${chains.length} total`,
    },
    {
      label: "Day streak",
      value: String(user.streak),
      icon: Flame,
      sub: `${user.xp} XP`,
    },
  ];

  return (
    <div className="space-y-7">
      {/* What to do today */}
      {nextStepDef && primaryTemplate && (
        <Card className="overflow-hidden border-0 bg-navy p-6 text-ink">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <Badge tone="mint" className="mb-3">
                <Target className="h-3 w-3" /> What to do today
              </Badge>
              <h2 className="font-display text-xl font-semibold text-ink">
                {nextStepDef.title}
              </h2>
              <p className="mt-1.5 max-w-lg text-sm text-ink/70">
                {nextStepDef.description}
              </p>
              <p className="mt-3 text-xs text-ink/50">
                In your chain: {primaryTemplate.name}
              </p>
            </div>
            <ButtonLink
              href={`/app/chains/${primary!.id}`}
              variant="mint"
              className="shrink-0"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className={`p-5 ${s.glow ? "glow-mint" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{s.label}</span>
              <IconCircle className="h-8 w-8">
                <s.icon className="h-4 w-4" />
              </IconCircle>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold text-navy">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Active chains */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy">
            Your chains
          </h2>
          <ButtonLink href="/app/templates" variant="outline" size="sm">
            Start a new chain
          </ButtonLink>
        </div>

        {chains.length === 0 ? (
          <Card className="p-10 text-center">
            <Boxes className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 font-medium text-navy">No chains yet</p>
            <p className="mt-1 text-sm text-muted">
              Pick a proven template and earn your first rupee.
            </p>
            <ButtonLink href="/app/templates" className="mt-5">
              Browse templates
            </ButtonLink>
          </Card>
        ) : (
          <div className="grid gap-4">
            {chains.map((c) => {
              const t = getTemplate(c.templateId)!;
              const done = c.steps.filter((s) => s.state === "done").length;
              const pct = Math.round((done / c.steps.length) * 100);
              return (
                <Link key={c.id} href={`/app/chains/${c.id}`} className="group">
                  <Card className="p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_-16px_rgba(14,26,56,0.3)]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-display text-base font-semibold text-navy">
                          {t.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted">
                          {c.niche ? `Niche: ${c.niche}` : "Niche not set"}
                        </p>
                      </div>
                      <Badge tone={c.status === "completed" ? "mint" : "teal"}>
                        {c.status}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <ChainFlow flow={t.flow} size={28} />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>
                          {done}/{c.steps.length} steps
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cloud">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal to-mint transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
