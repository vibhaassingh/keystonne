import {formatINR} from '~/lib/utils/formatINR';

/**
 * Apple-style finance tile used across the partner dashboard. Calm white
 * surface, hairline border, ink number, tiny trend chip. The `accent`
 * prop controls only the value colour — money rows get emerald, neutral
 * rows stay ink. No blur orbs, no gradients.
 */
export function EarningsCard({label, valueINR, sub, trend, accent = 'ink'}) {
  const valueColor =
    accent === 'emerald'
      ? 'var(--ks-emerald)'
      : accent === 'amber'
      ? 'var(--ks-amber-dark)'
      : 'var(--ks-ink)';

  return (
    <div
      className="partner-finance-card"
      style={{padding: '1.25rem 1.4rem'}}
    >
      <div
        className="text-[11px] font-medium uppercase tracking-[0.10em]"
        style={{color: 'var(--ks-muted)'}}
      >
        {label}
      </div>
      <div
        className="mt-2 text-[28px] font-semibold leading-none md:text-[32px]"
        style={{
          color: valueColor,
          fontFeatureSettings: '"tnum"',
          letterSpacing: '-0.02em',
        }}
      >
        {formatINR(valueINR)}
      </div>
      {sub && (
        <div
          className="mt-2 text-[12px] leading-snug"
          style={{color: 'var(--ks-ink-2)'}}
        >
          {sub}
        </div>
      )}
      {trend && (
        <div
          className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={{
            background:
              trend.direction === 'up'
                ? 'var(--ks-emerald-soft)'
                : 'rgba(194,65,12,0.10)',
            color:
              trend.direction === 'up'
                ? 'var(--ks-emerald-dark)'
                : '#9a3412',
          }}
        >
          {trend.direction === 'up' ? '↑' : '↓'} {trend.label}
        </div>
      )}
    </div>
  );
}
