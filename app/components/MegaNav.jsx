import {useState, useRef, useEffect} from 'react';
import {Link, NavLink} from 'react-router';
import {ChevronDown, Sparkles} from 'lucide-react';
import {categories} from '~/lib/mock/categories';
import {cn} from '~/lib/utils/cn';

/**
 * Bright Apple-inspired category tray, sitting below the sticky header.
 *
 * Top row: all 14 catalog categories (slugs + names locked by CLAUDE.md
 * §6 — do not rename). Hovering / focusing a category reveals a
 * .premium-panel flyout with that category's subgroups in 3 columns,
 * each item paired with a one-line procurement hint that doubles as
 * tertiary search text.
 *
 * Active / hover state: graphite text + subtle underline marker. The
 * previous indigo block has been retired so the row reads more like an
 * Apple Store tray than a coloured navigation strip.
 */
export function MegaNav() {
  const [openSlug, setOpenSlug] = useState(null);
  const closeTimer = useRef(null);

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenSlug(null), 140);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  return (
    <nav
      aria-label="Browse categories"
      className="relative hidden md:block"
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid var(--ks-line-soft)',
      }}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex max-w-[1400px] items-stretch px-2">
        <ul className="flex flex-1 items-stretch overflow-x-auto">
          {categories.map((c) => (
            <li
              key={c.slug}
              onMouseEnter={() => {
                cancelClose();
                setOpenSlug(c.slug);
              }}
              onFocus={() => setOpenSlug(c.slug)}
              className="relative"
            >
              <NavLink
                to={`/collections/${c.slug}`}
                prefetch="intent"
                className={({isActive}) =>
                  cn(
                    'flex items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors',
                    isActive && 'font-semibold',
                  )
                }
                style={({isActive}) => ({
                  color: isActive || openSlug === c.slug
                    ? 'var(--ks-ink)'
                    : 'var(--ks-ink-2)',
                })}
              >
                {c.name}
                {c.subgroups?.length ? (
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 transition-transform',
                      openSlug === c.slug && 'rotate-180',
                    )}
                    style={{opacity: 0.45}}
                  />
                ) : null}
              </NavLink>
              {openSlug === c.slug && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                  style={{background: 'var(--ks-ink)'}}
                />
              )}
            </li>
          ))}
        </ul>

        {/* New-venture sidetrack — blue ink (system / AI guidance link). */}
        <Link
          to="/business-type/new-venture"
          prefetch="intent"
          className="ml-auto flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors"
          style={{
            color: 'var(--ks-blue)',
            borderLeft: '1px solid var(--ks-line-soft)',
          }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          New venture? Start here
        </Link>
      </div>

      {openSlug && (
        <MegaFlyout
          slug={openSlug}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}
    </nav>
  );
}

function MegaFlyout({slug, onMouseEnter, onMouseLeave}) {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return null;
  const Icon = cat.icon;

  return (
    <div
      role="region"
      aria-label={`${cat.name} subcategories`}
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
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-8">
        {/* Left — category summary */}
        <div
          className="col-span-3 pr-6"
          style={{borderRight: '1px solid var(--ks-line-soft)'}}
        >
          <div className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{
                background: '#f0f0f3',
                color: 'var(--ks-ink)',
              }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <span className="apple-eyebrow">Category</span>
          </div>
          <h3
            className="mt-3 text-lg font-semibold leading-tight"
            style={{color: 'var(--ks-ink)'}}
          >
            {cat.name}
          </h3>
          <p
            className="mt-2 text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {cat.blurb}
          </p>
          <Link
            to={`/collections/${cat.slug}`}
            prefetch="intent"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
            style={{color: 'var(--ks-ink)'}}
          >
            Shop all {cat.name} →
          </Link>
        </div>

        {/* Right — subgroup columns with procurement hints */}
        <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-3">
          {(cat.subgroups || []).map((sg) => (
            <div key={sg.title}>
              <h4
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                {sg.title}
              </h4>
              <ul className="space-y-1.5">
                {sg.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/collections/${cat.slug}`}
                      prefetch="intent"
                      className="text-sm transition-colors hover:underline"
                      style={{color: 'var(--ks-ink-2)'}}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
