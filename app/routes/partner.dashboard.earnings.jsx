import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {ledger, LEDGER_STATE_META, ledgerTotals} from '~/lib/mock/ledger';
import {EarningsCard} from '~/components/partner/EarningsCard';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';

export const meta = () => [{title: 'Earnings — Keystonne Partner'}];

export default function PartnerEarnings() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  if (!hydrated || !isLoggedIn) return null;

  const totals = ledgerTotals();

  return (
    <PartnerShell>
      <header className="mb-6">
        <span className="eyebrow">Earnings</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Commission ledger.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Every line item across every closed deal — base × rate × tier
          multiplier — with the state it&apos;s in right now.
        </p>
      </header>

      <ul className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li><EarningsCard label="Accrued"  valueINR={totals.accrued}  sub="Booked, not yet payable"          accent="amber"  /></li>
        <li><EarningsCard label="Approved" valueINR={totals.approved} sub="Awaiting next payout batch"        accent="indigo" /></li>
        <li><EarningsCard label="Paid"     valueINR={totals.paid}     sub="Settled to UPI / bank"             accent="emerald" /></li>
        <li><EarningsCard label="On hold"  valueINR={totals.on_hold}  sub="Conflict adjudication in progress" accent="amber" /></li>
      </ul>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-ink">Ledger entries</h2>
            <p className="text-[12px] text-gray-500">
              {ledger.length} line items · sorted newest first
            </p>
          </div>
          <div className="text-[12px] text-gray-500">
            Showing rolling 90 days
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-3">Entry</th>
              <th className="px-5 py-3">Category</th>
              <th className="tabular px-5 py-3 text-right">Base</th>
              <th className="tabular px-5 py-3 text-right">Rate</th>
              <th className="tabular px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...ledger]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((e) => {
                const meta = LEDGER_STATE_META[e.state];
                return (
                  <tr key={e.id}>
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink">{e.id}</div>
                      <div className="text-[11px] text-gray-500">
                        {e.dealId} · {formatDate(e.date)}
                      </div>
                      <div className="text-[12px] text-gray-600">{e.note}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-700">{e.category}</td>
                    <td className="tabular px-5 py-3 text-right text-gray-700">{formatINR(e.baseINR)}</td>
                    <td className="tabular px-5 py-3 text-right text-gray-500">{e.ratePct.toFixed(1)}%</td>
                    <td className="tabular px-5 py-3 text-right font-semibold text-ink">
                      {formatINR(e.amountINR)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
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
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </PartnerShell>
  );
}
