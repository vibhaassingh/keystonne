import {Link} from 'react-router';
import {Plus, ChevronRight, ExternalLink, Download} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {quotes, QUOTE_STATE_META} from '~/lib/mock/quotes';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';

export const meta = () => [{title: 'Quotes — Keystonne Partner'}];

export default function PartnerQuotes() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  if (!hydrated || !isLoggedIn) return null;

  return (
    <PartnerShell>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Quotes</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Co-branded quotes for your clients.
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Build, send, and track quotes — including open/accept events.
          </p>
        </div>
        <Link
          to="/partner/dashboard/quotes/new"
          className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          New quote
        </Link>
      </header>

      <ul className="grid gap-3">
        {quotes.map((q) => {
          const subtotal = q.lineItems.reduce((s, l) => s + l.unitINR * l.qty, 0);
          const meta = QUOTE_STATE_META[q.state];
          return (
            <li key={q.id} className="card card-hover p-5">
              <div className="grid gap-4 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-gray-500">
                    <span>{q.id}</span>
                    <span>·</span>
                    <span>{formatDate(q.createdAt)}</span>
                  </div>
                  <Link
                    to={`/partner/dashboard/deals/${q.dealId}`}
                    className="mt-1 block text-base font-semibold text-ink hover:text-brand-primary"
                  >
                    {q.project}
                  </Link>
                  <p className="text-[12px] text-gray-500">
                    {q.client} · {q.contact}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `color-mix(in srgb, var(--color-status-${meta.color}) 14%, transparent)`,
                      color: `var(--color-status-${meta.color})`,
                      border: `1px solid color-mix(in srgb, var(--color-status-${meta.color}) 25%, transparent)`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{background: `var(--color-status-${meta.color})`}}
                    />
                    {meta.label}
                  </span>
                </div>
                <div className="tabular md:col-span-2">
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Subtotal</div>
                  <div className="text-base font-semibold text-ink">{formatINR(subtotal)}</div>
                  <div className="text-[11px] text-gray-500">+18% GST</div>
                </div>
                <div className="tabular md:col-span-2">
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Commission</div>
                  <div className="text-base font-semibold text-partner-accent">
                    {formatINR(Math.round((subtotal * q.commissionRatePct) / 100))}
                  </div>
                  <div className="text-[11px] text-gray-500">{q.commissionRatePct}% blended</div>
                </div>
                <div className="flex justify-end gap-1 md:col-span-1">
                  <button
                    type="button"
                    aria-label="Download PDF"
                    className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-ink"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Open"
                    className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-ink"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </PartnerShell>
  );
}
