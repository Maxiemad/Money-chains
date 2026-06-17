import { Compass } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-navy px-6 py-20 text-center">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-mint/10 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <Logo light />

        <span className="mt-12 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-mint ring-1 ring-white/10">
          <Compass className="h-7 w-7" />
        </span>

        <p className="mt-6 font-display text-6xl font-semibold text-ink sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
          This link broke its chain
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink/70">
          The page you&apos;re looking for doesn&apos;t exist or has moved. No
          worries — every working money chain starts from a proven template.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="mint" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink
            href="/templates"
            variant="outline"
            size="lg"
            className="border-white/20 bg-transparent text-ink hover:bg-white/5"
          >
            Browse templates
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
