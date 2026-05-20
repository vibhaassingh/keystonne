import {Link, useParams} from 'react-router';
import {
  ChevronLeft, Calendar, MapPin, User, FileText, MessageCircle,
  ArrowRight, Building2,
} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {DealStatusPill} from '~/components/partner/DealStatusPill';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {deals, DEAL_STATE_META} from '~/lib/mock/deals';
import {quotes} from '~/lib/mock/quotes';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';
import {gstFor} from '~/lib/utils/formatGST';

export const meta = ({params}) => [{title: `Deal ${params.id} — Keystonne Partner`}];

export default function DealDetail() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const params = useParams();
  const deal = deals.find((d) => d.id === params.id);

  if (!hydrated || !isLoggedIn) return null;
  if (!deal) {
    return (
      <PartnerShell>
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <h1 className="text-xl font-semibold text-ink">Deal not found</h1>
          <p className="mt-2 text-sm text-gray-600">
            The deal {params.id} doesn&apos;t exist in your account.
          </p>
          <Link
            to="/partner/dashboard/deals"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
          >
            Back to deals
          </Link>
        </div>
      </PartnerShell>
    );
  }

  const quote = quotes.find((q) => q.dealId === deal.id);
  const {gst, total} = quote ? gstFor(quoteSubtotal(quote)) : {gst: 0, total: 0};

  return (
    <PartnerShell>
      <Link
        to="/partner/dashboard/deals"
        className="mb-4 inline-flex items-center gap-1 text-[12px] font-semibold text-gray-500 hover:text-brand-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to deals
      </Link>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-gray-500">
            <span>{deal.id}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {deal.city}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {deal.project}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            <Building2 className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
            {deal.client}{' '}
            <span className="text-gray-400">·</span>{' '}
            <User className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
            {deal.decisionMaker}
          </p>
        </div>
        <DealStatusPill state={deal.state} size="lg" />
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main */}
        <div className="space-y-6 lg:col-span-8">
          <KPIRow deal={deal} />

          <div className="card p-5">
            <h2 className="text-base font-semibold text-ink">Timeline</h2>
            <ol className="mt-4 space-y-4 border-l border-gray-200 pl-4">
              {deal.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <div
                    className="absolute -left-[22px] top-1 grid h-3 w-3 place-items-center rounded-full"
                    style={{background: `var(--color-status-${DEAL_STATE_META[t.state]?.color ?? 'draft'})`}}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-ink">
                      {DEAL_STATE_META[t.state]?.label}
                    </div>
                    <div className="tabular text-[12px] text-gray-500">
                      {formatDate(t.at)}
                    </div>
                  </div>
                  {t.note && (
                    <p className="mt-1 text-[13px] text-gray-600">{t.note}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {quote && (
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                  <h2 className="text-base font-semibold text-ink">
                    Quote {quote.id}
                  </h2>
                  <p className="text-[12px] text-gray-500">
                    {quote.lineItems.length} line items · sent{' '}
                    {formatDate(quote.sentAt ?? quote.createdAt)}
                  </p>
                </div>
                <Link
                  to="/partner/dashboard/quotes"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
                >
                  View quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Item</th>
                    <th className="tabular px-5 py-3 text-right">Qty</th>
                    <th className="tabular px-5 py-3 text-right">Unit</th>
                    <th className="tabular px-5 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quote.lineItems.map((l, i) => (
                    <tr key={i}>
                      <td className="px-5 py-3 text-ink">{l.name}</td>
                      <td className="tabular px-5 py-3 text-right">{l.qty}</td>
                      <td className="tabular px-5 py-3 text-right text-gray-600">{formatINR(l.unitINR)}</td>
                      <td className="tabular px-5 py-3 text-right font-semibold text-ink">{formatINR(l.unitINR * l.qty)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 text-sm">
                  <tr>
                    <td colSpan={3} className="px-5 py-2 text-right text-gray-600">Subtotal</td>
                    <td className="tabular px-5 py-2 text-right font-semibold text-ink">
                      {formatINR(quoteSubtotal(quote))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-5 py-2 text-right text-gray-600">GST · 18%</td>
                    <td className="tabular px-5 py-2 text-right text-gray-700">{formatINR(gst)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-5 py-2 text-right text-gray-600">Estimated total</td>
                    <td className="tabular px-5 py-2 text-right text-base font-semibold text-ink">{formatINR(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          <div className="card p-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
              <MessageCircle className="h-3.5 w-3.5" />
              Messages with Keystonne ops
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Demo mode — message thread ships in Phase 2 once the
              partner-ops backend is wired up.
            </p>
          </div>
        </div>

        {/* Side */}
        <aside className="space-y-4 lg:col-span-4">
          <div className="card p-5">
            <span className="eyebrow">Commission</span>
            <div className="tabular mt-3 text-3xl font-semibold text-ink">
              {deal.accruedCommissionINR
                ? formatINR(deal.accruedCommissionINR)
                : '—'}
            </div>
            <p className="mt-1 text-[12px] text-gray-500">
              {deal.accruedCommissionINR
                ? 'Accrued; releases on installation sign-off.'
                : 'Pending deal close.'}
            </p>
            {deal.paidCommissionINR && (
              <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-[12px] text-emerald-800">
                Net paid: <span className="tabular font-semibold">{formatINR(deal.paidCommissionINR)}</span>
              </div>
            )}
          </div>

          <div className="card p-5">
            <span className="eyebrow">Project</span>
            <ul className="mt-3 space-y-2 text-[13px] text-gray-700">
              <KV k="Estimated value" v={formatINR(deal.estValueINR)} />
              <KV k="Expected close" v={formatDate(deal.expectedCloseAt)} icon={Calendar} />
              <KV k="Registered" v={formatDate(deal.registeredAt)} />
              <KV k="Venture" v={deal.venture} />
              <KV k="Decision maker" v={deal.decisionMaker} icon={User} />
              <KV k="City" v={deal.city} icon={MapPin} />
            </ul>
          </div>

          <div className="card p-5">
            <span className="eyebrow">Actions</span>
            <div className="mt-3 flex flex-col gap-2">
              {!quote && (
                <Link
                  to="/partner/dashboard/quotes/new"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl btn-primary px-4 py-2 text-sm font-semibold"
                >
                  <FileText className="h-4 w-4" />
                  Build a quote
                </Link>
              )}
              <Link
                to="/partner/dashboard/deals"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ink/40"
              >
                All deals
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </PartnerShell>
  );
}

function KPIRow({deal}) {
  return (
    <ul className="grid grid-cols-3 gap-3">
      <li className="card p-4">
        <div className="text-[11px] uppercase tracking-wider text-gray-500">Value</div>
        <div className="tabular mt-1 text-xl font-semibold text-ink">{formatINR(deal.estValueINR)}</div>
      </li>
      <li className="card p-4">
        <div className="text-[11px] uppercase tracking-wider text-gray-500">Commission</div>
        <div className="tabular mt-1 text-xl font-semibold text-ink">
          {deal.accruedCommissionINR ? formatINR(deal.accruedCommissionINR) : '—'}
        </div>
      </li>
      <li className="card p-4">
        <div className="text-[11px] uppercase tracking-wider text-gray-500">Expected close</div>
        <div className="tabular mt-1 text-xl font-semibold text-ink">{formatDate(deal.expectedCloseAt)}</div>
      </li>
    </ul>
  );
}

function KV({k, v, icon: Icon}) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span className="flex items-center gap-1.5 text-gray-500">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {k}
      </span>
      <span className="tabular text-right font-medium text-ink">{v}</span>
    </li>
  );
}

function quoteSubtotal(q) {
  return q.lineItems.reduce((s, l) => s + l.unitINR * l.qty, 0);
}
