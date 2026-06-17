"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Search,
  LayoutDashboard,
  Boxes,
  Plug,
  TrendingUp,
  FileText,
  Settings,
  Send,
  BarChart3,
  Link2,
  Share2,
  MoreHorizontal,
  Paperclip,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Config — everything lives on this one domain now                    */
/* ------------------------------------------------------------------ */
const SIGNUP_URL = "/signup";
const BLOG_URL = "/blog";
const CONTACT_EMAIL = "hello@moneychains.app";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */
function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-label="MoneyChains">
      <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
    </svg>
  );
}

function BrandButton({ label = "Start free", full = false }: { label?: string; full?: boolean }) {
  return (
    <a
      href={SIGNUP_URL}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${
        full ? "w-full" : ""
      }`}
    >
      <LogoMark className="w-4 h-4 text-black" />
      {label}
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
    </a>
  );
}

type SessionUser = { name: string; avatarColor: string } | null;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ user }: { user: NonNullable<SessionUser> }) {
  return (
    <a
      href="/app"
      aria-label="Go to your workspace"
      title={`${user.name} · open workspace`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-black ring-2 ring-white/20 transition-transform hover:scale-105"
      style={{ background: user.avatarColor }}
    >
      {initials(user.name)}
    </a>
  );
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-white/70">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="font-medium">{label}</span>
      {tag && (
        <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 text-xs">
          {tag}
        </span>
      )}
    </div>
  );
}

const gradientStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #2e1065 0%, #5b21b6 12.5%, #ede9fe 32.5%, #d8b4fe 50%, #5b21b6 67.5%, #2e1065 87.5%, #2e1065 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "url(#c3-noise)",
};

function RootNoiseFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden>
      <filter id="c3-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
        <feComposite in2="SourceGraphic" operator="in" result="noise" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Background video                                                    */
/* ------------------------------------------------------------------ */
function BackgroundVideo() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src={VIDEO_SRC}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-purple-900/30 to-purple-800/40" />
        <div className="absolute inset-0 bg-[#0c0c0c]/35" />
      </div>
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
const LINKS = [
  { label: "Templates", href: "#workspace" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#guidance" },
  { label: "Blog", href: BLOG_URL },
  { label: "About", href: "#site-footer" },
];

function Navbar({ user }: { user: SessionUser }) {
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

      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <>
            <a
              href="/app"
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              Workspace
            </a>
            <Avatar user={user} />
          </>
        ) : (
          <>
            <a
              href="/login"
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              Log in
            </a>
            <BrandButton label="Start free" />
          </>
        )}
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
            {user ? (
              <a
                href="/app"
                onClick={() => setOpen(false)}
                className="text-white/80 text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Open workspace
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-white/80 text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5"
                >
                  Log in
                </a>
                <div className="mt-2">
                  <BrandButton label="Start free" full />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block text-white">Your skills.</span>
        <span className="block animate-shiny" style={gradientStyle}>
          Monetized
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
      >
        MoneyChains is the proven way to turn what you already know into online
        income. Pick a money chain, connect your accounts, and let AI guide you
        from first step to first rupee.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <BrandButton label="Start free" />
        <span className="text-xs text-white/40">
          Free forever plan · No credit card required
        </span>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* App mockup                                                          */
/* ------------------------------------------------------------------ */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Boxes, label: "My Chains", count: 2, active: true },
  { icon: Plug, label: "Connections", count: 3 },
  { icon: TrendingUp, label: "Earnings" },
  { icon: FileText, label: "Content", count: 1 },
  { icon: Settings, label: "Settings" },
];

const CATEGORIES = [
  { label: "Affiliate", color: "#d8b4fe" },
  { label: "Content", color: "#ede9fe" },
  { label: "E-commerce", color: "#f59e0b" },
  { label: "Newsletter", color: "#10b981" },
];

const CHAINS = [
  { name: "Pinterest → Blog → Amazon", subject: "₹2,215 earned this week", preview: "5 affiliate sales tracked · next: schedule pins", time: "Now", unread: true, active: true },
  { name: "Instagram Reels → Affiliate", subject: "Ready to start", preview: "Beginner · ₹3k–₹50k / mo potential", time: "2h", unread: true },
  { name: "YouTube → Digital Product", subject: "Draft generated", preview: "Tutorial script ready to review.", time: "Yesterday" },
  { name: "Newsletter → Sponsorships", subject: "Issue #1 scheduled", preview: "182 subscribers · first sponsor slot soon.", time: "Yesterday" },
  { name: "Pinterest → Etsy Printables", subject: "3 pins published", preview: "Planner pack live on Etsy.", time: "Mon" },
  { name: "TikTok → Shopify Store", subject: "Connect TikTok to begin", preview: "Advanced · highest earning ceiling.", time: "Mon" },
];

function AppMockup() {
  return (
    <section id="workspace" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        <div className="h-10 flex items-center px-4 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <span className="flex-1 text-center text-xs text-white/50">MoneyChains — Workspace</span>
          <span className="w-12" />
        </div>

        <div className="grid grid-cols-12 h-[520px]">
          <div className="col-span-3 border-r border-white/10 bg-black/30 p-4 flex flex-col gap-4">
            <a
              href={SIGNUP_URL}
              className="flex items-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2 w-full justify-center hover:bg-white/90 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Start a chain
            </a>

            <nav className="flex flex-col gap-0.5">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs cursor-pointer transition-colors ${
                    item.active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="flex-1">{item.label}</span>
                  {item.count != null && <span className="text-[10px] text-white/40">{item.count}</span>}
                </div>
              ))}
            </nav>

            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-widest text-white/30 px-2.5 mb-2">Categories</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <div key={c.label} className="flex items-center gap-2.5 px-2.5 py-1 text-xs text-white/60">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 border-r border-white/10 flex flex-col">
            <div className="h-11 flex items-center gap-2 px-4 border-b border-white/10 text-white/40">
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search chains</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {CHAINS.map((c) => (
                <div
                  key={c.name}
                  className={`px-4 py-3 border-b border-white/5 cursor-pointer transition-colors ${
                    c.active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {c.unread && <span className="w-2 h-2 rounded-full bg-[#d8b4fe] shrink-0" />}
                      <span className={`text-xs truncate ${c.unread ? "text-white font-semibold" : "text-white/70"}`}>
                        {c.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40 shrink-0">{c.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-white/80 truncate">{c.subject}</p>
                  <p className="mt-0.5 text-[11px] text-white/40 truncate">{c.preview}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 flex flex-col">
            <div className="h-11 flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center gap-1">
                {[Sparkles, Send, BarChart3, Link2].map((Icon, i) => (
                  <span key={i} className="w-7 h-7 rounded-md flex items-center justify-center text-white/60">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-7 h-7 rounded-md flex items-center justify-center text-white/60">
                  <Share2 className="w-3.5 h-3.5" />
                </span>
                <span className="w-7 h-7 rounded-md flex items-center justify-center text-white/60">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <h3 className="text-lg font-semibold text-white">Pinterest → Blog → Amazon</h3>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#5b21b6] flex items-center justify-center text-xs font-semibold text-white">
                  P
                </span>
                <div className="flex-1">
                  <p className="text-xs text-white">Your active chain</p>
                  <p className="text-[11px] text-white/40">started 12 days ago · 6 of 9 steps done</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/60">Affiliate</span>
              </div>

              <div className="mt-5 liquid-glass rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "#ede9fe" }} />
                  <span className="text-white">Summary by MoneyChains</span>
                </div>
                <p className="mt-2 text-xs text-white/70 leading-[1.5]">
                  You&apos;ve completed 6 of 9 steps and earned ₹2,215 from 5 sales. Next step:
                  connect Pinterest and schedule 5 pins. Your earning trend is climbing — no
                  action needed beyond today&apos;s step.
                </p>
              </div>

              <div className="mt-5 space-y-3 text-xs text-white/70 leading-[1.6]">
                <p>Hi Aanya,</p>
                <p>
                  Here&apos;s where your Pinterest → Blog → Amazon chain stands. This was a strong
                  week — your budget home office post is converting.
                </p>
                <p>
                  Five affiliate sales came through (₹2,215 tracked), your blog post is live, and
                  every link is attributed with a UTM tag back to the pin that drove it. Momentum
                  is building.
                </p>
                <p>Your next move: connect Pinterest so we can schedule this week&apos;s pins automatically.</p>
                <p className="text-white/50">— The MoneyChains engine</p>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
                <Paperclip className="w-3.5 h-3.5" />
                weekly-earnings.pdf
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Feature guide                                                       */
/* ------------------------------------------------------------------ */
const CHIPS = ["Pick a proven chain", "Connect securely", "AI drafts content", "Track every rupee"];
const STAGES = [
  { title: "Connect", count: "3", color: "#ffffff", items: ["Amazon Associates · tagged", "Blog · hosted", "Pinterest · pending"] },
  { title: "Create", count: "5", color: "#e5e5e5", items: ["Blog post · approved", "5 Pinterest pins · drafted"] },
  { title: "Publish", count: "2", color: "#a3a3a3", items: ["Post live · UTM tagged", "Pins · scheduled"] },
  { title: "Earned", count: "₹2,215", color: "#d8b4fe", items: ["5 affiliate sales · attributed", "Trend climbing"] },
];

function FeatureGuide() {
  return (
    <section id="guidance" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <SectionEyebrow label="Guidance" tag="AI-native" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Reach your first rupee
            <br />
            without the guesswork.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            MoneyChains reads the playbook so you don&apos;t have to. It connects your accounts,
            drafts the content, schedules the work, and routes every sale back to the step that
            earned it. You do the part only you can — the rest handles itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <span key={chip} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="liquid-glass rounded-2xl p-5"
        >
          <p className="text-xs text-white/50 mb-4">This week · your chain progress</p>
          <div className="grid grid-cols-2 gap-3">
            {STAGES.map((s) => (
              <div key={s.title} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{s.title}</span>
                  <span className="text-xs font-semibold" style={{ color: s.color }}>{s.count}</span>
                </div>
                <div className="mt-2.5 space-y-1.5">
                  {s.items.map((it) => (
                    <p key={it} className="text-[11px] text-white/55 leading-snug">{it}</p>
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

/* ------------------------------------------------------------------ */
/* Logo cloud                                                          */
/* ------------------------------------------------------------------ */
const PLATFORMS = ["Pinterest", "YouTube", "Instagram", "Amazon", "Shopify", "Stripe", "Etsy", "TikTok"];

function LogoCloud() {
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

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
const QUOTES = [
  { quote: "MoneyChains showed me the exact next button to click. My first ₹500 in affiliate sales felt unreal — because it was real.", name: "Priya Nair", role: "Side-income builder", company: "BENGALURU" },
  { quote: "I'd bought five 'make money online' courses. This is the first thing that actually walked me from zero to a published post that earns.", name: "Arjun Mehta", role: "Freelance writer", company: "PUNE" },
  { quote: "The Pinterest → Blog → Amazon chain just works. Three weeks in, I'm tracking real commissions in one dashboard.", name: "Sara Williams", role: "Creator", company: "LONDON" },
];

function Testimonials() {
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
            <blockquote className="text-sm text-white/80 leading-[1.6]">&ldquo;{q.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <div className="text-sm font-semibold text-white">{q.name}</div>
              <div className="text-xs text-white/50">{q.role}</div>
              <div className="mt-1 text-xs text-white font-semibold tracking-wide">{q.company}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */
type Plan = { tier: string; monthly: string; yearly: string; desc: string; features: string[]; pro?: boolean };

const PLANS: Plan[] = [
  { tier: "Free", monthly: "₹0", yearly: "₹0", desc: "For anyone taking their first step toward online income.", features: ["1 active money chain", "50 AI content credits per month", "Manual publishing", "Earnings dashboard with attribution", "OAuth security — no passwords stored"] },
  { tier: "Starter", monthly: "₹999/m", yearly: "₹9,990/y", desc: "For serious side-income builders who want more chains and automation.", features: ["3 active money chains", "500 AI content credits per month", "Automated publishing (100 runs)", "Full earnings analytics", "No watermark on output"] },
  { tier: "Pro", monthly: "₹2,499/m", yearly: "₹24,990/y", desc: "For full-timers scaling multiple income engines at once.", pro: true, features: ["Unlimited active money chains", "2,500 AI content credits per month", "Automated publishing (500 runs)", "Advanced analytics + funnels", "Multi-account + priority support"] },
];

function Check() {
  return (
    <span className="c3-check">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="c3-pricing-section relative z-10">
      <svg className="absolute w-0 h-0" aria-hidden>
        <filter id="c3-noise-pricing">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Pick a chain.</span>
          <span className="c3-watermark-line-2">Start earning.</span>
        </div>
      </div>

      <div className="c3-grid">
        {PLANS.map((plan) => (
          <div key={plan.tier} className={`c3-card ${plan.pro ? "c3-card-pro" : ""}`}>
            <div className="c3-tier-small">{plan.tier}</div>
            <div className="c3-tier-large">{yearly ? plan.yearly : plan.monthly}</div>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a className="c3-btn" href={SIGNUP_URL}>Choose plan</a>
          </div>
        ))}
      </div>

      <div className="c3-toggle-wrap">
        <span className="c3-toggle-label">Yearly</span>
        <button aria-label="Toggle yearly billing" className={`c3-toggle ${yearly ? "active" : ""}`} onClick={() => setYearly((v) => !v)}>
          <span className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */
function FinalCTA() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.3, background: "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)" }}
        />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
            <span className="block">Stop guessing.</span>
            <span className="block">Start earning.</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
            Join thousands of builders turning what they already know into real income — one
            proven chain at a time.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <BrandButton label="Start free" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors"
            >
              Talk to us
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function LandingPage({ user = null }: { user?: SessionUser }) {
  return (
    <div id="top" className="landing-root relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <RootNoiseFilter />
      <BackgroundVideo />

      <div className="relative z-10">
        <Navbar user={user} />
        <Hero />
        <AppMockup />
        <FeatureGuide />
        <LogoCloud />
        <Testimonials />
        <Pricing />
        <FinalCTA />

        <footer
          id="site-footer"
          className="relative z-10 max-w-6xl mx-auto px-6 py-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-white/60">
            <LogoMark className="w-6 h-6 text-white/80" />
            <span className="text-sm font-semibold text-white">MoneyChains</span>
          </div>
          <p className="text-xs text-white/40 text-center">
            The Zapier for making money online. No guaranteed income — just proven tools, honest
            ranges, and real attribution.
          </p>
          <p className="text-xs text-white/30">© 2026 MoneyChains</p>
        </footer>
      </div>
    </div>
  );
}
