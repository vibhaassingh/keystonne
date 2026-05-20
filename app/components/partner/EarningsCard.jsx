import {formatINR} from '~/lib/utils/formatINR';

/**
 * Tile used in the dashboard overview — big number, secondary metric,
 * subtle delta line below. Accepts a trend prop for ↑ / ↓ tinting.
 */
export function EarningsCard({label, valueINR, sub, trend, accent = 'indigo'}) {
  const accentVar =
    accent === 'emerald'
      ? 'var(--color-partner-accent)'
      : accent === 'amber'
      ? 'var(--color-brand-accent)'
      : 'var(--color-brand-primary)';

  return (
    <div className="card relative overflow-hidden p-5">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-30 blur-2xl"
        style={{background: accentVar}}
      />
      <div className="relative">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
          {label}
        </div>
        <div className="tabular mt-2 text-2xl font-semibold text-ink md:text-3xl">
          {formatINR(valueINR)}
        </div>
        {sub && (
          <div className="mt-1 text-[12px] text-gray-600">{sub}</div>
        )}
        {trend && (
          <div
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              trend.direction === 'up'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.label}
          </div>
        )}
      </div>
    </div>
  );
}
