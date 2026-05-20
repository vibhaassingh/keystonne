/**
 * Three sample quotes covering the lifecycle states a partner cares about
 * (draft / sent / approved). Line items reference invented generic products
 * — never real SKUs (CLAUDE.md §5).
 */

export const QUOTE_STATES = ['draft', 'sent', 'opened', 'approved', 'declined'];

export const QUOTE_STATE_META = {
  draft:    {label: 'Draft',           color: 'draft'},
  sent:     {label: 'Sent to client',  color: 'submitted'},
  opened:   {label: 'Opened',          color: 'review'},
  approved: {label: 'Client approved', color: 'won'},
  declined: {label: 'Declined',        color: 'lost'},
};

export const quotes = [
  {
    id: 'KQ-2891',
    dealId: 'KD-2891',
    project: 'Lakeside Café, Whitefield',
    client: 'Lakeside Hospitality LLP',
    contact: 'Priya Krishnan',
    state: 'approved',
    createdAt: '2026-05-09',
    sentAt: '2026-05-09',
    openedAt: '2026-05-10',
    approvedAt: '2026-05-15',
    lineItems: [
      {sku: 'two-group-espresso-machine',  name: 'Two-Group Semi-Automatic Espresso Machine',  qty: 1, unitINR: 2_85_000},
      {sku: 'undercounter-prep-chiller',   name: 'Undercounter Refrigerated Prep Table 4ft',   qty: 1, unitINR: 78_500},
      {sku: 'four-burner-gas-stove',       name: 'Four-Burner Commercial Gas Stove',            qty: 1, unitINR: 48_500},
      {sku: 'ss-work-table-4ft',           name: 'SS Work Table 4ft × 2ft with Undershelf',     qty: 2, unitINR: 12_500},
      {sku: 'ss-work-table-6ft',           name: 'Heavy-Duty SS Work Table 6ft × 2.5ft',        qty: 1, unitINR: 18_900},
      {sku: 'three-bowl-pot-sink',         name: 'Three-Bowl Pot Wash Sink with Drainboards',   qty: 1, unitINR: 28_500},
    ],
    commissionRatePct: 6.6,  // weighted across categories × tier
  },
  {
    id: 'KQ-2902',
    dealId: 'KD-2902',
    project: 'Hotel Aravali, Udaipur — Banquet kitchen',
    client: 'Aravali Hotels & Resorts',
    contact: 'Vikram Patil',
    state: 'sent',
    createdAt: '2026-05-12',
    sentAt: '2026-05-12',
    openedAt: '2026-05-13',
    approvedAt: null,
    lineItems: [
      {sku: 'three-tank-chinese-range', name: 'Three-Tank Chinese Range with Hot-Water Reservoir', qty: 2, unitINR: 2_85_000},
      {sku: 'wall-canopy-hood-6ft',     name: 'Wall-Canopy Exhaust Hood 6ft with ESP Filter',      qty: 3, unitINR: 1_68_000},
      {sku: 'walk-in-cold-room-12sqm',  name: 'Pre-Fabricated Walk-In Cold Room — 12 sqm',         qty: 1, unitINR: 8_50_000},
      {sku: 'hood-type-dishwasher',     name: 'Hood-Type Pass-Through Dishwasher — 90 racks/hr',   qty: 1, unitINR: 5_85_000},
      {sku: 'combi-oven-10-gn',         name: 'Combi Oven — 10 × GN 1/1',                          qty: 2, unitINR: 5_85_000},
      {sku: 'blast-chiller-20-tray',    name: 'Blast Chiller / Shock Freezer — 20 trays',          qty: 1, unitINR: 4_85_000},
    ],
    commissionRatePct: 7.1,
  },
  {
    id: 'KQ-2935',
    dealId: 'KD-2935',
    project: 'Verdant School canteen, Kanakapura',
    client: 'Verdant Education Trust',
    contact: 'Aparna Iyer',
    state: 'draft',
    createdAt: '2026-05-19',
    sentAt: null,
    openedAt: null,
    approvedAt: null,
    lineItems: [
      {sku: 'four-burner-indian-bhatti', name: 'Four-Burner Indian Bhatti with Tawa Plate', qty: 1, unitINR: 1_42_000},
      {sku: 'reach-in-fridge-two-door',  name: 'Heavy-Duty Two-Door Reach-In Refrigerator', qty: 1, unitINR: 1_29_000},
      {sku: 'bain-marie-4-pan',          name: 'Four-Pan Electric Bain Marie with Lid',     qty: 1, unitINR: 32_500},
      {sku: 'ss-work-table-6ft',         name: 'Heavy-Duty SS Work Table 6ft',              qty: 2, unitINR: 18_900},
      {sku: 'undercounter-dishwasher',   name: 'Undercounter Commercial Dishwasher',        qty: 1, unitINR: 2_15_000},
    ],
    commissionRatePct: 6.4,
  },
];
