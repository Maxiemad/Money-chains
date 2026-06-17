import Link from "next/link";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  light = false,
  className,
}: {
  href?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 font-display", className)}
      aria-label="MoneyChains home"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal to-mint text-navy">
        <Link2 className="h-4.5 w-4.5" strokeWidth={2.5} />
      </span>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          light ? "text-ink" : "text-navy"
        )}
      >
        Money<span className="text-teal">Chains</span>
      </span>
    </Link>
  );
}
