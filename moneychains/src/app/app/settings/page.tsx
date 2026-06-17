import Link from "next/link";
import {
  Bell,
  Download,
  Lock,
  ShieldCheck,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { Card, Badge, Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/services/auth";
import { connectionsFor } from "@/lib/store";
import {
  updateProfileAction,
  deleteAccountAction,
  exportDataAction,
} from "@/lib/settings-actions";

const NOTIFICATIONS = [
  {
    name: "product_emails",
    label: "Product emails",
    desc: "New chains, features, and tips.",
    on: true,
  },
  {
    name: "earning_alerts",
    label: "Earning alerts",
    desc: "Ping me whenever a chain earns ₹.",
    on: true,
  },
  {
    name: "weekly_summary",
    label: "Weekly summary",
    desc: "A Monday digest of last week's progress.",
    on: false,
  },
];

export default async function SettingsPage() {
  const user = await currentUser();
  const connections = connectionsFor(user.id);
  const connectedCount = connections.filter(
    (c) => c.status === "connected"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage your profile, notifications, security, and data.
        </p>
      </div>

      {/* Profile */}
      <Card className="p-5">
        <div className="flex items-center gap-2 text-muted">
          <UserIcon className="h-4 w-4" />
          <h2 className="font-display text-base font-semibold text-navy">
            Profile
          </h2>
        </div>
        <form action={updateProfileAction} className="mt-4 max-w-md space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">
              Name
            </label>
            <Input name="name" defaultValue={user.name} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">
              Email
            </label>
            <Input
              value={user.email}
              readOnly
              disabled
              className="cursor-not-allowed bg-cloud text-muted"
            />
            <p className="mt-1 text-xs text-muted">
              Your login email can't be changed here.
            </p>
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </Card>

      {/* Notifications */}
      <Card className="p-5">
        <div className="flex items-center gap-2 text-muted">
          <Bell className="h-4 w-4" />
          <h2 className="font-display text-base font-semibold text-navy">
            Notifications
          </h2>
        </div>
        <div className="mt-4 divide-y divide-line">
          {NOTIFICATIONS.map((n) => (
            <label
              key={n.name}
              className="flex cursor-pointer items-center justify-between gap-4 py-3.5"
            >
              <div>
                <p className="text-sm font-medium text-navy">{n.label}</p>
                <p className="text-xs text-muted">{n.desc}</p>
              </div>
              {/* Visual toggle — defaults reflect a typical setup. */}
              <input
                type="checkbox"
                name={n.name}
                defaultChecked={n.on}
                className="peer sr-only"
              />
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-cloud transition-colors peer-checked:bg-teal">
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
              </span>
            </label>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-5">
        <div className="flex items-center gap-2 text-muted">
          <Lock className="h-4 w-4" />
          <h2 className="font-display text-base font-semibold text-navy">
            Security
          </h2>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
            <span className="text-sm text-muted">Login email</span>
            <span className="text-sm font-medium text-navy">{user.email}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted">Connected accounts</span>
            <div className="flex items-center gap-3">
              <Badge tone="neutral">{connectedCount} connected</Badge>
              <Link
                href="/app/connections"
                className="text-sm text-teal underline-offset-2 hover:underline"
              >
                Manage
              </Link>
            </div>
          </div>
          <p className="flex items-start gap-2 rounded-xl bg-cloud px-3 py-2.5 text-xs text-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            We never store third-party passwords — OAuth tokens only.
          </p>
        </div>
      </Card>

      {/* Data & privacy */}
      <Card className="p-5">
        <div className="flex items-center gap-2 text-muted">
          <ShieldCheck className="h-4 w-4" />
          <h2 className="font-display text-base font-semibold text-navy">
            Data &amp; privacy
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted">
          Your rights under GDPR and India's DPDP Act.
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-sm font-medium text-navy">Export my data</p>
            <p className="text-xs text-muted">
              We'll email you a JSON export of your account.
            </p>
          </div>
          <form action={exportDataAction}>
            <Button type="submit" variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
          </form>
        </div>

        {/* Danger zone */}
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-red-600" />
            <p className="text-sm font-semibold text-red-700">Delete account</p>
          </div>
          <p className="mt-1.5 text-xs text-red-700/90">
            This permanently erases your account, chains, connections, content,
            and earnings. This cannot be undone — it fulfils your right to
            erasure.
          </p>
          <form action={deleteAccountAction} className="mt-3">
            <Button
              type="submit"
              className="bg-red-600 text-white hover:bg-red-700 shadow-none"
            >
              <Trash2 className="h-4 w-4" /> Delete my account
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
