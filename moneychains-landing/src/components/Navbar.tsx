import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { LogoMark, BrandButton } from "./primitives";
import { APP_URL } from "../config";

const LINKS = [
  { label: "Templates", href: "#workspace" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#guidance" },
  { label: "Blog", href: `${APP_URL}/blog` },
  { label: "About", href: "#site-footer" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-30 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between"
    >
      <a href="#top" aria-label="MoneyChains home">
        <LogoMark className="w-8 h-8 text-white" />
      </a>

      <div className="hidden md:flex gap-8">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            className="text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <div className="hidden md:block">
        <BrandButton label="Start free" />
      </div>

      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center"
      >
        {open ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mx-6 mt-2 rounded-2xl border border-white/10 bg-[#0e1014]/95 backdrop-blur-xl p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/80 text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2">
              <BrandButton label="Start free" full />
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
