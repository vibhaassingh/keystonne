import {useState, useMemo} from 'react';
import {Link, useParams} from 'react-router';
import {ArrowRight, ChevronRight, Filter, Truck, ShieldCheck} from 'lucide-react';
import {categories, categoryBySlug} from '~/lib/mock/categories';
import {products, productsByCategory} from '~/lib/mock/products';
import {ProductCard} from '~/components/ProductCard';
import {RequestQuoteCTA} from '~/components/RequestQuoteCTA';
import {cn} from '~/lib/utils/cn';

/**
 * Apple-style collection page. Editorial category header at the top,
 * sticky hairline filter rail on the left, dense product grid on the
 * right. No mesh, no gradient cards — the new ProductCard supplies the
 * surface, this page supplies the chrome.
 */

// Per-category headline suffix so each collection reads as its own
// editorial story rather than a templated grid.
const CATEGORY_ROLE = {
  'refrigeration':        'production kitchens',
  'ventilation-exhaust':  'compliant exhaust + air',
  'cooking-ranges':       'high-volume cook lines',
  'indian-cooking':       'traditional Indian kitchens',
  'ovens':                'bakery + production',
  'deep-fryers':          'quick-service kitchens',
  'food-prep':            'station-level prep',
  'work-tables':          'every prep station',
  'storage':              'organised back-of-house',
  'sinks-plumbing':       'scullery + wash bays',
  'dishwashing':          'high-throughput wash',
  'service-display':      'service counters',
  'coffee-espresso':      'specialty coffee bars',
  'bar-equipment':        'bars + nightlife',
};

export const meta = ({params}) => {
  const cat = categoryBySlug[params.handle];
  const name = cat?.name ?? 'All categories';
  return [
    {title: `${name} — Keystonne`},
    {
      name: 'description',
      content: cat?.blurb ?? 'Commercial kitchen equipment for India.',
    },
  ];
};

const SORTS = [
  {value: 'featured', label: 'Featured'},
  {value: 'priceAsc', label: 'Price: low → high'},
  {value: 'priceDesc', label: 'Price: high → low'},
  {value: 'ratingDesc', label: 'Top-rated'},
];

export default function Collection() {
  const params = useParams();
  const handle = params.handle;
  const cat = categoryBySlug[handle];
  const all = handle === 'all' ? products : productsByCategory(handle);

  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(null);
  const [shipFast, setShipFast] = useState(false);

  const visible = useMemo(() => {
    let out = [...all];
    if (maxPrice) out = out.filter((p) => (p.priceINR ?? Infinity) <= maxPrice);
    if (shipFast) out = out.filter((p) => p.leadDays <= 7);
    if (sort === 'priceAsc') out.sort((a, b) => (a.priceINR ?? 9e9) - (b.priceINR ?? 9e9));
    if (sort === 'priceDesc') out.sort((a, b) => (b.priceINR ?? -1) - (a.priceINR ?? -1));
    if (sort === 'ratingDesc') out.sort((a, b) => b.rating - a.rating);
    return out;
  }, [all, sort, maxPrice, shipFast]);

  const role = cat ? (CATEGORY_ROLE[cat.slug] ?? 'commercial kitchens') : null;

  return (
    <>
      {/* Editorial category header */}
      <section
        className="border-b"
        style={{
          background: 'var(--ks-page-warm)',
          borderColor: 'var(--ks-line-soft)',
        }}
      >
        <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-12">
          <Breadcrumbs cat={cat} handle={handle} />

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="apple-eyebrow">
                Commercial equipment
              </span>
              <h1
                className="mt-3 text-3xl font-semibold tracking-tight md:text-[40px]"
                style={{color: 'var(--ks-ink)'}}
              >
                {cat
                  ? <>{cat.name} for <span style={{color: 'var(--ks-muted)'}}>{role}</span>.</>
                  : handle === 'all'
                  ? <>The full Keystonne catalog. <span style={{color: 'var(--ks-muted)'}}>Every category.</span></>
                  : 'Category'}
              </h1>
              <p
                className="mt-3 max-w-2xl text-[15px] leading-relaxed"
                style={{color: 'var(--ks-ink-2)'}}
              >
                Compare capacity, dimensions, power load, delivery, warranty,
                and GST-ready pricing — every spec published up front.
              </p>
            </div>
            <div
              className="text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              <span
                className="tabular font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                {visible.length}
              </span>{' '}
              of {all.length} products shown
            </div>
          </div>
        </div>
      </section>

      {/* Body — sticky filter rail + product grid */}
      <section className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 md:grid-cols-12 md:px-6 md:py-12">
        <aside className="md:col-span-3 md:sticky md:top-2 md:self-start">
          <div
            className="rounded-[var(--ks-radius-md)] p-4"
            style={{
              background: 'var(--ks-card-solid)',
              border: '1px solid var(--ks-line-soft)',
            }}
          >
            <div
              className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-muted)'}}
            >
              <Filter className="h-3.5 w-3.5" strokeWidth={1.6} />
              Filter
            </div>

            <FilterGroup title="Sort by">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-md px-2 py-1.5 text-sm focus:outline-none"
                style={{
                  background: '#fafafa',
                  border: '1px solid var(--ks-line)',
                  color: 'var(--ks-ink)',
                }}
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </FilterGroup>

            <FilterGroup title="Max price">
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  {label: 'Any', value: null},
                  {label: 'Under ₹50K', value: 50_000},
                  {label: 'Under ₹1L', value: 1_00_000},
                  {label: 'Under ₹3L', value: 3_00_000},
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setMaxPrice(opt.value)}
                    className={cn(
                      'rounded-md px-2 py-1.5 text-[12px] font-medium transition-colors',
                    )}
                    style={{
                      background:
                        maxPrice === opt.value ? 'var(--ks-ink)' : 'var(--ks-card-solid)',
                      color:
                        maxPrice === opt.value ? '#ffffff' : 'var(--ks-ink-2)',
                      border:
                        '1px solid ' +
                        (maxPrice === opt.value ? 'var(--ks-ink)' : 'var(--ks-line)'),
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Shipping">
              <label
                className="flex items-center gap-2 text-sm"
                style={{color: 'var(--ks-ink)'}}
              >
                <input
                  type="checkbox"
                  checked={shipFast}
                  onChange={(e) => setShipFast(e.target.checked)}
                  className="h-4 w-4 rounded"
                  style={{accentColor: 'var(--ks-ink)'}}
                />
                <Truck
                  className="h-4 w-4"
                  strokeWidth={1.6}
                  style={{color: 'var(--ks-ink)'}}
                />
                Ships within a week
              </label>
            </FilterGroup>

            <div
              className="mt-4 rounded-md p-3 text-[11px]"
              style={{
                background: '#fafafa',
                color: 'var(--ks-ink-2)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <div
                className="mb-1.5 inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.08em]"
                style={{color: 'var(--ks-ink)'}}
              >
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.6} />
                Buyer assurance
              </div>
              <ul className="space-y-1">
                <li>GST invoice · 18%</li>
                <li>Pan-India freight included</li>
                <li>1-year warranty standard</li>
              </ul>
            </div>
          </div>

          {/* Sibling categories — quick switch */}
          {handle !== 'all' && (
            <div
              className="mt-4 rounded-[var(--ks-radius-md)] p-4"
              style={{
                background: 'var(--ks-card-solid)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <div
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                Other categories
              </div>
              <ul className="space-y-1">
                {categories
                  .filter((c) => c.slug !== handle)
                  .slice(0, 8)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/collections/${c.slug}`}
                        prefetch="intent"
                        className="flex items-center justify-between rounded px-2 py-1 text-sm transition-colors hover:bg-black/5"
                        style={{color: 'var(--ks-ink-2)'}}
                      >
                        {c.name}
                        <ChevronRight
                          className="h-3 w-3 opacity-50"
                          style={{color: 'var(--ks-muted)'}}
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="md:col-span-9">
          {visible.length === 0 ? (
            <EmptyState cat={cat} />
          ) : (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}

          {all.some((p) => typeof p.priceINR !== 'number') && (
            <div
              className="mt-6 rounded-[var(--ks-radius-md)] p-4 text-sm"
              style={{
                background: 'var(--ks-blue-soft)',
                border: '1px solid rgba(0,113,227,0.18)',
                color: 'var(--ks-blue-dark)',
              }}
            >
              <span className="font-semibold">Bulk project?</span> Some items
              in {cat?.name ?? 'this category'} are priced on a per-project
              basis (walk-ins, hoods over 8 ft, etc.). Add them to your cart
              and request a single all-in quote.
            </div>
          )}
        </div>
      </section>

      <RequestQuoteCTA />
    </>
  );
}

function FilterGroup({title, children}) {
  return (
    <div
      className="mb-4 border-t pt-3 first:border-0 first:pt-0"
      style={{borderColor: 'var(--ks-line-soft)'}}
    >
      <div
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.10em]"
        style={{color: 'var(--ks-muted)'}}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Breadcrumbs({cat, handle}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[12px]"
      style={{color: 'var(--ks-muted)'}}
    >
      <Link to="/" className="hover:underline">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/collections/all" className="hover:underline">Catalog</Link>
      <ChevronRight className="h-3 w-3" />
      <span style={{color: 'var(--ks-ink)'}}>
        {cat?.name ?? (handle === 'all' ? 'All' : handle)}
      </span>
    </nav>
  );
}

function EmptyState({cat}) {
  return (
    <div
      className="rounded-[var(--ks-radius-md)] p-10 text-center"
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px dashed var(--ks-line)',
      }}
    >
      <h3
        className="text-base font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        Catalog for {cat?.name ?? 'this category'} is being expanded.
      </h3>
      <p
        className="mt-2 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Reach out and we&apos;ll spec a project for you. Most{' '}
        {cat?.name?.toLowerCase() ?? 'kitchen'} items ship within 2–3 weeks
        of advance.
      </p>
      <Link
        to="/quote"
        prefetch="intent"
        className="apple-button-amber mt-4"
      >
        Request a quote
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
