import { TrendingUp, MousePointerClick, ShoppingBag, Plus } from "lucide-react";
import { Card, Badge, Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { EarningsArea, EarningsByBar } from "@/components/app/earnings-charts";
import { currentUser } from "@/services/auth";
import { earningsFor, userChainsFor } from "@/lib/store";
import { getTemplate } from "@/data/templates";
import { getPlatform } from "@/data/platforms";
import { addEarningAction } from "@/lib/actions";
import { inr, timeAgo } from "@/lib/utils";

export default async function EarningsPage() {
  const user = await currentUser();
  const earnings = earningsFor(user.id);
  const chains = userChainsFor(user.id);

  const total = earnings.reduce((s, e) => s + e.amount, 0);

  // Cumulative area series.
  let running = 0;
  const series = earnings.map((e) => {
    running += e.amount;
    return {
      date: new Date(e.occurredAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      total: running,
    };
  });

  // By platform.
  const byPlatform = new Map<string, number>();
  for (const e of earnings) {
    const name = getPlatform(e.platformId ?? "")?.name.split(" ")[0] ?? "Other";
    byPlatform.set(name, (byPlatform.get(name) ?? 0) + e.amount);
  }
  const barData = [...byPlatform.entries()].map(([name, amount]) => ({
    name,
    amount,
  }));

  // Funnel-ish summary (illustrative attribution).
  const clicks = 1240;
  const sales = earnings.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Earnings
        </h1>
        <p className="mt-1 text-sm text-muted">
          Every rupee, attributed to the chain and platform that earned it.
        </p>
      </div>

      {/* funnel */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Link clicks", value: clicks.toLocaleString("en-IN"), icon: MousePointerClick },
          { label: "Sales", value: String(sales), icon: ShoppingBag },
          { label: "Total earned", value: inr(total), icon: TrendingUp, glow: true },
        ].map((s) => (
          <Card key={s.label} className={`p-5 ${s.glow ? "glow-mint" : ""}`}>
            <div className="flex items-center gap-2 text-muted">
              <s.icon className="h-4 w-4" />
              <span className="text-sm">{s.label}</span>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-navy">
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="p-5">
          <h2 className="font-display text-base font-semibold text-navy">
            Earnings over time
          </h2>
          {series.length ? (
            <div className="mt-3">
              <EarningsArea data={series} />
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">No earnings logged yet.</p>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-base font-semibold text-navy">
            By platform
          </h2>
          {barData.length ? (
            <div className="mt-3">
              <EarningsByBar data={barData} />
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">Nothing to show yet.</p>
          )}
        </Card>
      </div>

      {/* manual log + table */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card className="h-fit p-5">
          <h2 className="font-display text-base font-semibold text-navy">
            Log a sale manually
          </h2>
          <p className="mt-1 text-xs text-muted">
            For platforms without an API, or sales the API hasn't synced yet.
          </p>
          <form action={addEarningAction} className="mt-4 space-y-3">
            <Input name="amount" type="number" placeholder="Amount (₹)" min={1} required />
            <Input name="note" placeholder="What sold? (optional)" />
            <select
              name="userChainId"
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-navy outline-none focus:border-teal"
            >
              <option value="">No specific chain</option>
              {chains.map((c) => (
                <option key={c.id} value={c.id}>
                  {getTemplate(c.templateId)?.name}
                </option>
              ))}
            </select>
            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4" /> Add earning
            </Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-base font-semibold text-navy">
            Recent earnings
          </h2>
          <div className="mt-3 divide-y divide-line">
            {[...earnings].reverse().slice(0, 10).map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">
                    {e.note ?? "Earning"}
                  </p>
                  <p className="text-xs text-muted">
                    {getPlatform(e.platformId ?? "")?.name ?? "—"} ·{" "}
                    {timeAgo(e.occurredAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={e.source === "manual" ? "neutral" : "mint"}>
                    {e.source}
                  </Badge>
                  <span className="font-semibold text-teal">
                    {inr(e.amount)}
                  </span>
                </div>
              </div>
            ))}
            {earnings.length === 0 && (
              <p className="py-6 text-sm text-muted">No earnings yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
