/**
 * Format a number as Indian rupees with Indian comma grouping
 * (lakhs/crores style: ₹1,25,000 — not ₹125,000).
 *
 *   formatINR(125000)        → "₹1,25,000"
 *   formatINR(125000, {paise: true}) → "₹1,25,000.00"
 *   formatINR(0)             → "₹0"
 *   formatINR(null)          → "—"
 *
 * Uses Intl.NumberFormat with the en-IN locale which natively produces
 * the lakhs/crores grouping pattern.
 */
export function formatINR(amount, {paise = false} = {}) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return '—';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: paise ? 2 : 0,
    maximumFractionDigits: paise ? 2 : 0,
  }).format(amount);
}

/**
 * Compact Indian formatting — collapses lakhs and crores to a short label.
 *
 *   formatINRCompact(125000)   → "₹1.25 L"
 *   formatINRCompact(3500000)  → "₹35 L"
 *   formatINRCompact(12500000) → "₹1.25 Cr"
 */
export function formatINRCompact(amount) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return '—';
  }
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2).replace(/\.00$/, '')} L`;
  }
  if (amount >= 1_000) {
    return `₹${(amount / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return formatINR(amount);
}
