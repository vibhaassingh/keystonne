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
      <header className="mb-6">
        <span className="eyebrow">Payouts</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Money out.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Weekly payout cycle. Median 11 days from installation sign-off
          to UPI / bank transfer.
        </p>
      </header>

      {/* Requestable */}
      <div className="card mb-6 relative overflow-hidden p-6">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{background: 'var(--color-partner-accent)'}}
        />
        <div className="relative grid gap-4 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-partner-accent">
              <Wallet className="h-3.5 w-3.5" />
              Available to request
            </div>
            <div className="tabular mt-2 text-4xl font-semibold text-ink">
              {formatINR(requestablePayout.amountINR)}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {requestablePayout.itemsReady} ledger items moved to{' '}
              <span className="font-semibold text-ink">Approved</span>{' '}
              and are eligible for the next payout. Earliest payout date:{' '}
              <span className="tabular font-semibold text-ink">
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
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${
                requested
                  ? 'bg-emerald-600 text-white'
                  : 'btn-primary'
              }`}
            >
              {requested ? (
                <><Check className="h-4 w-4" /> Payout requested</>
              ) : (
                <>Request payout</>
              )}
            </button>
            <p className="mt-2 text-[11px] text-gray-500">
              {requested
                ? 'We\'ll batch this with Friday\'s payout run.'
                : 'TDS @ 10% applied at source. Form 16A in your statements.'}
            </p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-ink">Past payouts</h2>
          <p className="text-[12px] text-gray-500">
            {payouts.length} payouts · downloadable Form 16A statements
          </p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-3">Payout</th>
              <th className="tabular px-5 py-3 text-right">Gross</th>
              <th className="tabular px-5 py-3 text-right">TDS</th>
              <th className="tabular px-5 py-3 text-right">Net</th>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3 text-right">Statement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payouts.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3">
                  <div className="font-medium text-ink">{p.id}</div>
                  <div className="text-[11px] text-gray-500">{formatDate(p.date)}</div>
                </td>
                <td className="tabular px-5 py-3 text-right text-gray-700">{formatINR(p.grossINR)}</td>
                <td className="tabular px-5 py-3 text-right text-gray-500">−{formatINR(p.tdsINR)}</td>
                <td className="tabular px-5 py-3 text-right font-semibold text-ink">{formatINR(p.netINR)}</td>
                <td className="px-5 py-3">
                  <div className="text-ink">{p.method}</div>
                  <div className="tabular text-[11px] text-gray-500">{p.upiOrAcct}</div>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    type="button"
                    aria-label="Download Form 16A"
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink hover:border-ink/40"
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
