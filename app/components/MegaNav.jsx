import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router';
import {Sparkles, ArrowRight} from 'lucide-react';
import {categoryBySlug} from '~/lib/mock/categories';
import {businessTypes} from '~/lib/mock/businessTypes';

/**
 * Apple-style pillar mega nav.
 *
 * The original 14-cat horizontal scroll was too dense for a premium B2B
 * surface — every cat earned a hover trigger of equal weight. This
 * grouping mirrors how a chef or procurement manager thinks about the
 * kitchen (heat / cold / prep / wash / beverage / service) and adds a
 * "Solutions" pillar for venture-led browsing. The category slugs and
 * names underneath stay locked per CLAUDE.md §6.
 *
 * Structure:
 *   - 6 pillars in the row, each opening a full-width premium-panel
 *     flyout with an editorial left rail + a 2 or 3-column category
 *     card grid on the right
 *   - 7th right-side sidetrack: blue AI Planner link
 *   - Hover (or keyboard focus) opens the flyout; a short close-timer
 *     prevents flicker when moving between trigger and panel
 *   - Mobile (< md) hides the bar entirely — MobileCategoryAside in
 *     PageLayout owns that surface
 */

/* Pillar map: every category from CLAUDE.md §6 lives in exactly one
   pillar. Order within a pillar = visual priority in the flyout. */
const PILLARS = [
  {
    key: 'cooking',
    label: 'Cooking',
    headline: 'Heat, fire, and tempering.',
    blurb:
      'Indian bhattis, Chinese ranges, ovens, fryers — the equipment that turns ingredients into menu items.',
    cats: ['cooking-ranges', 'indian-cooking', 'ovens', 'deep-fryers'],
  },
  {
    key: 'cold',
    label: 'Refrigeration & Storage',
    headline: 'Cold chain and dry stores.',
    blurb:
      'Pull-down to plating temperature, hold prep at the line, store ingredients pristine for a week of service.',
    cats: ['refrigeration', 'storage'],
  },
  {
    key: 'prep',
    label: 'Prep & Wash',
    headline: 'Where the line is built.',
    blurb:
      'Mise-en-place tables, mixers and slicers, three-bowl sinks, dishwashers — the prep and wash backbone of every kitchen.',
    cats: ['food-prep', 'work-tables', 'sinks-plumbing', 'dishwashing'],
  },
  {
    key: 'beverage',
    label: 'Beverage & Bar',
    headline: 'Coffee programme, cocktail bar.',
    blurb:
      'Espresso machines, brewers, back-bar coolers, ice — beverage-led venues that need every shot and pour to land.',
    cats: ['coffee-espresso', 'bar-equipment'],
  },
  {
    key: 'service',
    label: 'Service & Ventilation',
    headline: 'Front of house, top of house.',
    blurb:
      'Hot and cold display, bain marie, salad bars — plus the hoods, ESPs, and make-up air that keep the kitchen breathable.',
    cats: ['service-display', 'ventilation-exhaust'],
  },
  {
    key: 'solutions',
    label: 'Solutions',
    headline: 'Built for the way your kitchen runs.',
    blurb:
      'Venture-specific landing pages with suggested kits and chef notes. Pick the one that matches what you are building.',
    ventures: true,
  },
];

export function MegaNav() {
  const [openKey, setOpenKey] = useState(null);
  const closeTimer = useRef(null);

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenKey(null), 140);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!openKey) return;
    function onKey(e) {
      if (e.key === 'Escape') setOpenKey(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openKey]);

  useEffect(
    () => () => closeTimer.current && clearTimeout(closeTimer.current),
    [],
  );

  const openPillar = openKey ? PILLARS.find((p) => p.key === openKey) : null;

  return (
    <nav
      aria-label="Browse the catalog"
      // Sticks to the underside of the sticky Header so the two read
      // as one chrome strip on scroll. Header measures ~69px tall on
      // md+ (py-3.5 + h-10 search input), so we pin the MegaNav at
      // 68px with z-30 (one below the header's z-40). The flyout's
      // `top-full` still anchors to this sticky parent.
      className="sticky top-[68px] z-30 hidden md:block"
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid var(--ks-line-soft)',
      }}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex max-w-[1400px] items-stretch px-4 md:px-6">
        <ul className="flex items-stretch gap-1">
          {PILLARS.map((p) => (
            <li
              key={p.key}
              onMouseEnter={() => {
                cancelClose();
                setOpenKey(p.key);
              }}
              onFocus={() => setOpenKey(p.key)}
              className="relative"
            >
              <button
                type="button"
                aria-expanded={openKey === p.key}
                aria-controls={`mega-panel-${p.key}`}
                onClick={() =>
                  setOpenKey((k) => (k === p.key ? null : p.key))
                }
                className="flex h-12 items-center px-3 text-[13px] font-medium transition-colors"
                style={{
                  color:
                    openKey === p.key ? 'var(--ks-ink)' : 'var(--ks-ink-2)',
                }}
              >
                {p.label}
              </button>
              {openKey === p.key && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                  style={{background: 'var(--ks-ink)'}}
                />
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/kitchen-planner"
          prefetch="intent"
          className="ml-auto flex items-center gap-1.5 px-3 text-[13px] font-medium transition-colors"
          style={{
            color: 'var(--ks-blue)',
            borderLeft: '1px solid var(--ks-line-soft)',
          }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Planner
        </Link>
      </div>

      {openPillar && (
        <MegaFlyout
          pillar={openPillar}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onClose={() => setOpenKey(null)}
        />
      )}
    </nav>
  );
}

/* ───────────────  Flyout  ─────────────── */

function MegaFlyout({pillar, onMouseEnter, onMouseLeave, onClose}) {
  return (
    <div
      id={`mega-panel-${pillar.key}`}
      role="region"
      aria-label={`${pillar.label} menu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-full z-30"
      style={{
        background: 'var(--ks-card-solid)',
        borderTop: '1px solid var(--ks-line-soft)',
        borderBottom: '1px solid var(--ks-line)',
        boxShadow: '0 24px 60px -20px rgba(0,0,0,0.10)',
      }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-6 py-9 md:px-8">
        {/* Editorial rail */}
        <div
          className="col-span-3 pr-6"
          style={{borderRight: '1px solid var(--ks-line-soft)'}}
        >
          <span className="apple-eyebrow">{pillar.label}</span>
          <h3
            className="mt-3 text-[22px] font-semibold leading-tight"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.012em'}}
          >
            {pillar.headline}
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {pillar.blurb}
          </p>

          {pillar.ventures ? (
            <Link
              to="/business-type/new-venture"
              prefetch="intent"
              onClick={onClose}
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium"
              style={{color: 'var(--ks-blue)'}}
            >
              I&apos;m building something new
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <Link
              to={`/collections/${pillar.cats[0]}`}
              prefetch="intent"
              onClick={onClose}
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium"
              style={{color: 'var(--ks-ink)'}}
            >
              Browse all {pillar.label.toLowerCase()}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {/* Right grid — categories OR venture tiles */}
        <div className="col-span-9">
          {pillar.ventures ? (
            <VentureGrid onClose={onClose} />
          ) : (
            <CategoryGrid catSlugs={pillar.cats} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryGrid({catSlugs, onClose}) {
  const cats = catSlugs.map((s) => categoryBySlug[s]).filter(Boolean);
  const cols =
    cats.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : cats.length === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2';
  return (
    <ul className={`grid gap-3 ${cols}`}>
      {cats.map((cat) => {
        const Icon = cat.icon;
        return (
          <li key={cat.slug}>
            <Link
              to={`/collections/${cat.slug}`}
              prefetch="intent"
              onClick={onClose}
              className="group flex h-full flex-col rounded-2xl p-4 transition-colors"
              style={{
                background: 'var(--ks-card-tint)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{
                    background: 'var(--ks-card-solid)',
                    color: 'var(--ks-ink)',
                    border: '1px solid var(--ks-line-soft)',
                  }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div className="min-w-0">
                  <div
                    className="text-[13px] font-semibold leading-tight"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {cat.name}
                  </div>
                  <p
                    className="mt-1 text-[11px] leading-snug"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {cat.blurb}
                  </p>
                </div>
              </div>
              {cat.subgroups?.length ? (
                <ul
                  className="mt-3 space-y-1 pl-[3.25rem] text-[11px]"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  {cat.subgroups.slice(0, 3).map((sg) => (
                    <li key={sg.title} className="truncate">
                      · {sg.title}
                    </li>
                  ))}
                </ul>
              ) : null}
              <span
                className="mt-auto inline-flex items-center gap-1 pt-3 pl-[3.25rem] text-[12px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                style={{color: 'var(--ks-ink)'}}
              >
                Shop {cat.name}
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function VentureGrid({onClose}) {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {businessTypes.map((b) => {
        const Icon = b.icon;
        const isNewVenture = b.slug === 'new-venture';
        return (
          <li key={b.slug}>
            <Link
              to={`/business-type/${b.slug}`}
              prefetch="intent"
              onClick={onClose}
              className="flex items-start gap-2.5 rounded-xl p-2.5 transition-colors"
              style={
                isNewVenture
                  ? {
                      background: 'var(--ks-blue-soft)',
                      border: '1px solid rgba(0,113,227,0.18)',
                    }
                  : {
                      background: 'var(--ks-card-tint)',
                      border: '1px solid var(--ks-line-soft)',
                    }
              }
            >
              <div
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                style={
                  isNewVenture
                    ? {background: 'var(--ks-blue)', color: '#ffffff'}
                    : {
                        background: 'var(--ks-card-solid)',
                        color: 'var(--ks-ink)',
                        border: '1px solid var(--ks-line-soft)',
                      }
                }
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <div
                  className="text-[12px] font-semibold leading-tight"
                  style={{
                    color: isNewVenture
                      ? 'var(--ks-blue-dark)'
                      : 'var(--ks-ink)',
                  }}
                >
                  {b.name}
                </div>
                <p
                  className="mt-0.5 line-clamp-2 text-[10.5px] leading-snug"
                  style={{
                    color: isNewVenture
                      ? 'var(--ks-blue-dark)'
                      : 'var(--ks-muted)',
                  }}
                >
                  {b.tagline}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

