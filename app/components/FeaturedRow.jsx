import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';

/**
 * Horizontal product row with the new Apple-style section header.
 * The card visuals themselves are still the Sprint 3 ProductCard;
 * Sprint 4 refines those into the denser commercial layout the brief
 * specifies (rating · brand · specs · price-or-quote · dual CTA).
 */
export function FeaturedRow({
  title,
  eyebrow,
  products,
  viewAllTo = '/collections/all',
}) {
  if (!products?.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <header className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          {eyebrow && <span className="apple-eyebrow">{eyebrow}</span>}
          <h2
            className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
            style={{color: 'var(--ks-ink)'}}
          >
            {title}
          </h2>
        </div>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            prefetch="intent"
            className="hidden items-center gap-1 text-[13px] font-medium md:inline-flex"
            style={{color: 'var(--ks-blue)'}}
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
