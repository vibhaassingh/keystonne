import {useState} from 'react';
import {Wallet, Check, Download} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {payouts, requestablePayout} from '~/lib/mock/payouts';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';

export const meta = () => [{title: 'Payouts — Keystonne Partner'}];

export default function PartnerPayouts() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const [requested, setRequested] = useState(false);

  if (!hydrated || !isLoggedIn) return null;

  return (
    <PartnerShell>
      <header className="mb-7">
        <span className="apple-eyebrow">Payouts</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Money out.
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Weekly payout cycle. Median 11 days from installation sign-off
          to UPI / bank transfer.
        </p>
      </header>

      {/* Requestable — hero card */}
      <div className="premium-panel mb-7 p-7">
        <div className="grid gap-4 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-emerald-dark)'}}
            >
              <Wallet className="h-3.5 w-3.5" />
              Available to request
            </div>
            <div
              className="mt-3 text-[44px] font-semibold leading-none md:text-[56px]"
              style={{
                color: 'var(--ks-emerald)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.022em',
              }}
            >
              {formatINR(requestablePayout.amountINR)}
            </div>
            <p
              className="mt-3 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {requestablePayout.itemsReady} ledger items moved to{' '}
              <span style={{color: 'var(--ks-ink)', fontWeight: 600}}>
                Approved
              </span>{' '}
              and are eligible for the next payout. Earliest payout date:{' '}
              <span
                style={{
                  color: 'var(--ks-ink)',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatDate(requestablePayout.earliestAt)}
              </span>
              .
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <button
              type="button"
              onClick={() => setRequested(true)}
              disabled={requested}
              className={requested ? 'partner-action' : 'partner-action'}
              style={
                requested
                  ? {opacity: 0.65, cursor: 'default'}
                  : undefined
              }
            >
              {requested ? (
                <>
                  <Check className="h-4 w-4" /> Payout requested
                </>
              ) : (
                <>Request payout</>
              )}
            </button>
            <p
              className="mt-3 text-[11px]"
              style={{color: 'var(--ks-muted)'}}
            >
              {requested
                ? "We'll batch this with Friday's payout run."
                : 'TDS @ 10% applied at source. Form 16A in your statements.'}
            </p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="premium-panel overflow-hidden">
        <div
          className="px-6 py-5"
          style={{borderBottom: '1px solid var(--ks-line-soft)'}}
        >
          <h2
            className="text-base font-semibold"
            style={{color: 'var(--ks-ink)'}}
          >
            Past payouts
          </h2>
          <p
            className="text-[12px]"
            style={{color: 'var(--ks-muted)'}}
          >
            {payouts.length} payouts · downloadable Form 16A statements
          </p>
        </div>
        <table className="spec-hairline-table">
          <thead>
            <tr>
              <th>Payout</th>
              <th className="num">Gross</th>
              <th className="num">TDS</th>
              <th className="num">Net</th>
              <th>Method</th>
              <th className="num">Statement</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div
                    className="font-medium"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {p.id}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {formatDate(p.date)}
                  </div>
                </td>
                <td className="num" style={{color: 'var(--ks-ink-2)'}}>
                  {formatINR(p.grossINR)}
                </td>
                <td className="num" style={{color: 'var(--ks-muted)'}}>
                  −{formatINR(p.tdsINR)}
                </td>
                <td
                  className="num"
                  style={{
                    color: 'var(--ks-emerald)',
                    fontWeight: 600,
                  }}
                >
                  {formatINR(p.netINR)}
                </td>
                <td>
                  <div style={{color: 'var(--ks-ink)'}}>{p.method}</div>
                  <div
                    className="text-[11px]"
                    style={{
                      color: 'var(--ks-muted)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {p.upiOrAcct}
                  </div>
                </td>
                <td className="num">
                  <button
                    type="button"
                    aria-label="Download Form 16A"
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
                    style={{
                      background: 'var(--ks-card-solid)',
                      border: '1px solid var(--ks-line-soft)',
                      color: 'var(--ks-ink)',
                    }}
                  >
                    <Download className="h-3 w-3" />
                    16A
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PartnerShell>
  );
}
