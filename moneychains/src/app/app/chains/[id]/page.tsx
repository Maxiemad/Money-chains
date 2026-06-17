import { notFound } from "next/navigation";
import { currentUser } from "@/services/auth";
import { userChain, connectionsFor, contentFor } from "@/lib/store";
import { getTemplate } from "@/data/templates";
import { Workspace } from "@/components/app/workspace";

export default async function ChainWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  const chain = userChain(id);
  if (!chain || chain.userId !== user.id) notFound();
  const template = getTemplate(chain.templateId);
  if (!template) notFound();

  const connections = connectionsFor(user.id).map((c) => ({
    platformId: c.platformId,
    status: c.status,
    label: c.accountLabel,
  }));

  const content = contentFor(user.id).filter((c) => c.userChainId === chain.id);

  return (
    <Workspace
      template={template}
      chain={chain}
      connections={connections}
      content={content}
    />
  );
}
