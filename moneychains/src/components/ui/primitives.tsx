import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-line bg-white shadow-[0_6px_24px_-12px_rgba(14,26,56,0.15)]",
        className
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "mint" | "teal" | "navy" | "amber";
}) {
  const tones = {
    neutral: "bg-cloud text-muted",
    mint: "bg-mint/15 text-teal",
    teal: "bg-teal/10 text-teal",
    navy: "bg-navy text-ink",
    amber: "bg-amber-100 text-amber-700",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-navy outline-none placeholder:text-muted/70 focus:border-teal focus:ring-2 focus:ring-mint/30",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm leading-relaxed text-navy outline-none placeholder:text-muted/70 focus:border-teal focus:ring-2 focus:ring-mint/30",
        className
      )}
      {...props}
    />
  );
}

/** Icon inside a colored circle — a recurring motif in the design system. */
export function IconCircle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  light,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.18em]",
            light ? "text-mint" : "text-teal"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold sm:text-4xl",
          light ? "text-ink" : "text-navy"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-ink/70" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
