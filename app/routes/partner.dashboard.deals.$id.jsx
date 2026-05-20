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
        <div className="premium-panel p-10 text-center">
          <h1
            className="text-xl font-semibold"
            style={{color: 'var(--ks-ink)'}}
          >
            Deal not found
          </h1>
          <p
            className="mt-2 text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            The deal {params.id} doesn&apos;t exist in your account.
          </p>
          <Link
            to="/partner/dashboard/deals"
            className="apple-link mt-4 inline-flex items-center gap-1 text-sm"
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
        className="mb-5 inline-flex items-center gap-1 text-[12px] font-medium"
        style={{color: 'var(--ks-muted)'}}
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to deals
      </Link>

      <header className="mb-7 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-muted)'}}
          >
            <span>{deal.id}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {deal.city}
            </span>
          </div>
          <h1
            className="mt-2 text-[28px] font-semibold tracking-tight md:text-[34px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            {deal.project}
          </h1>
          <p
            className="mt-2 text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            <Building2
              className="mr-1 inline h-3.5 w-3.5"
              style={{color: 'var(--ks-muted)'}}
            />
            {deal.client}{' '}
            <span style={{color: 'var(--ks-muted)'}}>·</span>{' '}
            <User
              className="mr-1 inline h-3.5 w-3.5"
              style={{color: 'var(--ks-muted)'}}
            />
            {deal.decisionMaker}
          </p>
        </div>
        <DealStatusPill state={deal.state} size="lg" />
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main */}
        <div className="space-y-6 lg:col-span-8">
          <KPIRow deal={deal} />

          <div className="premium-panel p-6">
            <h2
              className="text-base font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              Timeline
            </h2>
            <ol
              className="mt-5 space-y-5 pl-4"
              style={{borderLeft: '1px solid var(--ks-line-soft)'}}
            >
              {deal.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <div
                    className="absolute -left-[22px] top-1 grid h-3 w-3 place-items-center rounded-full"
                    style={{
                      background: `var(--color-status-${DEAL_STATE_META[t.state]?.color ?? 'draft'})`,
                      boxShadow: '0 0 0 3px var(--ks-card-solid)',
                    }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="text-sm font-semibold"
                      style={{color: 'var(--ks-ink)'}}
                    >
                      {DEAL_STATE_META[t.state]?.label}
                    </div>
                    <div
                      className="text-[12px]"
                      style={{color: 'var(--ks-muted)', fontVariantNumeric: 'tabular-nums'}}
                    >
                      {formatDate(t.at)}
                    </div>
                  </div>
                  {t.note && (
                    <p
                      className="mt-1 text-[13px]"
                      style={{color: 'var(--ks-ink-2)'}}
                    >
                      {t.note}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {quote && (
            <div className="premium-panel overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{borderBottom: '1px solid var(--ks-line-soft)'}}
              >
                <div>
                  <h2
                    className="text-base font-semibold"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    Quote {quote.id}
                  </h2>
                  <p
                    className="text-[12px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {quote.lineItems.length} line items · sent{' '}
                    {formatDate(quote.sentAt ?? quote.createdAt)}
                  </p>
                </div>
                <Link
                  to="/partner/dashboard/quotes"
                  className="apple-link inline-flex items-center gap-1 text-sm"
                >
                  View quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <table className="spec-hairline-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="num">Qty</th>
                    <th className="num">Unit</th>
                    <th className="num">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((l, i) => (
                    <tr key={i}>
                      <td style={{color: 'var(--ks-ink)'}}>{l.name}</td>
                      <td className="num">{l.qty}</td>
                      <td className="num" style={{color: 'var(--ks-ink-2)'}}>
                        {formatINR(l.unitINR)}
                      </td>
                      <td className="num" style={{color: 'var(--ks-ink)', fontWeight: 600}}>
                        {formatINR(l.unitINR * l.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="num" style={{color: 'var(--ks-ink-2)'}}>
                      Subtotal
                    </td>
                    <td className="num" style={{color: 'var(--ks-ink)', fontWeight: 600}}>
                      {formatINR(quoteSubtotal(quote))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="num" style={{color: 'var(--ks-ink-2)'}}>
                      GST · 18%
                    </td>
                    <td className="num" style={{color: 'var(--ks-ink-2)'}}>
                      {formatINR(gst)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="num" style={{color: 'var(--ks-ink-2)'}}>
                      Estimated total
                    </td>
                    <td
                      className="num"
                      style={{
                        color: 'var(--ks-ink)',
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      {formatINR(total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          <div className="premium-panel p-6">
            <div
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-muted)'}}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Messages with Keystonne ops
            </div>
            <p
              className="mt-3 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Demo mode — message thread ships in Phase 2 once the
              partner-ops backend is wired up.
            </p>
          </div>
        </div>

        {/* Side */}
        <aside className="space-y-4 lg:col-span-4">
          <div className="partner-finance-card">
            <span className="apple-eyebrow">Commission</span>
            <div
              className="mt-3 text-[32px] font-semibold leading-none"
              style={{
                color: deal.accruedCommissionINR
                  ? 'var(--ks-emerald)'
                  : 'var(--ks-ink)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {deal.accruedCommissionINR
                ? formatINR(deal.accruedCommissionINR)
                : '—'}
            </div>
            <p
              className="mt-2 text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              {deal.accruedCommissionINR
                ? 'Accrued; releases on installation sign-off.'
                : 'Pending deal close.'}
            </p>
            {deal.paidCommissionINR && (
              <div
                className="mt-3 rounded-xl px-3 py-2 text-[12px]"
                style={{
                  background: 'var(--ks-emerald-soft)',
                  color: 'var(--ks-emerald-dark)',
                }}
              >
                Net paid:{' '}
                <span style={{fontWeight: 600, fontVariantNumeric: 'tabular-nums'}}>
                  {formatINR(deal.paidCommissionINR)}
                </span>
              </div>
            )}
          </div>

          <div className="premium-panel p-6">
            <span className="apple-eyebrow">Project</span>
            <ul
              className="mt-4 space-y-3 text-[13px]"
              style={{color: 'var(--ks-ink-2)'}}
            >
              <KV k="Estimated value" v={formatINR(deal.estValueINR)} />
              <KV k="Expected close" v={formatDate(deal.expectedCloseAt)} icon={Calendar} />
              <KV k="Registered" v={formatDate(deal.registeredAt)} />
              <KV k="Venture" v={deal.venture} />
              <KV k="Decision maker" v={deal.decisionMaker} icon={User} />
              <KV k="City" v={deal.city} icon={MapPin} />
            </ul>
          </div>

          <div className="premium-panel p-6">
            <span className="apple-eyebrow">Actions</span>
            <div className="mt-3 flex flex-col gap-2">
              {!quote && (
                <Link
                  to="/partner/dashboard/quotes/new"
                  className="partner-action justify-center"
                >
                  <FileText className="h-4 w-4" />
                  Build a quote
                </Link>
              )}
              <Link
                to="/partner/dashboard/deals"
                className="apple-button-ghost justify-center"
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
      <KPI label="Value" value={formatINR(deal.estValueINR)} />
      <KPI
        label="Commission"
        value={
          deal.accruedCommissionINR ? formatINR(deal.accruedCommissionINR) : '—'
        }
        accent={deal.accruedCommissionINR ? 'emerald' : 'ink'}
      />
      <KPI label="Expected close" value={formatDate(deal.expectedCloseAt)} />
    </ul>
  );
}

function KPI({label, value, accent = 'ink'}) {
  const color = accent === 'emerald' ? 'var(--ks-emerald)' : 'var(--ks-ink)';
  return (
    <li className="premium-card p-4">
      <div
        className="text-[10px] font-medium uppercase tracking-[0.10em]"
        style={{color: 'var(--ks-muted)'}}
      >
        {label}
      </div>
      <div
        className="mt-1 text-xl font-semibold"
        style={{color, fontVariantNumeric: 'tabular-nums'}}
      >
        {value}
      </div>
    </li>
  );
}

function KV({k, v, icon: Icon}) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span
        className="flex items-center gap-1.5"
        style={{color: 'var(--ks-muted)'}}
      >
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {k}
      </span>
      <span
        className="text-right font-medium"
        style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
      >
        {v}
      </span>
    </li>
  );
}

function quoteSubtotal(q) {
  return q.lineItems.reduce((s, l) => s + l.unitINR * l.qty, 0);
}
