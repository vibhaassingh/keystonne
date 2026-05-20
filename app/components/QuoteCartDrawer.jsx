import {Link} from 'react-router';
import {Trash2, FileText, ArrowRight, ShoppingCart} from 'lucide-react';
import {useQuoteCart} from '~/lib/quoteCart';
import {formatINR} from '~/lib/utils/formatINR';
import {useAside} from '~/components/Aside';

/**
 * Cart drawer content for the Aside slide-over. Lists items, supports qty
 * change + remove, summary at the bottom with subtotal/GST/total and two
 * CTAs (open full cart, or jump to quote request).
 */
export function QuoteCartDrawer() {
  const {items, subtotal, gst, total, setQty, remove, count} = useQuoteCart();
  const {close} = useAside();

  if (count === 0) {
    return (
      <div className="grid h-full place-items-center p-8 text-center">
        <div>
          <ShoppingCart className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-4 text-base font-semibold text-ink">
            Your cart is empty
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Add products from the catalog and we&apos;ll bundle them into a
            single quote request, with freight and installation.
          </p>
          <Link
            to="/collections/all"
            prefetch="intent"
            onClick={close}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-700"
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
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {items.map((line) => (
          <li key={line.slug} className="flex gap-3 p-3.5">
            <div
              className="h-16 w-16 shrink-0 rounded-md"
              style={{background: `linear-gradient(135deg, ${line.product.accent}, #00000022)`}}
            />
            <div className="min-w-0 flex-1">
              <Link
                to={`/products/${line.slug}`}
                prefetch="intent"
                onClick={close}
                className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand-primary"
              >
                {line.product.name}
              </Link>
              <div className="mt-1 text-[11px] text-gray-500">
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
                  className="ml-auto text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="tabular text-right text-sm font-semibold text-ink">
              {line.unit ? formatINR(line.lineTotal) : '—'}
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 text-sm">
        <Row label="Subtotal" value={formatINR(subtotal)} />
        <Row label="GST · 18%" value={formatINR(gst)} muted />
        <Row label="Estimated total" value={formatINR(total)} strong />
        <p className="mt-2 text-[11px] text-gray-500">
          Excludes freight + installation. Final price confirmed on quote.
        </p>

        <div className="mt-4 space-y-2">
          <Link
            to="/quote"
            prefetch="intent"
            onClick={close}
            className="flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-primary px-3 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-700"
          >
            <FileText className="h-4 w-4" />
            Request a quote
          </Link>
          <Link
            to="/cart"
            prefetch="intent"
            onClick={close}
            className="block w-full rounded-md border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-ink hover:border-ink/40"
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
    <div className="inline-flex items-center overflow-hidden rounded border border-gray-300 text-sm">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="h-7 w-7 text-gray-600 hover:bg-gray-100"
      >
        −
      </button>
      <span className="tabular w-7 text-center font-semibold text-ink">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="h-7 w-7 text-gray-600 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}

function Row({label, value, strong, muted}) {
  return (
    <div className="flex items-baseline justify-between py-0.5">
      <span className={muted ? 'text-gray-500' : 'text-gray-700'}>
        {label}
      </span>
      <span className={`tabular ${strong ? 'text-base font-semibold text-ink' : ''}`}>
        {value}
      </span>
    </div>
  );
}
