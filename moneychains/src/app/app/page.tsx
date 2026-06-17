import { currentUser } from "@/services/auth";
import { userChainsFor, earningsFor } from "@/lib/store";
import { getTemplate } from "@/data/templates";
import { timeAgo } from "@/lib/utils";
import {
  WorkspaceView,
  type WorkspaceChain,
} from "@/components/app/workspace-view";

export default async function WorkspacePage() {
  const user = await currentUser();
  const chains = await userChainsFor(user.id);
  const earnings = await earningsFor(user.id);

  const items: WorkspaceChain[] = chains.map((c) => {
    const t = getTemplate(c.templateId);
    const done = c.steps.filter((s) => s.state === "done").length;
    const earned = earnings
      .filter((e) => e.userChainId === c.id)
      .reduce((s, e) => s + e.amount, 0);
    const nextState = c.steps.find((s) => s.state === "active");
    const nextDef = t?.steps.find((s) => s.id === nextState?.stepId);
    return {
      id: c.id,
      name: t?.name ?? "Chain",
      flow: t?.flow ?? [],
      status: c.status,
      niche: c.niche,
      done,
      total: c.steps.length,
      earned,
      nextStepTitle: nextDef?.title,
      nextStepDesc: nextDef?.description,
      steps: c.steps.map((s) => ({
        title: t?.steps.find((x) => x.id === s.stepId)?.title ?? s.stepId,
        state: s.state,
      })),
      updatedLabel: c.startedAt ? timeAgo(c.startedAt) : "",
    };
  });

  return <WorkspaceView chains={items} />;
}
