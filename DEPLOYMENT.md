# MoneyChains — Deployment Guide

## Quick Deploy (Vercel + Free Tier)

### Prerequisites
- GitHub account (repo pushed to https://github.com/Maxiemad/Money-chains)
- Vercel account (free tier)

### Step 1: Deploy the App (`moneychains/`)

```bash
# On Vercel dashboard:
# 1. New Project → Import Git Repo → Money-chains
# 2. Root Directory: moneychains
# 3. Framework: Next.js (auto-detected)
# 4. Environment Variables: (none required for mock-first, see below for optional real services)
# 5. Deploy

# Or via CLI:
cd moneychains
vercel --prod
```

**Result:** App deployed to `https://moneychains.vercel.app` (or your custom domain)  
**Note:** Mock-first mode works immediately. No keys/config needed.

---

### Step 2: Deploy the Landing Page (`moneychains-landing/`)

```bash
# On Vercel dashboard:
# 1. New Project → Import Git Repo (same repo) → Money-chains
# 2. Root Directory: moneychains-landing
# 3. Framework: Vite
# 4. Build: npm run build
# 5. Output: dist
# 6. Environment Variables:
#    - VITE_APP_URL = https://moneychains.vercel.app (or your app domain)
# 7. Deploy

# Or via CLI:
cd moneychains-landing
VITE_APP_URL=https://moneychains.vercel.app vercel --prod
```

**Result:** Landing deployed to `https://moneychains-landing.vercel.app` (or custom domain)  
**Important:** All CTA buttons now point to your live app.

---

## Environment Variables (Optional — Real Services)

The apps run perfectly with **zero env vars** (mock-first). Add these only when you want to wire real services:

### App (`moneychains/.env.production`)

```bash
# Optional: Real database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx:5432/postgres

# Optional: Real AI (Claude)
CLAUDE_API_KEY=sk-ant-xxx
CLAUDE_MODEL=claude-opus-4-8

# Optional: Real billing (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Optional: Real auth (NextAuth)
NEXTAUTH_SECRET=openssl rand -base64 32

# Site URL (for OG tags, redirects)
NEXT_PUBLIC_SITE_URL=https://moneychains.vercel.app
```

### Landing (`moneychains-landing/.env.production`)

```bash
# Where the app lives (all CTAs point here)
VITE_APP_URL=https://moneychains.vercel.app
```

---

## Verification Checklist

After deploying, test these in production:

- [ ] Landing page loads (hero + background video visible)
- [ ] All CTAs ("Start free", "Choose plan", etc.) redirect to app
- [ ] App `/signup` page loads
- [ ] App `/login` page works (demo login functional)
- [ ] Mock demo works: login with `demo@moneychains.app` (any password)
- [ ] `/app/templates` shows 52 chains
- [ ] `/app/connections` shows all 42 platforms
- [ ] Color theme is lavender/purple (not blue)
- [ ] Watermark reads "Pick a chain. Start earning."

---

## Architecture

**Landing** (Vite, 342 KB gzipped):
- Dark cinematic gradient with purple spiral background
- All CTAs → app signup
- Marketing messaging + demo mockup

**App** (Next.js, mock-first):
- Zero external keys needed
- All data in-memory (survives page refresh within a session)
- Guided chain workspace (52 templates, 42 platforms)
- Demo seeded: `demo@moneychains.app`

---

## Real Services (When Ready)

To wire real services, see the detailed guide in the main [README.md](README.md):
- **Claude API** — real AI drafts
- **Supabase** — real DB + persistence
- **Stripe** — real billing
- **OAuth** — real platform connections (one at a time)

Start with **Claude** (easiest, 15 min). Database + Stripe next. OAuth last (platform-specific setup).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Landing CTAs point to localhost | Set `VITE_APP_URL` env var on Vercel landing project |
| App shows 404 | Check `NEXT_PUBLIC_SITE_URL` is set correctly |
| Connections page blank | Reload — mock data loads on-demand |
| Demo login fails | Make sure `/login` page form submits (server action) |
| Color is still blue | Clear browser cache; rebuild with `npm run build` |

---

## Support

- **Code:** https://github.com/Maxiemad/Money-chains
- **Issue:** GitHub Issues (this repo)
- **Contact:** hello@moneychains.app
