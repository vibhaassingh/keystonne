import {formatINRCompact, formatINR} from '~/lib/utils/formatINR';
import {tiers} from '~/lib/mock/partnerProgram';

/**
 * Progress bar from current tier toward the next tier, with explicit ₹
 * thresholds either side. Used in the partner dashboard overview.
 */
export function TierProgressBar({tier, currentSales, nextTier, nextTierThreshold}) {
  // Find current tier's threshold so the bar starts from there
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
          <span className="text-base font-semibold text-ink">{tier}</span>
          <span className="text-[12px] text-gray-500">tier</span>
        </div>
        <div className="text-[12px] text-gray-500">
          → <span className="font-semibold text-ink">{nextTier}</span> at{' '}
          <span className="tabular">{formatINRCompact(nextTierThreshold)}</span>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background:
              'linear-gradient(90deg, var(--color-partner-accent), #10b981)',
          }}
        />
      </div>

      <div className="mt-2 flex items-baseline justify-between text-[12px]">
        <span className="tabular text-gray-600">
          {formatINR(currentSales)} closed YTD
        </span>
        <span className="tabular font-semibold text-partner-accent">
          {formatINRCompact(remaining)} to {nextTier}
        </span>
      </div>
    </div>
  );
}
