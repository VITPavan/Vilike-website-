# VILIKE FAB TECH — Machine Dealer Website

Next.js 14 + Tailwind + Supabase-ready app for VILIKE circular knitting machines (Tirupur agent).

## Quick start

```bash
cd vlike-machines
npm install
npm run dev
```

Open **http://localhost:3000**

## Demo logins

| Role | Email | Password |
|------|-------|----------|
| Customer | `customer@demo.com` | `demo123` |
| Admin (Dad) | `admin@vilikefab.com` | `demo123` |

## Demo MSN tracking

**`9876543210`** — sample 10-digit Indian tracking number (Xiamen → MSN Logistics → Chennai).

## Features

| Area | Routes |
|------|--------|
| Public site | `/` — models, reviews, cloth samples, finance, crane services |
| Machine explorer | `/machines/[slug]` — hotspots, German engineering, per-model reviews |
| Customer portal | `/dashboard` — orders, shipment tracker, payments, LC/GST, documents |
| Admin | `/admin` — revenue, customers, status updates, MSN tracking, machine edit |

## API routes

- `GET /api/machines` — catalog
- `GET/PATCH /api/orders` — orders (admin PATCH status)
- `GET /api/customers` — admin only
- `GET/PATCH /api/tracking` — shipment + MSN refresh
- `POST /api/eligibility` — finance eligibility lead
- `POST /api/auth/login` | `POST /api/auth/logout`

## Connect Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_schema.sql` then `002_seed.sql`
3. Enable Email auth; create users; set `profiles.role` to `admin` or `customer`
4. Copy `.env.local.example` → `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Deploy to [Vercel](https://vercel.com) and add the same env vars

## Deploy checklist

- [ ] Supabase migrations applied
- [ ] Admin user created with `role = admin`
- [ ] Env vars on Vercel
- [ ] Machine images in `public/images/`

## Project structure

```
app/           pages + API routes
components/    UI (MachineExplorer, ShipmentTracker, FinanceCalc, …)
lib/           demo data, auth, types (works offline without Supabase)
supabase/      SQL migrations + seed
public/images/ machine photos + vilike-logo.svg
```

## Note on bank apps

Finance calculator provides **estimates only**. Live CIBIL/bank app integration requires official bank APIs — use WhatsApp CTA for real eligibility checks.
