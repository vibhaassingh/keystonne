/**
 * Mock product catalog for the storefront. Generic names, generic specs,
 * invented but plausible Indian-market pricing — NEVER reference any real
 * brand, manufacturer, or SKU code (CLAUDE.md §5).
 *
 * Items priced < ₹50,000 show "Add to Cart"; everything else (and a fallback
 * on every product) shows "Request Quote".
 *
 * Each product:
 *   {
 *     slug, name, category, blurb,
 *     priceINR (number or null for "quote only"),
 *     specs: {dimensions, capacity, power, ...},
 *     warrantyMonths, leadDays,
 *     accent: hex color used for the placeholder card background,
 *     rating: 1-5 (decimal, mock review average),
 *     reviewCount, badge: optional "Best seller" / "New" pill
 *   }
 */

export const products = [
  {
    slug: 'reach-in-fridge-two-door',
    name: 'Heavy-Duty Two-Door Reach-In Refrigerator',
    category: 'refrigeration',
    blurb: 'Two-door upright with adjustable shelves, R290 hydrocarbon refrigerant, NSF-equivalent build.',
    priceINR: 1_29_000,
    specs: {
      Dimensions: '1340 × 770 × 2090 mm',
      Capacity: '1240 L',
      'Power draw': '220 V, 580 W',
      'Temp range': '+2°C to +8°C',
      Material: '304 stainless steel, inside + out',
    },
    warrantyMonths: 12,
    leadDays: 7,
    accent: '#1E3A8A',
    rating: 4.7,
    reviewCount: 38,
    badge: 'Best seller',
  },
  {
    slug: 'undercounter-prep-chiller',
    name: 'Undercounter Refrigerated Prep Table 4ft',
    category: 'refrigeration',
    blurb: 'Granite work-top with cold rail; ideal for salad and sandwich prep stations.',
    priceINR: 78_500,
    specs: {
      Dimensions: '1220 × 700 × 850 mm',
      Capacity: '230 L',
      'Power draw': '220 V, 320 W',
      'Cold rail': '6 × GN 1/6 pans',
      'Temp range': '+2°C to +10°C',
    },
    warrantyMonths: 12,
    leadDays: 7,
    accent: '#0E7490',
    rating: 4.6,
    reviewCount: 21,
  },
  {
    slug: 'two-burner-chinese-range',
    name: 'Two-Burner Chinese Range with Side Tank',
    category: 'cooking-ranges',
    blurb: 'High-pressure jet burners, integrated water-pull tank, cast iron grates. Wok-ready.',
    priceINR: 1_85_000,
    specs: {
      Dimensions: '1500 × 1100 × 850 mm',
      'Burner output': '2 × 60,000 kcal/hr',
      Fuel: 'LPG / PNG',
      'Tank capacity': '20 L stainless reservoir',
      Drainage: 'Built-in waste outlet',
    },
    warrantyMonths: 12,
    leadDays: 14,
    accent: '#9A3412',
    rating: 4.8,
    reviewCount: 56,
    badge: 'Best seller',
  },
  {
    slug: 'four-burner-indian-bhatti',
    name: 'Four-Burner Indian Bhatti with Tawa Plate',
    category: 'indian-cooking',
    blurb: 'Tropicalised low-pressure burners with a flat tawa station — built for dal, sabzi, and parathas through the day.',
    priceINR: 1_42_000,
    specs: {
      Dimensions: '1800 × 900 × 850 mm',
      Burners: '4 × 18,000 kcal/hr + tawa',
      Fuel: 'LPG',
      'Tawa plate': '600 mm cast iron',
      Frame: '14 SWG SS 304',
    },
    warrantyMonths: 12,
    leadDays: 14,
    accent: '#7C2D12',
    rating: 4.5,
    reviewCount: 17,
  },
  {
    slug: 'ss-work-table-6ft',
    name: 'Heavy-Duty SS Work Table 6ft × 2.5ft with Undershelf',
    category: 'work-tables',
    blurb: 'Reinforced 14-SWG top, perimeter framing, adjustable bullet feet. Made-in-India construction.',
    priceINR: 18_900,
    specs: {
      Dimensions: '1830 × 760 × 850 mm',
      'Top thickness': '1.5 mm / 14 SWG',
      Material: '304 stainless steel',
      Undershelf: 'Solid, with rear lip',
      Load: '180 kg distributed',
    },
    warrantyMonths: 12,
    leadDays: 5,
    accent: '#374151',
    rating: 4.4,
    reviewCount: 92,
  },
  {
    slug: 'undercounter-dishwasher',
    name: 'Undercounter Commercial Dishwasher — 60 racks/hr',
    category: 'dishwashing',
    blurb: 'Single-phase undercounter unit with built-in rinse boost and water softener interface.',
    priceINR: 2_15_000,
    specs: {
      Dimensions: '600 × 650 × 820 mm',
      Throughput: '60 racks/hr',
      'Rack size': '500 × 500 mm',
      'Power draw': '230 V, 3.6 kW',
      'Cycle time': '90 / 120 / 180 sec',
    },
    warrantyMonths: 12,
    leadDays: 10,
    accent: '#0F766E',
    rating: 4.6,
    reviewCount: 14,
  },
  {
    slug: 'wall-canopy-hood-6ft',
    name: 'Wall-Canopy Exhaust Hood 6ft with ESP Filter',
    category: 'ventilation-exhaust',
    blurb: 'Captures heavy oil-laden vapour with a three-stage baffle, optional ESP module for kitchens with no roof exhaust.',
    priceINR: 1_68_000,
    specs: {
      Dimensions: '1830 × 1200 × 600 mm',
      Material: '20 SWG SS 304',
      Filters: '3-stage baffle, 304 grade',
      'Airflow': '2400 m³/hr',
      'ESP option': 'Add-on inline module',
    },
    warrantyMonths: 12,
    leadDays: 14,
    accent: '#1F2937',
    rating: 4.5,
    reviewCount: 11,
    badge: 'New',
  },
  {
    slug: 'two-group-espresso-machine',
    name: 'Two-Group Semi-Automatic Espresso Machine',
    category: 'coffee-espresso',
    blurb: 'Volumetric dosing, dual boilers, PID temperature control. Built for 250 espresso-based drinks a day.',
    priceINR: 2_85_000,
    specs: {
      Dimensions: '760 × 540 × 530 mm',
      Groups: '2',
      Boiler: '11 L steam + 2 × 0.5 L brew',
      'Power draw': '220 V, 3.4 kW',
      Steam: 'Twin wands with auto-purge',
    },
    warrantyMonths: 12,
    leadDays: 10,
    accent: '#854D0E',
    rating: 4.8,
    reviewCount: 42,
    badge: 'Best seller',
  },
];

export const productBySlug = Object.fromEntries(
  products.map((p) => [p.slug, p]),
);

export function productsByCategory(slug) {
  return products.filter((p) => p.category === slug);
}
