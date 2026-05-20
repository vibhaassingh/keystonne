import {useState, useRef, useEffect} from 'react';
import {Link, NavLink} from 'react-router';
import {ChevronDown, Wand2} from 'lucide-react';
import {categories} from '~/lib/mock/categories';
import {cn} from '~/lib/utils/cn';

/**
 * Desktop primary nav band — sits below the Header on a brand-primary surface.
 * Hover (or focus) on a category opens a wide flyout with that category's
 * subgroups, mirroring the WebstaurantStore pattern. On mobile this whole
 * component is hidden; categories are reached via the mobile drawer.
 */
export function MegaNav() {
  const [openSlug, setOpenSlug] = useState(null);
  const closeTimer = useRef(null);

  // Tiny debounce so cursor can travel from the nav row down to the
  // flyout without the menu closing mid-traverse.
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenSlug(null), 120);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  return (
    <nav
      aria-label="Browse categories"
      className="hidden border-b border-brand-primary-700 bg-brand-primary text-white md:block"
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
                    'flex items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium text-white/95 transition-colors hover:bg-brand-primary-700',
                    isActive && 'bg-brand-primary-700',
                  )
                }
              >
                {c.name}
                {c.subgroups?.length ? <ChevronDown className="h-3 w-3 opacity-70" /> : null}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* End-of-row partner micro-link, mirroring "Business Type" in WSS DNA. */}
        <Link
          to="/business-type/new-venture"
          prefetch="intent"
          className="ml-auto flex items-center gap-1.5 border-l border-brand-primary-700 px-4 py-2.5 text-[13px] font-semibold text-brand-accent hover:bg-brand-primary-700"
        >
          <Wand2 className="h-3.5 w-3.5" />
          New venture? Start here
        </Link>
      </div>

      {/* Flyout */}
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
      className="absolute left-0 right-0 z-30 border-t border-brand-primary-700 bg-white text-ink shadow-lg"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-6">
        {/* Left: category summary */}
        <div className="col-span-3 border-r border-gray-200 pr-6">
          <div className="mb-2 inline-flex items-center gap-2 text-brand-primary">
            <Icon className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Category
            </span>
          </div>
          <h3 className="text-lg font-semibold leading-tight">{cat.name}</h3>
          <p className="mt-2 text-sm text-gray-600">{cat.blurb}</p>
          <Link
            to={`/collections/${cat.slug}`}
            prefetch="intent"
            className="mt-4 inline-flex text-sm font-semibold text-brand-primary hover:underline"
          >
            Shop all {cat.name} →
          </Link>
        </div>

        {/* Right: subgroups grid */}
        <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-3">
          {(cat.subgroups || []).map((sg) => (
            <div key={sg.title}>
              <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {sg.title}
              </h4>
              <ul className="space-y-1.5">
                {sg.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/collections/${cat.slug}`}
                      prefetch="intent"
                      className="text-sm text-ink/80 hover:text-brand-primary"
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
