import { motion } from "motion/react";
import {
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
import { SIGNUP_URL } from "../config";

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
  {
    name: "Pinterest → Blog → Amazon",
    subject: "₹2,215 earned this week",
    preview: "5 affiliate sales tracked · next: schedule pins",
    time: "Now",
    unread: true,
    active: true,
  },
  {
    name: "Instagram Reels → Affiliate",
    subject: "Ready to start",
    preview: "Beginner · ₹3k–₹50k / mo potential",
    time: "2h",
    unread: true,
  },
  {
    name: "YouTube → Digital Product",
    subject: "Draft generated",
    preview: "Tutorial script ready to review.",
    time: "Yesterday",
  },
  {
    name: "Newsletter → Sponsorships",
    subject: "Issue #1 scheduled",
    preview: "182 subscribers · first sponsor slot soon.",
    time: "Yesterday",
  },
  {
    name: "Pinterest → Etsy Printables",
    subject: "3 pins published",
    preview: "Planner pack live on Etsy.",
    time: "Mon",
  },
  {
    name: "TikTok → Shopify Store",
    subject: "Connect TikTok to begin",
    preview: "Advanced · highest earning ceiling.",
    time: "Mon",
  },
];

export function AppMockup() {
  return (
    <section id="workspace" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        {/* title bar */}
        <div className="h-10 flex items-center px-4 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <span className="flex-1 text-center text-xs text-white/50">
            MoneyChains — Workspace
          </span>
          <span className="w-12" />
        </div>

        {/* body */}
        <div className="grid grid-cols-12 h-[520px]">
          {/* sidebar */}
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
                    item.active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="flex-1">{item.label}</span>
                  {item.count != null && (
                    <span className="text-[10px] text-white/40">{item.count}</span>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-widest text-white/30 px-2.5 mb-2">
                Categories
              </p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-2.5 px-2.5 py-1 text-xs text-white/60"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: c.color }}
                    />
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* chain list */}
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
                      {c.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#d8b4fe] shrink-0" />
                      )}
                      <span
                        className={`text-xs truncate ${
                          c.unread ? "text-white font-semibold" : "text-white/70"
                        }`}
                      >
                        {c.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40 shrink-0">
                      {c.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/80 truncate">{c.subject}</p>
                  <p className="mt-0.5 text-[11px] text-white/40 truncate">
                    {c.preview}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* reader / chain detail */}
          <div className="col-span-5 flex flex-col">
            <div className="h-11 flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center gap-1">
                {[Sparkles, Send, BarChart3, Link2].map((Icon, i) => (
                  <span
                    key={i}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white/60"
                  >
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
              <h3 className="text-lg font-semibold text-white">
                Pinterest → Blog → Amazon
              </h3>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#5b21b6] flex items-center justify-center text-xs font-semibold text-white">
                  P
                </span>
                <div className="flex-1">
                  <p className="text-xs text-white">Your active chain</p>
                  <p className="text-[11px] text-white/40">
                    started 12 days ago · 6 of 9 steps done
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/60">
                  Affiliate
                </span>
              </div>

              {/* Summary by MoneyChains */}
              <div className="mt-5 liquid-glass rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "#ede9fe" }} />
                  <span className="text-white">Summary by MoneyChains</span>
                </div>
                <p className="mt-2 text-xs text-white/70 leading-[1.5]">
                  You've completed 6 of 9 steps and earned ₹2,215 from 5 sales.
                  Next step: connect Pinterest and schedule 5 pins. Your earning
                  trend is climbing — no action needed beyond today's step.
                </p>
              </div>

              <div className="mt-5 space-y-3 text-xs text-white/70 leading-[1.6]">
                <p>Hi Aanya,</p>
                <p>
                  Here's where your Pinterest → Blog → Amazon chain stands. This
                  was a strong week — your budget home office post is converting.
                </p>
                <p>
                  Five affiliate sales came through (₹2,215 tracked), your blog
                  post is live, and every link is attributed with a UTM tag back
                  to the pin that drove it. Momentum is building.
                </p>
                <p>
                  Your next move: connect Pinterest so we can schedule this week's
                  pins automatically.
                </p>
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
