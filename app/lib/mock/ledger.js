/**
 * Commission ledger — 11 entries spanning the lifecycle states. Used by
 * the Earnings page (Sprint 8) to render the partner's payment history.
 */

export const LEDGER_STATES = ['accrued', 'approved', 'paid', 'on_hold'];

export const LEDGER_STATE_META = {
  accrued:  {label: 'Accrued',  color: 'accrued'},
  approved: {label: 'Approved', color: 'approved'},
  paid:     {label: 'Paid',     color: 'paid'},
  on_hold:  {label: 'On hold',  color: 'conflict'},
};

export const ledger = [
  // Lakeside Café — fully approved + accrued
  {id: 'KL-7821', dealId: 'KD-2891', date: '2026-05-20', category: 'Coffee & Espresso',  baseINR: 2_85_000, ratePct: 9.9,  amountINR: 28_215, state: 'accrued',  note: 'Two-Group Espresso machine'},
  {id: 'KL-7822', dealId: 'KD-2891', date: '2026-05-20', category: 'Refrigeration',      baseINR: 78_500,   ratePct: 6.6,  amountINR: 5_181,  state: 'accrued',  note: 'Undercounter Prep Chiller'},
  {id: 'KL-7823', dealId: 'KD-2891', date: '2026-05-20', category: 'Cooking Ranges',     baseINR: 48_500,   ratePct: 7.7,  amountINR: 3_735,  state: 'accrued',  note: 'Four-Burner Gas Stove'},
  {id: 'KL-7824', dealId: 'KD-2891', date: '2026-05-20', category: 'Work Tables',        baseINR: 50_300,   ratePct: 4.4,  amountINR: 2_213,  state: 'accrued',  note: '3× SS Work Tables (mixed sizes)'},
  {id: 'KL-7825', dealId: 'KD-2891', date: '2026-05-20', category: 'Sinks & Plumbing',   baseINR: 28_500,   ratePct: 4.4,  amountINR: 1_254,  state: 'accrued',  note: 'Three-Bowl Pot Sink'},

  // CodeKitchen Cloud — fully paid
  {id: 'KL-7810', dealId: 'KD-2913', date: '2026-05-08', category: 'Cooking Ranges',     baseINR: 3_25_000, ratePct: 7.7,  amountINR: 25_025, state: 'paid',     note: 'Repeat cloud kitchen build'},
  {id: 'KL-7811', dealId: 'KD-2913', date: '2026-05-08', category: 'Refrigeration',      baseINR: 1_85_000, ratePct: 6.6,  amountINR: 12_210, state: 'paid',     note: 'Reach-in fridge'},
  {id: 'KL-7812', dealId: 'KD-2913', date: '2026-05-08', category: 'Work Tables',        baseINR: 50_000,   ratePct: 4.4,  amountINR: 2_200,  state: 'paid',     note: 'Prep tables'},
  {id: 'KL-7813', dealId: 'KD-2913', date: '2026-05-08', category: 'Food Prep Equipment', baseINR: 20_000,  ratePct: 8.8,  amountINR: 1_760,  state: 'paid',     note: 'Vegetable cutter'},

  // Aaha Mithai Mart — on hold pending conflict adjudication
  {id: 'KL-7833', dealId: 'KD-2924', date: '2026-04-25', category: 'Indian Cooking',     baseINR: 5_60_000, ratePct: 7.7,  amountINR: 43_120, state: 'on_hold',  note: 'Held while conflict KP-A917 is reviewed'},

  // Earlier paid deal
  {id: 'KL-7702', dealId: 'KD-2734', date: '2026-03-14', category: 'Refrigeration',      baseINR: 9_60_000, ratePct: 6.6,  amountINR: 63_360, state: 'approved', note: 'Approved — payout in next batch'},
];

export function ledgerTotals() {
  const out = {accrued: 0, approved: 0, paid: 0, on_hold: 0};
  for (const e of ledger) out[e.state] += e.amountINR;
  return out;
}
