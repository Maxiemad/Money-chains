import Link from "next/link";
import { Clock, Gauge, Zap, Hand, CheckCircle2 } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { ChainFlow } from "./chain-flow";
import type { ChainTemplate } from "@/lib/types";

export function TemplateCard({
  template,
  href,
}: {
  template: ChainTemplate;
  href?: string;
}) {
  const to = href ?? `/templates/${template.slug}`;
  return (
    <Link href={to} className="group block focus:outline-none">
      <Card className="h-full p-5 transition-all group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-16px_rgba(14,26,56,0.3)] group-focus-visible:ring-2 group-focus-visible:ring-mint">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="teal">{template.category}</Badge>
          {template.proven && (
            <Badge tone="mint">
              <CheckCircle2 className="h-3 w-3" /> Proven
            </Badge>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold text-navy">
          {template.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
          {template.tagline}
        </p>

        <div className="mt-4">
          <ChainFlow flow={template.flow} size={30} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {template.effort}
          </span>
          <span className="inline-flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" /> {template.difficulty}
          </span>
          <span className="inline-flex items-center gap-1">
            {template.automated ? (
              <>
                <Zap className="h-3.5 w-3.5 text-teal" /> Automated
              </>
            ) : (
              <>
                <Hand className="h-3.5 w-3.5" /> Guided
              </>
            )}
          </span>
        </div>

        <div className="mt-4 border-t border-line pt-3 text-sm">
          <span className="font-semibold text-teal">
            {template.earningRange}
          </span>
        </div>
      </Card>
    </Link>
  );
}
