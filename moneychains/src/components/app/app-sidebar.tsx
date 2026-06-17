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
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/app/templates", label: "Templates", icon: Boxes },
  { href: "/app/connections", label: "Connections", icon: Plug },
  { href: "/app/earnings", label: "Earnings", icon: LineChart },
  { href: "/app/content", label: "Content", icon: FileText },
  { href: "/app/achievements", label: "Achievements", icon: Trophy },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="z-40 hidden w-60 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-navy px-3 py-5 md:flex md:fixed md:inset-y-0 md:left-0">
      <div className="px-2">
        <Logo light />
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
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
              {item.label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname.startsWith("/admin")
                ? "bg-mint/15 text-mint"
                : "text-ink/60 hover:bg-white/5 hover:text-ink"
            )}
          >
            <Shield className="h-4.5 w-4.5" />
            Admin
          </Link>
        )}
      </nav>
    </aside>
  );
}
