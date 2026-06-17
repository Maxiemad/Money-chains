import { motion } from "motion/react";
import { SectionEyebrow } from "./primitives";

const CHIPS = [
  "Pick a proven chain",
  "Connect securely",
  "AI drafts content",
  "Track every rupee",
];

const STAGES = [
  {
    title: "Connect",
    count: "3",
    color: "#ffffff",
    items: ["Amazon Associates · tagged", "Blog · hosted", "Pinterest · pending"],
  },
  {
    title: "Create",
    count: "5",
    color: "#e5e5e5",
    items: ["Blog post · approved", "5 Pinterest pins · drafted"],
  },
  {
    title: "Publish",
    count: "2",
    color: "#a3a3a3",
    items: ["Post live · UTM tagged", "Pins · scheduled"],
  },
  {
    title: "Earned",
    count: "₹2,215",
    color: "#27d8a0",
    items: ["5 affiliate sales · attributed", "Trend climbing"],
  },
];

export function FeatureGuide() {
  return (
    <section id="guidance" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionEyebrow label="Guidance" tag="AI-native" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Reach your first rupee
            <br />
            without the guesswork.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            MoneyChains reads the playbook so you don't have to. It connects your
            accounts, drafts the content, schedules the work, and routes every
            sale back to the step that earned it. You do the part only you can —
            the rest handles itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="liquid-glass rounded-2xl p-5"
        >
          <p className="text-xs text-white/50 mb-4">
            This week · your chain progress
          </p>
          <div className="grid grid-cols-2 gap-3">
            {STAGES.map((s) => (
              <div key={s.title} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{s.title}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: s.color }}
                  >
                    {s.count}
                  </span>
                </div>
                <div className="mt-2.5 space-y-1.5">
                  {s.items.map((it) => (
                    <p key={it} className="text-[11px] text-white/55 leading-snug">
                      {it}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
