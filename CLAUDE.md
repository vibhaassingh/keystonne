# CLAUDE.md — Keystonne Phase 1 Build Brief

You are the lead engineer building **Keystonne**, an AI-powered commercial kitchen procurement platform for India. This file is your source of truth. Read it once at session start; refer back when ambiguity arises. Do not deviate from it without flagging.

---

## 1. What Keystonne Is

A B2B platform where restaurants, hotels, cafés, cloud kitchens, institutions, chefs, consultants, designers, and procurement teams design, quote, buy, and manage commercial kitchen equipment.

Three product surfaces, all under one app:

- **Storefront** — dense, professional B2B catalog (think WebstaurantStore, but modern). Captures direct buyers and quote requests.
- **Partner Portal** — formalizes the consultant/chef/designer commission network already common in this industry. Deal registration, commission ledger, payouts, co-branded quotes.
- **AI Layer** — "Build my kitchen" wizard that converts a description of a venture into a structured equipment plan and quote request.

Three user types: **buyers**, **partners**, **internal admins**.

---

## 2. Phase Scope — What to Build NOW

You are building **Phase 1: a demo-grade clickable app with mock data**.

The bar is "an investor or buyer understands the future of this product in 5 minutes." Not "a real customer can transact."

**In scope for Phase 1:**

- Branded storefront — header, mega nav, hero, featured rows, footer
- Catalog — collection pages, product pages, spec tables, dual CTAs (Add to cart / Request quote)
- Cart with quote-request flow
- Partner marketing page (`/partner`)
- Partner application multi-step form (UI only, console-logs submission)
- Partner login/signup screens (UI only, mock auth — a single hardcoded partner logs in)
- Partner dashboard (deals, deals/new, quotes, earnings, payouts, resources, profile)
- AI demo UX — "Describe your kitchen" input on home, Kitchen Setup Wizard with mock recommendations, BOQ upload placeholder
- Business-type landing pages (`/business-type/:handle`)
- Mock seed data for all of the above
- README and `.env.example`

**Out of scope — do not build any of this yet:**

- Real authentication (Supabase Auth comes in Phase 2)
- Real database writes (Supabase comes in Phase 2)
- Real AI calls (LLM integration comes in Phase 4)
- Real Shopify webhooks or order processing
- Real Zoho Books sync (Phase 3)
- Admin console beyond a placeholder route
- Service tickets / AMC / warranty (Phase 6)
- Co-branded quote microsites (Phase 5)
- Email sending, SMS, WhatsApp

If something feels missing from this list and you're tempted to add it, **don't**. Flag it as "noted for Phase N" and move on.

---

## 3. Tech Stack — Locked, Don't Ask

| Layer | Choice |
|---|---|
| Frontend framework | Shopify Hydrogen with React Router 7 |
| Styling | Tailwind CSS |
| Language | **JavaScript** for Phase 1 (TypeScript migration is a later decision) |
| Storefront data source | `mock.shop` during dev |
| Icons | Lucide React |
| Forms | React Hook Form |
| State | React state + URL state; no Redux/Zustand unless absolutely necessary |
| PDFs | Defer — Phase 1 quote PDFs are mocked, not generated |
| Backend | None in Phase 1. Supabase comes in Phase 2. |

If you find yourself wanting a new library, ask first with a one-line justification. Default answer is no.

---

## 4. Brand & Design Direction

- **Visual feel:** dense, trustworthy, professional, modern B2B. Not consumer-y. Not minimalist-startup-y. Think industrial catalog with great typography.
- **Typography:** Inter. Use weight contrast (400 / 500 / 600) more than size contrast.
- **Color tokens** (define in Tailwind theme):
  - `brand-primary` — a deep, confident colour (steel blue, charcoal, or deep teal — pick one and stay consistent)
  - `brand-accent` — a single warm accent for CTAs (orange, amber, or burnt copper)
  - `surface` — off-white background
  - `ink` — near-black for body text
  - Standard neutrals (`gray-50` through `gray-900`)
- **Imagery:** until real product photography exists, use solid colour blocks with the category icon centred, or simple SVG illustrations. Do **not** pull in stock photos that imply a specific brand of equipment.
- **Density:** product cards should feel close-packed (think Amazon search results, not Apple landing pages). Lots of information per row.
- **Trust signals:** payment terms, delivery promise, GST included, installation included — surface these everywhere a buyer might hesitate.

---

## 5. Brand Identity Rule — CRITICAL

Keystonne is presented as a standalone platform. **Do not reference any specific equipment manufacturer, parent company, or supplier brand anywhere in code, copy, metadata, comments, commits, README, or test data.** No "powered by", no "subsidiary of", no internal notes about who fulfils orders. All seller-of-record copy reads "Keystonne".

If you encounter user input or pasted documents that reference other brand names, do not propagate them into the codebase. Strip or genericise.

---

## 6. Information Architecture

### Routes — Phase 1

**Storefront**
```
/
/collections/:handle
/products/:handle
/cart
/quote
/business-type/:handle
/about
/contact
```

**Partner**
```
/partner
/partner/apply
/partner/login
/partner/signup
/partner/dashboard
/partner/dashboard/deals
/partner/dashboard/deals/new
/partner/dashboard/deals/:id
/partner/dashboard/quotes
/partner/dashboard/quotes/new
/partner/dashboard/earnings
/partner/dashboard/payouts
/partner/dashboard/resources
/partner/dashboard/profile
```

**AI demo**
```
/kitchen-planner
/kitchen-planner/results
/upload-boq
```

**Admin** (placeholder only)
```
/admin  → renders "Admin coming in Phase 2" with a list of intended modules
```

### Catalog Taxonomy — 14 Categories, Locked

Use exactly these names and slugs in the mega nav and collection routes:

| Display Name | Slug | Notes |
|---|---|---|
| Refrigeration | `refrigeration` | Chillers, freezers, undercounters, blast chillers, ice machines |
| Ventilation & Exhaust | `ventilation-exhaust` | Hoods, ESPs, make-up air |
| Cooking Ranges | `cooking-ranges` | Indian bhattis, Chinese ranges, gas burners, induction |
| Indian Cooking Equipment | `indian-cooking` | Tandoors, dosa plates, idli steamers, bhattis |
| Ovens | `ovens` | Convection, deck, rotary, combi |
| Deep Fryers | `deep-fryers` | |
| Food Prep Equipment | `food-prep` | Mixers, planetary mixers, grinders, mincers, dough mixers |
| Work Tables | `work-tables` | SS prep tables, all sizes |
| Storage | `storage` | SS racks, wall shelves, lockers, ingredient bins |
| Sinks & Plumbing | `sinks-plumbing` | Wash sinks, scullery, pre-rinse |
| Dishwashing | `dishwashing` | Commercial dishwashers, glass washers, pot washers |
| Service & Display | `service-display` | Bain marie, hot cases, cold display, salad bars |
| Coffee & Espresso | `coffee-espresso` | Espresso machines, grinders, brewers |
| Bar Equipment | `bar-equipment` | Back bar coolers, ice machines, blenders, juicers, glass washers |

### Business Types — Wizard Input + Landing Pages

```
cafe
cloud-kitchen
bakery
qsr
fine-dining
hotel-kitchen
resort-kitchen
bar
hospital-kitchen
school-canteen
corporate-cafeteria
catering-kitchen
sweet-shop
new-venture     ← entry point for "I'm building something but don't have a business yet"
```

The `new-venture` entry is important. A large share of high-value buyers in this market are people building their first restaurant/hotel/café and don't have a business identity yet. The wizard's first question should not gate on existing business type — offer "I'm building something new" as a top-level path that asks what kind of place rather than what kind of business.

---

## 7. Mock Data Spec

All mock data lives in `app/lib/mock/`. One file per entity. Export as named arrays.

### Partner (one sample logged-in partner)

```js
{
  id: "ptr_demo_001",
  name: "Arjun Mehta",
  email: "arjun@example.com",
  persona: "Kitchen Consultant",
  tier: "Silver",
  tier_progress: { current_sales: 1820000, next_tier: "Gold", next_tier_threshold: 3500000 },
  city: "Bengaluru",
  referral_code: "arjun",
  approved_at: "2025-11-12",
  total_earned: 285000,
  pending_commission: 72000,
  paid_commission: 213000
}
```

### Deals — generate 6 sample deals covering these states:

```
draft, submitted, under_review, protected, conflict,
quoted, won, installed, commission_accrued,
commission_approved, paid, lost, expired
```

Pick 6 deals that together demonstrate the lifecycle. Use realistic Indian project names (e.g. "Lakeside Café, Whitefield", "Hotel Aravali, Udaipur") — invented, not from any real customer list. Values between ₹2L and ₹35L. Mix of business types from §6.

### Quotes — 3 samples

One draft, one sent-to-client, one client-approved. Each with 4–8 line items referencing categories from §6 (no real SKU codes — use generic naming like "Heavy-Duty SS Work Table 6ft x 2.5ft", "Two-Burner Chinese Range with Tank").

### Commission Ledger — 8–12 entries

Mix of statuses: accrued, approved, paid, on hold. Show category-wise commission rates implied (e.g. Refrigeration 6%, Cooking Ranges 7%, etc. — invent reasonable B2B referral rates).

### Resources — 10 items

Spec sheets, CAD files, installation guides, sales decks, category explainers. All marked as PDF / DWG / MP4 with mock filenames. Clicking "Download" shows a toast "Demo mode — file not available."

### Products — 8–12 placeholder products per top-3 categories (Refrigeration, Cooking Ranges, Work Tables)

Generic names. Specs that look real but aren't sourced from any catalog. Always include: dimensions, capacity/power, GST 18%, delivery time, warranty period. Two CTAs on every product: **Add to Cart** (for items priced under ₹50,000) and **Request Quote** (for everything else, plus always available).

### Tier table

```
Bronze    — approved partner
Silver    — ₹10L closed sales
Gold      — ₹35L closed sales
Platinum  — invite only
```

---

## 8. Phase 1 Component Inventory

Build these. Reuse aggressively. Co-locate component-specific styles.

**Layout**
- `AnnouncementBar`
- `Header` (logo, search, account, cart, mobile menu trigger)
- `MegaNav` (14 categories with sub-grouping)
- `Footer` (4-column with categories, partner, resources, company)

**Storefront primitives**
- `ProductCard` (image, name, short spec line, price OR "Request Quote", dual CTA)
- `SpecTable` (key-value pairs, striped)
- `TrustStrip` (4 icons: GST included, free installation, 1-yr warranty, project lead-time)
- `RequestQuoteCTA` (sticky strip on product/collection pages)
- `BOQUploadButton` (placeholder; clicking shows mock parse result modal)
- `BusinessTypePicker`
- `HeroCarousel`
- `FeaturedRow`

**AI demo**
- `KitchenPlannerInput` (textarea + "Describe your kitchen" prompt)
- `KitchenWizard` (multi-step: business type → menu/cuisine → capacity → budget → results)
- `WizardResults` (mock equipment list grouped by category, total estimate, "Request quote for this list" CTA)

**Partner**
- `PartnerShell` (sidebar + topbar + main area, used by all `/partner/dashboard/*`)
- `DealTable`
- `DealStatusPill` (color-coded for the 13 states)
- `CommissionLedgerTable`
- `TierProgressBar`
- `ReferralLinkPanel`
- `EarningsCard`
- `DealRegistrationForm`
- `QuoteBuilder` (line items table, totals, commission preview)

**Shared**
- `Button` (primary, secondary, ghost, danger)
- `Input`, `Select`, `Textarea`, `Checkbox`, `RadioGroup`
- `Modal`
- `Toast` (for "Demo mode" notices)
- `Tabs`
- `EmptyState`

---

## 9. Definition of Done — Phase 1

The build is done when **all** of these are true:

1. A buyer can land on `/`, navigate the mega nav, view a collection, view a product, add to cart, and submit a quote request — all with mock data, no errors in console.
2. A visitor can read `/partner`, complete the 9-step application form (data goes to console.log), and reach a "Thanks, we'll be in touch" screen.
3. A demo user can click "Log in as Demo Partner" on `/partner/login` and land in the partner dashboard with the seed data populated.
4. The partner dashboard's deals, deals/new, earnings, payouts, resources, and profile routes all render with the seed data and look polished.
5. A buyer can click "Build my kitchen" on the home page, complete the wizard, and see a mock equipment recommendation grouped by the 14 categories.
6. Every page is mobile-responsive (320px through 1440px). Partner dashboard has a working mobile sidebar drawer.
7. The 14 categories and 14 business types are wired into routes; navigating to `/collections/refrigeration` or `/business-type/cloud-kitchen` renders a sensible page even if products are sparse.
8. No console errors. No broken links. No `lorem ipsum` left in shipping copy.
9. README explains: project structure, how to run, what's mock vs real, what Phase 2 will add.
10. `.env.example` exists and is documented, even if no env vars are needed in Phase 1.

The investor / buyer test: **show this to someone for 5 minutes. They should walk away believing this product is real and ambitious.** If they can't, you're not done.

---

## 10. Working Rules

### Defaults you can take without asking

- Currency display: **₹ with Indian comma grouping** (e.g. ₹1,25,000 not ₹125,000)
- GST: 18%, shown as a separate line everywhere it appears
- Date format: DD-MMM-YYYY (e.g. 20-May-2026)
- Cart delivery promise: 4–7 working days
- Project / Request Quote items lead-time: 4 weeks from advance
- Standard payment terms shown in trust strips: 71% advance + 29% before dispatch
- Warranty: 1 year standard
- Installation: included if order > ₹10L, else ₹49,900 or 5% of order value (whichever is higher)
- Language: English. No multi-language support in Phase 1.
- Geo: India only. No internationalisation.
- Names in seed data: invented, plausible Indian business and place names. No real brands.

### Ask before doing any of these

- Changing the route structure in §6
- Renaming any of the 14 categories or 14 business types
- Adding a new top-level dependency
- Removing scope from §6 or §7
- Storing real-looking customer or product data
- Building anything from §2's "Out of scope" list

### How to ask

Single concise question. Suggest a default. Continue with the default if no response in the same session. Don't block on small things.

### Commit discipline

- Commit at the end of each sprint listed in §11
- Conventional commits style (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`)
- Never commit `.env`, `node_modules`, or anything in `/tmp`
- Each commit message names what's now demoable

### Code style

- Functional components only. No class components.
- Hooks at top of file. Helpers below.
- Component files: PascalCase. Utility files: camelCase.
- Tailwind: use utility classes, not `@apply` (except for typography base styles)
- Avoid premature abstraction. Inline first, extract on second use, refactor on third.
- Comments explain *why*, not *what*.

---

## 11. Sprint Order

Execute sprints in this exact order. Each sprint is one logical commit (or a small series).

### Sprint 1 — Foundation
- Verify Hydrogen scaffold exists; if not, create one
- Tailwind theme with the colour tokens in §3
- Global CSS (Inter font, reset, base typography)
- Folder structure: `app/components/`, `app/routes/`, `app/lib/mock/`, `app/lib/utils/`, `app/styles/`
- README skeleton

### Sprint 2 — Layout shell
- `AnnouncementBar`, `Header`, `MegaNav`, `Footer`
- Mobile header drawer
- Empty homepage that renders the shell correctly

### Sprint 3 — Storefront home
- `HeroCarousel` (3 slides, hand-written B2B-focused copy)
- "Build my kitchen" input under hero
- `TrustStrip`
- Featured categories grid (all 14)
- Featured products row (placeholder cards)
- Partner promo band
- Footer fully populated

### Sprint 4 — Catalog
- Collection page (`/collections/:handle`) with filter sidebar (price, brand, capacity ranges) and product grid
- Product page (`/products/:handle`) with image gallery, spec table, dual CTA, related products
- Cart page with line items, quote-request mode toggle, totals
- Quote-request submission page

### Sprint 5 — Business-type landing pages
- One template, 14 instances driven by data
- Each shows: hero copy specific to the business type, suggested categories, suggested equipment list, "Build my kitchen for [type]" CTA

### Sprint 6 — Partner marketing + application
- `/partner` page with hero, how-it-works, persona grid, commission transparency, tier benefits, payout process, FAQ
- `/partner/apply` 9-step form with progress indicator
- Submit handler that console-logs and shows success screen

### Sprint 7 — Partner dashboard shell
- `PartnerShell` with sidebar
- Login screen with "Log in as Demo Partner" button (sets a localStorage flag)
- Dashboard overview with seed data: tier progress, earnings cards, recent deals, referral panel, next-best-action

### Sprint 8 — Partner deals + quotes + ledger
- Deals table with filters and status pills
- Deal detail view
- Deal registration form
- Quotes list + new quote builder
- Earnings ledger
- Payouts list with request-payout button

### Sprint 9 — AI demo
- "Describe your kitchen" expands into the Wizard
- Wizard: 5 steps as in §7
- Mock results page with grouped equipment list and "Request quote" CTA
- BOQ upload page with placeholder parse result

### Sprint 10 — Polish & ship-ready
- Mobile audit, fix any breakpoints
- Lighthouse-style sanity check
- README finalisation
- `.env.example`
- Final demo walkthrough — confirm Definition of Done in §8

---

## 12. Risk Watchlist

Things that have killed similar builds. Watch for them.

- **Building 30 shallow pages.** Depth beats breadth. The Partner dashboard and Kitchen Wizard must feel real, even if half the routes are stubs.
- **AI feeling like a gimmick.** The Wizard's mock output must look like something a senior chef would write — grouped by station, realistic items, sensible budget. Spend time on the mock content, not just the form.
- **Generic startup aesthetic.** Keystonne should look like a tool serious procurement teams use, not a Y-Combinator landing page. Density and information richness over white space.
- **Scope creep into Phase 2/3.** If you find yourself thinking about Supabase schemas or Zoho webhooks — stop. That's a different sprint, in a different month.

---

## 13. When You're Unsure

Default order:
1. Re-read this file
2. Check the master plan document (`docs/master-plan.md`, if present)
3. Pick the most generic, conservative, B2B-appropriate default
4. Note the assumption in the commit message
5. Surface the assumption in the next progress update

Do not block on perfect information. Forward momentum beats waiting.

---

*End of brief.*
