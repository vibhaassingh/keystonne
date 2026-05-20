# Keystonne

AI-powered commercial kitchen procurement platform for India.

Three product surfaces under one app:

- **Storefront** — dense B2B catalog for direct buyers (restaurants, hotels, cloud kitchens, institutions).
- **Partner Portal** — formalised commission network for chefs, consultants, designers, F&B managers.
- **AI Layer** — "Build my kitchen" wizard that turns a venture description into an equipment plan, plus BOQ → quote extraction.

> See [`CLAUDE.md`](./CLAUDE.md) for the full Phase 1 build brief — scope, tech-stack lock, taxonomy, defaults, sprint order, definition of done.

---

## Status

**Phase 1 — demo-grade, mock data only.** Investor / buyer walkthrough quality. No real auth, no DB writes, no LLM calls, no payments. See `CLAUDE.md §2` for the scope boundary.

All 10 sprints from `CLAUDE.md §11` are shipped. See [Sprint log](#sprint-log).

---

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run preview
```

Node 22 or 24 recommended (Hydrogen warns on 20; runs locally regardless).

---

## Stack

- [Shopify Hydrogen](https://hydrogen.shopify.dev/) (2026.4) + [React Router 7](https://reactrouter.com/) — framework + routing
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` — styling, theme tokens in [`app/styles/app.css`](./app/styles/app.css)
- [Lucide React](https://lucide.dev/) — icons
- [React Hook Form](https://react-hook-form.com/) — partner application, quote, contact forms
- `mock.shop` — Storefront API stand-in for Phase 1 (no credentials needed)
- JavaScript (TypeScript migration is a later decision)

---

## Five-minute demo walkthrough

The "investor test" path (`CLAUDE.md §9`):

| # | Click | Goal |
|---|---|---|
| 1 | `/` | Hero carousel, AI planner teaser, trust strip, 14-tile bento category grid, two product rows, partner band, footer |
| 2 | Mega-nav → "Refrigeration" | `/collections/refrigeration` — filter sidebar + 6 product cards |
| 3 | First product | `/products/reach-in-fridge-two-door` — gallery, spec table, dual CTA, tabs, related row |
| 4 | "Add to cart" on a stock item | Cart drawer slides over with live total + GST |
| 5 | "Continue to quote request" → `/quote` | React Hook Form, prefilled with cart items |
| 6 | `/business-type/cloud-kitchen` | Persona-specific hero + 3 pain cards + suggested kit |
| 7 | `/partner` | Emerald hero, 4-promise grid, How-It-Works, personas, commission table, tiers, payout pipeline, FAQ accordion |
| 8 | `/partner/apply` | 9-step application with React Hook Form; submit → success screen with reference |
| 9 | `/partner/login` → "Log in as Demo Partner" | `/partner/dashboard` — tier progress, 4 earnings tiles, referral panel, attention strip, recent deals |
| 10 | Sidebar → Deals → click a deal | Timeline with state-coloured dots, attached quote, commission card |
| 11 | Sidebar → Earnings | 11-row commission ledger with category, base, rate, amount, status |
| 12 | "Build my kitchen" from header | 5-step wizard → mesh-glass results page with chef narrative + grouped equipment + ₹ capex estimate |
| 13 | `/upload-boq` | Drop a file → mock parse table with confidence scores |

Every step works on `mock.shop` + browser `localStorage`. Console is clean.

---

## Project structure

```
app/
├── assets/                # (now unused — favicon lives in public/)
├── components/
│   ├── partner/           # PartnerShell, EarningsCard, TierProgressBar, DealStatusPill, ReferralLinkPanel
│   ├── AnnouncementBar, Header, MegaNav, Footer, PageLayout
│   ├── HeroCarousel, KitchenPlannerInput, TrustStrip
│   ├── FeaturedCategoriesGrid, FeaturedRow, ProductCard, SpecTable
│   ├── PartnerPromoBand, RequestQuoteCTA, QuoteCartDrawer
│   ├── Aside, KeystonneLogo
│   └── + Hydrogen scaffold components (CartLineItem, ProductForm, …)
├── graphql/, lib/
│   ├── mock/              # Phase 1 mock data
│   │   ├── categories.js, products.js, businessTypes.js
│   │   ├── partner.js, partnerProgram.js
│   │   ├── deals.js, quotes.js, ledger.js, payouts.js, resources.js
│   │   └── wizardRecommendations.js
│   ├── utils/             # formatINR, formatINRCompact, formatGST, formatDate, cn
│   ├── quoteCart.jsx      # localStorage cart context (replaces Hydrogen cart in Phase 1)
│   ├── usePartnerSession.js, context.js, fragments.js, session.js, …
├── routes/                # 30+ file-based routes — see Routes below
├── styles/
│   ├── app.css            # Tailwind v4 @theme tokens + .glass / .card / .btn-* helpers
│   └── reset.css          # (empty — Preflight does the reset)
└── root.jsx               # routes the storefront PageLayout for everything except /partner/dashboard/*
public/
├── brand/                 # Keystonne wordmark + monogram + monogram-mark SVGs
└── favicon.svg            # monogram on dark surface
```

---

## Routes

### Storefront

| Path | Purpose |
|---|---|
| `/` | Home — hero, planner teaser, trust strip, 14-tile category grid, two product rows, partner band |
| `/collections/:handle` | Category page with filter sidebar + product grid |
| `/collections/all` | Full catalog (every product across 13 categories) |
| `/products/:handle` | Product detail with gallery, spec table, dual CTA, tabs, related |
| `/cart` | Quote-cart full page (line items, GST split, totals) |
| `/quote` | Quote-request form (React Hook Form, success state) |
| `/business-type/:handle` | One of 14 persona landing pages |
| `/about` | About + 3 pillars + beliefs |
| `/contact` | Contact form + direct-reach details |
| `/admin` | Placeholder for Phase 2 admin console (lists planned modules) |

### Partner portal

| Path | Purpose |
|---|---|
| `/partner` | Programme landing — hero, promises, how-it-works, personas, commission table, tiers, payout pipeline, FAQ |
| `/partner/apply` | 9-step application form (persona → personal → business → tax → payout → portfolio → reference → agreements → review) |
| `/partner/login` | Demo login — "Log in as Demo Partner" sets `localStorage` flag |
| `/partner/signup` | Friendly redirect to `/partner/apply` |
| `/partner/dashboard` | Overview — tier progress, earnings tiles, referral, attention, recent deals |
| `/partner/dashboard/deals` | Deals list — filter chips + search + status pills |
| `/partner/dashboard/deals/new` | Register deal — project + client + line items + commission preview |
| `/partner/dashboard/deals/:id` | Deal detail — timeline, attached quote, commission, project meta |
| `/partner/dashboard/quotes` | Quotes list with state pills + commission preview |
| `/partner/dashboard/quotes/new` | Quote builder — pick deal, add line items, live totals |
| `/partner/dashboard/earnings` | 4 totals + 11-row commission ledger |
| `/partner/dashboard/payouts` | Requestable payout + past payouts with TDS breakdown |
| `/partner/dashboard/resources` | Spec sheets, CADs, training — tier-gated |
| `/partner/dashboard/profile` | Identity, payout, tax, programme settings |

### AI demo

| Path | Purpose |
|---|---|
| `/kitchen-planner` | 5-step wizard (venture → cuisine → scale → budget → review) |
| `/kitchen-planner/results` | Mesh-indigo hero + chef narrative + stations + equipment grouped by category + capex estimate |
| `/upload-boq` | Drop a file → mock parse table with confidence pills |

---

## What's mock vs real

| Surface | Phase 1 | Phase 2+ |
|---|---|---|
| Product catalog | mock.shop (Storefront API stand-in) + `app/lib/mock/products.js` for our 27-SKU mock catalog | Real Shopify Storefront API + admin-managed SKUs |
| Cart | `app/lib/quoteCart.jsx` — localStorage | Real Shopify cart / Hydrogen cart |
| Partner accounts | One hardcoded "Demo Partner" (Arjun Mehta) via localStorage flag | Supabase Auth |
| Deals · quotes · ledger · payouts | Static data in `app/lib/mock/` | Supabase tables + admin workflow |
| Kitchen Wizard | Curated `wizardRecommendations.js` keyed by venture × scale | Real LLM (Phase 4) |
| BOQ upload | File never uploaded; canned parse result | LLM-backed PDF/DOCX/XLSX extraction |
| Quote / contact / application submissions | console.log + success screen | POST to admin API |
| Commission invoicing / payouts | n/a | Zoho Books integration (Phase 3) |
| Admin console | `/admin` placeholder | Phase 2 |

---

## Brand assets

White-fill Keystonne logos in `public/brand/`:

- `keystonne-wordmark.svg` — header on the dark `ink` surface
- `keystonne-monogram.svg` — "K" + ®, compact contexts
- `keystonne-monogram-mark.svg` — bare "K", loading states / watermarks

Logos are white by construction — only render on `ink` (`#0A0D14`) or `brand-primary` / `partner-accent` surfaces.

---

## Design tokens

Defined in `app/styles/app.css` as a Tailwind v4 `@theme` block. Available as utilities (`bg-ink`, `text-brand-primary`, `border-brand-accent`, `ring-partner-accent`, etc.) and as CSS variables (`var(--color-ink)`).

| Token | Value | Notes |
|---|---|---|
| `ink` | `#0A0D14` | Header, body text, dark surfaces |
| `surface` | `#F7F7F5` | Page background (with subtle radial mesh) |
| `brand-primary` | `#3730A3` | Storefront accent (indigo) |
| `brand-accent` | `#F59E0B` | CTAs, sale flags (amber) |
| `partner-accent` | `#059669` | Partner-portal chrome (emerald) |

Layered surfaces: `.glass`, `.glass-strong`, `.glass-dark`, `.card`, `.card-hover` utility classes in `app.css`. Mesh-gradient surfaces: `.mesh-indigo`, `.mesh-emerald`, `.mesh-warm`.

Status-pill colors for the 13 deal states + 5 quote / ledger states are exposed as `--color-status-{state}`.

---

## Defaults (locked — see `CLAUDE.md §10`)

- ₹ with Indian comma grouping (`₹1,25,000`) — `formatINR()` / `formatINRCompact()`
- GST 18%, shown as a separate line — `gstFor(base)` returns `{base, gst, total}`
- Dates as `DD-MMM-YYYY` (`20-May-2026`) — `formatDate()`
- Delivery: 4–7 working days
- Quote / project lead-time: 4 weeks from advance
- Payment terms: 71% advance + 29% before dispatch
- Warranty: 1 year standard
- Installation: included if order > ₹10L; else ₹49,900 or 5% (whichever higher)
- English only, India only (Hydrogen `i18n: {language: 'EN', country: 'IN'}`)

---

## Sprint log

| # | Sprint | Commit |
|---|---|---|
| 1 | Foundation — CLAUDE.md, Tailwind theme, brand assets | `chore(foundation):` |
| 2 | Layout shell — header, mega nav, footer, drawers | `feat(layout):` |
| 3 | Storefront home — hero, planner input, trust strip, catalog rows | `feat(home):` |
| 4 | Catalog routes + liquid-glass visual refresh | `feat(catalog+ui):` |
| 5 | 14 business-type landing pages | `feat(business-types):` |
| 6 | Partner programme landing + 9-step application | `feat(partner):` |
| 7 | Partner dashboard shell with demo login | `feat(partner-portal):` |
| 8 | Partner deals / quotes / ledger / payouts / resources / profile | `feat(partner-portal):` |
| 9 | AI Kitchen Wizard + BOQ upload | `feat(ai-wizard):` |
| 10 | Polish — about, contact, admin placeholder, README finalisation | `chore(polish):` |

`git log --oneline` shows the full sequence.

---

## Phase 2 wire-up checklist

When the demo gets the green light:

1. Provision a Supabase project (via the available MCP)
2. Apply migrations for `partners`, `partner_applications`, `deals`, `deal_line_items`, `commission_rules`, `commission_ledger`, `payouts`, `referral_events`, `resources` (see the plan file at `~/.claude/plans/just-create-a-comprehensive-purring-rainbow.md` for the schema)
3. Replace `useQuoteCart` (localStorage) with Hydrogen cart against a real Shopify dev store
4. Replace `usePartnerSession` (localStorage flag) with Supabase Auth (email OTP + Google OAuth)
5. Wire referral attribution (cookie → cart attribute → webhook → `commission_ledger` accrual)
6. Wire the admin routes (`/admin/*`) — application approvals, commission rules, payout batches (Zoho Books integration)
7. Real LLM for Kitchen Wizard + BOQ extraction (Phase 4)

---

## License

Private — Keystonne, all rights reserved.
