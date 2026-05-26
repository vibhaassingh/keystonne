# Keystonne — Engineering Handoff

_Last updated against commit `c9076e7` (origin/main)._

This doc gets a new engineer (or future-you) productive on Keystonne in ~15 minutes. For the full product brief see [`CLAUDE.md`](./CLAUDE.md); for structure and the demo walkthrough see [`README.md`](./README.md). This file is the operational layer: what's shipped, where it lives, how to run/ship it, and the traps.

---

## 1. What this is

Keystonne is a **Phase 1, demo-grade, mock-data** B2B commercial-kitchen procurement platform for India. Three surfaces in one React Router app:

- **Storefront** — dense catalog, collection pages, PDPs, cart, quote request
- **Partner Portal** — commission network: landing, 9-step application, demo dashboard (deals / quotes / earnings / payouts / resources / profile)
- **AI Layer** — "Build my kitchen" 5-step wizard + BOQ upload (both mocked)

Everything runs on `mock.shop` + local mock data + browser `localStorage`. There is **no backend** — no auth, DB, payments, real AI, email/SMS/WhatsApp, or PDF generation. That's intentional (CLAUDE.md §2). The bar is "an investor believes it in 5 minutes," not "a customer can transact."

---

## 2. Where things live

| | |
|---|---|
| **Live** | https://keystonne.vercel.app |
| **Repo** | https://github.com/vibhaassingh/keystonne (branch `main`) |
| **Local** | `/Users/vibhaassingh/Keystonne Native/storefront` |
| **Vercel project** | scope `kerning-ooo` (`.vercel/project.json` is committed) |

---

## 3. Run / build / ship

```bash
npm install --legacy-peer-deps   # peer-dep ranges need the flag
npm run dev                      # local dev (react-router dev)
npm run build                    # production build (SPA mode)
npm run preview                  # serve the build locally
npm run lint                     # eslint — keep this at 0/0
```

**Node `^22 || ^24`.** Deps are deliberately minimal: `react-router` 7, `@vercel/react-router`, `lucide-react`, `react-hook-form`, `isbot`. **Do not add top-level dependencies without a one-line justification** (CLAUDE.md §3) — default answer is no.

### Deploying — READ THIS FIRST ⚠️

**Deploys are pushed from local files via the Vercel CLI, _not_ triggered by git.**

```bash
vercel deploy --prod --yes --scope kerning-ooo
```

This is the single biggest gotcha on the project. `vercel deploy` uploads your **local working tree**, so it's entirely possible to have a fully-deployed live site while `origin/main` is many commits behind. That exact desync caused a long false-alarm in this project's history ("the redesign didn't land!" — it had; GitHub just hadn't been pushed). 

**Rule: always `git push origin main` in the same step as you deploy.** Keep the live site and GitHub in lockstep so nobody reviews stale source.

### Verifying a deploy

SPA mode means the shell loads before React hydrates — an immediate screenshot shows a blank graphite page. Wait ~8–10s after deploy, or re-query. When checking rendered state from a headless/remote environment, prefer **commit-pinned GitHub permalinks** (`/blob/<sha>/...`) over branch views, which can serve cached file content.

---

## 4. Design system (the important part)

The visual system is **Apple-inspired premium** — bright graphite-white surfaces, hairline borders, calm gradients, editorial type, focused single-CTA pages — layered over **WebstaurantStore-grade catalog density** (in progress; see §6). The previous "liquid-glass" system (mesh gradients, glass panels, indigo) was fully stripped in the redesign; **do not reintroduce it.**

### Tokens — `app/styles/app.css`

Two layers:

- **`@theme`** — minimal Tailwind tokens: `--font-sans` (Inter), `--font-display` (Inter Tight), and `--color-status-*` (the 13 deal states + quote/ledger states). That's deliberately tiny — most colour lives in `:root`.
- **`:root`** — the full `--ks-*` set used inline via `style={{color: 'var(--ks-ink)'}}`:
  - Surfaces: `--ks-page` `#f5f5f7`, `--ks-card-solid` `#fff`, `--ks-card-tint` `#fafafa`
  - Type: `--ks-ink` `#1d1d1f`, `--ks-ink-2` `#424245`, `--ks-muted` `#6e6e73`
  - Lines: `--ks-line` / `--ks-line-soft` / `--ks-line-strong`
  - Action colours (`-dark` / `-soft` variants each): `--ks-amber`, `--ks-emerald`, `--ks-blue`
  - Radii `--ks-radius-{sm..2xl}`, shadows `--ks-shadow-{card,card-hover,float,button}`

Tailwind utilities are scoped to that tiny `@theme` palette on purpose, so **inline `style={{...}}` with `var(--ks-*)` is the norm**, not a smell. Don't reach for `text-ink` / `bg-brand-*` utilities — those tokens were removed.

### Action-colour discipline (enforced everywhere)

This is what keeps a dense B2B catalog feeling calm. Respect it in every new surface:

| Colour | Reserved for | Class |
|---|---|---|
| **Amber** | procurement / commercial intent only — Add to quote, Request a quote, Continue to quote | `.apple-button-amber` |
| **Emerald** | partner money / status / action only — Register a deal, Request payout, paid-commission figures, tier multipliers | `.partner-action` |
| **Blue** | system links + AI guidance — "Build my kitchen", Talk to procurement, AI eyebrows, ≥95% confidence | `var(--ks-blue)` |
| **Ink** | default neutral — Browse, Plan another, success flashes, Back | `.apple-button-primary` |

Two carve-outs we accept: form-submit success states and stepper "done" indicators use emerald because green-success is too universal a UX convention to fight. Everything else follows the table.

### Composable classes

`apple-nav` · `apple-hero` · `apple-eyebrow` · `apple-display` · `apple-subhead` · `apple-link` · `apple-button-{primary,amber,ghost}` · `premium-panel` · `premium-card` · `partner-finance-card` · `partner-action` · `spec-hairline-table` (+ `.num` for right-aligned tabular cells) · `commercial-buy-box` · `procurement-strip` · `wizard-stage` · `apple-divider`

Image system classes (§6): `product-image-frame` · `category-image-tile` · `merch-image-card` · `station-image-card` · `pdp-gallery` · `pdp-thumb` · `image-count-pill`

---

## 5. Code map

```
app/
├── styles/app.css            # the entire design system (tokens + classes)
├── root.jsx                  # wraps routes in PageLayout; error boundary
├── components/               # 25 components
│   ├── Header, MegaNav, Footer, AnnouncementBar, PageLayout, Aside
│   ├── Hero, KitchenPlannerInput, TrustStrip, FeaturedCategoriesGrid,
│   │   FeaturedRow, ProductCard, SpecTable, PartnerPromoBand,
│   │   RequestQuoteCTA, QuoteCartDrawer, KeystonneLogo
│   ├── ImageWithFallback, ProductImage, CategoryImage   # image system
│   └── partner/  PartnerShell, EarningsCard, TierProgressBar,
│                 DealStatusPill, ReferralLinkPanel
├── lib/
│   ├── mock/   products, categories, businessTypes, partner,
│   │           partnerProgram, deals, quotes, ledger, payouts,
│   │           resources, wizardRecommendations, media
│   ├── utils/  formatINR, formatINRCompact, formatGST, formatDate, cn
│   ├── quoteCart.jsx          # localStorage cart context
│   └── usePartnerSession.js   # localStorage demo-auth flag
└── routes/                   # 27 routes (file-based)
```

### State / "auth" (all localStorage, no backend)

| Key | Owner | Purpose |
|---|---|---|
| `keystonne:quote-cart` | `lib/quoteCart.jsx` | cart line items |
| `keystonne:demo-partner-logged-in` | `lib/usePartnerSession.js` | demo partner session flag (`'1'` = logged in) |
| `keystonne:announcement-dismissed` | `AnnouncementBar.jsx` | dismissed announcement bar |

To enter the partner dashboard manually: set `keystonne:demo-partner-logged-in` to `'1'` in localStorage, or click "Log in as Demo Partner" on `/partner/login`.

### India defaults (CLAUDE.md §10 — apply without asking)

₹ Indian comma grouping (`formatINR`) · 18% GST as a separate line (`gstFor`) · DD-MMM-YYYY dates (`formatDate`) · 4–7 day delivery · 71/29 payment terms · 1-yr warranty · install included >₹10L else ₹49,900 or 5%. English only, India only.

---

## 6. Image system (Catalog Sprint 1 — shipped; Sprints 2–7 — pending)

We're mid-way through adding WebstaurantStore-style image merchandising on top of the Apple system. **Sprint 1 (the foundation) is done; no real photos exist yet.**

### What's built

- **`app/lib/mock/media.js`** — central registry: `productMedia` (per-slug image arrays + spec-sheet/CAD/video flags), `categoryMedia`, `ventureMedia`, `stationMedia`, `merchandisingTiles`, plus `getProductMedia` / `getCategoryMedia` / `getVentureMedia` / `getProductHeroImage` / `getProductImageCount` helpers.
- **`ImageWithFallback`** — preflights the URL with `new Image()` and only mounts the real `<img>` when `naturalWidth > 0`. Renders a designed fallback otherwise. Lazy by default; `aspect-ratio` prevents layout shift.
- **`ProductImage`** (card / thumb / gallery variants) and **`CategoryImage`** (tile / hero / small) — both fall back to a Lucide-icon-on-blueprint composition that reads as a spec tile, not a placeholder.
- `ProductCard` already delegates its image panel to `ProductImage` (count pill + media badges included).

### ⚠️ Why the preflight exists

Vercel serves the SPA `index.html` as a **200** for any missing `/images/*` path. A naive `<img onError>` never fires reliably against that (the browser gets HTML, not a 404), leaving images stuck "loading." `ImageWithFallback` works around it by checking `naturalWidth` after a preflight load. **Keep this** — don't "simplify" it back to plain `onError`.

### How to make images actually appear

Drop real `.webp` files into the paths the registry already names:

```
public/images/
  products/<product-slug>/{main,interior,controls,context,...}.webp
  categories/<category-slug>.webp  (+ <slug>-hero.webp)
  business-types/<venture-slug>.webp
  stations/<station>.webp
  merchandising/<tile-slug>.webp
```

The matching surface lights up automatically — **no code changes, just a redeploy.** Asset policy (CLAUDE.md §4/§5): `.webp`, no competitor/supplier brand imagery, descriptive alt text already lives in the registry.

### Remaining sprints (all unblocked by Sprint 1)

2. Homepage image merchandising — Shop-by-station rail, Setup-kit tiles, image-led category cards, larger product rows
3. Collection pages — category hero image, subcategory image grid, list view, buying-guide panel
4. PDP — `ProductMediaGallery` (gallery variant exists), WorksWith row, FeatureImageStack, CompareSimilar, project photos
5. Business-type pages — hero image, station tiles, setup packages
6. Partner — project imagery on deal cards / quote builder (keep dashboard finance-first)
7. AI planner + BOQ — station-header images, matched-product thumbnails

Each ships independently. Commit prefix `feat(catalog|home|pdp|...)`. Run `npm run lint && npm run build` before every commit; push + deploy together.

---

## 7. Known-good invariants (don't regress these)

- `npm run lint` is **0 errors / 0 warnings**. Keep it there.
- No legacy liquid-glass classes (`glass`, `mesh-*`, `card`, `btn-primary`, `eyebrow`) anywhere — grep before adding.
- Header + MegaNav are a single sticky chrome strip (`top-0` / `top-[68px]`). MegaNav hides < md; `MobileCategoryAside` in `PageLayout` owns mobile nav.
- 14 category slugs and 14 business-type slugs are **locked** (CLAUDE.md §6) — group them in nav presentation, never rename.
- Routes are locked (§6). 27 route files currently; don't rename.
- Brand isolation (§5, CRITICAL): never reference any parent / manufacturer / supplier brand anywhere — code, copy, commits, alt text, test data.

---

## 8. What Phase 2 adds (out of scope now)

Supabase Auth (replaces the localStorage flag) · Supabase tables (deals/quotes/ledger/payouts) · real Shopify cart · referral attribution webhooks · admin console (`/admin` is a placeholder) · Zoho Books payout sync (Phase 3) · real LLM for the wizard + BOQ (Phase 4). Don't build any of it yet — flag as "noted for Phase N" and move on.
