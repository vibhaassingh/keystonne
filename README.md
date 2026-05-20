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

All 10 sprints from `CLAUDE.md §11` shipped, then the visual layer was re-cut as an **Apple-inspired premium redesign** across nine additional sprints — graphite-white surfaces, hairline borders, calm gradients, focused single-CTA pages, with strict action-colour discipline. See [Design system](#design-system).

---

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run preview
```

Node 22 or 24 recommended (Hydrogen warns on 20; runs locally regardless).

Lint: `npm run lint` — zero errors / zero warnings as of Sprint 9 polish.

---

## Stack

- [Shopify Hydrogen](https://hydrogen.shopify.dev/) (2026.4) + [React Router 7](https://reactrouter.com/) — framework + routing (deployed in SPA mode via `@vercel/react-router`)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` — styling
- [Lucide React](https://lucide.dev/) — icons
- [React Hook Form](https://react-hook-form.com/) — partner application, quote, contact forms
- `mock.shop` — Storefront API stand-in for Phase 1 (no credentials needed)
- JavaScript (TypeScript migration is a later decision)

Deployed to https://keystonne.vercel.app.

---

## Five-minute demo walkthrough

The "investor test" path (`CLAUDE.md §9`):

| # | Click | Goal |
|---|---|---|
| 1 | `/` | Apple-hero with editorial headline, planner input, trust strip, 14-tile category grid, featured products row, partner promo band, footer |
| 2 | Mega-nav → "Refrigeration" | `/collections/refrigeration` — editorial category header, hairline filter rail, dense product grid |
| 3 | First product | `/products/reach-in-fridge-two-door` — neutral gallery, sticky commercial-buy-box with dual CTA, segmented underline tabs |
| 4 | "Add to quote" on a stock item | Apple-checkout drawer slides over with hairline rows + amber Request a quote |
| 5 | "Continue to quote request" → `/quote` | React Hook Form with calm inputs + sticky bundle |
| 6 | `/business-type/cloud-kitchen` | Editorial solution hero + at-a-glance stat + 3 numbered pain cards + planner band |
| 7 | `/partner` | "Turn kitchen influence into transparent commission" hero with SampleCommissionCard, Promises, How-It-Works, Personas, CommissionTable, Tiers, Payout pipeline, FAQ |
| 8 | `/partner/apply` | 9-step application with left progress rail; submit → SuccessScreen with emerald check |
| 9 | `/partner/login` → "Log in as Demo Partner" | `/partner/dashboard` — apple-nav with "Partner workspace" emerald chip, tier progress, 4 finance cards, referral, recent deals |
| 10 | Sidebar → Deals → click a deal | Hairline timeline with status-dot rail, attached quote, emerald commission card |
| 11 | Sidebar → Earnings | 4 EarningsCards (accrued/approved/paid/on-hold) + spec-hairline ledger |
| 12 | "Build my kitchen" from header | 5-step Apple stepper → editorial results page with chef narrative + station-grouped equipment + commercial-buy-box capex estimate |
| 13 | `/upload-boq` | Dashed-blue drop zone → mock parse table with calm Confidence pills |

Every step works on `mock.shop` + browser `localStorage`. Console is clean.

---

## Project structure

```
app/
├── components/
│   ├── partner/           # PartnerShell, EarningsCard, TierProgressBar, DealStatusPill, ReferralLinkPanel
│   ├── AnnouncementBar, Header, MegaNav, Footer, PageLayout, Aside
│   ├── Hero, KitchenPlannerInput, TrustStrip
│   ├── FeaturedCategoriesGrid, FeaturedRow, ProductCard, SpecTable
│   ├── PartnerPromoBand, RequestQuoteCTA, QuoteCartDrawer, KeystonneLogo
│   └── + Hydrogen scaffold components (CartLineItem, ProductForm, …)
├── lib/
│   ├── mock/              # Phase 1 mock data
│   │   ├── categories.js, products.js, businessTypes.js
│   │   ├── partner.js, partnerProgram.js
│   │   ├── deals.js, quotes.js, ledger.js, payouts.js, resources.js
│   │   └── wizardRecommendations.js
│   ├── utils/             # formatINR, formatINRCompact, formatGST, formatDate, cn
│   ├── quoteCart.jsx      # localStorage cart context
│   ├── usePartnerSession.js, context.js, fragments.js, session.js, …
├── routes/                # 30+ file-based routes — see Routes below
├── styles/
│   ├── app.css            # Tailwind v4 @theme + :root --ks-* tokens + Apple component classes
│   └── reset.css          # (empty — Preflight does the reset)
└── root.jsx               # wraps everything in PageLayout (PartnerShell handles its own chrome)
public/
├── brand/                 # Keystonne wordmark + monogram + monogram-mark SVGs
└── favicon.svg            # monogram on dark surface
```

---

## Routes

### Storefront

| Path | Purpose |
|---|---|
| `/` | Home — Hero, planner input, trust strip, 14-tile category grid, featured products, partner band |
| `/collections/:handle` | Category page with sticky hairline filter rail + 3-col product grid |
| `/products/:handle` | Product detail with gallery, spec table, sticky buy-box, segmented tabs, related |
| `/cart` | Apple-checkout cart (line items + sticky buy-box summary) |
| `/quote` | Quote-request form (RHF, success state with emerald check) |
| `/business-type/:handle` | One of 14 venture-specific landing pages |
| `/search?q=…` | Mock search across products, categories, and venture types |
| `/about` | About + 3 pillars + beliefs panel |
| `/contact` | Contact form + direct-reach details + Already-a-partner blue tint |
| `/admin` | Placeholder for Phase 2 admin console (lists planned modules) |

### Partner portal

| Path | Purpose |
|---|---|
| `/partner` | Programme landing — Hero w/ SampleCommissionCard, Promises, How-It-Works, Personas, CommissionTable, Tiers, Payout pipeline, FAQ, FinalCTA |
| `/partner/apply` | 9-step application — desktop progress rail + mobile top dots |
| `/partner/login` | Demo login — "Log in as Demo Partner" sets `localStorage` flag |
| `/partner/signup` | Centred redirect to `/partner/apply` |
| `/partner/dashboard` | Overview — apple-nav with workspace chip, tier progress, 4 finance cards, referral, attention strip, recent deals, NBA cards |
| `/partner/dashboard/deals` | Deals list — calm pill filter rail + search + status pills |
| `/partner/dashboard/deals/new` | Register a deal — premium-panel fieldsets + sticky finance summary + emerald submit |
| `/partner/dashboard/deals/:id` | Deal detail — KPI cards, hairline timeline, attached quote, emerald commission |
| `/partner/dashboard/quotes` | Quotes list — premium-cards with ink subtotal + emerald commission |
| `/partner/dashboard/quotes/new` | Quote builder — pick deal, add line items, live totals + emerald commission row |
| `/partner/dashboard/earnings` | 4 finance cards (accrued/approved/paid/on hold) + spec-hairline ledger |
| `/partner/dashboard/payouts` | Hero ₹ available + Request payout (emerald) + past-payouts table |
| `/partner/dashboard/resources` | Tier-gated spec sheets, CADs, training |
| `/partner/dashboard/profile` | Identity, payout, tax, programme settings — 4 premium-panels |

### AI demo

| Path | Purpose |
|---|---|
| `/kitchen-planner` | 5-step wizard (venture → cuisine → scale → budget → review) on calm stepper + premium-panel stage |
| `/kitchen-planner/results` | Editorial apple-hero w/ capex estimate buy-box + chef narrative + stations + equipment grouped by 14 categories |
| `/upload-boq` | Dashed-blue drop zone → mock parse table w/ Confidence pills + amber Request-as-a-quote |

---

## Design system

The visual layer was re-cut in nine sprints from the original liquid-glass Phase 1 build. Goal: Apple-inspired premium procurement — bright graphite-white surfaces, hairline borders, calm gradients, focused single-CTA pages — while preserving the B2B information density a procurement audience expects.

### Tokens — `app/styles/app.css`

Two layers:

**`@theme` block** — minimal Tailwind tokens
- `--font-sans` (Inter) + `--font-display` (Inter Tight)
- `--color-status-{draft|submitted|review|protected|conflict|quoted|won|installed|accrued|approved|paid|lost|expired}` for the 13 deal states + 5 quote / ledger states

**`:root` block** — the full Apple system, used inline via `style={{color: 'var(--ks-…)'}}`
- Surfaces: `--ks-page` `#f5f5f7`, `--ks-card-solid` `#ffffff`, `--ks-card-tint` `#fafafa`
- Type: `--ks-ink` `#1d1d1f`, `--ks-ink-2` `#424245`, `--ks-muted` `#6e6e73`
- Lines: `--ks-line`, `--ks-line-soft`, `--ks-line-strong`
- Action colours (reserved usage — see below): `--ks-amber`, `--ks-emerald`, `--ks-blue`, each with `-dark` and `-soft` variants
- Radii: `--ks-radius-{sm|md|lg|xl|2xl}`
- Shadows: `--ks-shadow-card`, `--ks-shadow-card-hover`, `--ks-shadow-float`, `--ks-shadow-button`

### Action-colour discipline

This rule is enforced across every surface — it's what keeps the visual language calm despite the density:

| Colour | Use only for | Example |
|---|---|---|
| **Amber** (`--ks-amber`, `.apple-button-amber`) | Procurement / commercial action | Add to quote · Request a quote · Continue to quote |
| **Emerald** (`--ks-emerald`, `.partner-action`) | Partner money / status / action | Register a deal · Request payout · Paid commission figures |
| **Blue** (`--ks-blue`) | System links + AI guidance | "Talk to procurement" · "Build my kitchen" wizard final CTA · AI Sparkles eyebrows · Confidence pills ≥95% |
| **Ink** (`--ks-ink`, `.apple-button-primary`) | Default neutral | "Browse" · "Plan another" · Stepper "Continue" · Errors / Back |

### Composable component classes

| Class | Purpose |
|---|---|
| `.apple-nav` | Translucent sticky topbar with hairline border (used by Header and PartnerShell) |
| `.apple-hero` | Editorial 28-radius container with subtle white→tint gradient |
| `.apple-eyebrow` | Small uppercase 12px tracking-0.06em eyebrow text |
| `.apple-display` | Clamp-scaled display headline (32–60px) |
| `.apple-subhead` | Calmer subhead variant |
| `.apple-link` | Blue text link with subtle underline-on-hover |
| `.apple-button-primary` | Ink graphite pill — default primary action |
| `.apple-button-amber` | Procurement pill — Add to quote / Request a quote |
| `.apple-button-ghost` | Hairline ghost pill — secondary actions |
| `.premium-panel` | White card, 28-radius, hairline border, soft drop |
| `.premium-card` | Same look but 22-radius, with hover lift |
| `.partner-finance-card` | 22-radius white card for ₹ figures — used by EarningsCard and partner summaries |
| `.partner-action` | Emerald pill — partner money / status / action |
| `.spec-hairline-table` | Reset table with hairline row dividers, tabular nums, uppercase muted heads, `.num` for right-aligned tabular cells |
| `.commercial-buy-box` | Sticky ₹ buy-box on PDP, quote, kitchen-planner results |
| `.procurement-strip` | Sticky procurement bar — Talk-to-procurement + Request-quote pair |
| `.wizard-stage` | Centred 720-max wizard stage container with float shadow |
| `.apple-divider` | Hairline horizontal divider |

Inline `style={{...}}` is used liberally for one-off colour assignments because Tailwind v4 utility classes are scoped to the `@theme` palette only — and we kept that palette intentionally tiny.

### Imagery

No stock product photography. Product cards and category tiles use a calm Lucide icon on a `--ks-card-tint` chip; product images are a soft linear-gradient block keyed off the product's `accent` colour.

---

## What's mock vs real

| Surface | Phase 1 | Phase 2+ |
|---|---|---|
| Product catalog | mock.shop + `app/lib/mock/products.js` (27 SKUs) | Real Shopify Storefront API + admin-managed SKUs |
| Cart | `app/lib/quoteCart.jsx` — localStorage | Real Shopify cart / Hydrogen cart |
| Partner accounts | One hardcoded "Demo Partner" (Arjun Mehta) via localStorage flag | Supabase Auth (email OTP + Google OAuth) |
| Deals · quotes · ledger · payouts | Static data in `app/lib/mock/` | Supabase tables + admin workflow |
| Kitchen Wizard | Curated `wizardRecommendations.js` keyed by venture × scale | Real LLM (Phase 4) |
| BOQ upload | File never uploaded; canned parse result | LLM-backed PDF/DOCX/XLSX extraction |
| Quote / contact / application submissions | `console.log` + success screen | POST to admin API |
| Commission invoicing / payouts | n/a | Zoho Books integration (Phase 3) |
| Admin console | `/admin` placeholder | Phase 2 |

---

## Brand assets

White-fill Keystonne logos in `public/brand/`:

- `keystonne-wordmark.svg` — header on dark surface, footer
- `keystonne-monogram.svg` — "K" + ®, compact contexts
- `keystonne-monogram-mark.svg` — bare "K", loading states / watermarks

Logos render directly on dark surfaces. On light surfaces (the Apple-style header, footer, partner topbar), `<KeystonneLogo tone="dark" />` applies `filter: brightness(0); opacity: 0.88` so the same source SVG reads as a graphite mark.

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
- English only, India only

---

## Sprint log

### Phase 1 build (10 sprints)

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

### Apple-inspired redesign (9 sprints)

| # | Sprint | Commit |
|---|---|---|
| 0 | Audit current liquid-glass surfaces | `chore(redesign):` |
| 1 | Add Apple-inspired premium tokens to `app.css` (additive) | `feat(design-system):` |
| 2 | Refresh layout shell (Header, MegaNav, Footer, AnnouncementBar, Aside) | `feat(layout):` |
| 3 | Redesign storefront home (Hero, planner input, trust strip, featured grid, partner band) | `feat(home):` |
| 4 | Catalog redesign (collection, PDP, cart, quote) | `feat(catalog):` |
| 5 | 14 business-type landing pages | `feat(business-types):` |
| 6 | Partner landing + application + login + signup | `feat(partner):` |
| 7 | Partner dashboard shell + 10 sub-routes | `feat(partner-dashboard):` |
| 8 | AI kitchen planner + BOQ upload | `feat(ai):` |
| 9 | Polish — strip legacy CSS, fix lint, refresh About/Contact/Admin/Search, README rewrite, responsive QA | `chore(polish):` |

CSS bundle dropped from a peak of 70 kB (Sprint 1 of redesign, still carrying both systems) to ~44 kB (Sprint 9, Apple system only).

`git log --oneline` shows the full sequence.

---

## Phase 2 wire-up checklist

When the demo gets the green light:

1. Provision a Supabase project (via the available MCP)
2. Apply migrations for `partners`, `partner_applications`, `deals`, `deal_line_items`, `commission_rules`, `commission_ledger`, `payouts`, `referral_events`, `resources`
3. Replace `useQuoteCart` (localStorage) with Hydrogen cart against a real Shopify dev store
4. Replace `usePartnerSession` (localStorage flag) with Supabase Auth (email OTP + Google OAuth)
5. Wire referral attribution (cookie → cart attribute → webhook → `commission_ledger` accrual)
6. Wire the admin routes (`/admin/*`) — application approvals, commission rules, payout batches (Zoho Books integration)
7. Real LLM for Kitchen Wizard + BOQ extraction (Phase 4)

---

## License

Private — Keystonne, all rights reserved.
