import { motion } from "motion/react";

const QUOTES = [
  {
    quote:
      "MoneyChains showed me the exact next button to click. My first ₹500 in affiliate sales felt unreal — because it was real.",
    name: "Priya Nair",
    role: "Side-income builder",
    company: "BENGALURU",
  },
  {
    quote:
      "I'd bought five 'make money online' courses. This is the first thing that actually walked me from zero to a published post that earns.",
    name: "Arjun Mehta",
    role: "Freelance writer",
    company: "PUNE",
  },
  {
    quote:
      "The Pinterest → Blog → Amazon chain just works. Three weeks in, I'm tracking real commissions in one dashboard.",
    name: "Sara Williams",
    role: "Creator",
    company: "LONDON",
  },
];

export function Testimonials() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
      <div className="grid md:grid-cols-3 gap-6">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="liquid-glass rounded-2xl p-6"
          >
            <blockquote className="text-sm text-white/80 leading-[1.6]">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <div className="text-sm font-semibold text-white">{q.name}</div>
              <div className="text-xs text-white/50">{q.role}</div>
              <div className="mt-1 text-xs text-white font-semibold tracking-wide">
                {q.company}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
