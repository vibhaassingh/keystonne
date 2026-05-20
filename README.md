# Keystonne

AI-powered commercial kitchen procurement platform for India.

Three product surfaces under one app:

- **Storefront** — dense B2B catalog for direct buyers (restaurants, hotels, institutions).
- **Partner Portal** — formalised commission network for chefs, consultants, designers, procurement.
- **AI Layer** — "Build my kitchen" wizard that turns a venture description into an equipment plan.

> See [`CLAUDE.md`](./CLAUDE.md) for the full Phase 1 build brief — scope, tech-stack lock, taxonomy, defaults, sprint order, definition of done.

---

## Status

**Phase 1 — demo-grade, mock data only.** Investor/buyer walkthrough quality. No real auth, no DB writes, no LLM calls, no payments. See `CLAUDE.md §2` for the scope boundary.

---

## Stack

- [Shopify Hydrogen](https://hydrogen.shopify.dev/) + [React Router 7](https://reactrouter.com/) — framework + routing
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) — styling, theme tokens in `app/styles/app.css`
- [Lucide React](https://lucide.dev/) — icons
- [React Hook Form](https://react-hook-form.com/) — partner application + quote builder forms
- `mock.shop` — Storefront API stand-in for Phase 1 (no credentials needed)
- JavaScript (TypeScript migration is a later decision)

---

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run preview
```

Node 22 or 24 is recommended (Hydrogen warns on Node 20; it still runs locally).

---

## Project structure

```
app/
├── assets/              # favicon
├── components/          # PageLayout, Header, Footer, ProductItem, Cart…
├── graphql/             # Storefront API queries
├── lib/
│   ├── mock/            # Phase 1 mock data (partners, deals, products, …)
│   └── utils/           # formatINR, formatGST, formatDate, dealStatus, tierUtils
├── routes/              # file-based routes
│   ├── _index.jsx                          # storefront home
│   ├── collections.$handle.jsx             # collection page (one per category)
│   ├── products.$handle.jsx                # product detail
│   ├── cart.jsx, quote.jsx                 # cart + quote-request
│   ├── business-type.$handle.jsx           # business-type landing pages
│   ├── partner.*.jsx                       # partner marketing + dashboard
│   ├── kitchen-planner.*.jsx, upload-boq.jsx  # AI demo
│   └── admin.jsx                           # placeholder
├── styles/              # app.css (Tailwind + tokens), reset.css
└── root.jsx
public/
└── brand/               # Keystonne wordmark, monogram, monogram-mark
```

---

## What's mock vs real

| Surface | Phase 1 | Phase 2+ |
|---|---|---|
| Product catalog | mock.shop (Storefront API stand-in) | Real Shopify Storefront API |
| Cart | Hydrogen cart on mock.shop | Real Shopify cart |
| Partner accounts | One hardcoded "Demo Partner" via localStorage flag | Supabase Auth |
| Deals · quotes · commission ledger · payouts | Static data in `app/lib/mock/` | Supabase tables + admin workflow |
| Kitchen Wizard recommendations | Curated mock JSON keyed by business-type | Real LLM (Phase 4) |
| Commission invoicing / payouts | n/a | Zoho Books integration (Phase 3) |
| Admin console | Placeholder route | Phase 2 |

---

## Brand assets

White-fill Keystonne logos in `public/brand/`:

- `keystonne-wordmark.svg` — full wordmark, used in the header on the dark `ink` surface
- `keystonne-monogram.svg` — "K" mark with ®, compact contexts
- `keystonne-monogram-mark.svg` — bare "K", loading states / watermarks

Logos are white by construction; pair only with `ink` (`#0B0F14`) or `brand-primary` (`#0E3B6A`) backgrounds.

---

## Design tokens

Defined in `app/styles/app.css` as a Tailwind v4 `@theme` block. Available as utilities (`bg-ink`, `text-brand-primary`, `border-brand-accent`, etc.) and CSS variables (`var(--color-ink)`).

| Token | Value |
|---|---|
| `ink` | `#0B0F14` |
| `surface` | `#FAFAF7` |
| `brand-primary` | `#0E3B6A` |
| `brand-accent` | `#D97706` |
| `partner-accent` | `#047857` |

Status-pill colors for the 13 deal states are exposed as `--color-status-{state}`.

---

## Defaults (locked — see `CLAUDE.md §10`)

- ₹ with Indian comma grouping (`₹1,25,000`)
- GST 18%, shown as a separate line
- Dates as `DD-MMM-YYYY` (`20-May-2026`)
- Delivery: 4–7 working days
- Quote lead-time: 4 weeks from advance
- Payment terms: 71% advance + 29% before dispatch
- Warranty: 1 year standard
- Installation: included if order > ₹10L, else ₹49,900 or 5% (whichever higher)
- English only, India only

---

## License

Private — Keystonne, all rights reserved.
