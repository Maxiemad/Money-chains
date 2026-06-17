import Link from "next/link";
import {
  AlertTriangle,
  Check,
  CreditCard,
  Download,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/services/auth";
import { usageFor } from "@/lib/store";
import { PLANS, getPlan } from "@/data/plans";
import { changePlanAction } from "@/lib/billing-actions";
import { inr } from "@/lib/utils";

const GATE_COPY: Record<string, { title: string; body: string }> = {
  chains: {
    title: "You've hit your active-chain limit",
    body: "Your current plan caps how many money chains you can run at once. Upgrade to start another.",
  },
  credits: {
    title: "You're out of AI content credits this month",
    body: "You've used all your AI credits. Upgrade for a bigger monthly allowance, or wait for your next cycle.",
  },
};

/** A labelled meter that shifts mint → amber → red as it fills. */
function UsageMeter({
  label,
  used,
  limit,
  unit,
}: {
  label: string;
  used: number;
  limit: number;
  unit: string;
}) {
  const unlimited = limit >= 1_000_000;
  const pct = unlimited ? 0 : Math.min(100, Math.round((used / Math.max(1, limit)) * 100));
  const bar =
    pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-mint";

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-navy">{label}</span>
        <span className="text-xs text-muted">
          {used.toLocaleString("en-IN")}{" "}
          {unlimited ? (
            <span className="text-teal">/ Unlimited</span>
          ) : (
            <>/ {limit.toLocaleString("en-IN")} {unit}</>
          )}
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-cloud">
        <div
          className={`h-full rounded-full transition-all ${unlimited ? "bg-teal/40" : bar}`}
          style={{ width: unlimited ? "12%" : `${Math.max(2, pct)}%` }}
        />
      </div>
    </div>
  );
}

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ gated?: string }>;
}) {
  const user = await currentUser();
  const usage = await usageFor(user.id);
  const plan = getPlan(user.plan)!;
  const { gated } = await searchParams;
  const gate = gated ? GATE_COPY[gated] : undefined;

  // Mock invoice history, derived from the current plan for a touch of realism.
  const invoices = [
    { date: "1 Jun 2026", plan: plan.name, amount: plan.priceMonthly },
    { date: "1 May 2026", plan: plan.name, amount: plan.priceMonthly },
    { date: "1 Apr 2026", plan: plan.name, amount: plan.priceMonthly },
    { date: "1 Mar 2026", plan: "Free", amount: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Billing
        </h1>
        <p className="mt-1 text-sm text-muted">
          Your plan, usage, and invoices — all in one place.
        </p>
      </div>

      {gate && (
        <Card className="flex items-start gap-3 border-amber-300 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-800">{gate.title}</p>
            <p className="mt-0.5 text-sm text-amber-700">{gate.body}</p>
          </div>
        </Card>
      )}

      {/* Current plan + usage */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-muted">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">Current plan</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="font-display text-2xl font-semibold text-navy">
              {plan.name}
            </p>
            <Badge tone="mint">Active</Badge>
          </div>
          <p className="mt-1 text-sm text-muted">
            {plan.priceMonthly === 0 ? (
              "Free forever"
            ) : (
              <>
                <span className="font-semibold text-navy">
                  {inr(plan.priceMonthly)}
                </span>{" "}
                / month
              </>
            )}
          </p>
          <p className="mt-4 text-xs text-muted">
            Payments and cancellations are managed in Stripe. {" "}
            <span className="text-muted/80">
              (Manage in Stripe — mock; this demo has no live billing portal.)
            </span>
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-base font-semibold text-navy">
            Usage this month
          </h2>
          <div className="mt-4 space-y-5">
            <UsageMeter
              label="AI content credits"
              used={usage.aiCreditsUsed}
              limit={usage.aiCreditsLimit}
              unit="credits"
            />
            <UsageMeter
              label="Automation runs"
              used={usage.automationRunsUsed}
              limit={usage.automationRunsLimit}
              unit="runs"
            />
          </div>
        </Card>
      </div>

      {/* Plan selector */}
      <div>
        <h2 className="font-display text-lg font-semibold text-navy">
          Choose your plan
        </h2>
        <p className="mt-1 text-sm text-muted">
          Upgrade or switch any time — changes apply instantly.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p) => {
            const isCurrent = p.id === user.plan;
            const isUpgrade = p.priceMonthly > plan.priceMonthly;
            return (
              <Card
                key={p.id}
                className={`flex flex-col p-5 ${
                  p.highlight ? "ring-1 ring-teal/40" : ""
                } ${isCurrent ? "border-teal bg-mint/5" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {p.name}
                  </h3>
                  {p.highlight && !isCurrent && (
                    <Badge tone="teal">
                      <Sparkles className="h-3 w-3" /> Popular
                    </Badge>
                  )}
                  {isCurrent && <Badge tone="mint">Current</Badge>}
                </div>
                <p className="mt-2">
                  <span className="font-display text-2xl font-semibold text-navy">
                    {p.priceMonthly === 0 ? "Free" : inr(p.priceMonthly)}
                  </span>
                  {p.priceMonthly > 0 && (
                    <span className="text-sm text-muted"> /mo</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">{p.blurb}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {p.features.slice(0, 5).map((f) => (
                    <li
                      key={f.label}
                      className={`flex items-start gap-2 text-xs ${
                        f.included ? "text-navy" : "text-muted/60 line-through"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          f.included ? "text-teal" : "text-muted/40"
                        }`}
                      />
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  {isCurrent ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current plan
                    </Button>
                  ) : (
                    <form action={changePlanAction}>
                      <input type="hidden" name="plan" value={p.id} />
                      <Button
                        type="submit"
                        variant={p.highlight ? "primary" : "outline"}
                        className="w-full"
                      >
                        <Zap className="h-4 w-4" />
                        {isUpgrade ? "Upgrade" : "Switch"}
                      </Button>
                    </form>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Invoices */}
      <Card className="p-5">
        <h2 className="font-display text-base font-semibold text-navy">
          Invoices
        </h2>
        <p className="mt-1 text-xs text-muted">
          A mock of your Stripe billing history.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Plan</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {invoices.map((inv, i) => (
                <tr key={i}>
                  <td className="py-3 text-navy">{inv.date}</td>
                  <td className="py-3 text-muted">{inv.plan}</td>
                  <td className="py-3 font-medium text-navy">
                    {inv.amount === 0 ? "—" : inr(inv.amount)}
                  </td>
                  <td className="py-3">
                    <Badge tone="mint">
                      <Check className="h-3 w-3" /> Paid
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className="inline-flex cursor-not-allowed items-center gap-1 text-xs text-muted/50"
                      title="Available with live Stripe billing"
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-center text-xs text-muted">
        Need to update card details or cancel?{" "}
        <Link href="/app/billing" className="text-teal underline-offset-2 hover:underline">
          Manage in Stripe
        </Link>{" "}
        (mock).
      </p>
    </div>
  );
}
