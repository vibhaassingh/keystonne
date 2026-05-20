import {formatINR} from './formatINR';

/**
 * 18% GST is the locked rate (CLAUDE.md §10) and is always shown as a
 * separate line. Helpers compute the breakup either way.
 *
 *   gstFor(100000)   → { base: 100000, gst: 18000, total: 118000 }
 *   gstBreakdown(...) → string suitable for trust strips / footers
 */
export const GST_RATE = 0.18;

export function gstFor(base) {
  if (typeof base !== 'number' || Number.isNaN(base)) {
    return {base: 0, gst: 0, total: 0};
  }
  const gst = Math.round(base * GST_RATE);
  return {base, gst, total: base + gst};
}

export function gstBreakdownLine(base) {
  const {gst, total} = gstFor(base);
  return `${formatINR(base)} + ${formatINR(gst)} GST = ${formatINR(total)}`;
}
