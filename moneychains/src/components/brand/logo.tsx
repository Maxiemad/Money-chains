import Link from "next/link";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** The MoneyChains mark — one glyph used everywhere (landing, app, auth). */
export function LogoGlyph({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-teal to-mint text-navy",
        className
      )}
    >
      <Link2 className="h-[55%] w-[55%]" strokeWidth={2.5} />
    </span>
  );
}

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
      <LogoGlyph className="h-8 w-8" />
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
