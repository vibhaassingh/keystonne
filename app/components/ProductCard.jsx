import {Link} from 'react-router';
import {Star, ShoppingCart, FileText} from 'lucide-react';
import {formatINR} from '~/lib/utils/formatINR';
import {categoryBySlug} from '~/lib/mock/categories';
import {cn} from '~/lib/utils/cn';

/**
 * Dense product card in WSS-style: rating · descriptive title · short spec ·
 * price-with-unit · dual CTA (Add to cart vs Request quote).
 *
 * "Add to Cart" only renders for items priced under ₹50,000 (CLAUDE.md §7).
 * "Request Quote" is always shown.
 *
 * Image is a solid colour block with the category icon — no stock
 * photography of equipment that could imply a manufacturer brand.
 */
export function ProductCard({product, compact = false}) {
  const cat = categoryBySlug[product.category];
  const Icon = cat?.icon ?? Star;
  const canAddToCart = typeof product.priceINR === 'number' && product.priceINR < 50_000;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.slug}`}
        prefetch="intent"
        className="block"
      >
        <div
          className="relative grid aspect-[4/3] w-full place-items-center"
          style={{
            background: `linear-gradient(135deg, ${product.accent}, ${shade(product.accent, -22)})`,
          }}
        >
          <Icon className="h-12 w-12 text-white/95" />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        {/* Rating */}
        <div className="mb-1.5 flex items-center gap-1 text-[11px] text-gray-500">
          <Stars value={product.rating} />
          <span className="tabular">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug}`} prefetch="intent">
          <h3 className={cn(
            'line-clamp-2 font-semibold leading-snug text-ink hover:text-brand-primary',
            compact ? 'text-[13px]' : 'text-sm',
          )}>
            {product.name}
          </h3>
        </Link>

        {/* Short spec line */}
        {!compact && (
          <p className="mt-1 line-clamp-2 text-[12px] text-gray-600">
            {firstSpecLine(product)}
          </p>
        )}

        {/* Price + lead time */}
        <div className="mt-3 flex items-end justify-between">
          {canAddToCart ? (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Starts at
              </div>
              <div className="tabular text-base font-semibold text-ink">
                {formatINR(product.priceINR)}
                <span className="ml-1 text-[10px] font-normal text-gray-500">
                  / each
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Project pricing
              </div>
              <div className="text-sm font-semibold text-brand-primary">
                Request a quote
              </div>
            </div>
          )}
          <div className="text-right text-[11px] text-gray-500">
            <div>+18% GST</div>
            <div>Ships in {product.leadDays}d</div>
          </div>
        </div>

        {/* Dual CTA */}
        <div className="mt-3 flex gap-2">
          {canAddToCart ? (
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-brand-accent px-2.5 py-2 text-[12px] font-semibold text-white hover:bg-brand-accent-hover"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to cart
            </button>
          ) : (
            <Link
              to={`/quote?sku=${product.slug}`}
              prefetch="intent"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-brand-primary px-2.5 py-2 text-[12px] font-semibold text-white hover:bg-brand-primary-700"
            >
              <FileText className="h-3.5 w-3.5" />
              Request quote
            </Link>
          )}

          <Link
            to={`/products/${product.slug}`}
            prefetch="intent"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-2.5 py-2 text-[12px] font-semibold text-ink hover:border-ink/50"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function Stars({value}) {
  // Render 5 stars, filled proportionally — bands at half-star resolution.
  return (
    <span className="flex" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="h-3.5 w-3.5 text-gray-300" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{width: `${fill * 100}%`}}
              aria-hidden="true"
            >
              <Star className="h-3.5 w-3.5 text-brand-accent" fill="currentColor" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function firstSpecLine(product) {
  const specs = product.specs || {};
  const keys = Object.keys(specs);
  if (keys.length === 0) return product.blurb;
  // Pick the two most informative keys.
  const pri = keys.find((k) => /capacity|dimension/i.test(k)) ?? keys[0];
  const sec = keys.find((k) => k !== pri && /power|temp|burner|throughput/i.test(k)) ?? keys[1];
  const out = [];
  if (pri) out.push(`${pri}: ${specs[pri]}`);
  if (sec) out.push(`${sec}: ${specs[sec]}`);
  return out.join(' · ');
}

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
