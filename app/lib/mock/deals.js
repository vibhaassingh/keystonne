/**
 * Six sample deals spanning the 13-state lifecycle per CLAUDE.md §7.
 * Indian-market invented project + client names; no real brands.
 */

export const DEAL_STATES = [
  'draft', 'submitted', 'under_review', 'protected', 'conflict',
  'quoted', 'won', 'installed',
  'commission_accrued', 'commission_approved', 'paid',
  'lost', 'expired',
];

/** Pretty label + Tailwind colour class for the status pill (var lookups). */
export const DEAL_STATE_META = {
  draft:                {label: 'Draft',                color: 'draft'},
  submitted:            {label: 'Submitted',            color: 'submitted'},
  under_review:         {label: 'Under review',         color: 'review'},
  protected:            {label: 'Protected',            color: 'protected'},
  conflict:             {label: 'Conflict',             color: 'conflict'},
  quoted:               {label: 'Quoted',               color: 'quoted'},
  won:                  {label: 'Won',                  color: 'won'},
  installed:            {label: 'Installed',            color: 'installed'},
  commission_accrued:   {label: 'Commission accrued',   color: 'accrued'},
  commission_approved:  {label: 'Commission approved',  color: 'approved'},
  paid:                 {label: 'Paid',                 color: 'paid'},
  lost:                 {label: 'Lost',                 color: 'lost'},
  expired:              {label: 'Expired',              color: 'expired'},
};

export const deals = [
  {
    id: 'KD-2891',
    project: 'Lakeside Café, Whitefield',
    client: 'Lakeside Hospitality LLP',
    decisionMaker: 'Priya Krishnan',
    venture: 'cafe',
    city: 'Bengaluru',
    estValueINR: 12_40_000,
    expectedCloseAt: '2026-06-08',
    registeredAt: '2026-05-02',
    state: 'commission_accrued',
    timeline: [
      {at: '2026-05-02', state: 'submitted', note: 'Deal registered with 8 line items'},
      {at: '2026-05-04', state: 'protected', note: '30-day attribution window opened'},
      {at: '2026-05-09', state: 'quoted',    note: 'Quote KQ-2891 sent to client'},
      {at: '2026-05-15', state: 'won',       note: 'PO ₹12.4L received from client'},
      {at: '2026-05-19', state: 'installed', note: 'Installation signed off — 3 days early'},
      {at: '2026-05-20', state: 'commission_accrued', note: 'Commission ₹84,240 booked'},
    ],
    accruedCommissionINR: 84_240,
  },
  {
    id: 'KD-2902',
    project: 'Hotel Aravali, Udaipur — Banquet kitchen',
    client: 'Aravali Hotels & Resorts',
    decisionMaker: 'Vikram Patil',
    venture: 'hotel-kitchen',
    city: 'Udaipur',
    estValueINR: 32_50_000,
    expectedCloseAt: '2026-07-15',
    registeredAt: '2026-04-18',
    state: 'quoted',
    timeline: [
      {at: '2026-04-18', state: 'submitted',    note: 'Deal registered, multi-outlet hotel kitchen'},
      {at: '2026-04-21', state: 'under_review', note: 'Spec review with kitchen-design team'},
      {at: '2026-04-29', state: 'protected',    note: 'Attribution locked'},
      {at: '2026-05-12', state: 'quoted',       note: 'Quote KQ-2902 sent — 47 line items'},
    ],
    accruedCommissionINR: null,
  },
  {
    id: 'KD-2913',
    project: 'CodeKitchen Cloud — Bandra outlet 04',
    client: 'CodeKitchen Foods Pvt. Ltd',
    decisionMaker: 'Reena Joshi',
    venture: 'cloud-kitchen',
    city: 'Mumbai',
    estValueINR: 5_80_000,
    expectedCloseAt: '2026-05-30',
    registeredAt: '2026-04-29',
    state: 'paid',
    timeline: [
      {at: '2026-04-29', state: 'submitted',           note: '4th cloud-kitchen outlet for repeat client'},
      {at: '2026-04-30', state: 'protected',           note: ''},
      {at: '2026-05-01', state: 'quoted',              note: 'Standardised kit reorder'},
      {at: '2026-05-02', state: 'won',                 note: 'PO ₹5.8L'},
      {at: '2026-05-07', state: 'installed',           note: 'Installed by Keystonne ops in 4 days'},
      {at: '2026-05-08', state: 'commission_accrued',  note: 'Commission ₹39,440 booked'},
      {at: '2026-05-10', state: 'commission_approved', note: 'Approved by finance after dispatch verify'},
      {at: '2026-05-17', state: 'paid',                note: 'Payout ₹35,496 net of TDS via UPI'},
    ],
    accruedCommissionINR: 39_440,
    paidCommissionINR: 35_496,
  },
  {
    id: 'KD-2924',
    project: 'Aaha Mithai Mart, Indiranagar',
    client: 'Aaha Foods',
    decisionMaker: 'Sundar Rao',
    venture: 'sweet-shop',
    city: 'Bengaluru',
    estValueINR: 9_75_000,
    expectedCloseAt: '2026-06-22',
    registeredAt: '2026-04-10',
    state: 'conflict',
    timeline: [
      {at: '2026-04-10', state: 'submitted',    note: 'New mithai store, includes 4 bhattis + 3 displays'},
      {at: '2026-04-12', state: 'protected',    note: 'Attribution opened'},
      {at: '2026-04-22', state: 'conflict',     note: 'Another partner (KP-A917) claims earlier client contact — partner-ops adjudication in progress'},
    ],
    accruedCommissionINR: null,
  },
  {
    id: 'KD-2935',
    project: 'Verdant School canteen, Kanakapura',
    client: 'Verdant Education Trust',
    decisionMaker: 'Aparna Iyer',
    venture: 'school-canteen',
    city: 'Bengaluru',
    estValueINR: 2_40_000,
    expectedCloseAt: '2026-06-01',
    registeredAt: '2026-05-05',
    state: 'submitted',
    timeline: [
      {at: '2026-05-05', state: 'draft',     note: 'Spec being assembled'},
      {at: '2026-05-09', state: 'submitted', note: 'Registered with 5 line items'},
    ],
    accruedCommissionINR: null,
  },
  {
    id: 'KD-2884',
    project: 'Bombay Pantry catering hub, Kandivali',
    client: 'Bombay Pantry Catering LLP',
    decisionMaker: 'Imran Sheikh',
    venture: 'catering-kitchen',
    city: 'Mumbai',
    estValueINR: 18_60_000,
    expectedCloseAt: '2026-04-15',
    registeredAt: '2026-02-22',
    state: 'lost',
    timeline: [
      {at: '2026-02-22', state: 'submitted',    note: 'Major catering hub build'},
      {at: '2026-02-25', state: 'protected',    note: ''},
      {at: '2026-03-08', state: 'quoted',       note: 'Quote KQ-2884 sent'},
      {at: '2026-04-02', state: 'lost',         note: 'Client chose a regional vendor for 18% lower base; spec was downgraded'},
    ],
    accruedCommissionINR: null,
  },
];

/** Helper — pretty status counts by state for dashboard tiles. */
export function dealCountsByState() {
  const out = {};
  for (const d of deals) out[d.state] = (out[d.state] || 0) + 1;
  return out;
}
