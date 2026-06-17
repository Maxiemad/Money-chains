import { Flame, Zap } from "lucide-react";
import { logoutAction } from "@/lib/actions";
import type { User, UsageRecord } from "@/lib/types";
import { Badge } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/app/theme-provider";

export function AppTopbar({
  user,
  usage,
}: {
  user: User;
  usage: UsageRecord;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white/90 px-5 backdrop-blur">
      <div>
        <p className="text-sm text-muted">Welcome back,</p>
        <p className="-mt-0.5 font-display text-lg font-semibold text-navy">
          {user.name.split(" ")[0]}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge tone="amber" className="hidden sm:inline-flex">
          <Flame className="h-3.5 w-3.5" /> {user.streak}-day streak
        </Badge>
        <Badge tone="teal" className="hidden sm:inline-flex">
          <Zap className="h-3.5 w-3.5" /> {usage.aiCreditsLimit - usage.aiCreditsUsed} credits
        </Badge>
        <span className="hidden text-xs font-medium uppercase tracking-wide text-muted sm:inline">
          {user.plan} plan
        </span>
        <ThemeToggle />
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-navy"
          style={{ background: user.avatarColor }}
        >
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </span>
        <form action={logoutAction}>
          <button className="text-sm font-medium text-muted hover:text-navy">
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
