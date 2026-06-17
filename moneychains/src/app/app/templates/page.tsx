import Link from "next/link";
import { Clock, Gauge, Zap, Hand, Rocket } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ChainFlow } from "@/components/brand/chain-flow";
import { TEMPLATES } from "@/data/templates";
import { startChainAction } from "@/lib/actions";
import type { ChainCategory } from "@/lib/types";

const CATEGORIES: (ChainCategory | "All")[] = [
  "All",
  "Affiliate",
  "Content/Video",
  "Digital Products",
  "Newsletter",
  "E-commerce",
];

export default async function AppTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "All" } = await searchParams;
  const list =
    category === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === category);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Template marketplace
        </h1>
        <p className="mt-1 text-sm text-muted">
          Pick a proven chain and start earning. Each is a tested workflow.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <Link
              key={c}
              href={c === "All" ? "/app/templates" : `/app/templates?category=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-navy text-ink"
                  : "border border-line bg-white text-muted hover:text-navy"
              }`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((t) => (
          <Card key={t.id} className="flex flex-col p-5">
            <div className="flex items-center justify-between">
              <Badge tone="teal">{t.category}</Badge>
              {t.automated ? (
                <span className="inline-flex items-center gap-1 text-xs text-teal">
                  <Zap className="h-3.5 w-3.5" /> Automated
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <Hand className="h-3.5 w-3.5" /> Guided
                </span>
              )}
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-navy">
              {t.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{t.tagline}</p>
            <div className="mt-4">
              <ChainFlow flow={t.flow} size={30} />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {t.effort}
              </span>
              <span className="inline-flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5" /> {t.difficulty}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-teal">
              {t.earningRange}
            </p>

            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
              <form action={startChainAction.bind(null, t.slug)} className="flex-1">
                <Button type="submit" className="w-full" size="sm">
                  <Rocket className="h-4 w-4" /> Start chain
                </Button>
              </form>
              <Link
                href={`/templates/${t.slug}`}
                className="text-sm font-medium text-muted hover:text-navy"
              >
                Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
