import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';

/**
 * Horizontal row of featured products. Used on the home page (Sprint 3)
 * and as a "Related products" strip on the PDP later (Sprint 4).
 *
 * On desktop renders a grid; on small screens reflows to a single column.
 * Could be upgraded to a true horizontal-scroll carousel in Sprint 10 polish.
 */
export function FeaturedRow({
  title,
  eyebrow,
  products,
  viewAllTo = '/collections/all',
}) {
  if (!products?.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 md:py-12">
      <header className="mb-6 flex items-end justify-between">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {title}
          </h2>
        </div>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            prefetch="intent"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-primary hover:underline md:inline-flex"
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
