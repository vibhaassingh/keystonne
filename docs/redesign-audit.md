# Apple-inspired redesign — Sprint 0 audit

Surveying the existing liquid-glass surfaces so the per-sprint migration
order in the redesign brief is grounded in real file paths and counts.
No code edits in this sprint — this is the map.

## Method

```bash
grep -Rn "mesh-"          app
grep -RnE "glass(-strong|-dark|-divider|-tint|-border)?\b" app
grep -Rn "btn-primary|btn-accent" app
grep -Rn "brand-primary"  app
grep -Rn "partner-accent" app
grep -RnE "bg-ink|bg-slate-900|bg-emerald-950|bg-ink/" app
```

Searches restricted to `app/**/*.{jsx,css}` from repo root.

---

## 1. Mesh-gradient surfaces (the loudest layer to migrate)

`mesh-indigo` / `mesh-emerald` / `mesh-warm` are defined in `app/styles/app.css`
(lines 225–242). They render as full-bleed rounded panels with floating
white-orb decorations.

| Surface | File | Lines / usage |
|---|---|---|
| Home hero (3-slide rotation) | `app/components/HeroCarousel.jsx` | l.28 `mesh-indigo` (new-venture), l.46 `mesh-indigo` (catalog), l.64 `mesh-emerald` (partner) |
| Partner promo on home | `app/components/PartnerPromoBand.jsx` | l.13 `mesh-emerald` |
| AI Wizard results hero | `app/routes/kitchen-planner.results.jsx` | l.66 `mesh-indigo` |
| Business-type hero (14 pages) | `app/routes/business-type.$handle.jsx` | l.49 `mesh-indigo` |
| Partner programme hero | `app/routes/partner._index.jsx` | l.47 `mesh-emerald` |
| Partner programme final CTA | `app/routes/partner._index.jsx` | l.422 `mesh-emerald` |

**Migration owners:** Sprint 3 (home hero + partner band), Sprint 5 (business-type),
Sprint 6 (partner landing), Sprint 8 (wizard results).

---

## 2. Glass / frosted surfaces

The dedicated `.glass*` classes are mostly only referenced from `MegaNav` +
two partner forms; *most* of the glass feel in the live app comes from
inline `bg-white/85 backdrop-blur` patterns, not the named classes. That
means the migration is partly a CSS replacement (named classes) and partly
a per-component utility-class swap.

| File | Use |
|---|---|
| `app/components/MegaNav.jsx` (l.100) | `glass-strong` for the flyout panel |
| `app/routes/partner.dashboard.deals.new.jsx` (l.242) | `glass-divider` in summary panel |
| `app/routes/partner.dashboard.quotes.new.jsx` (l.151) | `glass-divider` in quote-totals panel |
| `app/styles/app.css` (l.155+) | Definitions of `.glass`, `.glass-strong`, `.glass-dark`, `.glass-divider` — leave intact for back-compat |

**Glass-by-inline** (not using the named class but the same effect, ~14 files): Header, MegaNav, HeroCarousel, KitchenPlannerInput, ProductCard, FeaturedCategoriesGrid, partner._index, partner.login, business-type, about, kitchen-planner (both routes), partner.dashboard.quotes.new, partner.dashboard.deals.new. Sprints 2-8 will touch most of these for other reasons; the migration to `.premium-card` / `.apple-hero` happens naturally then.

---

## 3. Dark / inky surfaces (most visible everyday)

These are what an Apple-inspired graphite-white target replaces first.

| Surface | File | Class |
|---|---|---|
| Storefront announcement bar | `app/components/AnnouncementBar.jsx` (l.23) | `bg-ink` |
| Storefront sticky header | `app/components/Header.jsx` (l.18) | `bg-ink/85 backdrop-blur-xl` |
| Storefront footer | `app/components/Footer.jsx` (l.13) | `bg-ink` |
| Partner dashboard topbar | `app/components/partner/PartnerShell.jsx` (l.42) | `bg-emerald-950/85 backdrop-blur-xl` |
| Aside (cart/menu) scrim | `app/components/Aside.jsx` (l.58) | `bg-ink/40` |
| Partner mobile drawer scrim | `app/components/partner/PartnerShell.jsx` (l.113) | `bg-ink/40` |
| Resources toast | `app/routes/partner.dashboard.resources.jsx` (l.130) | `bg-ink/90` |

**Migration owners:** Sprint 2 (Header / AnnouncementBar / Footer / Aside scrim), Sprint 7 (PartnerShell topbar + drawer scrim).

---

## 4. Buttons — `btn-primary` / `btn-accent` (the broadest refactor)

These two utility classes (`app/styles/app.css` l.179–199) carry the
purple-indigo + amber gradient buttons everywhere.

- **`btn-primary`** (indigo gradient): **28 occurrences** across 20 files.
- **`btn-accent`** (amber gradient): **8 occurrences** across 7 files.

Worst offenders by file (uses each):

| File | btn-primary | btn-accent |
|---|---|---|
| `app/routes/partner.apply.jsx` | 2 | 1 |
| `app/routes/upload-boq.jsx` | 3 | 0 |
| `app/routes/kitchen-planner.results.jsx` | 1 | 1 |
| `app/routes/business-type.$handle.jsx` | 0 | 2 |
| `app/components/Header.jsx` | 0 | 2 |
| `app/components/HeroCarousel.jsx` | 0 | 1 |
| `app/components/ProductCard.jsx` | 1 | 1 |
| `app/components/KitchenPlannerInput.jsx` | 1 | 0 |
| `app/components/partner/ReferralLinkPanel.jsx` | 1 | 0 |
| `app/routes/partner.dashboard.deals.new.jsx` | 2 | 0 |
| `app/routes/partner.dashboard.deals._index.jsx` | 1 | 0 |
| `app/routes/partner.dashboard.deals.$id.jsx` | 1 | 0 |
| `app/routes/partner.dashboard.payouts.jsx` | 1 | 0 |
| `app/routes/partner.dashboard.quotes._index.jsx` | 1 | 0 |
| `app/routes/partner.dashboard.quotes.new.jsx` | 1 | 0 |
| `app/routes/partner.dashboard._index.jsx` | 1 | 0 |
| `app/routes/partner.login.jsx` | 1 | 0 |
| `app/routes/partner.signup.jsx` | 1 | 0 |
| `app/routes/about.jsx` | 1 | 0 |
| `app/routes/admin.jsx` | 1 | 0 |
| `app/routes/contact.jsx` | 1 | 0 |
| `app/routes/search.jsx` | 1 | 0 |
| `app/routes/kitchen-planner._index.jsx` | 1 (conditional) | 1 (step 5 only) |
| `app/root.jsx` (error boundary) | 1 | 0 |

**Migration strategy:** Sprint 1 adds `.apple-button-primary` (graphite pill) and
`.apple-button-amber` (amber pill, procurement-only) as drop-in replacements;
sprint 2-8 swap `btn-primary` → `apple-button-primary` and `btn-accent` →
`apple-button-amber` per page. `btn-primary` (current) is indigo, but the
brief reserves indigo/blue for *system links*, not primary actions — so the
swap also intentionally shifts the visual semantics.

---

## 5. Color tokens

| Token | References | Notes |
|---|---|---|
| `brand-primary` (incl. `-50`, `-700`, `-600`, `-500`) | 143 | Used as background, text, border, ring — everywhere |
| `partner-accent` (incl. `-hover`, `-50`) | 25 | Concentrated in partner shell + landing |
| `brand-accent` (incl. `-hover`, `-50`) | ~50 (not separately counted) | Pills, sale flags, mostly storefront |
| `ink`, `ink-soft` | ~10 | Dark surfaces (see §3) |

The brief proposes keeping these tokens defined (for back-compat) while
introducing `--ks-*` variables and `.apple-*` / `.premium-*` classes that
read from the new tokens. Component classes get swapped sprint by sprint,
so the global token shift never breaks the next route.

---

## 6. Composition priorities

Sprints in order of visual impact per change, derived from the counts above:

1. **Sprint 2 (Layout shell)** — 5 dark/glass surfaces, every page sees them. Highest immediate visual upgrade.
2. **Sprint 3 (Home)** — 1 mesh hero + 1 mesh band + 4 inline-glass cards. Most-screenshotted page in the demo deck.
3. **Sprint 4 (Catalog + PDP)** — `ProductCard` and `SpecTable` ripple across ~10 routes.
4. **Sprint 6 (Partner landing)** — 2 mesh blocks + commission table; the conversion page.
5. **Sprint 7 (Partner dashboard)** — emerald topbar + finance tiles; tone-changing because dashboards screenshot well.
6. **Sprint 5 (Business types)** — 14 templated pages on one mesh hero — fix the template, all 14 land.
7. **Sprint 8 (AI Wizard + BOQ)** — 1 mesh hero (results); content is the heavy lift, not chrome.
8. **Sprint 9 (Polish)** — accessibility + responsive + README.

---

## 7. Constraints to remember

- **Do not delete** `glass*`, `mesh-*`, `btn-primary`, `btn-accent`, `brand-primary`, `partner-accent` — keep for back-compat through Sprint 8.
- **Do not change** routes (`CLAUDE.md §6`), the 14 category slugs, or the 14 business-type slugs.
- **No new dependencies** without one-line justification.
- **Phase 1 mock-data scope** stays intact (`CLAUDE.md §2`).
- **No Apple assets, logos, exact-page clones, or protected copy.** Bright graphite-white inspiration only.
