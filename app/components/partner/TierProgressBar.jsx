import {formatINRCompact, formatINR} from '~/lib/utils/formatINR';
import {tiers} from '~/lib/mock/partnerProgram';

/**
 * Apple-style tier-progress bar. Calm grey track with an emerald fill,
 * ink-tabular ₹ values left, emerald "remaining to next tier" right.
 * Used on the partner dashboard overview.
 */
export function TierProgressBar({tier, currentSales, nextTier, nextTierThreshold}) {
  const currentTierMeta = tiers.find((t) => t.name === tier);
  const start = currentTierMeta?.threshold ?? 0;
  const span = (nextTierThreshold ?? start) - start;
  const earned = Math.max(0, currentSales - start);
  const pct = span > 0 ? Math.min(100, (earned / span) * 100) : 0;
  const remaining = Math.max(0, (nextTierThreshold ?? 0) - currentSales);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span
            className="text-base font-semibold"
            style={{color: 'var(--ks-ink)'}}
          >
            {tier}
          </span>
          <span
            className="text-[12px]"
            style={{color: 'var(--ks-muted)'}}
          >
            tier
          </span>
        </div>
        <div
          className="text-[12px]"
          style={{color: 'var(--ks-muted)'}}
        >
          → <span style={{color: 'var(--ks-ink)', fontWeight: 600}}>{nextTier}</span>{' '}
          at{' '}
          <span
            style={{
              color: 'var(--ks-ink)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatINRCompact(nextTierThreshold)}
          </span>
        </div>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full"
        style={{background: 'var(--ks-line-soft)'}}
      >
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{
            width: `${pct}%`,
            background:
              'linear-gradient(90deg, var(--ks-emerald), #10b981)',
          }}
        />
      </div>

      <div className="mt-2 flex items-baseline justify-between text-[12px]">
        <span style={{color: 'var(--ks-ink-2)', fontVariantNumeric: 'tabular-nums'}}>
          {formatINR(currentSales)} closed YTD
        </span>
        <span
          style={{
            color: 'var(--ks-emerald)',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatINRCompact(remaining)} to {nextTier}
        </span>
      </div>
    </div>
  );
}
