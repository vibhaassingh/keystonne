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

export default function QuoteBuilder() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const [dealId, setDealId] = useState(deals[1].id); // start on the Hotel Aravali quote-stage deal
  const [items, setItems] = useState([{sku: products[0].slug, qty: 1}]);

  function addItem() {
    setItems((it) => [...it, {sku: products[0].slug, qty: 1}]);
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
  const commission = Math.round(subtotal * 0.066 * 1.1); // demo: blended 6.6% × Silver 1.10×

  const deal = useMemo(() => deals.find((d) => d.id === dealId), [dealId]);

  if (!hydrated || !isLoggedIn) return null;

  return (
    <PartnerShell>
      <Link
        to="/partner/dashboard/quotes"
        className="mb-4 inline-flex items-center gap-1 text-[12px] font-semibold text-gray-500 hover:text-brand-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to quotes
      </Link>

      <header className="mb-6">
        <span className="eyebrow">Quote builder</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Assemble a co-branded quote.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Pick the deal, add line items, preview the totals. Sending opens
          a PDF with your name + Keystonne&apos;s — and tracks opens.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <fieldset className="card mb-5 p-5">
            <legend className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Attach to deal</legend>
            <select
              value={dealId}
              onChange={(e) => setDealId(e.target.value)}
              className={cn(inputCls, 'mt-3')}
            >
              {deals.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id} — {d.project}
                </option>
              ))}
            </select>
            {deal && (
              <p className="mt-2 text-[12px] text-gray-500">
                Client: {deal.client} · DM: {deal.decisionMaker} · Est. value{' '}
                {formatINR(deal.estValueINR)}
              </p>
            )}
          </fieldset>

          <fieldset className="card mb-5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <legend className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                Line items ({items.length})
              </legend>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-ink/40"
              >
                <Plus className="h-3.5 w-3.5" /> Add line
              </button>
            </div>
            <ul className="space-y-3">
              {lines.map((line, i) => (
                <li key={i} className="grid gap-3 rounded-xl border border-gray-200 bg-white p-3 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-7">
                    <select
                      value={line.sku}
                      onChange={(e) => updateItem(i, {sku: e.target.value})}
                      className={cn(inputCls, 'text-[13px]')}
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
                    />
                  </div>
                  <div className="tabular text-right text-sm font-semibold text-ink md:col-span-2">
                    {line.isQuoteOnly ? 'Quote' : formatINR(line.lineTotal)}
                  </div>
                  <div className="md:col-span-1 md:text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      disabled={items.length === 1}
                      aria-label="Remove line"
                      className="inline-grid h-8 w-8 place-items-center rounded text-gray-400 hover:bg-gray-100 hover:text-red-600 disabled:opacity-40"
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
          <div className="sticky top-2 space-y-4">
            <div className="card p-5">
              <span className="eyebrow">Quote totals</span>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Subtotal" v={formatINR(subtotal)} />
                <Row k="GST · 18%" v={formatINR(gst)} muted />
                <Row k="Estimated total" v={formatINR(total)} strong />
              </dl>
              <div className="my-4 glass-divider" />
              <Row
                k="Your commission"
                v={formatINR(commission)}
                strong
                accent="emerald"
                note="6.6% blended × Silver 1.10×"
              />

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
                >
                  <FileText className="h-4 w-4" />
                  Send to client
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/40"
                >
                  <Download className="h-4 w-4" />
                  Save draft (PDF)
                </button>
              </div>
              <p className="mt-2 text-[11px] text-gray-500">
                Demo mode — PDF generation ships in Phase 5.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PartnerShell>
  );
}

const inputCls =
  'w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15';

function Row({k, v, muted, strong, accent, note}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <dt className={muted ? 'text-gray-500' : 'text-gray-700'}>{k}</dt>
        {note && <div className="text-[11px] text-gray-400">{note}</div>}
      </div>
      <dd
        className={cn(
          'tabular',
          strong ? 'text-lg font-semibold' : 'font-medium',
          accent === 'emerald' ? 'text-partner-accent' : 'text-ink',
        )}
      >
        {v}
      </dd>
    </div>
  );
}
