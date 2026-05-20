/**
 * Hand-curated equipment recommendations for the Kitchen Wizard.
 * Keyed by businessType.slug → capacity bucket ('s' | 'm' | 'l').
 *
 * Each bucket returns:
 *   {
 *     headline:   one-line summary of the kitchen ("60-cover café, 12-hour service…")
 *     narrative:  3 short paragraphs a senior chef would write — workflow,
 *                 trade-offs, what to watch
 *     stations:   2-5 station names that organise the equipment in a real
 *                 commercial kitchen ("Wet kitchen", "Hot line", "Service pass"…)
 *     equipment:  array of {category, items: [{sku, qty, note}], notes}
 *   }
 *
 * Numbers (qty) are realistic for the venture size — see CLAUDE.md §12 on
 * "AI feeling like a gimmick" and §10 on Indian-market defaults.
 *
 * Fallback: anything not explicitly defined falls back to BASELINE_KIT
 * (a sensible mid-size, multi-cuisine kit). The wizard explains this in
 * the results page so it never feels like a stub.
 */

import {products} from './products';

/** Quick lookup so the wizard can validate SKU references at boot. */
const SKU_OK = new Set(products.map((p) => p.slug));
function ok(sku) {
  if (!SKU_OK.has(sku)) {
    // Surface bad mock SKUs loudly in dev rather than failing silently.
    // eslint-disable-next-line no-console
    console.warn(`[wizard] Unknown SKU referenced: ${sku}`);
  }
  return sku;
}

/* ────────────────────────  Café  ──────────────────────── */

const cafe = {
  s: {
    headline: '40-cover café, all-day service, ≤900 sqft.',
    narrative: [
      'For a 40-cover café you can be conservative on hot-line capacity. A 4-burner stove handles all-day breakfast, light bowls, and snacks — couple it with a single combi oven for bakes and toasted sandwiches and you cover 80% of the menu.',
      'Specialty coffee is where you don’t cut corners: a two-group espresso machine pays itself back inside 8 months on the cover-conversion alone. Use the prep-table chiller as your cold side and avoid a second reach-in until your covers cross 60.',
      'The single thing most café owners regret: under-spec’d wash. We include the small undercounter dishwasher — at 60 racks/hr you won’t bottleneck during the breakfast rush.',
    ],
    stations: ['Coffee bar', 'Hot line', 'Cold prep', 'Wash'],
    equipment: [
      {category: 'Coffee & Espresso', items: [{sku: ok('two-group-espresso-machine'), qty: 1}]},
      {category: 'Cooking Ranges',    items: [{sku: ok('four-burner-gas-stove'), qty: 1}]},
      {category: 'Refrigeration',     items: [{sku: ok('undercounter-prep-chiller'), qty: 1}, {sku: ok('reach-in-fridge-single-door'), qty: 1}]},
      {category: 'Ovens',             items: [{sku: ok('combi-oven-10-gn'), qty: 1, note: 'For bakes + sandwiches'}]},
      {category: 'Work Tables',       items: [{sku: ok('ss-work-table-4ft'), qty: 2}]},
      {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 1}]},
      {category: 'Dishwashing',       items: [{sku: ok('undercounter-dishwasher'), qty: 1}]},
      {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 1}]},
    ],
  },
  m: {
    headline: '80-cover café, all-day + bakery, 1,200–1,800 sqft.',
    narrative: [
      'At 80 covers the kitchen needs proper line segregation — coffee bar isolated, hot line in its own zone, dedicated baking station. Two prep chillers and a single reach-in mean a sandwich maker, a coffee partner, and a hot-line cook can all work simultaneously without crossing each other.',
      'Two-group espresso still holds (you’re not at three-group volume), but pair it with a planetary mixer for your in-house bakes. The combi oven is doing double duty for hot-line and pastries — schedule pre-service bakes for the morning.',
      'Plan for waste from day one: 3-bowl pot sink + undercounter dishwasher is your floor. Upgrade to a hood-type dishwasher only when you cross 100 covers consistently.',
    ],
    stations: ['Coffee bar', 'Hot line', 'Cold prep', 'Bakery', 'Wash + scullery'],
    equipment: [
      {category: 'Coffee & Espresso', items: [{sku: ok('two-group-espresso-machine'), qty: 1}]},
      {category: 'Cooking Ranges',    items: [{sku: ok('four-burner-gas-stove'), qty: 1}, {sku: ok('induction-range-twin-zone'), qty: 1, note: 'For low-noise sauce work'}]},
      {category: 'Ovens',             items: [{sku: ok('combi-oven-10-gn'), qty: 1}]},
      {category: 'Food Prep Equipment', items: [{sku: ok('planetary-mixer-30l'), qty: 1, note: 'In-house bakes'}]},
      {category: 'Refrigeration',     items: [{sku: ok('undercounter-prep-chiller'), qty: 2}, {sku: ok('reach-in-fridge-two-door'), qty: 1}]},
      {category: 'Work Tables',       items: [{sku: ok('ss-work-table-6ft'), qty: 2}, {sku: ok('ss-work-table-4ft'), qty: 1}]},
      {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 1}]},
      {category: 'Dishwashing',       items: [{sku: ok('undercounter-dishwasher'), qty: 1}]},
      {category: 'Service & Display', items: [{sku: ok('bain-marie-4-pan'), qty: 1, note: 'Hot holding for service'}]},
      {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 1}]},
    ],
  },
};

/* ────────────────────────  Cloud kitchen  ──────────────────────── */

const cloudKitchen = {
  s: {
    headline: '500 orders/day, 2 brands, 600–800 sqft, delivery-only.',
    narrative: [
      'For 500 orders/day across 2 brands you’re shared-station — no daydream of a fully dedicated line per brand. Lay out hot-line / cold prep / packaging as parallel rails and you’ll hit 90-second ticket times consistently.',
      'A 3-tank Chinese range is overkill — twin-zone induction + four-burner gas is the right split, gives you peak flex without the gas-pressure overhead. Indian bhatti only if one brand needs it.',
      'Packaging eats footprint. Plan a dedicated 6ft work table with two drawers at the end of the hot line and you’ll save the kitchen from chaos by week 2.',
    ],
    stations: ['Hot line', 'Cold prep', 'Packaging bay', 'Wash'],
    equipment: [
      {category: 'Cooking Ranges',    items: [{sku: ok('four-burner-gas-stove'), qty: 1}, {sku: ok('induction-range-twin-zone'), qty: 1}]},
      {category: 'Refrigeration',     items: [{sku: ok('reach-in-fridge-two-door'), qty: 1}, {sku: ok('undercounter-prep-chiller'), qty: 2}]},
      {category: 'Food Prep Equipment', items: [{sku: ok('planetary-mixer-30l'), qty: 1}]},
      {category: 'Work Tables',       items: [{sku: ok('ss-work-table-8ft-drawers'), qty: 1, note: 'Packaging bay'}, {sku: ok('ss-work-table-6ft'), qty: 2}]},
      {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 1}]},
      {category: 'Dishwashing',       items: [{sku: ok('undercounter-dishwasher'), qty: 1}]},
      {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 1}]},
    ],
  },
  m: {
    headline: '1,200 orders/day, 4 brands, 1,000–1,400 sqft.',
    narrative: [
      'At 1,200 orders/day you need the hot line split: a 3-tank Chinese range for one brand, a 4-burner Indian bhatti for the other, a deep fryer station shared. The two prep-table chillers + reach-in two-door is your floor for cold-side capacity.',
      'Walk-in cold room becomes worth it past 1,000 orders/day — bulk ingredient storage and a clean step between pick-up zone and prep keeps food cost honest.',
      'Hood-type pass-through dishwasher is non-negotiable at this volume. Throughput defines the kitchen.',
    ],
    stations: ['Indian hot line', 'Chinese hot line', 'Fry station', 'Cold prep', 'Packaging bay', 'Wash + scullery'],
    equipment: [
      {category: 'Cooking Ranges',    items: [{sku: ok('three-tank-chinese-range'), qty: 1}, {sku: ok('induction-range-twin-zone'), qty: 1}]},
      {category: 'Indian Cooking Equipment', items: [{sku: ok('four-burner-indian-bhatti'), qty: 1}]},
      {category: 'Deep Fryers',       items: [{sku: ok('twin-tank-fryer'), qty: 1}]},
      {category: 'Refrigeration',     items: [{sku: ok('walk-in-cold-room-12sqm'), qty: 1}, {sku: ok('undercounter-prep-chiller'), qty: 2}, {sku: ok('reach-in-fridge-two-door'), qty: 1}]},
      {category: 'Food Prep Equipment', items: [{sku: ok('planetary-mixer-30l'), qty: 1}]},
      {category: 'Work Tables',       items: [{sku: ok('ss-work-table-8ft-drawers'), qty: 1}, {sku: ok('ss-work-table-6ft'), qty: 3}, {sku: ok('mobile-prep-table-with-castors'), qty: 1}]},
      {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 1}]},
      {category: 'Dishwashing',       items: [{sku: ok('hood-type-dishwasher'), qty: 1}]},
      {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 1}]},
    ],
  },
};

/* ────────────────────────  Fine dining  ──────────────────────── */

const fineDining = {
  m: {
    headline: '80-cover fine dining, 7-course tasting + à la carte, 1,800–2,400 sqft.',
    narrative: [
      'A tasting-menu kitchen lives or dies by its blast chiller and combi oven. Blast chiller gives you make-ahead garde-manger and proper temperature staging; combi gives the precision braises, fish, sous-vide-style holds.',
      'Three-tank Chinese range is an unexpected workhorse even in a continental kitchen — its high BTUs handle saucework, pasta water, and stock simultaneously.',
      'Pass design matters: dedicated cold pass for canapés + dessert, separate hot pass at the line — don’t share. Salamanders and induction tops at the pass; conventional ranges behind.',
    ],
    stations: ['Garde manger', 'Hot line', 'Pastry + bakery', 'Pass + plating', 'Wash + scullery'],
    equipment: [
      {category: 'Cooking Ranges',    items: [{sku: ok('three-tank-chinese-range'), qty: 1, note: 'High-BTU work + stocks'}, {sku: ok('induction-range-twin-zone'), qty: 2, note: 'At the pass for plating'}]},
      {category: 'Ovens',             items: [{sku: ok('combi-oven-10-gn'), qty: 2}]},
      {category: 'Refrigeration',     items: [{sku: ok('blast-chiller-20-tray'), qty: 1, note: 'Make-ahead + safety'}, {sku: ok('walk-in-cold-room-12sqm'), qty: 1}, {sku: ok('undercounter-prep-chiller'), qty: 3}]},
      {category: 'Food Prep Equipment', items: [{sku: ok('planetary-mixer-30l'), qty: 1}]},
      {category: 'Work Tables',       items: [{sku: ok('ss-work-table-8ft-drawers'), qty: 2}, {sku: ok('ss-work-table-6ft'), qty: 2}, {sku: ok('mobile-prep-table-with-castors'), qty: 2}]},
      {category: 'Service & Display', items: [{sku: ok('bain-marie-4-pan'), qty: 1, note: 'For sauces at the pass'}]},
      {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 1}]},
      {category: 'Dishwashing',       items: [{sku: ok('hood-type-dishwasher'), qty: 1}]},
      {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 1}]},
    ],
  },
};

/* ────────────────────────  Hotel kitchen  ──────────────────────── */

const hotelKitchen = {
  l: {
    headline: '200-room hotel — central kitchen, 3 outlets + IRD + banquet for 500.',
    narrative: [
      'A hotel central kitchen is a manufacturing problem disguised as a kitchen. Walk-in cold rooms (two — one for veg, one for non-veg), a hood-type dishwasher rated 90 racks/hr, two combi ovens, two three-tank Chinese ranges.',
      'Banquet capacity dictates the spec. For 500-cover events plan 4 bain marie stations on the buffet and a parallel hot-holding cabinet line behind the pass — gives you peak service throughput without compromising hot-food temps.',
      'For the breakfast buffet, the four-burner Indian bhatti pulls double duty — South Indian dosa and chapati press through breakfast, then routine sabzi production after.',
    ],
    stations: ['Central prep', 'Hot line — Indian', 'Hot line — Chinese', 'Bakery', 'IRD pass', 'Banquet hot holding', 'Scullery'],
    equipment: [
      {category: 'Cooking Ranges',    items: [{sku: ok('three-tank-chinese-range'), qty: 2}, {sku: ok('induction-range-twin-zone'), qty: 2}]},
      {category: 'Indian Cooking Equipment', items: [{sku: ok('four-burner-indian-bhatti'), qty: 1}, {sku: ok('gas-tandoor-medium'), qty: 2}]},
      {category: 'Ovens',             items: [{sku: ok('combi-oven-10-gn'), qty: 2}]},
      {category: 'Deep Fryers',       items: [{sku: ok('twin-tank-fryer'), qty: 1}]},
      {category: 'Food Prep Equipment', items: [{sku: ok('planetary-mixer-30l'), qty: 2}]},
      {category: 'Refrigeration',     items: [{sku: ok('walk-in-cold-room-12sqm'), qty: 2, note: 'Veg + non-veg, kept separate'}, {sku: ok('reach-in-fridge-two-door'), qty: 2}, {sku: ok('blast-chiller-20-tray'), qty: 1}, {sku: ok('ice-cube-machine-150kg'), qty: 1}]},
      {category: 'Service & Display', items: [{sku: ok('bain-marie-4-pan'), qty: 4, note: 'Banquet hot holding'}]},
      {category: 'Work Tables',       items: [{sku: ok('ss-work-table-8ft-drawers'), qty: 2}, {sku: ok('ss-work-table-6ft'), qty: 4}, {sku: ok('mobile-prep-table-with-castors'), qty: 2}]},
      {category: 'Storage',           items: [{sku: ok('ss-storage-rack-4tier'), qty: 4}]},
      {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 2}]},
      {category: 'Dishwashing',       items: [{sku: ok('hood-type-dishwasher'), qty: 1}, {sku: ok('undercounter-dishwasher'), qty: 1}]},
      {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 2}]},
    ],
  },
};

/* ─────────────────────  New venture default  ───────────────────── */

const BASELINE_KIT = {
  headline: 'Multi-cuisine starter kitchen, all-day service, ~1,000 sqft.',
  narrative: [
    'When the venture details are still firming up, we err on the side of flexibility. The kit below covers continental, Indian, and Chinese with the smallest sensible kit per station — easy to scale up as your menu solidifies.',
    'The single thing first-time founders over-spend on is refrigeration. One two-door reach-in + one undercounter prep table is enough for the first 6 months — add walk-in only when you cross 80 covers/day or your ingredient holding exceeds 7 days.',
    'Keep ₹2–4L of your capex budget unallocated until 30 days into operations. The kitchen will tell you what it needs that no plan can predict.',
  ],
  stations: ['Hot line', 'Cold prep', 'Bakery / oven', 'Wash'],
  equipment: [
    {category: 'Cooking Ranges',    items: [{sku: ok('four-burner-gas-stove'), qty: 1}]},
    {category: 'Refrigeration',     items: [{sku: ok('reach-in-fridge-two-door'), qty: 1}, {sku: ok('undercounter-prep-chiller'), qty: 1}]},
    {category: 'Ovens',             items: [{sku: ok('combi-oven-10-gn'), qty: 1}]},
    {category: 'Food Prep Equipment', items: [{sku: ok('planetary-mixer-30l'), qty: 1}]},
    {category: 'Work Tables',       items: [{sku: ok('ss-work-table-6ft'), qty: 2}, {sku: ok('ss-work-table-4ft'), qty: 1}]},
    {category: 'Sinks & Plumbing',  items: [{sku: ok('three-bowl-pot-sink'), qty: 1}]},
    {category: 'Dishwashing',       items: [{sku: ok('undercounter-dishwasher'), qty: 1}]},
    {category: 'Ventilation & Exhaust', items: [{sku: ok('wall-canopy-hood-6ft'), qty: 1}]},
  ],
};

export const RECOMMENDATIONS = {
  'cafe': cafe,
  'cloud-kitchen': cloudKitchen,
  'fine-dining': fineDining,
  'hotel-kitchen': hotelKitchen,
  'new-venture': {s: BASELINE_KIT, m: BASELINE_KIT, l: BASELINE_KIT},
};

/**
 * Pick the closest available recommendation for the given inputs.
 * Falls back to BASELINE_KIT if the (venture × size) cell is missing.
 */
export function recommendFor(ventureSlug, sizeBucket = 'm') {
  const v = RECOMMENDATIONS[ventureSlug];
  if (!v) return BASELINE_KIT;
  return v[sizeBucket] ?? v.m ?? v.s ?? v.l ?? BASELINE_KIT;
}

/** Convert a numeric "covers per service" into one of the size buckets. */
export function sizeBucketFor(coversPerService) {
  const n = Number(coversPerService) || 0;
  if (n <= 60) return 's';
  if (n <= 150) return 'm';
  return 'l';
}
