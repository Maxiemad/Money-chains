# MoneyChains

**The Zapier for making money online.** Pick a proven *money chain* — a template
that connects platforms into one working income engine (e.g. *Pinterest → Blog →
Amazon Affiliate*) — connect your accounts, get guided step-by-step, and track
real revenue in one dashboard.

This repository contains the full product:

| Folder | What it is | Stack | Dev |
| --- | --- | --- | --- |
| [`moneychains/`](moneychains) | The product — marketing site **+** authenticated app (dashboards, guided chain workspace, 50+ templates, connections, earnings, billing, admin). Runs mock-first with zero setup. | Next.js 16 · React 19 · TS · Tailwind v4 · Recharts · Framer Motion | `cd moneychains && npm install && npm run dev` → :3000 |
| [`moneychains-landing/`](moneychains-landing) | A premium cinematic landing page (dark, glassy, looping background video, liquid-glass cards, shiny gradient headline). | Vite · React · TS · Tailwind 3 · motion/react | `cd moneychains-landing && npm install && npm run dev` → :5173 |

## Quick start

```bash
# the app
cd moneychains && npm install && npm run dev        # http://localhost:3000

# the landing page (in another terminal)
cd moneychains-landing && npm install && npm run dev # http://localhost:5173
```

The landing page's CTAs point at the app via `VITE_APP_URL` (defaults to
`http://localhost:3000`). Set it to your deployed app URL for production.

## Highlights
- **50+ data-driven money-chain templates** across Affiliate, Content/Video,
  Digital Products, Newsletter, E-commerce, and Lead-gen — added as data, not code.
- **Guided chain workspace** — the core loop: connect accounts → AI drafts content
  you edit → publish → track every rupee with UTM attribution.
- **Mock-first architecture** — Supabase, Stripe, Claude, and platform OAuth all sit
  behind clean interfaces with working mocks, so everything is clickable with no keys.
  See [`moneychains/README.md`](moneychains/README.md) for the real-vs-mocked map.
- **Honest by design** — OAuth tokens only (never passwords), no guaranteed-income
  claims, data export/delete (GDPR / India-DPDP).

## Demo logins (app)
- User: `demo@moneychains.app` (any password) — seeded mid-journey through the flagship chain.
- Admin: `admin@moneychains.app` — or open `/admin → Enter admin demo`.
