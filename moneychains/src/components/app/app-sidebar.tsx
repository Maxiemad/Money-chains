"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Plug,
  LineChart,
  FileText,
  CreditCard,
  Trophy,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type Counts = { chains: number; connections: number; content: number };

const CATEGORIES = [
  { label: "Affiliate", color: "#a855f7" },
  { label: "Content", color: "#d8b4fe" },
  { label: "E-commerce", color: "#f59e0b" },
  { label: "Newsletter", color: "#10b981" },
];

export function AppSidebar({
  isAdmin,
  counts,
}: {
  isAdmin: boolean;
  counts?: Counts;
}) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const NAV = [
    { href: "/app", label: "My Chains", icon: Boxes, exact: true, count: counts?.chains },
    { href: "/app/templates", label: "Templates", icon: LayoutDashboard },
    { href: "/app/connections", label: "Connections", icon: Plug, count: counts?.connections },
    { href: "/app/earnings", label: "Earnings", icon: LineChart },
    { href: "/app/content", label: "Content", icon: FileText, count: counts?.content },
    { href: "/app/achievements", label: "Achievements", icon: Trophy },
    { href: "/app/billing", label: "Billing", icon: CreditCard },
    { href: "/app/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="z-40 hidden w-60 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-navy px-3 py-5 md:flex md:fixed md:inset-y-0 md:left-0">
      <div className="px-2">
        <Logo light />
      </div>

      {/* Start a chain — primary CTA */}
      <Link
        href="/app/templates"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-navy transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <Sparkles className="h-4 w-4 text-purple-600" />
        Start a chain
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-mint/15 text-mint"
                  : "text-ink/60 hover:bg-white/5 hover:text-ink"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              <span className="flex-1">{item.label}</span>
              {item.count ? (
                <span
                  className={cn(
                    "text-xs",
                    active ? "text-mint" : "text-ink/40"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname.startsWith("/admin")
                ? "bg-mint/15 text-mint"
                : "text-ink/60 hover:bg-white/5 hover:text-ink"
            )}
          >
            <Shield className="h-4.5 w-4.5" />
            Admin
          </Link>
        )}

        {/* Categories */}
        <p className="mt-6 px-3 text-[10px] font-semibold uppercase tracking-widest text-ink/30">
          Categories
        </p>
        <div className="mt-2 flex flex-col gap-0.5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              href={`/app/templates?category=${encodeURIComponent(c.label)}`}
              className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm text-ink/55 transition-colors hover:bg-white/5 hover:text-ink"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c.color }}
              />
              {c.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
