import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Rocket,
  IndianRupee,
  TrendingDown,
  Database,
  ArrowLeft,
  Layers,
} from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/services/auth";
import { getDb } from "@/lib/store";
import { TEMPLATES } from "@/data/templates";
import { enterAdminDemoAction } from "@/lib/admin-actions";
import { inr, timeAgo } from "@/lib/utils";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function TopBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-mint">
            <ShieldAlert className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold text-navy">
            MoneyChains <span className="text-muted">Admin</span>
          </span>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Back to app
        </Link>
      </div>
    </header>
  );
}

export default async function AdminPage() {
  const user = await currentUser();

  /* ------------------------------- gate ------------------------------- */
  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col bg-cloud">
        <TopBar />
        <main className="flex flex-1 items-center justify-center px-5 py-16">
          <Card className="max-w-md p-8 text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-semibold text-navy">
              Admins only
            </h1>
            <p className="mt-2 text-sm text-muted">
              This is the MoneyChains internal console. Your account
              (<span className="font-medium text-navy">{user.email}</span>) is a{" "}
              <Badge tone="neutral">{user.role}</Badge>, so you don&apos;t have
              access. For the demo, you can step in as the admin user.
            </p>
            <form action={enterAdminDemoAction} className="mt-6">
              <Button type="submit" className="w-full">
                Enter admin demo
              </Button>
            </form>
          </Card>
        </main>
      </div>
    );
  }

  /* ----------------------------- metrics ----------------------------- */
  const db = await getDb();
  const totalUsers = db.users.length;

  const userIdsWithChain = new Set(db.userChains.map((c) => c.userId));
  const userIdsWithEarning = new Set(db.earnings.map((e) => e.userId));

  const activationPct = totalUsers
    ? Math.round((userIdsWithChain.size / totalUsers) * 100)
    : 0;
  const firstRupeePct = totalUsers
    ? Math.round((userIdsWithEarning.size / totalUsers) * 100)
    : 0;
  const totalRevenue = db.earnings.reduce((s, e) => s + e.amount, 0);

  const metrics = [
    {
      label: "Total signups",
      value: totalUsers.toLocaleString("en-IN"),
      sub: `${userIdsWithChain.size} activated`,
      icon: Users,
    },
    {
      label: "Activation",
      value: `${activationPct}%`,
      sub: "started ≥1 chain",
      icon: Rocket,
    },
    {
      label: "Reached first ₹",
      value: `${firstRupeePct}%`,
      sub: `${userIdsWithEarning.size} earning users`,
      icon: IndianRupee,
    },
    {
      label: "Revenue tracked",
      value: inr(totalRevenue),
      sub: `${db.earnings.length} sales attributed`,
      icon: TrendingDown,
      glow: true,
    },
  ];

  /* ----------------- chain performance (the data moat) ----------------- */
  const chainById = new Map(db.userChains.map((c) => [c.id, c]));
  const perfByTemplate = new Map<
    string,
    { earnings: number; userIds: Set<string> }
  >();

  for (const t of TEMPLATES) {
    perfByTemplate.set(t.id, { earnings: 0, userIds: new Set() });
  }
  // # users who started each template
  for (const uc of db.userChains) {
    perfByTemplate.get(uc.templateId)?.userIds.add(uc.userId);
  }
  // earnings joined through userChain → templateId
  for (const e of db.earnings) {
    if (!e.userChainId) continue;
    const uc = chainById.get(e.userChainId);
    if (!uc) continue;
    const row = perfByTemplate.get(uc.templateId);
    if (row) row.earnings += e.amount;
  }

  const chainPerf = TEMPLATES.map((t) => {
    const row = perfByTemplate.get(t.id)!;
    return {
      template: t,
      users: row.userIds.size,
      earnings: row.earnings,
    };
  }).sort((a, b) => b.earnings - a.earnings);

  // # chains per user, for the users table
  const chainsByUser = new Map<string, number>();
  for (const uc of db.userChains) {
    chainsByUser.set(uc.userId, (chainsByUser.get(uc.userId) ?? 0) + 1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-cloud">
      <TopBar />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">
            Internal console
          </h1>
          <p className="mt-1 text-sm text-muted">
            Live operating metrics from the data store. Visible to admins only.
          </p>
        </div>

        {/* metrics row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label} className={`p-5 ${m.glow ? "glow-mint" : ""}`}>
              <div className="flex items-center gap-2 text-muted">
                <m.icon className="h-4 w-4" />
                <span className="text-sm">{m.label}</span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold text-navy">
                {m.value}
              </p>
              <p className="mt-0.5 text-xs text-muted">{m.sub}</p>
            </Card>
          ))}
          <Card className="p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-muted">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm">Monthly churn</span>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-navy">
              —
            </p>
            <p className="mt-0.5 text-xs text-muted">
              wiring billing webhooks
            </p>
          </Card>
        </div>

        {/* chain performance — the data moat */}
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Database className="h-4.5 w-4.5 text-teal" />
              <h2 className="font-display text-base font-semibold text-navy">
                Chain performance
              </h2>
              <Badge tone="teal">the data moat</Badge>
            </div>
            <p className="text-xs text-muted">
              Which chains actually make people money — our key proprietary data
              asset.
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4 font-medium">Chain</th>
                  <th className="py-2 pr-4 font-medium">Category</th>
                  <th className="py-2 pr-4 text-right font-medium">Users</th>
                  <th className="py-2 pl-4 text-right font-medium">
                    Total earned
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {chainPerf.map(({ template, users, earnings }) => (
                  <tr key={template.id}>
                    <td className="py-3 pr-4">
                      <span className="font-medium text-navy">
                        {template.name}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge tone="neutral">{template.category}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums text-navy">
                      {users}
                    </td>
                    <td className="py-3 pl-4 text-right font-semibold tabular-nums text-teal">
                      {inr(earnings)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* users */}
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-teal" />
              <h2 className="font-display text-base font-semibold text-navy">
                Users
              </h2>
              <Badge tone="neutral">{totalUsers}</Badge>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4 font-medium">User</th>
                    <th className="py-2 pr-4 font-medium">Role</th>
                    <th className="py-2 pr-4 font-medium">Plan</th>
                    <th className="py-2 pr-4 text-right font-medium">XP</th>
                    <th className="py-2 pr-4 text-right font-medium">Chains</th>
                    <th className="py-2 pl-4 text-right font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {db.users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: u.avatarColor }}
                          >
                            {u.name.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-navy">
                              {u.name}
                            </p>
                            <p className="truncate text-xs text-muted">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge tone={u.role === "admin" ? "teal" : "neutral"}>
                          {u.role}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 capitalize text-navy">
                        {u.plan}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums text-navy">
                        {u.xp.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums text-navy">
                        {chainsByUser.get(u.id) ?? 0}
                      </td>
                      <td className="py-3 pl-4 text-right text-xs text-muted">
                        {timeAgo(u.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* templates */}
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-teal" />
              <h2 className="font-display text-base font-semibold text-navy">
                Manage templates
              </h2>
              <Badge tone="neutral">{TEMPLATES.length}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted">
              Read-only view. Templates are data-driven — full CRUD would edit
              the <code className="text-navy">chain_templates</code> store.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4 font-medium">Template</th>
                    <th className="py-2 pr-4 font-medium">Category</th>
                    <th className="py-2 pr-4 font-medium">Difficulty</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pl-4 text-right font-medium">Steps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {TEMPLATES.map((t) => (
                    <tr key={t.id}>
                      <td className="py-3 pr-4 font-medium text-navy">
                        {t.name}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge tone="neutral">{t.category}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-navy">{t.difficulty}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={t.proven ? "mint" : "amber"}>
                          {t.proven ? "proven" : "experimental"}
                        </Badge>
                      </td>
                      <td className="py-3 pl-4 text-right tabular-nums text-navy">
                        {t.steps.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
