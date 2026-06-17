# MoneyChains

**The Zapier for making money online.** Pick a proven *money chain* — a template
that connects several platforms into one working income engine (e.g. *Pinterest →
Blog → Amazon Affiliate*) — connect your own accounts, get guided step-by-step,
publish across platforms, and track real revenue in one dashboard.

This repo is a complete, runnable product: a polished marketing site **and** a
functional authenticated app. It runs end-to-end with **zero external setup** —
every third-party integration sits behind a clean interface with a working mock,
so the full *start → connect → publish → see ₹* loop is clickable immediately.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

No `.env` is required to run. The app boots on the mock layer with a seeded demo
user already mid-journey through the flagship chain.

### Try the demo
- Visit **/** for the marketing site, or jump straight to **/app**.
- Or go to **/login → "Try the live demo"**.
- Demo user: `demo@moneychains.app` (any password) — role *user*, Starter plan.
- Admin: `admin@moneychains.app` — or open **/admin** and click **Enter admin demo**.

The demo user already has Amazon + Blog connected and the flagship chain in
progress, so the next actionable step (Connect Pinterest → generate pins → track)
is live. Earnings, content, and achievements are pre-seeded.

```bash
npm run build && npm run start   # production build + serve
```

---

## What's real vs mocked

Everything is structured so going live = swapping a provider, not rewriting the app.

| Concern        | Today (mock)                                             | Go live by…                                                                 |
| -------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Database**   | In-memory store, `src/lib/store.ts` (seeded, hot-reload-safe) | Implement the same read/write helpers against Supabase/Prisma (`prisma/schema.prisma` mirrors it) |
| **Auth**       | Cookie session, `src/services/auth.ts` (demo fallback)   | Swap for Supabase Auth — call sites unchanged                               |
| **AI content** | Deterministic, niche-aware mock, `src/services/ai.ts`    | Set `CLAUDE_API_KEY` → the Claude provider activates                        |
| **OAuth / connections** | Sandbox connectors, `src/services/oauth.ts` (flagged `sandbox: true`) | Add real client ids + implement `authorizeUrl`/`exchangeCode` per provider |
| **Payments**   | Mock plan switch, `src/lib/billing-actions.ts`           | Wire Stripe Checkout + webhook                                              |

See [`.env.example`](.env.example) for every optional key.

---

## Architecture

```
src/
  app/
    (marketing)/         # public site — shared nav + footer
      page.tsx           # home
      how-it-works, about, pricing, blog, templates, legal/*
    app/                 # authenticated app — sidebar + topbar shell
      page.tsx           # dashboard ("what to do today" + earnings + chains)
      chains/[id]/       # ⭐ guided workspace (the core experience)
      templates, connections, earnings, content, achievements, billing, settings
    admin/               # role-gated internal dashboards (the data moat)
    login, signup, not-found
  components/
    ui/                  # Button + primitives (Card, Badge, Input, …) — shadcn-style
    brand/               # Logo, ChainFlow (A→B→C→₹), PlatformIcon, TemplateCard
    marketing/, app/     # section + page-specific components
  data/                  # SEED DATA AS DATA, not code
    templates.ts         # 6 chains; flagship Pinterest→Blog→Amazon fully built
    platforms.ts, plans.ts, blog.ts
  lib/
    types.ts             # domain model (mirrors prisma/schema.prisma)
    store.ts             # the single DB seam (mock)
    actions.ts           # server actions: start chain, complete step, generate, connect, earn
    billing-actions.ts, settings-actions.ts, admin-actions.ts
    limits.ts            # server-side plan-limit enforcement
    utils.ts             # cn(), inr(), timeAgo()
  services/
    auth.ts, ai.ts, oauth.ts   # provider abstractions (mock-first)
prisma/schema.prisma     # Postgres schema for the live build
```

### The core loop (guided workspace)
`/app/chains/[id]` is the heart of the product: a three-column workspace —
**left** step checklist (locked → active → done), **center** the current step's
task UI (set niche, connect account, generate AI draft + edit, insert affiliate
links, publish, track), **right** contextual help. Each completed step awards XP,
unlocks the next, and pushes the *time-to-first-earning* north-star forward.

### Design system
Premium fintech-meets-creator-tool. Dark navy hero + light content "sandwich",
teal/mint = money/growth, serif display (Fraunces) + Inter body, rounded cards,
icons-in-circles. Tokens are defined in `src/app/globals.css` via Tailwind v4
`@theme` (`bg-navy`, `text-mint`, `border-line`, …). Fully responsive, WCAG-AA
minded (focus states, aria labels, reduced-motion).

---

## Trust & honesty (by design)
- **No third-party passwords, ever.** OAuth tokens only, stored encrypted &
  revocable (`Connection.accessTokenEnc`). Surfaced as a feature throughout.
- **No guaranteed-income claims** anywhere. Earning figures are illustrative
  ranges with explicit disclaimers.
- **Your data is yours.** Export + delete account in `/app/settings`
  (GDPR / India-DPDP "right to erasure"). RLS on every user table in production.

---

## Tech stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Recharts · lucide-react · (Supabase + Prisma + Stripe + Claude for the live build).

## Scripts
| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (type-checked) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Build order (how this was built, MVP-first)
1. Foundation — design system, types, mock store, services, auth, marketing home.
2. Flagship chain end-to-end — guided workspace, connections, AI content, earnings.
3. Template system + marketplace (6 data-driven chains).
4. Dashboard + analytics + gamification.
5. Billing (plan tiers + usage gating).
6. Marketing polish + SEO + blog.
7. Admin + performance-data views.
