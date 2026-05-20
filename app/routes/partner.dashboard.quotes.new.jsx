import {useState, useMemo} from 'react';
import {Link} from 'react-router';
import {ChevronLeft, Plus, Trash2, FileText, Download} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {products} from '~/lib/mock/products';
import {deals} from '~/lib/mock/deals';
import {formatINR} from '~/lib/utils/formatINR';
import {gstFor} from '~/lib/utils/formatGST';
import {cn} from '~/lib/utils/cn';

export const meta = () => [{title: 'New quote — Keystonne Partner'}];

const inputCls =
  'w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none';
const inputStyle = {
  background: '#fafafa',
  border: '1px solid var(--ks-line-soft)',
  color: 'var(--ks-ink)',
};

export default function QuoteBuilder() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const [dealId, setDealId] = useState(deals[1].id);
  const [items, setItems] = useState([
    {uid: `q-${Date.now()}`, sku: products[0].slug, qty: 1},
  ]);

  function addItem() {
    setItems((it) => [
      ...it,
      {uid: `q-${Date.now()}-${it.length}`, sku: products[0].slug, qty: 1},
    ]);
  }
  function removeItem(idx) {
    setItems((it) => it.filter((_, i) => i !== idx));
  }
  function updateItem(idx, patch) {
    setItems((it) => it.map((line, i) => (i === idx ? {...line, ...patch} : line)));
  }

  const lines = items.map((l) => {
    const p = products.find((p) => p.slug === l.sku);
    const unit = p?.priceINR ?? 0;
    return {...l, name: p?.name, unit, lineTotal: unit * l.qty, isQuoteOnly: !p?.priceINR};
  });
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const {gst, total} = gstFor(subtotal);
  const commission = Math.round(subtotal * 0.066 * 1.1);

  const deal = useMemo(() => deals.find((d) => d.id === dealId), [dealId]);

  if (!hydrated || !isLoggedIn) return null;

  return (
    <PartnerShell>
      <Link
        to="/partner/dashboard/quotes"
        className="mb-5 inline-flex items-center gap-1 text-[12px] font-medium"
        style={{color: 'var(--ks-muted)'}}
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to quotes
      </Link>

      <header className="mb-7">
        <span className="apple-eyebrow">Quote builder</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Assemble a co-branded quote.
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Pick the deal, add line items, preview the totals. Sending opens
          a PDF with your name and Keystonne&apos;s — and tracks opens.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <fieldset className="premium-panel mb-5 p-6">
            <legend
              className="text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-muted)'}}
            >
              Attach to deal
            </legend>
            <select
              value={dealId}
              onChange={(e) => setDealId(e.target.value)}
              className={cn(inputCls, 'mt-3')}
              style={inputStyle}
            >
              {deals.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id} — {d.project}
                </option>
              ))}
            </select>
            {deal && (
              <p
                className="mt-3 text-[12px]"
                style={{color: 'var(--ks-muted)'}}
              >
                Client: {deal.client} · DM: {deal.decisionMaker} · Est. value{' '}
                <span style={{color: 'var(--ks-ink)', fontWeight: 500}}>
                  {formatINR(deal.estValueINR)}
                </span>
              </p>
            )}
          </fieldset>

          <fieldset className="premium-panel mb-5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <legend
                className="text-[11px] font-medium uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                Line items ({items.length})
              </legend>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{
                  background: 'var(--ks-card-solid)',
                  border: '1px solid var(--ks-line)',
                  color: 'var(--ks-ink)',
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add line
              </button>
            </div>
            <ul className="space-y-3">
              {lines.map((line, i) => (
                <li
                  key={line.uid}
                  className="grid gap-3 rounded-xl p-3 md:grid-cols-12 md:items-center"
                  style={{
                    background: 'var(--ks-card-tint)',
                    border: '1px solid var(--ks-line-soft)',
                  }}
                >
                  <div className="md:col-span-7">
                    <select
                      value={line.sku}
                      onChange={(e) => updateItem(i, {sku: e.target.value})}
                      className={cn(inputCls, 'text-[13px]')}
                      style={inputStyle}
                    >
                      {products.map((p) => (
                        <option key={p.slug} value={p.slug}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="number"
                      min={1}
                      value={line.qty}
                      onChange={(e) => updateItem(i, {qty: Math.max(1, parseInt(e.target.value || '1', 10))})}
                      className={cn(inputCls, 'text-center')}
                      style={inputStyle}
                    />
                  </div>
                  <div
                    className="text-right text-sm font-semibold md:col-span-2"
                    style={{
                      color: 'var(--ks-ink)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {line.isQuoteOnly ? 'Quote' : formatINR(line.lineTotal)}
                  </div>
                  <div className="md:col-span-1 md:text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      disabled={items.length === 1}
                      aria-label="Remove line"
                      className="inline-grid h-8 w-8 place-items-center rounded-full disabled:opacity-40"
                      style={{color: 'var(--ks-muted)'}}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="partner-finance-card">
              <span className="apple-eyebrow">Quote totals</span>
              <dl className="mt-4 space-y-3 text-sm">
                <Row k="Subtotal" v={formatINR(subtotal)} />
                <Row k="GST · 18%" v={formatINR(gst)} muted />
                <Row k="Estimated total" v={formatINR(total)} strong />
              </dl>
              <div className="apple-divider my-5" />
              <Row
                k="Your commission"
                v={formatINR(commission)}
                strong
                accent="emerald"
                note="6.6% blended × Silver 1.10×"
              />

              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  className="partner-action justify-center"
                >
                  <FileText className="h-4 w-4" />
                  Send to client
                </button>
                <button
                  type="button"
                  className="apple-button-ghost justify-center"
                >
                  <Download className="h-4 w-4" />
                  Save draft (PDF)
                </button>
              </div>
              <p
                className="mt-3 text-[11px]"
                style={{color: 'var(--ks-muted)'}}
              >
                Demo mode — PDF generation ships in Phase 5.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PartnerShell>
  );
}

function Row({k, v, muted, strong, accent, note}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <dt style={{color: muted ? 'var(--ks-muted)' : 'var(--ks-ink-2)'}}>
          {k}
        </dt>
        {note && (
          <div
            className="text-[11px]"
            style={{color: 'var(--ks-muted)'}}
          >
            {note}
          </div>
        )}
      </div>
      <dd
        className={cn(strong ? 'text-lg font-semibold' : 'font-medium')}
        style={{
          color: accent === 'emerald' ? 'var(--ks-emerald)' : 'var(--ks-ink)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {v}
      </dd>
    </div>
  );
}
