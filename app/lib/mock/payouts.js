/**
 * Past payouts — what's hit the partner's UPI/bank with TDS breakdown.
 */
export const payouts = [
  {id: 'KP-1042', date: '2026-05-17', grossINR: 39_440,  tdsINR: 3_944, netINR: 35_496, method: 'UPI', upiOrAcct: 'arjun@upi', status: 'paid'},
  {id: 'KP-1031', date: '2026-04-05', grossINR: 78_100,  tdsINR: 7_810, netINR: 70_290, method: 'UPI', upiOrAcct: 'arjun@upi', status: 'paid'},
  {id: 'KP-1019', date: '2026-03-08', grossINR: 1_18_400, tdsINR: 11_840, netINR: 1_06_560, method: 'Bank', upiOrAcct: 'HDFC ⋯3421', status: 'paid'},
  {id: 'KP-1008', date: '2026-02-12', grossINR: 65_000,  tdsINR: 6_500, netINR: 58_500, method: 'UPI', upiOrAcct: 'arjun@upi', status: 'paid'},
];

export const requestablePayout = {
  amountINR: 72_000,
  earliestAt: '2026-05-23',
  itemsReady: 3,
};
