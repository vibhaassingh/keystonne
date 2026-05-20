import {Link} from 'react-router';
import {useState} from 'react';
import {Star, FileText, Check, ArrowRight} from 'lucide-react';
import {formatINR} from '~/lib/utils/formatINR';
import {categoryBySlug} from '~/lib/mock/categories';
import {useQuoteCart} from '~/lib/quoteCart';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/utils/cn';

/**
 * Apple-style dense product card.
 *
 * Layout:
 *   ┌──────────────────────────────┐
 *   │ [neutral image panel · icon] │  + optional badge top-right
 *   ├──────────────────────────────┤
 *   │  CATEGORY eyebrow            │
 *   │  Product name (≤ 2 lines)    │
 *   │  Short commercial use case   │
 *   │  · Dimensions: 1340 × 770 …  │
 *   │  · Capacity: 1,240 L         │
 *   │  · Lead time: 7 days         │
 *   ├──────────────────────────────┤
 *   │  ₹1,29,000 / each   +18% GST │
 *   │  [Add to quote] [Details →]  │
 *   └──────────────────────────────┘
 *
 * CTA discipline (brief §3): amber for procurement-intent actions
 * only ("Add to quote" / "Request quote"); secondary "Details" stays
 * neutral as a blue link.
 */
export function ProductCard({product}) {
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
    setTimeout(() => open('cart'), 220);
  }

  const specs = product.specs || {};
  const specLines = [
    pickSpec(specs, /dimension|size/i, ['Dimensions']),
    pickSpec(specs, /capacity|throughput|tray/i, ['Capacity']),
    pickSpec(specs, /power|burner|fuel|airflow/i, ['Power draw']),
  ].filter(Boolean).slice(0, 3);

  // Fallback to lead/warranty if specs don't surface enough technical rows.
  if (specLines.length < 3) {
    specLines.push({label: 'Lead time', value: `${product.leadDays} days`});
  }

  return (
    <article
      className="group flex h-full flex-col overflow-hidden transition-colors"
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px solid var(--ks-line-soft)',
        borderRadius: 'var(--ks-radius-md)',
      }}
    >
      {/* Image panel — neutral surface, soft tint hint from accent */}
      <Link
        to={`/products/${product.slug}`}
        prefetch="intent"
        className="relative block"
      >
        <div
          className="relative grid aspect-[5/4] w-full place-items-center"
          style={{
            background: `linear-gradient(180deg, ${tint(product.accent, 0.06)} 0%, ${tint(product.accent, 0.02)} 100%)`,
          }}
        >
          <Icon
            className="h-14 w-14"
            strokeWidth={1.4}
            style={{color: 'var(--ks-ink-2)'}}
          />
          {product.badge && (
            <span
              className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{
                background: 'var(--ks-card-solid)',
                color: 'var(--ks-ink)',
                border: '1px solid var(--ks-line)',
              }}
            >
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {/* Category eyebrow */}
        {cat && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-muted)'}}
          >
            {cat.name}
          </span>
        )}

        {/* Title + short use case */}
        <Link to={`/products/${product.slug}`} prefetch="intent">
          <h3
            className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug transition-colors group-hover:opacity-90"
            style={{color: 'var(--ks-ink)'}}
          >
            {product.name}
          </h3>
        </Link>
        <p
          className="mt-1 line-clamp-2 text-[12px] leading-snug"
          style={{color: 'var(--ks-ink-2)'}}
        >
          {product.blurb}
        </p>

        {/* Spec bullets */}
        <ul
          className="mt-3 space-y-0.5 text-[11px]"
          style={{color: 'var(--ks-muted)'}}
        >
          {specLines.map((s) => (
            <li key={s.label} className="flex gap-1.5">
              <span>{s.label}:</span>
              <span
                className="tabular"
                style={{color: 'var(--ks-ink-2)'}}
              >
                {s.value}
              </span>
            </li>
          ))}
        </ul>

        {/* Price + meta */}
        <div
          className="mt-4 flex items-end justify-between border-t pt-3"
          style={{borderColor: 'var(--ks-line-soft)'}}
        >
          {canAddToCart ? (
            <div>
              <div
                className="tabular text-[16px] font-semibold leading-none"
                style={{color: 'var(--ks-ink)'}}
              >
                {formatINR(product.priceINR)}
                <span
                  className="ml-1 text-[10px] font-medium"
                  style={{color: 'var(--ks-muted)'}}
                >
                  /each
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                style={{color: 'var(--ks-muted)'}}
              >
                Project pricing
              </div>
              <div
                className="text-[14px] font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Request quote
              </div>
            </div>
          )}
          <div
            className="text-right text-[10px]"
            style={{color: 'var(--ks-muted)'}}
          >
            <div>+18% GST</div>
            <div>Ships in {product.leadDays}d</div>
          </div>
        </div>

        {/* Dual CTA */}
        <div className="mt-3 flex items-center gap-2">
          {canAddToCart ? (
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition-colors',
                justAdded ? '' : 'apple-button-amber',
              )}
              style={
                justAdded
                  ? {
                      background: 'var(--ks-emerald)',
                      color: '#ffffff',
                      border: '1px solid transparent',
                    }
                  : undefined
              }
            >
              {justAdded ? (
                <><Check className="h-3.5 w-3.5" /> Added</>
              ) : (
                <>Add to quote</>
              )}
            </button>
          ) : (
            <Link
              to={`/quote?sku=${product.slug}`}
              prefetch="intent"
              className="apple-button-amber flex-1 justify-center !py-2 !text-[12px]"
            >
              <FileText className="h-3.5 w-3.5" />
              Request quote
            </Link>
          )}

          <Link
            to={`/products/${product.slug}`}
            prefetch="intent"
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium transition-colors"
            style={{color: 'var(--ks-blue)'}}
          >
            Details
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function pickSpec(specs, pattern, labelOverrides = []) {
  const keys = Object.keys(specs);
  const k = keys.find((key) => pattern.test(key));
  if (!k) return null;
  return {label: labelOverrides[0] ?? k, value: specs[k]};
}

/** Take a hex colour and blend with white at given opacity to get a tint. */
function tint(hex, opacity) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
