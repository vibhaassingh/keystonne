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
      <header className="mb-7">
        <span className="apple-eyebrow">Earnings</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Commission ledger.
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Every line item across every closed deal — base × rate × tier
          multiplier — with the state it&apos;s in right now.
        </p>
      </header>

      <ul className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li>
          <EarningsCard
            label="Accrued"
            valueINR={totals.accrued}
            sub="Booked, not yet payable"
            accent="amber"
          />
        </li>
        <li>
          <EarningsCard
            label="Approved"
            valueINR={totals.approved}
            sub="Awaiting next payout batch"
            accent="ink"
          />
        </li>
        <li>
          <EarningsCard
            label="Paid"
            valueINR={totals.paid}
            sub="Settled to UPI / bank"
            accent="emerald"
          />
        </li>
        <li>
          <EarningsCard
            label="On hold"
            valueINR={totals.on_hold}
            sub="Conflict adjudication in progress"
            accent="amber"
          />
        </li>
      </ul>

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
              Ledger entries
            </h2>
            <p
              className="text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              {ledger.length} line items · sorted newest first
            </p>
          </div>
          <div
            className="text-[12px]"
            style={{color: 'var(--ks-muted)'}}
          >
            Showing rolling 90 days
          </div>
        </div>
        <table className="spec-hairline-table">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Category</th>
              <th className="num">Base</th>
              <th className="num">Rate</th>
              <th className="num">Amount</th>
              <th className="num">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...ledger]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((e) => {
                const meta = LEDGER_STATE_META[e.state];
                const colorVar = `var(--color-status-${meta.color})`;
                return (
                  <tr key={e.id}>
                    <td>
                      <div
                        className="font-medium"
                        style={{color: 'var(--ks-ink)'}}
                      >
                        {e.id}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        {e.dealId} · {formatDate(e.date)}
                      </div>
                      <div
                        className="text-[12px]"
                        style={{color: 'var(--ks-ink-2)'}}
                      >
                        {e.note}
                      </div>
                    </td>
                    <td style={{color: 'var(--ks-ink-2)'}}>{e.category}</td>
                    <td className="num" style={{color: 'var(--ks-ink-2)'}}>
                      {formatINR(e.baseINR)}
                    </td>
                    <td className="num" style={{color: 'var(--ks-muted)'}}>
                      {e.ratePct.toFixed(1)}%
                    </td>
                    <td
                      className="num"
                      style={{
                        color:
                          meta.color === 'approved' || meta.color === 'paid'
                            ? 'var(--ks-emerald)'
                            : 'var(--ks-ink)',
                        fontWeight: 600,
                      }}
                    >
                      {formatINR(e.amountINR)}
                    </td>
                    <td className="num">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em]"
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
