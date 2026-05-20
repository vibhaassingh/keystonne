import {Link} from 'react-router';
import {Plus, ExternalLink, Download} from 'lucide-react';
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
      <header className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="apple-eyebrow">Quotes</span>
          <h1
            className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            Co-branded quotes for your clients.
          </h1>
          <p
            className="mt-2 text-sm md:text-base"
            style={{color: 'var(--ks-ink-2)'}}
          >
            Build, send, and track quotes — including open and accept events.
          </p>
        </div>
        <Link
          to="/partner/dashboard/quotes/new"
          className="partner-action"
        >
          <Plus className="h-4 w-4" />
          New quote
        </Link>
      </header>

      <ul className="grid gap-3">
        {quotes.map((q) => {
          const subtotal = q.lineItems.reduce((s, l) => s + l.unitINR * l.qty, 0);
          const meta = QUOTE_STATE_META[q.state];
          const colorVar = `var(--color-status-${meta.color})`;
          return (
            <li
              key={q.id}
              className="premium-card p-6"
            >
              <div className="grid gap-4 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <div
                    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.10em]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    <span>{q.id}</span>
                    <span>·</span>
                    <span>{formatDate(q.createdAt)}</span>
                  </div>
                  <Link
                    to={`/partner/dashboard/deals/${q.dealId}`}
                    className="mt-1 block text-base font-semibold"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {q.project}
                  </Link>
                  <p
                    className="text-[12px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {q.client} · {q.contact}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em]"
                    style={{
                      background: `color-mix(in srgb, ${colorVar} 8%, transparent)`,
                      color: colorVar,
                      border: `1px solid color-mix(in srgb, ${colorVar} 22%, transparent)`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{background: colorVar}}
                    />
                    {meta.label}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.10em]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    Subtotal
                  </div>
                  <div
                    className="text-base font-semibold"
                    style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
                  >
                    {formatINR(subtotal)}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    +18% GST
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.10em]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    Commission
                  </div>
                  <div
                    className="text-base font-semibold"
                    style={{color: 'var(--ks-emerald)', fontVariantNumeric: 'tabular-nums'}}
                  >
                    {formatINR(Math.round((subtotal * q.commissionRatePct) / 100))}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {q.commissionRatePct}% blended
                  </div>
                </div>
                <div className="flex justify-end gap-1 md:col-span-1">
                  <button
                    type="button"
                    aria-label="Download PDF"
                    className="grid h-8 w-8 place-items-center rounded-full"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Open"
                    className="grid h-8 w-8 place-items-center rounded-full"
                    style={{color: 'var(--ks-muted)'}}
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
