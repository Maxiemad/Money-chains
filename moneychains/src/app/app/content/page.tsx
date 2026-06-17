import Link from "next/link";
import { FileText, Pin, Quote, Tag, Mail, Library, Coins } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { currentUser } from "@/services/auth";
import { contentFor, userChainsFor } from "@/lib/store";
import { getTemplate } from "@/data/templates";
import { timeAgo } from "@/lib/utils";
import type { ContentKind } from "@/lib/types";

const KINDS: { key: ContentKind; label: string; icon: typeof FileText }[] = [
  { key: "blog_post", label: "Blog posts", icon: FileText },
  { key: "pin", label: "Pins", icon: Pin },
  { key: "caption", label: "Captions", icon: Quote },
  { key: "product_blurb", label: "Product blurbs", icon: Tag },
  { key: "newsletter", label: "Newsletters", icon: Mail },
];

const KIND_LABEL: Record<ContentKind, string> = {
  blog_post: "Blog post",
  pin: "Pin",
  caption: "Caption",
  product_blurb: "Product blurb",
  newsletter: "Newsletter",
};

export default async function ContentLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const { kind } = await searchParams;
  const user = await currentUser();
  const all = contentFor(user.id);
  const chains = userChainsFor(user.id);

  const activeKind =
    kind && KINDS.some((k) => k.key === kind) ? (kind as ContentKind) : "all";
  const list =
    activeKind === "all" ? all : all.filter((c) => c.kind === activeKind);
  const sorted = [...list].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Content library
        </h1>
        <p className="mt-1 text-sm text-muted">
          Everything your chains have generated — drafts and published, in one
          place. Read-only, attributed to the chain that produced it.
        </p>
      </div>

      {/* filter row */}
      <div className="flex flex-wrap gap-2">
        {[{ key: "all", label: "All", icon: Library } as const, ...KINDS].map(
          (f) => {
            const active = f.key === activeKind;
            return (
              <Link
                key={f.key}
                href={
                  f.key === "all"
                    ? "/app/content"
                    : `/app/content?kind=${encodeURIComponent(f.key)}`
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy text-ink"
                    : "border border-line bg-white text-muted hover:text-navy"
                }`}
              >
                <f.icon className="h-3.5 w-3.5" />
                {f.label}
              </Link>
            );
          }
        )}
      </div>

      {sorted.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 px-6 py-14 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
            <Library className="h-6 w-6" />
          </span>
          <h2 className="font-display text-lg font-semibold text-navy">
            {all.length === 0 ? "Nothing here yet" : "No matching content"}
          </h2>
          <p className="max-w-sm text-sm text-muted">
            {all.length === 0
              ? "Start a chain and the content it generates — blog posts, pins, captions — will collect here."
              : "Nothing of this kind yet. Try a different filter."}
          </p>
          {all.length === 0 && (
            <ButtonLink href="/app/templates" size="sm" className="mt-1">
              Browse templates
            </ButtonLink>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {sorted.map((c) => {
            const chain = chains.find((uc) => uc.id === c.userChainId);
            const template = chain
              ? getTemplate(chain.templateId)
              : undefined;
            return (
              <Card key={c.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="teal">{KIND_LABEL[c.kind]}</Badge>
                  <Badge tone={c.approved ? "mint" : "neutral"}>
                    {c.approved ? "Approved" : "Draft"}
                  </Badge>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted">
                    <Coins className="h-3.5 w-3.5" /> {c.creditsUsed} credits
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                  {c.title}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {template ? (
                    <>
                      From{" "}
                      <span className="font-medium text-navy">
                        {template.name}
                      </span>
                    </>
                  ) : (
                    "Unlinked content"
                  )}{" "}
                  · {timeAgo(c.createdAt)}
                </p>

                <details className="group mt-3">
                  <summary className="cursor-pointer list-none text-sm font-medium text-teal hover:text-[#018f6b]">
                    <span className="group-open:hidden">Read content →</span>
                    <span className="hidden group-open:inline">
                      Hide content
                    </span>
                  </summary>
                  <div className="mt-3 whitespace-pre-wrap rounded-xl bg-cloud p-4 text-sm leading-relaxed text-ink">
                    {c.body}
                  </div>
                </details>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
