/**
 * The single sample partner used everywhere the demo dashboard pretends to
 * be logged in. Per CLAUDE.md §7 — Arjun Mehta, Kitchen Consultant in
 * Bengaluru, Silver tier.
 */
export const demoPartner = {
  id: 'ptr_demo_001',
  name: 'Arjun Mehta',
  initials: 'AM',
  email: 'arjun@example.in',
  mobile: '+91 98765 43210',
  persona: 'Kitchen Consultant',
  city: 'Bengaluru',
  approvedAt: '2025-11-12',
  referralCode: 'arjun',
  tier: 'Silver',
  tierProgress: {
    currentSales: 18_20_000, // ₹18.2 L YTD closed
    nextTier: 'Gold',
    nextTierThreshold: 35_00_000,
  },
  totals: {
    totalEarned: 2_85_000,
    pendingCommission: 72_000,
    paidCommission: 2_13_000,
    accruedCommission: 48_000,
  },
  yearlyTargetINR: 50_00_000,
  ytdClosed: 18_20_000,
  activeDeals: 6,
  wonDealsYTD: 9,
  lostDealsYTD: 2,
};
