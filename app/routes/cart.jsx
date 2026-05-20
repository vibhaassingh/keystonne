import {Link} from 'react-router';
import {ArrowRight, FileText, Trash2, ShoppingCart} from 'lucide-react';
import {useQuoteCart} from '~/lib/quoteCart';
import {QtyStepper} from '~/components/QuoteCartDrawer';
import {formatINR} from '~/lib/utils/formatINR';

/**
 * Apple-checkout-style full-page quote cart. Hairline-divided line
 * items on the left, calm summary sidebar on the right, amber primary
 * action wired to /quote. No gradients, no shadows — premium-panel
 * surfaces and inline ks-* colours throughout.
 */

export const meta = () => [{title: 'Your cart — Keystonne'}];

export default function CartPage() {
  const {items, count, subtotal, gst, total, hasQuoteOnly, setQty, remove, clear} = useQuoteCart();

  if (count === 0) return <EmptyCart />;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="apple-eyebrow">Quote cart</span>
          <h1
            className="mt-2 text-[32px] font-semibold tracking-tight md:text-[40px]"
            style={{color: 'var(--ks-ink)'}}
          >
            Your kitchen, ready to quote.
          </h1>
          <p
            className="mt-2 text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {count} item{count !== 1 ? 's' : ''} ·{' '}
            {hasQuoteOnly
              ? 'Includes project-priced items; you’ll receive a single bundled quote.'
              : 'Pay via standard terms or convert the cart into a quote request.'}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-[13px] font-medium transition-colors"
          style={{color: 'var(--ks-muted)'}}
        >
          Clear cart
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Lines */}
        <div className="md:col-span-8">
          <ul
            className="overflow-hidden rounded-[var(--ks-radius-md)]"
            style={{
              background: 'var(--ks-card-solid)',
              border: '1px solid var(--ks-line-soft)',
            }}
          >
            {items.map((line, i) => (
              <li
                key={line.slug}
                className="flex gap-4 p-4"
                style={{
                  borderTop:
                    i === 0 ? 'none' : '1px solid var(--ks-line-soft)',
                }}
              >
                <div
                  className="h-20 w-20 shrink-0 rounded-md md:h-24 md:w-24"
                  style={{
                    background: `linear-gradient(180deg, ${tint(line.product.accent, 0.10)}, ${tint(line.product.accent, 0.04)})`,
                    border: '1px solid var(--ks-line-soft)',
                  }}
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/products/${line.slug}`}
                    prefetch="intent"
                    className="line-clamp-2 text-[14px] font-semibold leading-snug md:text-[15px]"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {line.product.name}
                  </Link>
                  <div
                    className="mt-1 text-[12px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {line.unit
                      ? `${formatINR(line.unit)} / each · Ships in ${line.product.leadDays}d`
                      : 'Project pricing · Lead time confirmed on quote'}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <QtyStepper
                      qty={line.qty}
                      onChange={(q) => setQty(line.slug, q)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      className="inline-flex items-center gap-1 text-[12px] font-medium transition-colors"
                      style={{color: 'var(--ks-muted)'}}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="tabular text-[16px] font-semibold"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {line.unit ? formatINR(line.lineTotal) : 'Quote'}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    +18% GST
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/collections/all"
            prefetch="intent"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium"
            style={{color: 'var(--ks-blue)'}}
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="md:col-span-4">
          <div
            className="sticky top-2 commercial-buy-box"
          >
            <span className="apple-eyebrow">Order summary</span>
            <ul className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal (priced items)" value={formatINR(subtotal)} />
              <Row label="GST · 18%" value={formatINR(gst)} muted />
              {hasQuoteOnly && (
                <Row label="Project-priced items" value="On quote" muted />
              )}
              <Row label="Freight" value="Included" muted />
              <Row
                label="Installation"
                value={subtotal > 10_00_000 ? 'Included' : 'On quote'}
                muted
              />
              <li
                className="my-2 border-t"
                style={{borderColor: 'var(--ks-line-soft)'}}
              />
              <Row label="Estimated total" value={formatINR(total)} strong />
            </ul>

            <p
              className="mt-3 text-[11px]"
              style={{color: 'var(--ks-muted)'}}
            >
              Final invoice includes freight + installation per India terms;
              total above is informational.
            </p>

            <div className="mt-5 space-y-2">
              <Link
                to="/quote"
                prefetch="intent"
                className="apple-button-amber w-full justify-center"
              >
                <FileText className="h-4 w-4" />
                Continue to quote request
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <p
                className="px-1 text-center text-[11px]"
                style={{color: 'var(--ks-muted)'}}
              >
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
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <ShoppingCart
        className="mx-auto h-10 w-10"
        strokeWidth={1.4}
        style={{color: 'var(--ks-muted)'}}
      />
      <h1
        className="mt-4 text-[28px] font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        Your cart is empty.
      </h1>
      <p
        className="mt-2 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Add products from the catalog and we&apos;ll bundle them into a
        single quote — including freight, installation, and GST.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/collections/all" className="apple-button-primary">
          Browse catalog
        </Link>
        <Link to="/kitchen-planner" className="apple-button-ghost">
          Build my kitchen
        </Link>
      </div>
    </section>
  );
}

function Row({label, value, strong, muted}) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <span style={{color: muted ? 'var(--ks-muted)' : 'var(--ks-ink-2)'}}>
        {label}
      </span>
      <span
        className={`tabular ${strong ? 'text-[18px] font-semibold' : 'font-medium'}`}
        style={{color: 'var(--ks-ink)'}}
      >
        {value}
      </span>
    </li>
  );
}

function tint(hex, opacity) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
