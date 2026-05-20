import {useMemo} from 'react';
import {Link, useSearchParams} from 'react-router';
import {Search, ChevronRight} from 'lucide-react';
import {products} from '~/lib/mock/products';
import {categories} from '~/lib/mock/categories';
import {businessTypes} from '~/lib/mock/businessTypes';
import {ProductCard} from '~/components/ProductCard';

export const meta = ({location}) => {
  const q = new URLSearchParams(location?.search ?? '').get('q') || '';
  return [{title: q ? `"${q}" — Search Keystonne` : 'Search Keystonne'}];
};

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const needle = q.toLowerCase();

  const {productHits, categoryHits, ventureHits} = useMemo(() => {
    if (!q) return {productHits: [], categoryHits: [], ventureHits: []};
    return {
      productHits: products.filter((p) =>
        (p.name + ' ' + p.blurb + ' ' + (p.category || ''))
          .toLowerCase()
          .includes(needle),
      ),
      categoryHits: categories.filter((c) =>
        (c.name + ' ' + c.blurb).toLowerCase().includes(needle),
      ),
      ventureHits: businessTypes.filter((b) =>
        (b.name + ' ' + b.tagline).toLowerCase().includes(needle),
      ),
    };
  }, [q, needle]);

  const total = productHits.length + categoryHits.length + ventureHits.length;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <header className="mb-8">
        <span className="apple-eyebrow">Search</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[36px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          {q ? <>Results for &ldquo;{q}&rdquo;</> : 'Search the Keystonne catalog'}
        </h1>
        {q && (
          <p
            className="mt-2 text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {total} match{total === 1 ? '' : 'es'} across catalog,
            categories, and venture types.
          </p>
        )}
      </header>

      <form method="get" action="/search" role="search" className="mb-10">
        <div className="relative max-w-2xl">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{color: 'var(--ks-muted)'}}
          />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Try: refrigerator, espresso, work table, hotel kitchen…"
            className="h-11 w-full rounded-full pl-10 pr-3 text-sm focus:outline-none"
            style={{
              background: 'var(--ks-card-tint)',
              border: '1px solid var(--ks-line-soft)',
              color: 'var(--ks-ink)',
            }}
          />
        </div>
      </form>

      {!q ? (
        <EmptyPrompt />
      ) : total === 0 ? (
        <EmptyResults q={q} />
      ) : (
        <div className="space-y-12">
          {productHits.length > 0 && (
            <section>
              <h2
                className="mb-4 text-lg font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Products ({productHits.length})
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {productHits.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {categoryHits.length > 0 && (
            <ResultsList
              title={`Categories (${categoryHits.length})`}
              items={categoryHits.map((c) => ({
                key: c.slug,
                to: `/collections/${c.slug}`,
                label: c.name,
                sub: c.blurb,
              }))}
            />
          )}

          {ventureHits.length > 0 && (
            <ResultsList
              title={`Venture types (${ventureHits.length})`}
              items={ventureHits.map((b) => ({
                key: b.slug,
                to: `/business-type/${b.slug}`,
                label: b.name,
                sub: b.tagline,
              }))}
            />
          )}
        </div>
      )}
    </section>
  );
}

function ResultsList({title, items}) {
  return (
    <section>
      <h2
        className="mb-4 text-lg font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        {title}
      </h2>
      <ul className="grid gap-2 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.key}>
            <Link
              to={it.to}
              prefetch="intent"
              className="premium-card flex items-center gap-3 p-4"
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-semibold"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {it.label}
                </div>
                <div
                  className="line-clamp-1 text-[12px]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  {it.sub}
                </div>
              </div>
              <ChevronRight
                className="h-4 w-4"
                style={{color: 'var(--ks-muted)'}}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyPrompt() {
  return (
    <div className="premium-panel p-12 text-center">
      <Search
        className="mx-auto h-8 w-8"
        style={{color: 'var(--ks-muted)'}}
        strokeWidth={1.6}
      />
      <h2
        className="mt-4 text-base font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        Search the catalog, categories, and venture types.
      </h2>
      <p
        className="mt-2 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Try a product name (&ldquo;reach-in fridge&rdquo;), a category
        (&ldquo;refrigeration&rdquo;), or a venture (&ldquo;cloud kitchen&rdquo;).
      </p>
    </div>
  );
}

function EmptyResults({q}) {
  return (
    <div className="premium-panel p-12 text-center">
      <h2
        className="text-base font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        No matches for &ldquo;{q}&rdquo;.
      </h2>
      <p
        className="mt-2 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Try a broader term, or describe your kitchen to the AI planner —
        we&apos;ll suggest the right equipment.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link
          to="/collections/refrigeration"
          className="apple-button-ghost"
        >
          Browse categories
        </Link>
        <Link
          to="/kitchen-planner"
          className="apple-button-primary"
          style={{background: 'var(--ks-blue)', borderColor: 'rgba(0,113,227,0.5)'}}
        >
          Use the AI planner
        </Link>
      </div>
    </div>
  );
}
