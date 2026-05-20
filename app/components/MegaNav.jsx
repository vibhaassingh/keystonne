import {useState, useRef, useEffect} from 'react';
import {Link, NavLink} from 'react-router';
import {ChevronDown, Wand2} from 'lucide-react';
import {categories} from '~/lib/mock/categories';
import {cn} from '~/lib/utils/cn';

/**
 * Frosted-glass primary nav band, sits below the sticky Header. Hover/focus
 * a category to reveal the wide flyout with subgroups. On mobile this whole
 * component is hidden — categories live in the slide-over drawer.
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
      className="relative hidden border-b border-black/5 bg-white/65 backdrop-blur-xl md:block"
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
                    'flex items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium text-ink/80 transition-colors hover:text-brand-primary',
                    isActive && 'text-brand-primary',
                    openSlug === c.slug && 'text-brand-primary',
                  )
                }
              >
                {c.name}
                {c.subgroups?.length ? (
                  <ChevronDown className={cn(
                    'h-3 w-3 opacity-50 transition-transform',
                    openSlug === c.slug && 'rotate-180 opacity-90',
                  )} />
                ) : null}
              </NavLink>
              {openSlug === c.slug && (
                <span className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-primary" />
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/business-type/new-venture"
          prefetch="intent"
          className="ml-auto flex items-center gap-1.5 border-l border-black/5 px-4 py-2.5 text-[13px] font-semibold text-brand-accent hover:bg-brand-accent/10"
        >
          <Wand2 className="h-3.5 w-3.5" />
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
      className="absolute left-0 right-0 top-full z-30 glass-strong rounded-b-2xl text-ink"
      style={{borderTop: 'none'}}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-7">
        <div className="col-span-3 border-r border-black/5 pr-6">
          <div className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl text-white"
              style={{
                background: 'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
                boxShadow: '0 6px 16px -8px rgba(67,56,202,0.6)',
              }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary">
              Category
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-tight">
            {cat.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{cat.blurb}</p>
          <Link
            to={`/collections/${cat.slug}`}
            prefetch="intent"
            className="mt-4 inline-flex text-sm font-semibold text-brand-primary hover:underline"
          >
            Shop all {cat.name} →
          </Link>
        </div>

        <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-3">
          {(cat.subgroups || []).map((sg) => (
            <div key={sg.title}>
              <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                {sg.title}
              </h4>
              <ul className="space-y-1.5">
                {sg.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/collections/${cat.slug}`}
                      prefetch="intent"
                      className="text-sm text-ink/75 hover:text-brand-primary"
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
