"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  Boxes,
} from "lucide-react";
import { PlatformIcon } from "@/components/brand/platform-icon";
import { inr } from "@/lib/utils";

export interface WorkspaceChain {
  id: string;
  name: string;
  flow: string[];
  status: string;
  niche?: string;
  done: number;
  total: number;
  earned: number;
  nextStepTitle?: string;
  nextStepDesc?: string;
  steps: { title: string; state: string }[];
  updatedLabel: string;
}

export function WorkspaceView({ chains }: { chains: WorkspaceChain[] }) {
  const [selectedId, setSelectedId] = useState(chains[0]?.id ?? "");
  const [query, setQuery] = useState("");

  if (chains.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-line bg-white p-10 text-center">
        <Boxes className="h-10 w-10 text-muted" />
        <p className="mt-3 font-display text-lg font-semibold text-navy">
          No chains yet
        </p>
        <p className="mt-1 max-w-sm text-sm text-muted">
          Pick a proven template and earn your first rupee — guided step by step.
        </p>
        <Link
          href="/app/templates"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-navy hover:brightness-95"
        >
          Browse templates <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const filtered = chains.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  const selected = chains.find((c) => c.id === selectedId) ?? chains[0];

  return (
    <div className="grid h-[calc(100vh-9rem)] grid-cols-1 overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(280px,360px)_1fr]">
      {/* ---- list pane ---- */}
      <div className="flex min-h-0 flex-col border-line md:border-r">
        <div className="flex h-12 items-center gap-2 border-b border-line px-4 text-muted">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chains"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {filtered.map((c) => {
            const isActive = c.id === selected.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`block w-full border-b border-line px-4 py-3 text-left transition-colors ${
                  isActive ? "bg-mint/10" : "hover:bg-cloud"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 truncate">
                    {c.done < c.total && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-mint" />
                    )}
                    <span className="truncate text-sm font-semibold text-navy">
                      {c.name}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11px] text-muted">
                    {c.updatedLabel}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-navy/80">
                  {c.earned > 0
                    ? `${inr(c.earned)} earned`
                    : c.status === "active"
                      ? "In progress"
                      : c.status}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted">
                  {c.nextStepTitle
                    ? `Next: ${c.nextStepTitle}`
                    : `${c.done}/${c.total} steps done`}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- reader pane ---- */}
      <div className="flex min-h-0 flex-col">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-navy md:text-2xl">
              {selected.name}
            </h2>
            <span className="rounded-full border border-line px-2.5 py-1 text-[11px] capitalize text-muted">
              {selected.status}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {selected.flow.map((p) => (
                <PlatformIcon key={p} platformId={p} size={28} />
              ))}
            </div>
            <p className="text-xs text-muted">
              {selected.niche ? `Niche: ${selected.niche}` : "Niche not set"} ·{" "}
              {selected.done} of {selected.total} steps done
            </p>
          </div>

          {/* progress */}
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-cloud">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-mint"
                style={{
                  width: `${Math.round((selected.done / selected.total) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Summary by MoneyChains */}
          <div className="mt-5 rounded-xl border border-line bg-cloud/60 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <Sparkles className="h-4 w-4 text-mint" />
              Summary by MoneyChains
            </div>
            <p className="mt-2 text-sm leading-relaxed text-navy/80">
              You&apos;ve completed {selected.done} of {selected.total} steps
              {selected.earned > 0
                ? ` and earned ${inr(selected.earned)} so far`
                : ""}
              .{" "}
              {selected.nextStepTitle
                ? `Next step: ${selected.nextStepTitle}. ${selected.nextStepDesc ?? ""}`
                : "This chain is complete — nice work."}
            </p>
          </div>

          {/* steps checklist */}
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Steps
            </p>
            <div className="mt-2 space-y-1.5">
              {selected.steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm"
                >
                  {s.state === "done" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-mint" />
                  ) : (
                    <Circle
                      className={`h-4 w-4 shrink-0 ${s.state === "active" ? "text-teal" : "text-muted"}`}
                    />
                  )}
                  <span
                    className={
                      s.state === "done"
                        ? "text-muted line-through"
                        : "text-navy"
                    }
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/app/chains/${selected.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-navy hover:brightness-95"
            >
              Open chain <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
