"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check,
  Lock,
  Circle,
  Sparkles,
  Plug,
  Link2,
  Send,
  LineChart,
  PartyPopper,
  Loader2,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Card, Badge, Input, Textarea } from "@/components/ui/primitives";
import { Button, ButtonLink } from "@/components/ui/button";
import { ChainFlow } from "@/components/brand/chain-flow";
import { PlatformIcon } from "@/components/brand/platform-icon";
import { getPlatform } from "@/data/platforms";
import {
  completeStepAction,
  generateContentAction,
  approveContentAction,
  setNicheAction,
  connectAction,
} from "@/lib/actions";
import type {
  ChainTemplate,
  UserChain,
  GeneratedContent,
  ConnectionStatus,
} from "@/lib/types";

type Conn = { platformId: string; status: ConnectionStatus; label?: string };

export function Workspace({
  template,
  chain,
  connections,
  content,
}: {
  template: ChainTemplate;
  chain: UserChain;
  connections: Conn[];
  content: GeneratedContent[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const activeStepId =
    chain.steps.find((s) => s.state === "active")?.stepId ??
    chain.steps[chain.steps.length - 1].stepId;
  const [selectedId, setSelectedId] = useState(activeStepId);

  const stepDef = template.steps.find((s) => s.id === selectedId)!;
  const stepState = chain.steps.find((s) => s.stepId === selectedId)!;
  const stepContent = content.find((c) => c.stepId === selectedId);

  const doneCount = chain.steps.filter((s) => s.state === "done").length;
  const pct = Math.round((doneCount / chain.steps.length) * 100);
  const completed = chain.status === "completed";

  const run = (fn: () => Promise<unknown>) =>
    startTransition(async () => {
      await fn();
      router.refresh();
    });

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <Link
            href="/app"
            className="text-xs text-muted hover:text-navy"
          >
            ← Dashboard
          </Link>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy">
            {template.name}
          </h1>
          <div className="mt-2">
            <ChainFlow flow={template.flow} size={26} />
          </div>
        </div>
        <Card className="px-5 py-4">
          <p className="text-xs text-muted">Progress to first earning</p>
          <p className="font-display text-2xl font-semibold text-teal">
            {pct}%
          </p>
          <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-cloud">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal to-mint"
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>
      </div>

      {completed && (
        <Card className="flex items-center gap-3 border-0 bg-mint/15 p-4">
          <PartyPopper className="h-6 w-6 text-teal" />
          <p className="text-sm font-medium text-navy">
            Chain complete! Keep publishing and watch your earnings grow.
          </p>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_1fr_240px]">
        {/* LEFT — checklist */}
        <div className="space-y-1.5">
          {template.steps.map((s, i) => {
            const st = chain.steps.find((x) => x.stepId === s.id)!;
            const selected = s.id === selectedId;
            const disabled = st.state === "locked";
            return (
              <button
                key={s.id}
                disabled={disabled}
                onClick={() => setSelectedId(s.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                  selected
                    ? "border-teal bg-teal/5"
                    : "border-line bg-white hover:bg-cloud"
                } ${disabled ? "opacity-50" : ""}`}
              >
                <span className="mt-0.5">
                  {st.state === "done" ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-navy">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  ) : st.state === "active" ? (
                    <Circle className="h-5 w-5 text-teal" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">
                    Step {i + 1}
                    {s.required ? "" : " · optional"}
                  </span>
                  <span className="block text-sm font-medium text-navy">
                    {s.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* CENTER — task UI */}
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <Badge tone={stepState.state === "done" ? "mint" : "teal"}>
                {stepState.state === "done"
                  ? "Completed"
                  : stepState.state === "active"
                  ? "Current step"
                  : "Locked"}
              </Badge>
              {stepDef.platformId && (
                <PlatformIcon platformId={stepDef.platformId} size={32} />
              )}
            </div>

            <h2 className="mt-4 font-display text-xl font-semibold text-navy">
              {stepDef.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {stepDef.description}
            </p>

            <div className="mt-6">
              <StepPanel
                template={template}
                chain={chain}
                stepId={selectedId}
                state={stepState.state}
                content={stepContent}
                connections={connections}
                pending={pending}
                run={run}
              />
            </div>
          </Card>
        </motion.div>

        {/* RIGHT — help */}
        <div>
          <Card className="bg-cloud p-5">
            <div className="flex items-center gap-2 text-teal">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-semibold">Stuck? Here's help</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {stepDef.help}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- per-action step panels ----------------------- */

function StepPanel({
  template,
  chain,
  stepId,
  state,
  content,
  connections,
  pending,
  run,
}: {
  template: ChainTemplate;
  chain: UserChain;
  stepId: string;
  state: "locked" | "active" | "done";
  content?: GeneratedContent;
  connections: Conn[];
  pending: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const step = template.steps.find((s) => s.id === stepId)!;
  const [niche, setNiche] = useState(chain.niche ?? "");
  const [draft, setDraft] = useState(content?.body ?? "");

  if (state === "locked") {
    return (
      <p className="text-sm text-muted">
        Complete the previous steps to unlock this one.
      </p>
    );
  }

  const Done = (
    <div className="flex items-center gap-2 text-sm font-medium text-teal">
      <Check className="h-4 w-4" /> Step completed.
    </div>
  );

  // NICHE / generic manual task
  if (step.action === "manual_task") {
    const isNiche = step.title.toLowerCase().includes("niche");
    if (isNiche) {
      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-navy">
            Your niche / topic
          </label>
          <Input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. budget home office setups"
          />
          {state === "done" && Done}
          <Button
            disabled={pending || niche.trim().length < 3}
            onClick={() =>
              run(async () => {
                await setNicheAction(chain.id, niche.trim());
                await completeStepAction(chain.id, stepId);
              })
            }
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {state === "done" ? "Update niche" : "Save & continue"}
          </Button>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {state === "done" ? (
          Done
        ) : (
          <Button
            disabled={pending}
            onClick={() => run(() => completeStepAction(chain.id, stepId))}
          >
            Mark complete
          </Button>
        )}
      </div>
    );
  }

  // CONNECT ACCOUNT
  if (step.action === "connect_account" && step.platformId) {
    const platform = getPlatform(step.platformId)!;
    const conn = connections.find((c) => c.platformId === step.platformId);
    const connected = conn?.status === "connected";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-cloud p-4">
          <PlatformIcon platformId={platform.id} size={40} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-navy">{platform.name}</p>
            <p className="text-xs text-muted">
              {connected ? `Connected · ${conn?.label}` : platform.blurb}
            </p>
          </div>
          {connected && (
            <Badge tone="mint" className="ml-auto">
              <Plug className="h-3 w-3" /> Connected
            </Badge>
          )}
        </div>

        {!connected ? (
          <form action={connectAction} className="space-y-3">
            <input type="hidden" name="platformId" value={platform.id} />
            <input
              type="hidden"
              name="redirectTo"
              value={`/app/chains/${chain.id}`}
            />
            {platform.type === "api_key" && (
              <Input
                name="key"
                placeholder={
                  platform.id === "amazon_associates"
                    ? "Your Associates tag, e.g. yourtag-21"
                    : "Paste your API key / id"
                }
                required
              />
            )}
            <Button type="submit" className="w-full">
              <Plug className="h-4 w-4" />
              {platform.type === "oauth"
                ? `Connect ${platform.name} securely`
                : "Connect"}
            </Button>
            {platform.type === "oauth" && (
              <p className="text-center text-xs text-muted">
                Opens a secure OAuth flow. We never see your password.
              </p>
            )}
          </form>
        ) : state === "done" ? (
          Done
        ) : (
          <Button
            disabled={pending}
            onClick={() => run(() => completeStepAction(chain.id, stepId))}
          >
            Continue
          </Button>
        )}
      </div>
    );
  }

  // CREATE CONTENT (AI)
  if (step.action === "create_content") {
    if (!content) {
      return (
        <Button
          disabled={pending}
          onClick={() => run(() => generateContentAction(chain.id, stepId))}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Generate with AI
        </Button>
      );
    }
    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {content.kind.replace("_", " ")} · {content.creditsUsed} credits
          </p>
          <p className="mt-1 font-display text-base font-semibold text-navy">
            {content.title}
          </p>
        </div>
        <Textarea
          rows={10}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <p className="text-xs text-muted">
          Edit freely — your real voice earns more than a raw draft.
        </p>
        <div className="flex flex-wrap gap-2">
          {state !== "done" && (
            <Button
              disabled={pending}
              onClick={() =>
                run(() =>
                  approveContentAction(content.id, chain.id, stepId)
                )
              }
            >
              <Check className="h-4 w-4" /> Approve & continue
            </Button>
          )}
          <Button
            variant="outline"
            disabled={pending}
            onClick={() => run(() => generateContentAction(chain.id, stepId))}
          >
            <Sparkles className="h-4 w-4" /> Regenerate
          </Button>
        </div>
        {state === "done" && Done}
      </div>
    );
  }

  // INSERT AFFILIATE LINKS
  if (step.action === "insert_affiliate_link") {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-cloud p-4 text-sm text-muted">
          <p className="flex items-center gap-2 font-medium text-navy">
            <Link2 className="h-4 w-4 text-teal" /> Auto-link detected products
          </p>
          <p className="mt-2">
            We scan your post for product mentions and insert your
            correctly-tagged links with a{" "}
            <code className="rounded bg-white px-1 text-teal">
              utm=pin_blog_amazon
            </code>{" "}
            tag so every sale is attributed.
          </p>
        </div>
        {state === "done" ? (
          Done
        ) : (
          <Button
            disabled={pending}
            onClick={() => run(() => completeStepAction(chain.id, stepId))}
          >
            <Link2 className="h-4 w-4" /> Insert affiliate links
          </Button>
        )}
      </div>
    );
  }

  // PUBLISH
  if (step.action === "publish") {
    return (
      <div className="space-y-4">
        {state === "done" ? (
          Done
        ) : (
          <Button
            disabled={pending}
            onClick={() => run(() => completeStepAction(chain.id, stepId))}
          >
            <Send className="h-4 w-4" /> Publish now
          </Button>
        )}
        <p className="text-xs text-muted">
          {getPlatform(step.platformId ?? "")?.type === "oauth"
            ? "Publishes via your connected account (sandbox in this demo)."
            : "We prepare it — you paste & send, then log the result."}
        </p>
      </div>
    );
  }

  // TRACK
  if (step.action === "track") {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-cloud p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-navy">
            <LineChart className="h-4 w-4 text-teal" /> Earnings are flowing in
          </p>
          <p className="mt-2 text-sm text-muted">
            Clicks → blog visits → Amazon sales appear on your earnings
            dashboard, attributed to this chain.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href="/app/earnings" size="sm">
            View earnings
          </ButtonLink>
          {state !== "done" && (
            <Button
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => run(() => completeStepAction(chain.id, stepId))}
            >
              Mark set up
            </Button>
          )}
        </div>
        {state === "done" && Done}
      </div>
    );
  }

  return null;
}
