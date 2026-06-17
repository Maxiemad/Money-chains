import { motion } from "motion/react";

// The platforms MoneyChains chains connect into.
const PLATFORMS = [
  "Pinterest",
  "YouTube",
  "Instagram",
  "Amazon",
  "Shopify",
  "Stripe",
  "Etsy",
  "TikTok",
];

export function LogoCloud() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
      <p className="text-center text-xs uppercase tracking-widest text-white/40">
        Works with the platforms you already use
      </p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {PLATFORMS.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-center text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
