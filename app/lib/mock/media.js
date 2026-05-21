/**
 * Central media registry — keeps image metadata out of the core mock
 * data files so products.js / categories.js / businessTypes.js stay
 * focused on procurement attributes.
 *
 * Sprint 1 of the image-intensive catalog pass. Every entry below
 * names a path under public/images/* that may not exist yet. The
 * ImageWithFallback component detects missing files and renders a
 * designed fallback (Lucide icon on a calm tint), so the registry is
 * safe to populate ahead of asset delivery — drop a real .webp into
 * the named path and the surface comes alive without code changes.
 *
 * Asset policy (CLAUDE.md §4 / §5):
 *   - .webp preferred
 *   - object-fit: contain for product cutouts, cover for context
 *   - no competitor / supplier brand imagery
 *   - all alt text describes the equipment, never the brand
 */

/* ── Products ──────────────────────────────────────────────────────
   Keyed by product.slug. Roles:
     main    — hero shot, equipment isolated on neutral background
     angle   — three-quarter view
     detail  — controls / interior / close-up
     context — installed in a kitchen / station shot
     scale   — with a person or ruler for size reference (rare)
*/
export const productMedia = {
  'reach-in-fridge-two-door': {
    images: [
      {src: '/images/products/reach-in-fridge-two-door/main.webp', alt: 'Two-door reach-in refrigerator for commercial kitchens, front view', role: 'main'},
      {src: '/images/products/reach-in-fridge-two-door/interior.webp', alt: 'Interior shelving of the two-door reach-in refrigerator', role: 'detail'},
      {src: '/images/products/reach-in-fridge-two-door/controls.webp', alt: 'Digital temperature controls and display panel', role: 'detail'},
      {src: '/images/products/reach-in-fridge-two-door/context.webp', alt: 'Reach-in refrigerator installed in a restaurant prep area', role: 'context'},
    ],
    hasSpecSheet: true,
    hasCAD: true,
    hasVideo: false,
  },
  'reach-in-fridge-single-door': {
    images: [
      {src: '/images/products/reach-in-fridge-single-door/main.webp', alt: 'Single-door reach-in refrigerator, front view', role: 'main'},
      {src: '/images/products/reach-in-fridge-single-door/interior.webp', alt: 'Interior shelving of the single-door reach-in refrigerator', role: 'detail'},
    ],
    hasSpecSheet: true,
  },
  'undercounter-prep-chiller': {
    images: [
      {src: '/images/products/undercounter-prep-chiller/main.webp', alt: 'Undercounter prep chiller with stainless top, front view', role: 'main'},
      {src: '/images/products/undercounter-prep-chiller/top.webp', alt: 'Prep chiller top showing GN pan inserts', role: 'detail'},
      {src: '/images/products/undercounter-prep-chiller/context.webp', alt: 'Prep chiller in a cloud kitchen line', role: 'context'},
    ],
    hasSpecSheet: true,
    hasCAD: true,
  },
  'blast-chiller-10-tray': {
    images: [
      {src: '/images/products/blast-chiller-10-tray/main.webp', alt: '10-tray blast chiller, front view', role: 'main'},
      {src: '/images/products/blast-chiller-10-tray/interior.webp', alt: 'Blast chiller tray rack interior', role: 'detail'},
    ],
    hasSpecSheet: true,
  },
  'ice-machine-150kg': {
    images: [
      {src: '/images/products/ice-machine-150kg/main.webp', alt: '150 kg daily ice machine, front view', role: 'main'},
    ],
    hasSpecSheet: true,
  },
  'two-burner-chinese-range': {
    images: [
      {src: '/images/products/two-burner-chinese-range/main.webp', alt: 'Two-burner Chinese range with single water tank, side view', role: 'main'},
      {src: '/images/products/two-burner-chinese-range/burner.webp', alt: 'Wok burner close-up showing flame ring', role: 'detail'},
      {src: '/images/products/two-burner-chinese-range/context.webp', alt: 'Chinese range installed in a wok station', role: 'context'},
    ],
    hasSpecSheet: true,
    hasCAD: true,
  },
  'four-burner-indian-bhatti': {
    images: [
      {src: '/images/products/four-burner-indian-bhatti/main.webp', alt: 'Four-burner Indian bhatti with tawa plate, front view', role: 'main'},
      {src: '/images/products/four-burner-indian-bhatti/context.webp', alt: 'Bhatti installed in a sweets shop production line', role: 'context'},
    ],
    hasSpecSheet: true,
  },
  'four-burner-gas-stove': {
    images: [{src: '/images/products/four-burner-gas-stove/main.webp', alt: 'Four-burner commercial gas stove, front view', role: 'main'}],
    hasSpecSheet: true,
  },
  'induction-range-twin-zone': {
    images: [{src: '/images/products/induction-range-twin-zone/main.webp', alt: 'Twin-zone commercial induction range, top view', role: 'main'}],
    hasSpecSheet: true,
  },
  'combi-oven-10-gn': {
    images: [
      {src: '/images/products/combi-oven-10-gn/main.webp', alt: '10 GN combi oven, front view', role: 'main'},
      {src: '/images/products/combi-oven-10-gn/interior.webp', alt: 'Combi oven tray rack interior', role: 'detail'},
      {src: '/images/products/combi-oven-10-gn/controls.webp', alt: 'Combi oven touchscreen controls', role: 'detail'},
    ],
    hasSpecSheet: true,
    hasVideo: true,
    hasCAD: true,
  },
  'planetary-mixer-30l': {
    images: [
      {src: '/images/products/planetary-mixer-30l/main.webp', alt: '30 L planetary mixer for bakeries, front view', role: 'main'},
      {src: '/images/products/planetary-mixer-30l/bowl.webp', alt: 'Stainless steel mixing bowl and dough hook attachment', role: 'detail'},
    ],
    hasSpecSheet: true,
  },
  'ss-work-table-4ft': {
    images: [{src: '/images/products/ss-work-table-4ft/main.webp', alt: '4 ft stainless steel prep work table, front view', role: 'main'}],
    hasSpecSheet: true,
    hasCAD: true,
  },
  'ss-work-table-6ft': {
    images: [
      {src: '/images/products/ss-work-table-6ft/main.webp', alt: '6 ft stainless steel prep work table, front view', role: 'main'},
      {src: '/images/products/ss-work-table-6ft/context.webp', alt: '6 ft prep table installed on a kitchen line', role: 'context'},
    ],
    hasSpecSheet: true,
    hasCAD: true,
  },
  'ss-work-table-8ft-drawers': {
    images: [{src: '/images/products/ss-work-table-8ft-drawers/main.webp', alt: '8 ft stainless steel work table with drawers, front view', role: 'main'}],
    hasSpecSheet: true,
  },
  'three-bowl-pot-sink': {
    images: [{src: '/images/products/three-bowl-pot-sink/main.webp', alt: 'Three-bowl pot wash sink with drainboards, front view', role: 'main'}],
    hasSpecSheet: true,
  },
  'undercounter-dishwasher': {
    images: [
      {src: '/images/products/undercounter-dishwasher/main.webp', alt: 'Undercounter commercial dishwasher, front view', role: 'main'},
      {src: '/images/products/undercounter-dishwasher/rack.webp', alt: 'Dishwasher rack interior', role: 'detail'},
    ],
    hasSpecSheet: true,
    hasVideo: true,
  },
  'wall-canopy-hood-6ft': {
    images: [
      {src: '/images/products/wall-canopy-hood-6ft/main.webp', alt: '6 ft wall-canopy exhaust hood with ESP, side view', role: 'main'},
      {src: '/images/products/wall-canopy-hood-6ft/context.webp', alt: 'Wall-canopy hood mounted over a cooking line', role: 'context'},
    ],
    hasSpecSheet: true,
    hasCAD: true,
  },
  'bain-marie-4-pan': {
    images: [{src: '/images/products/bain-marie-4-pan/main.webp', alt: '4-pan bain marie hot service unit, front view', role: 'main'}],
    hasSpecSheet: true,
  },
  'two-group-espresso-machine': {
    images: [
      {src: '/images/products/two-group-espresso-machine/main.webp', alt: 'Two-group commercial espresso machine, front view', role: 'main'},
      {src: '/images/products/two-group-espresso-machine/group.webp', alt: 'Espresso group head close-up', role: 'detail'},
    ],
    hasSpecSheet: true,
    hasVideo: true,
  },
  'undercounter-prep-chiller-2': {
    images: [{src: '/images/products/undercounter-prep-chiller-2/main.webp', alt: 'Compact undercounter prep chiller, front view', role: 'main'}],
  },
};

/* ── Categories ───────────────────────────────────────────────────
   One photo for the category card on the home grid (square / 16:10),
   plus an optional heroImage for the category landing-page banner.
*/
export const categoryMedia = {
  refrigeration: {
    image: '/images/categories/refrigeration.webp',
    imageAlt: 'Commercial refrigeration line with reach-in and undercounter units',
    heroImage: '/images/categories/refrigeration-hero.webp',
  },
  'cooking-ranges': {
    image: '/images/categories/cooking-ranges.webp',
    imageAlt: 'Indian bhatti and Chinese range cooking line',
    heroImage: '/images/categories/cooking-ranges-hero.webp',
  },
  'indian-cooking': {
    image: '/images/categories/indian-cooking.webp',
    imageAlt: 'Traditional tandoor, dosa plate, and idli steamer station',
  },
  ovens: {
    image: '/images/categories/ovens.webp',
    imageAlt: 'Combi and deck ovens stacked in a production bakery',
  },
  'deep-fryers': {
    image: '/images/categories/deep-fryers.webp',
    imageAlt: 'Twin-tank deep fryer on a QSR cooking line',
  },
  'food-prep': {
    image: '/images/categories/food-prep.webp',
    imageAlt: 'Planetary mixer, slicer, and grinder on a prep counter',
  },
  'work-tables': {
    image: '/images/categories/work-tables.webp',
    imageAlt: 'Stainless steel prep tables on a kitchen mise-en-place line',
  },
  storage: {
    image: '/images/categories/storage.webp',
    imageAlt: 'Stainless steel storage racks and ingredient bins',
  },
  'sinks-plumbing': {
    image: '/images/categories/sinks-plumbing.webp',
    imageAlt: 'Three-bowl pot sink with pre-rinse spray and drainboards',
  },
  dishwashing: {
    image: '/images/categories/dishwashing.webp',
    imageAlt: 'Hood-type commercial dishwasher with rack conveyor',
  },
  'service-display': {
    image: '/images/categories/service-display.webp',
    imageAlt: 'Bain marie and cold display on a buffet service counter',
  },
  'coffee-espresso': {
    image: '/images/categories/coffee-espresso.webp',
    imageAlt: 'Two-group espresso machine and grinder on a café bar',
  },
  'bar-equipment': {
    image: '/images/categories/bar-equipment.webp',
    imageAlt: 'Back-bar coolers and ice well in a cocktail bar',
  },
  'ventilation-exhaust': {
    image: '/images/categories/ventilation-exhaust.webp',
    imageAlt: 'Wall-canopy exhaust hood with ESP and make-up air',
  },
};

/* ── Business types ───────────────────────────────────────────────
   One hero image per venture for the /business-type/:handle hero
   plus optional station shots that get used on the same landing
   page's station grid.
*/
export const ventureMedia = {
  cafe: {
    image: '/images/business-types/cafe.webp',
    imageAlt: 'Specialty café with espresso machine, pastry case, and seating',
  },
  'cloud-kitchen': {
    image: '/images/business-types/cloud-kitchen.webp',
    imageAlt: 'Compact cloud kitchen production line with stainless prep and cooking',
  },
  bakery: {
    image: '/images/business-types/bakery.webp',
    imageAlt: 'Production bakery with rotary ovens, proofers, and mixers',
  },
  qsr: {
    image: '/images/business-types/qsr.webp',
    imageAlt: 'Quick-service restaurant kitchen with fryer, grill, and pass',
  },
  'fine-dining': {
    image: '/images/business-types/fine-dining.webp',
    imageAlt: 'Fine-dining kitchen with multi-station mise en place and pass',
  },
  'hotel-kitchen': {
    image: '/images/business-types/hotel-kitchen.webp',
    imageAlt: 'Hotel banquet kitchen with multiple cook lines and a hot service pass',
  },
  'resort-kitchen': {
    image: '/images/business-types/resort-kitchen.webp',
    imageAlt: 'Resort kitchen with indoor and outdoor BBQ stations',
  },
  bar: {
    image: '/images/business-types/bar.webp',
    imageAlt: 'Cocktail bar with back-bar coolers, ice well, and garnish station',
  },
  'hospital-kitchen': {
    image: '/images/business-types/hospital-kitchen.webp',
    imageAlt: 'Hospital food-service kitchen with tray-line assembly',
  },
  'school-canteen': {
    image: '/images/business-types/school-canteen.webp',
    imageAlt: 'School canteen production kitchen and service counter',
  },
  'corporate-cafeteria': {
    image: '/images/business-types/corporate-cafeteria.webp',
    imageAlt: 'Corporate cafeteria with multi-cuisine live counters',
  },
  'catering-kitchen': {
    image: '/images/business-types/catering-kitchen.webp',
    imageAlt: 'Catering production kitchen with bulk batches and transport hot boxes',
  },
  'sweet-shop': {
    image: '/images/business-types/sweet-shop.webp',
    imageAlt: 'Indian sweets shop with halwai bhatti and mithai counters',
  },
  'new-venture': {
    image: '/images/business-types/new-venture.webp',
    imageAlt: 'Empty commissary space being planned for a new kitchen build',
  },
};

/* ── Stations ─────────────────────────────────────────────────────
   Used by the home "Shop by station" rail and the business-type
   station-grid module.
*/
export const stationMedia = {
  prep: {
    label: 'Prep',
    image: '/images/stations/prep.webp',
    imageAlt: 'Stainless prep tables with mise en place containers',
    blurb: 'Mise tables, mixers, slicers, sinks.',
    categories: ['work-tables', 'food-prep', 'sinks-plumbing', 'storage'],
  },
  cooking: {
    label: 'Cooking',
    image: '/images/stations/cooking.webp',
    imageAlt: 'Cook line with burners, bhatti, and combi oven',
    blurb: 'Bhattis, Chinese ranges, ovens, fryers.',
    categories: ['cooking-ranges', 'indian-cooking', 'ovens', 'deep-fryers'],
  },
  refrigeration: {
    label: 'Refrigeration',
    image: '/images/stations/refrigeration.webp',
    imageAlt: 'Reach-in and undercounter refrigeration wall',
    blurb: 'Reach-ins, undercounters, blast chillers.',
    categories: ['refrigeration', 'storage'],
  },
  dishwashing: {
    label: 'Wash',
    image: '/images/stations/dishwashing.webp',
    imageAlt: 'Dishwashing area with three-bowl sink and hood-type dishwasher',
    blurb: 'Sinks, dishwashers, glass washers.',
    categories: ['sinks-plumbing', 'dishwashing'],
  },
  service: {
    label: 'Service',
    image: '/images/stations/service.webp',
    imageAlt: 'Hot and cold service counter with bain marie',
    blurb: 'Bain marie, hot cases, cold display.',
    categories: ['service-display', 'coffee-espresso'],
  },
  ventilation: {
    label: 'Ventilation',
    image: '/images/stations/ventilation.webp',
    imageAlt: 'Wall-canopy exhaust hood and ESP',
    blurb: 'Hoods, ESP, make-up air, ducting.',
    categories: ['ventilation-exhaust'],
  },
};

/* ── Merchandising tiles ──────────────────────────────────────────
   Promotional setup-kit tiles used on the home merchandising row.
   Each one is a curated bundle of categories + venture flavour.
*/
export const merchandisingTiles = [
  {
    slug: 'cloud-kitchen-essentials',
    title: 'Cloud kitchen essentials',
    blurb: 'Compact-footprint kits for delivery-only brands.',
    image: '/images/merchandising/cloud-kitchen-essentials.webp',
    imageAlt: 'Cloud kitchen production line essentials',
    href: '/business-type/cloud-kitchen',
    cta: 'Browse kit',
    accent: 'ink',
  },
  {
    slug: 'cafe-opening-kit',
    title: 'Café opening kit',
    blurb: 'Espresso programme, pastry case, all-day menu.',
    image: '/images/merchandising/cafe-opening-kit.webp',
    imageAlt: 'Café opening kit with espresso bar and pastry display',
    href: '/business-type/cafe',
    cta: 'Browse kit',
    accent: 'ink',
  },
  {
    slug: 'bakery-production-line',
    title: 'Bakery production line',
    blurb: 'Mixers, proofers, deck and rotary ovens.',
    image: '/images/merchandising/bakery-production-line.webp',
    imageAlt: 'Bakery production line with mixers and ovens',
    href: '/business-type/bakery',
    cta: 'Browse kit',
    accent: 'ink',
  },
  {
    slug: 'stainless-prep-and-storage',
    title: 'Stainless prep & storage',
    blurb: 'Tables, racks, bins. Every common size.',
    image: '/images/merchandising/stainless-prep-and-storage.webp',
    imageAlt: 'Stainless steel prep tables and storage racks',
    href: '/collections/work-tables',
    cta: 'Shop tables',
    accent: 'ink',
  },
  {
    slug: 'refrigeration-quote-week',
    title: 'Refrigeration quote week',
    blurb: 'Faster turnaround on chiller and freezer quotes this week.',
    image: '/images/merchandising/refrigeration-quote-week.webp',
    imageAlt: 'Commercial refrigeration line up for quote',
    href: '/collections/refrigeration',
    cta: 'Request a quote',
    accent: 'amber',
  },
  {
    slug: 'demo-equipment',
    title: 'Demo & display equipment',
    blurb: 'Lightly-used demo units at project-friendly prices.',
    image: '/images/merchandising/demo-equipment.webp',
    imageAlt: 'Demo and display commercial kitchen equipment',
    href: '/collections/refrigeration',
    cta: 'Browse demo',
    accent: 'ink',
  },
];

/* ── Helpers ──────────────────────────────────────────────────────
   Components import these instead of touching the registries
   directly. Each returns a safe shape even when nothing is
   registered for the requested key — so a brand-new product with no
   media entry still renders cleanly via the fallback.
*/
export function getProductMedia(slug) {
  return productMedia[slug] ?? {
    images: [],
    hasSpecSheet: false,
    hasCAD: false,
    hasVideo: false,
  };
}

export function getCategoryMedia(slug) {
  return categoryMedia[slug] ?? {image: null, imageAlt: null, heroImage: null};
}

export function getVentureMedia(slug) {
  return ventureMedia[slug] ?? {image: null, imageAlt: null};
}

/** Convenience — first image (main) for use in cards / thumbnails. */
export function getProductHeroImage(slug) {
  const m = getProductMedia(slug);
  return m.images?.[0] ?? null;
}

/** Convenience — image count badge value (1+). */
export function getProductImageCount(slug) {
  const m = getProductMedia(slug);
  return m.images?.length ?? 0;
}
