import {Link} from 'react-router';
import {ArrowRight, FileText, Trash2, ShoppingCart} from 'lucide-react';
import {useQuoteCart} from '~/lib/quoteCart';
import {QtyStepper} from '~/components/QuoteCartDrawer';
import {formatINR} from '~/lib/utils/formatINR';

/**
 * Full-page cart. Two modes:
 *   - "checkout" — visible when every line has a priceINR; shows totals,
 *     but the checkout button is informational only (Phase 1 routes you
 *     to /quote regardless).
 *   - "quote" — when any line is project-priced, the page tilts toward
 *     "Request a single quote for all items".
 *
 * Either way the primary CTA is /quote — Phase 1 has no real checkout.
 */

export const meta = () => [{title: 'Your cart — Keystonne'}];

export default function CartPage() {
  const {items, count, subtotal, gst, total, hasQuoteOnly, setQty, remove, clear} = useQuoteCart();

  if (count === 0) return <EmptyCart />;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink md:text-3xl">Your cart</h1>
          <p className="mt-1 text-sm text-gray-600">
            {count} item{count !== 1 ? 's' : ''} ·{' '}
            {hasQuoteOnly
              ? 'Includes project-priced items; you’ll receive a single bundled quote.'
              : 'Pay via standard terms or convert the cart into a quote request.'}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-medium text-gray-500 hover:text-red-600"
        >
          Clear cart
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Lines */}
        <div className="md:col-span-8">
          <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
            {items.map((line) => (
              <li key={line.slug} className="flex gap-4 p-4">
                <div
                  className="h-20 w-20 shrink-0 rounded-md md:h-24 md:w-24"
                  style={{
                    background: `linear-gradient(135deg, ${line.product.accent}, #00000022)`,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/products/${line.slug}`}
                    prefetch="intent"
                    className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand-primary md:text-base"
                  >
                    {line.product.name}
                  </Link>
                  <div className="mt-1 text-[12px] text-gray-500">
                    {line.unit
                      ? `${formatINR(line.unit)} / each · Ships in ${line.product.leadDays}d`
                      : 'Project pricing · Lead time confirmed on quote'}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <QtyStepper qty={line.qty} onChange={(q) => setQty(line.slug, q)} />
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="tabular text-base font-semibold text-ink">
                    {line.unit ? formatINR(line.lineTotal) : 'Quote'}
                  </div>
                  <div className="text-[11px] text-gray-500">+18% GST</div>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/collections/all"
            prefetch="intent"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="md:col-span-4">
          <div className="sticky top-2 rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
              Order summary
            </h2>
            <ul className="space-y-2 text-sm">
              <Row label="Subtotal (priced items)" value={formatINR(subtotal)} />
              <Row label="GST · 18%" value={formatINR(gst)} muted />
              {hasQuoteOnly && (
                <Row
                  label="Project-priced items"
                  value="On quote"
                  muted
                />
              )}
              <Row label="Freight" value="Included" muted />
              <Row label="Installation" value={subtotal > 10_00_000 ? 'Included' : 'On quote'} muted />
              <li className="my-2 border-t border-gray-200" />
              <Row label="Estimated total" value={formatINR(total)} strong />
            </ul>

            <p className="mt-3 text-[11px] text-gray-500">
              Final invoice includes freight + installation per CLAUDE.md
              §10 defaults; total above is informational.
            </p>

            <div className="mt-4 space-y-2">
              <Link
                to="/quote"
                prefetch="intent"
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-white hover:bg-brand-primary-700"
              >
                <FileText className="h-4 w-4" />
                Continue to quote request
                <ArrowRight className="h-4 w-4 opacity-80" />
              </Link>
              <p className="px-1 text-center text-[11px] text-gray-500">
                Demo mode — no checkout yet. We send the bundle to the sales
                team, who returns a single all-in quote within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyCart() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
      <h1 className="mt-4 text-2xl font-semibold text-ink">Your cart is empty.</h1>
      <p className="mt-2 text-sm text-gray-600">
        Add products from the catalog and we&apos;ll bundle them into a
        single quote — including freight, installation, and GST.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/collections/all"
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-700"
        >
          Browse catalog
        </Link>
        <Link
          to="/kitchen-planner"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/40"
        >
          Build my kitchen
        </Link>
      </div>
    </section>
  );
}

function Row({label, value, strong, muted}) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <span className={muted ? 'text-gray-500' : 'text-gray-700'}>{label}</span>
      <span
        className={`tabular ${strong ? 'text-lg font-semibold text-ink' : 'font-medium text-ink'}`}
      >
        {value}
      </span>
    </li>
  );
}
