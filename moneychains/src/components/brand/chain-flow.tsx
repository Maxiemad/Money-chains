import { ArrowRight, IndianRupee } from "lucide-react";
import { PlatformIcon } from "./platform-icon";
import { getPlatform } from "@/data/platforms";
import { cn } from "@/lib/utils";

/** Visualizes a chain as Platform A → B → C → ₹. */
export function ChainFlow({
  flow,
  size = 36,
  labels = false,
  light = false,
  className,
}: {
  flow: string[];
  size?: number;
  labels?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {flow.map((id, i) => (
        <div key={id} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <PlatformIcon platformId={id} size={size} />
            {labels && (
              <span
                className={cn(
                  "text-[11px]",
                  light ? "text-ink/60" : "text-muted"
                )}
              >
                {getPlatform(id)?.name.split(" ")[0]}
              </span>
            )}
          </div>
          <ArrowRight
            className={cn("h-4 w-4", light ? "text-ink/40" : "text-muted/60")}
          />
          {i === flow.length - 1 && (
            <span
              className="inline-flex items-center justify-center rounded-full bg-mint text-navy"
              style={{ width: size, height: size }}
              title="Revenue"
            >
              <IndianRupee className="h-4 w-4" strokeWidth={2.5} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
