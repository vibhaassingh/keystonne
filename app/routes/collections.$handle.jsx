import {useState, useMemo} from 'react';
import {Link, useParams} from 'react-router';
import {ArrowRight, ChevronRight, Filter, Truck, ShieldCheck} from 'lucide-react';
import {categories, categoryBySlug} from '~/lib/mock/categories';
import {products, productsByCategory} from '~/lib/mock/products';
import {ProductCard} from '~/components/ProductCard';
import {RequestQuoteCTA} from '~/components/RequestQuoteCTA';
import {formatINR} from '~/lib/utils/formatINR';
import {cn} from '~/lib/utils/cn';

/**
 * Collection (category) page. Server has no loader because the catalog is
 * locally-sourced mock data; we read from `app/lib/mock/products.js` directly.
 *
 *  /collections/refrigeration  → 6 products
 *  /collections/all            → every product
 *  /collections/<unknown>      → "Coming soon" with sibling category list
 */

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
  const [maxPrice, setMaxPrice] = useState(null); // null = no filter
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

  return (
    <>
      {/* Hero strip */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 md:py-8">
          <Breadcrumbs cat={cat} handle={handle} />

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-ink md:text-3xl">
                {cat?.name ?? (handle === 'all' ? 'Full catalog' : 'Category')}
              </h1>
              {cat?.blurb && (
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  {cat.blurb}
                </p>
              )}
              {handle === 'all' && (
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  Every product across {categories.length} categories.
                  Filter by price or shipping speed on the left.
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray-600">
              <span className="tabular">{visible.length}</span> of {all.length} products shown
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 md:grid-cols-12 md:px-6 md:py-10">
        {/* Filter sidebar */}
        <aside className="md:col-span-3 md:sticky md:top-2 md:self-start">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </div>

            <FilterGroup title="Sort by">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-ink focus:border-brand-primary focus:outline-none"
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
                      'rounded border px-2 py-1.5 text-[12px] font-medium transition-colors',
                      maxPrice === opt.value
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 text-ink hover:border-ink/40',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Shipping">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={shipFast}
                  onChange={(e) => setShipFast(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <Truck className="h-4 w-4 text-brand-primary" />
                Ships within a week
              </label>
            </FilterGroup>

            <div className="mt-4 rounded-md bg-brand-primary-50 p-3 text-[11px] text-brand-primary">
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                Buyer assurance
              </div>
              <ul className="mt-1.5 space-y-1 text-gray-700">
                <li>GST invoice · 18%</li>
                <li>Pan-India freight included</li>
                <li>1-year warranty standard</li>
              </ul>
            </div>
          </div>

          {/* Sibling categories — quick switch */}
          {handle !== 'all' && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
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
                        className="flex items-center justify-between rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-primary"
                      >
                        {c.name}
                        <ChevronRight className="h-3 w-3 opacity-50" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Grid */}
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

          {/* Project-pricing nudge for quote-only categories */}
          {all.some((p) => typeof p.priceINR !== 'number') && (
            <div className="mt-6 rounded-lg border border-dashed border-brand-primary/30 bg-brand-primary-50 p-4 text-sm text-brand-primary">
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
    <div className="mb-4 border-t border-gray-100 pt-3 first:border-0 first:pt-0">
      <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {title}
      </div>
      {children}
    </div>
  );
}

function Breadcrumbs({cat, handle}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[12px] text-gray-500">
      <Link to="/" className="hover:text-brand-primary">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/collections/all" className="hover:text-brand-primary">Catalog</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-ink">{cat?.name ?? (handle === 'all' ? 'All' : handle)}</span>
    </nav>
  );
}

function EmptyState({cat}) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
      <h3 className="text-base font-semibold text-ink">
        Catalog for {cat?.name ?? 'this category'} is being expanded.
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Reach out and we&apos;ll spec a project for you. Most {cat?.name?.toLowerCase() ?? 'kitchen'} items
        ship within 2–3 weeks of advance.
      </p>
      <Link
        to="/quote"
        prefetch="intent"
        className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-700"
      >
        Request a quote
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
