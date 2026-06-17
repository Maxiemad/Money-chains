"use client";

import * as React from "react";
import { Check, X, Minus, Sparkles } from "lucide-react";
import type { PlanTier } from "@/lib/types";
import { ButtonLink } from "@/components/ui/button";
import { Card, Badge } from "@/components/ui/primitives";
import { inr, cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

/** Render a feature/limit value as an icon (boolean) or text (string/number). */
function CellValue({ value }: { value: boolean | string | number }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <Check className="h-[18px] w-[18px] text-teal" aria-label="Included" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center">
        <X className="h-[18px] w-[18px] text-muted/40" aria-label="Not included" />
      </span>
    );
  }
  return <span className="text-sm font-medium text-navy">{value}</span>;
}

/** A single inline feature row inside a plan card. */
function FeatureLine({
  included,
  label,
}: {
  included: boolean | string;
  label: string;
}) {
  return (
    <li className="flex items-start gap-2.5">
      {included === false ? (
        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted/40" />
      ) : (
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
      )}
      <span
        className={cn(
          "text-sm leading-snug",
          included === false ? "text-muted/60" : "text-navy"
        )}
      >
        {label}
        {typeof included === "string" && included !== "Yes" ? (
          <span className="text-muted"> — {included}</span>
        ) : null}
      </span>
    </li>
  );
}

const LIMIT_ROWS: {
  label: string;
  get: (p: PlanTier) => boolean | string | number;
}[] = [
  { label: "Active money chains", get: (p) => p.limits.activeChains },
  {
    label: "AI content credits / mo",
    get: (p) =>
      typeof p.limits.aiCredits === "number"
        ? p.limits.aiCredits.toLocaleString("en-IN")
        : p.limits.aiCredits,
  },
  {
    label: "Automated publishing runs / mo",
    get: (p) =>
      p.limits.automationRuns === 0
        ? false
        : typeof p.limits.automationRuns === "number"
          ? p.limits.automationRuns.toLocaleString("en-IN")
          : p.limits.automationRuns,
  },
  { label: "Multi-account", get: (p) => p.limits.multiAccount },
  { label: "White-label reports", get: (p) => p.limits.whiteLabel },
];

export function PricingTable({ plans }: { plans: PlanTier[] }) {
  const [billing, setBilling] = React.useState<Billing>("monthly");
  const annual = billing === "annual";

  const priceOf = (p: PlanTier) => (annual ? p.priceAnnual : p.priceMonthly);

  /** Union of every distinct feature label, in first-seen order, for the table. */
  const featureRows = React.useMemo(() => {
    const seen = new Map<string, true>();
    for (const p of plans) {
      for (const f of p.features) {
        if (!seen.has(f.label)) seen.set(f.label, true);
      }
    }
    return [...seen.keys()];
  }, [plans]);

  const featureFor = (p: PlanTier, label: string) =>
    p.features.find((f) => f.label === label)?.included ?? false;

  return (
    <div>
      {/* ----------------------------- BILLING TOGGLE ---------------------------- */}
      <div className="flex flex-col items-center gap-3">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full border border-line bg-white p-1 shadow-sm"
        >
          <button
            role="tab"
            aria-selected={!annual}
            onClick={() => setBilling("monthly")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              !annual ? "bg-navy text-ink" : "text-muted hover:text-navy"
            )}
          >
            Monthly
          </button>
          <button
            role="tab"
            aria-selected={annual}
            onClick={() => setBilling("annual")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
              annual ? "bg-navy text-ink" : "text-muted hover:text-navy"
            )}
          >
            Annual
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                annual ? "bg-mint text-navy" : "bg-mint/15 text-teal"
              )}
            >
              Save ~20%
            </span>
          </button>
        </div>
        <p className="text-xs text-muted">
          {annual
            ? "Billed annually. Prices shown per month."
            : "Billed monthly. Switch to annual to save ~20%."}
        </p>
      </div>

      {/* ------------------------------ PLAN CARDS ------------------------------- */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => {
          const price = priceOf(p);
          const free = price === 0;
          return (
            <Card
              key={p.id}
              className={cn(
                "relative flex flex-col p-6",
                p.highlight && "ring-2 ring-mint"
              )}
            >
              {p.highlight && (
                <Badge
                  tone="mint"
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-sm"
                >
                  <Sparkles className="h-3 w-3" /> Most popular
                </Badge>
              )}
              <h3 className="font-display text-lg font-semibold text-navy">
                {p.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-navy">
                  {free ? "₹0" : inr(price)}
                </span>
                <span className="text-sm text-muted">/mo</span>
              </div>
              <p className="mt-1 h-4 text-xs text-muted">
                {annual && !free ? (
                  <>
                    billed {inr(price * 12)} / year
                  </>
                ) : null}
              </p>

              <p className="mt-3 min-h-[40px] text-sm leading-relaxed text-muted">
                {p.blurb}
              </p>

              <ButtonLink
                href="/signup"
                variant={p.highlight ? "primary" : "outline"}
                size="md"
                className="mt-5 w-full"
              >
                {free ? "Start free" : `Choose ${p.name}`}
              </ButtonLink>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {p.features.map((f) => (
                  <FeatureLine
                    key={f.label}
                    included={f.included}
                    label={f.label}
                  />
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        All plans start free to try. No card required.{" "}
        <span className="text-navy">Cancel anytime.</span>
      </p>

      {/* --------------------------- COMPARISON TABLE ---------------------------- */}
      <div className="mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Full comparison
          </p>
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Every feature, side by side
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {annual
              ? "Annual pricing shown — billed yearly, per-month rate."
              : "Monthly pricing shown."}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-[14px] border border-line shadow-[0_6px_24px_-12px_rgba(14,26,56,0.15)]">
          <table className="w-full min-w-[760px] border-collapse bg-white text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="sticky left-0 z-10 bg-white px-5 py-5 align-bottom">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Plan
                  </span>
                </th>
                {plans.map((p) => {
                  const price = priceOf(p);
                  return (
                    <th
                      key={p.id}
                      className={cn(
                        "px-4 py-4 align-bottom",
                        p.highlight && "bg-mint/[0.06]"
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-display text-base font-semibold text-navy">
                          {p.name}
                        </span>
                        {p.highlight && (
                          <Badge tone="mint" className="px-1.5 py-0">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-display text-xl font-semibold text-navy">
                          {price === 0 ? "₹0" : inr(price)}
                        </span>
                        <span className="text-xs text-muted">/mo</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Limit rows */}
              <tr>
                <td
                  colSpan={plans.length + 1}
                  className="bg-cloud px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  Limits
                </td>
              </tr>
              {LIMIT_ROWS.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-5 py-3.5 text-left text-sm font-normal text-navy"
                  >
                    {row.label}
                  </th>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "px-4 py-3.5 text-center",
                        p.highlight && "bg-mint/[0.06]"
                      )}
                    >
                      <CellValue value={row.get(p)} />
                    </td>
                  ))}
                </tr>
              ))}

              {/* Feature rows */}
              <tr>
                <td
                  colSpan={plans.length + 1}
                  className="bg-cloud px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  Features
                </td>
              </tr>
              {featureRows.map((label) => (
                <tr key={label} className="border-t border-line">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-5 py-3.5 text-left text-sm font-normal text-navy"
                  >
                    {label}
                  </th>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "px-4 py-3.5 text-center",
                        p.highlight && "bg-mint/[0.06]"
                      )}
                    >
                      <CellValue value={featureFor(p, label)} />
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-line">
                <td className="sticky left-0 z-10 bg-white px-5 py-5" />
                {plans.map((p) => (
                  <td
                    key={p.id}
                    className={cn(
                      "px-4 py-5 text-center align-top",
                      p.highlight && "bg-mint/[0.06]"
                    )}
                  >
                    <ButtonLink
                      href="/signup"
                      variant={p.highlight ? "primary" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {priceOf(p) === 0 ? "Start free" : "Choose"}
                    </ButtonLink>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
