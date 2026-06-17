import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/primitives";
import { TemplateCard } from "@/components/brand/template-card";
import { TEMPLATES } from "@/data/templates";

export const metadata: Metadata = {
  title: "Templates — Proven money chains",
  description:
    "Browse proven money chains. Each connects real platforms into one working income engine. Preview any of them free.",
};

export default function TemplatesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-line bg-cloud py-16">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Template library"
            title="Proven money chains, ready to start"
            subtitle="Every chain is a tested workflow connecting real platforms. Pick one, connect your accounts, and we guide you the rest of the way."
          />
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
