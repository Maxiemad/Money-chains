import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The MoneyChains mark — a neon "open doorway / portal" (magenta→blue gradient).
 * Transparent background so it works on dark and light surfaces. One glyph used
 * everywhere (landing, app, auth, favicon).
 */
export function LogoGlyph({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 52"
      className={className}
      fill="none"
      role="img"
      aria-label="MoneyChains"
    >
      <defs>
        <linearGradient
          id="mcLogoGrad"
          x1="2"
          y1="6"
          x2="38"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d022f0" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      {/* rounded arch — open at the bottom (the portal) */}
      <path
        d="M7 50 L7 13 A6 6 0 0 1 13 7 L27 7 A6 6 0 0 1 33 13 L33 50"
        stroke="url(#mcLogoGrad)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* the open door panel inside */}
      <path
        d="M20 15 L27.5 19 L27.5 45 L20 47 Z"
        fill="url(#mcLogoGrad)"
      />
    </svg>
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
      <LogoGlyph className="h-7 w-auto" />
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
