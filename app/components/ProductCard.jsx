import {Link} from 'react-router';
import {Star, ShoppingCart, FileText, Check} from 'lucide-react';
import {useState} from 'react';
import {formatINR} from '~/lib/utils/formatINR';
import {categoryBySlug} from '~/lib/mock/categories';
import {useQuoteCart} from '~/lib/quoteCart';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/utils/cn';

/**
 * Modern, dense product card. Rounded-2xl glass surface with hover-lift,
 * tinted gradient image panel, inner highlight, soft shadow stack. WSS
 * density preserved: rating, brand-prefixed title, two-line spec line,
 * price-with-unit, dual CTA (Add to cart / Request quote).
 *
 * "Add to Cart" only renders for items priced under ₹50,000 (CLAUDE.md §7).
 */
export function ProductCard({product, compact = false}) {
  const cat = categoryBySlug[product.category];
  const Icon = cat?.icon ?? Star;
  const canAddToCart =
    typeof product.priceINR === 'number' && product.priceINR < 50_000;
  const {add} = useQuoteCart();
  const {open} = useAside();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    add(product.slug, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    setTimeout(() => open('cart'), 200);
  }

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        to={`/products/${product.slug}`}
        prefetch="intent"
        className="relative block overflow-hidden rounded-t-[15px]"
      >
        <div
          className="relative grid aspect-[4/3] w-full place-items-center"
          style={{
            background: `linear-gradient(135deg, ${product.accent}, ${shade(product.accent, -25)})`,
          }}
        >
          {/* Floating orb for depth */}
          <div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
            style={{background: product.accent}}
          />
          <Icon className="relative h-14 w-14 text-white/95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {/* Rating */}
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-gray-500">
          <Stars value={product.rating} />
          <span className="tabular">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug}`} prefetch="intent">
          <h3
            className={cn(
              'line-clamp-2 font-semibold leading-snug text-ink transition-colors group-hover:text-brand-primary',
              compact ? 'text-[13px]' : 'text-sm',
            )}
          >
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
              onClick={handleAdd}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[12px] font-semibold text-white transition-all',
                justAdded
                  ? 'bg-emerald-600'
                  : 'btn-accent hover:-translate-y-0.5',
              )}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to cart
                </>
              )}
            </button>
          ) : (
            <Link
              to={`/quote?sku=${product.slug}`}
              prefetch="intent"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg btn-primary px-2.5 py-2 text-[12px] font-semibold transition-all hover:-translate-y-0.5"
            >
              <FileText className="h-3.5 w-3.5" />
              Request quote
            </Link>
          )}

          <Link
            to={`/products/${product.slug}`}
            prefetch="intent"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-[12px] font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors hover:border-ink/30"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function Stars({value}) {
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
  const pri = keys.find((k) => /capacity|dimension/i.test(k)) ?? keys[0];
  const sec =
    keys.find((k) => k !== pri && /power|temp|burner|throughput/i.test(k)) ??
    keys[1];
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
