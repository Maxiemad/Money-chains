import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/templates", label: "Templates" },
      { href: "/pricing", label: "Pricing" },
      { href: "/app", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              The Zapier for making money online. Pick a proven chain, connect
              your accounts, and we guide you to real income.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink/60 transition-colors hover:text-mint"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-ink/50">
            <strong className="text-ink/70">Honest income disclaimer:</strong>{" "}
            MoneyChains is a set of tools and templates, not a guarantee. Results
            depend on your niche, effort, and consistency. The ranges shown are
            illustrative — many people earn nothing, some earn a lot. We never
            promise guaranteed income.
          </p>
          <p className="mt-4 text-xs text-ink/50">
            © {new Date().getFullYear()} MoneyChains. Built for builders.
          </p>
        </div>
      </div>
    </footer>
  );
}
