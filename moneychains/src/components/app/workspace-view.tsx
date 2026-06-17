"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Send,
  BarChart3,
  Link2,
  Share2,
  MoreHorizontal,
  ArrowRight,
  Boxes,
} from "lucide-react";
import { PlatformIcon } from "@/components/brand/platform-icon";
import { inr } from "@/lib/utils";

export interface WorkspaceChain {
  id: string;
  name: string;
  flow: string[];
  status: string;
  category?: string;
  niche?: string;
  done: number;
  total: number;
  earned: number;
  sales: number;
  nextStepTitle?: string;
  nextStepDesc?: string;
  steps: { title: string; state: string }[];
  updatedLabel: string;
}

export function WorkspaceView({
  chains,
  firstName,
}: {
  chains: WorkspaceChain[];
  firstName: string;
}) {
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
  const pct = Math.round((selected.done / selected.total) * 100);

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(300px,380px)_1fr]">
      {/* ---------------- list pane ---------------- */}
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
            const inProgress = c.done < c.total;
            const subject =
              c.earned > 0
                ? `${inr(c.earned)} earned${c.sales ? ` · ${c.sales} sales` : ""}`
                : c.status === "active"
                  ? "In progress"
                  : c.status;
            const preview = c.nextStepTitle
              ? `Next: ${c.nextStepTitle}`
              : `${c.done}/${c.total} steps done`;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`block w-full border-b border-line px-4 py-3.5 text-left transition-colors ${
                  isActive ? "bg-mint/10" : "hover:bg-cloud"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    {inProgress && (
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
                <p className="mt-1 truncate text-[13px] text-navy">
                  {subject}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted">{preview}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------- reader pane ---------------- */}
      <div className="flex min-h-0 flex-col">
        {/* toolbar */}
        <div className="flex h-12 items-center justify-between border-b border-line px-4">
          <div className="flex items-center gap-1 text-muted">
            {[Sparkles, Send, BarChart3, Link2].map((Icon, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-cloud"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-muted">
            <span className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-cloud">
              <Share2 className="h-4 w-4" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-cloud">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            {selected.name}
          </h2>

          {/* active chain row */}
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6] text-sm font-semibold text-white">
              {selected.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-navy">Your active chain</p>
              <p className="text-xs text-muted">
                {selected.updatedLabel} · {selected.done} of {selected.total}{" "}
                steps done
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-[11px] capitalize text-muted">
              {selected.category ?? selected.status}
            </span>
          </div>

          {/* progress */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-cloud">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal to-mint"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Summary by MoneyChains */}
          <div className="mt-6 rounded-xl border border-line p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <Sparkles className="h-4 w-4 text-mint" />
              Summary by MoneyChains
            </div>
            <p className="mt-2 text-sm leading-relaxed text-navy">
              You&apos;ve completed {selected.done} of {selected.total} steps
              {selected.earned > 0
                ? ` and earned ${inr(selected.earned)} from ${selected.sales} sales`
                : ""}
              .{" "}
              {selected.nextStepTitle
                ? `Next step: ${selected.nextStepTitle}. Your earning trend is climbing — no action needed beyond today's step.`
                : "This chain is complete — beautifully done."}
            </p>
          </div>

          {/* letter body */}
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-navy">
            <p>Hi {firstName},</p>
            <p>
              Here&apos;s where your {selected.name} chain stands.{" "}
              {selected.earned > 0
                ? "This was a strong week — your content is converting."
                : "You're set up — the next step kicks things off."}
            </p>
            {selected.earned > 0 && (
              <p>
                {selected.sales} affiliate sale
                {selected.sales === 1 ? "" : "s"} came through (
                {inr(selected.earned)} tracked), and every link is attributed
                with a UTM tag back to the source that drove it. Momentum is
                building.
              </p>
            )}
            {selected.nextStepTitle && (
              <p>
                Your next move: {selected.nextStepTitle.toLowerCase()} so we can
                keep the chain moving automatically.
              </p>
            )}
            <p className="text-muted">— The MoneyChains engine</p>
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
