import {Link} from 'react-router';
import {Trash2, FileText, ArrowRight, ShoppingCart} from 'lucide-react';
import {useQuoteCart} from '~/lib/quoteCart';
import {formatINR} from '~/lib/utils/formatINR';
import {useAside} from '~/components/Aside';

/**
 * Apple-checkout-style slide-over for the quote cart. Hairline rows,
 * compact qty steppers, a clean summary footer with amber primary
 * action. No gradients, no glass — the surface is solid white over
 * the existing Aside scrim.
 */
export function QuoteCartDrawer() {
  const {items, subtotal, gst, total, setQty, remove, count} = useQuoteCart();
  const {close} = useAside();

  if (count === 0) {
    return (
      <div className="grid h-full place-items-center p-8 text-center">
        <div>
          <ShoppingCart
            className="mx-auto h-9 w-9"
            strokeWidth={1.5}
            style={{color: 'var(--ks-muted)'}}
          />
          <h3
            className="mt-4 text-base font-semibold"
            style={{color: 'var(--ks-ink)'}}
          >
            Your cart is empty
          </h3>
          <p className="mt-1 text-sm" style={{color: 'var(--ks-ink-2)'}}>
            Add products from the catalog and we&apos;ll bundle them into a
            single quote request — freight, GST, and installation included.
          </p>
          <Link
            to="/collections/all"
            prefetch="intent"
            onClick={close}
            className="apple-button-primary mt-5"
          >
            Browse catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ul
        className="flex-1 overflow-y-auto"
        style={{borderColor: 'var(--ks-line-soft)'}}
      >
        {items.map((line) => (
          <li
            key={line.slug}
            className="flex gap-3 px-4 py-3.5"
            style={{borderBottom: '1px solid var(--ks-line-soft)'}}
          >
            <div
              className="h-14 w-14 shrink-0 rounded-lg"
              style={{
                background: `linear-gradient(180deg, ${tint(line.product.accent, 0.10)}, ${tint(line.product.accent, 0.04)})`,
                border: '1px solid var(--ks-line-soft)',
              }}
            />
            <div className="min-w-0 flex-1">
              <Link
                to={`/products/${line.slug}`}
                prefetch="intent"
                onClick={close}
                className="line-clamp-2 text-[13px] font-semibold leading-snug"
                style={{color: 'var(--ks-ink)'}}
              >
                {line.product.name}
              </Link>
              <div
                className="mt-1 text-[11px]"
                style={{color: 'var(--ks-muted)'}}
              >
                {line.unit ? `${formatINR(line.unit)} / each` : 'Project pricing'}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <QtyStepper
                  qty={line.qty}
                  onChange={(q) => setQty(line.slug, q)}
                />
                <button
                  type="button"
                  onClick={() => remove(line.slug)}
                  aria-label={`Remove ${line.product.name}`}
                  className="ml-auto transition-colors"
                  style={{color: 'var(--ks-muted)'}}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div
              className="tabular text-right text-[13px] font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              {line.unit ? formatINR(line.lineTotal) : '—'}
            </div>
          </li>
        ))}
      </ul>

      <div
        className="px-4 py-4"
        style={{
          borderTop: '1px solid var(--ks-line)',
          background: 'var(--ks-page-warm)',
        }}
      >
        <Row label="Subtotal" value={formatINR(subtotal)} />
        <Row label="GST · 18%" value={formatINR(gst)} muted />
        <Row label="Estimated total" value={formatINR(total)} strong />
        <p
          className="mt-2 text-[11px]"
          style={{color: 'var(--ks-muted)'}}
        >
          Excludes freight + installation. Final price confirmed on quote.
        </p>

        <div className="mt-4 space-y-2">
          <Link
            to="/quote"
            prefetch="intent"
            onClick={close}
            className="apple-button-amber w-full justify-center"
          >
            <FileText className="h-4 w-4" />
            Request a quote
          </Link>
          <Link
            to="/cart"
            prefetch="intent"
            onClick={close}
            className="apple-button-ghost w-full justify-center"
          >
            View full cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export function QtyStepper({qty, onChange}) {
  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-full text-[12px]"
      style={{border: '1px solid var(--ks-line)'}}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="h-6 w-7 transition-colors hover:bg-black/5"
        style={{color: 'var(--ks-ink-2)'}}
      >
        −
      </button>
      <span
        className="tabular w-7 text-center font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="h-6 w-7 transition-colors hover:bg-black/5"
        style={{color: 'var(--ks-ink-2)'}}
      >
        +
      </button>
    </div>
  );
}

function Row({label, value, strong, muted}) {
  return (
    <div className="flex items-baseline justify-between py-0.5 text-[13px]">
      <span style={{color: muted ? 'var(--ks-muted)' : 'var(--ks-ink-2)'}}>
        {label}
      </span>
      <span
        className={`tabular ${strong ? 'text-[15px] font-semibold' : 'font-medium'}`}
        style={{color: 'var(--ks-ink)'}}
      >
        {value}
      </span>
    </div>
  );
}

function tint(hex, opacity) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
