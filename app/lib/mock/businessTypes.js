/**
 * 14 business-type landing pages. Each entry feeds /business-type/:handle.
 * Slugs locked by CLAUDE.md §6. Copy hand-written for the operator persona
 * — short, specific, plausibly Indian. No real brand names (CLAUDE.md §5).
 *
 *   - `suggestedCategories`  4-6 category slugs (from app/lib/mock/categories.js)
 *   - `suggestedProducts`    4-6 product slugs (from app/lib/mock/products.js)
 *   - `pains` / `wins`       3-card grids on the page
 *   - `testimonial`          optional, displayed if present
 *   - `cta`                  primary CTA label (route is /kitchen-planner?venture=<slug>)
 *
 * The `new-venture` entry is the entry path for buyers who don't have a
 * business identity yet — see CLAUDE.md §6 note.
 */

import {
  Coffee, Truck, CakeSlice, Zap, Sparkles, Building2, Trees, Wine,
  Stethoscope, GraduationCap, Briefcase, ChefHat, Cookie, Wand2,
} from 'lucide-react';

export const businessTypes = [
  {
    slug: 'cafe',
    name: 'Café',
    icon: Coffee,
    tagline: 'Specialty coffee. All-day menu. Compact footprint.',
    hero: {
      eyebrow: 'For café operators',
      headline: 'Spec a café that punches above its sqft.',
      subhead:
        'Espresso bar, prep station, all-day kitchen, retail-grade chillers. Built for 60–120 covers, 12–14 hour service days.',
    },
    pains: [
      {title: 'Mixed-use kitchen', body: 'A café kitchen runs coffee, breakfast, bakes, and snacks off one prep line. We spec equipment that pivots through the day.'},
      {title: 'Margins live or die on ops', body: 'Reach-in vs prep-table, two-group vs three-group espresso — the wrong call costs you ₹2L/year in labour.'},
      {title: 'Real estate is brutal', body: 'You\'re paying ₹250/sqft. Every footprint decision is a unit-economics decision.'},
    ],
    suggestedCategories: ['coffee-espresso', 'refrigeration', 'ovens', 'food-prep', 'work-tables'],
    suggestedProducts: ['two-group-espresso-machine', 'undercounter-prep-chiller', 'four-burner-gas-stove', 'ss-work-table-4ft'],
    testimonial: {
      quote: 'We had quotes from four vendors and a 6-week back-and-forth on espresso specs. Keystonne returned a full spec, all-in price, install dates — in 48 hours.',
      name: 'Priya Krishnan',
      role: 'Founder, Indiranagar specialty café',
      location: 'Bengaluru',
    },
    cta: 'Plan my café kitchen',
  },
  {
    slug: 'cloud-kitchen',
    name: 'Cloud kitchen',
    icon: Truck,
    tagline: 'Multi-brand, delivery-only, throughput-first.',
    hero: {
      eyebrow: 'For cloud-kitchen operators',
      headline: 'Maximum covers per sqft. Multiple brands. One kitchen.',
      subhead:
        'Hot stations, cold stations, packaging bay, pickup window — spec\'d for three brands sharing a 400–800 sqft floor.',
    },
    pains: [
      {title: 'Layout is the product', body: 'Four brands sharing a stove. Two prep tables. One dishwashing pit. The layout decides whether you can do 500 orders/day or 1,500.'},
      {title: 'Packaging blows up footprint', body: 'A poorly-spec\'d packaging bay can eat 30% of your floor. We design with the bay, not around it.'},
      {title: 'Aggregator SLAs are unforgiving', body: 'Equipment downtime above 10 minutes = order rejection. Spec for redundancy.'},
    ],
    suggestedCategories: ['cooking-ranges', 'indian-cooking', 'refrigeration', 'food-prep', 'work-tables'],
    suggestedProducts: ['three-tank-chinese-range', 'four-burner-indian-bhatti', 'reach-in-fridge-two-door', 'planetary-mixer-30l'],
    cta: 'Plan my cloud kitchen',
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    icon: CakeSlice,
    tagline: 'Ovens, proofers, mixers, display cases.',
    hero: {
      eyebrow: 'For bakeries',
      headline: 'Dough in, retail-ready bakes out.',
      subhead:
        'Deck oven, convection oven, planetary mixer, dough sheeter, refrigerated display. Built for 100–500 daily-sale bakeries.',
    },
    pains: [
      {title: 'Temperature control is the recipe', body: 'A 2°C drift on a deck oven ruins a sourdough crumb. We spec PID-controlled, India-tropicalised ovens.'},
      {title: 'Display = sales', body: 'A poorly-lit display case costs 25% of your retail revenue. We pair operational and front-of-house equipment in one quote.'},
      {title: 'Dough handling is a workflow', body: 'Mixer → divider → prover → oven → cooler. We spec the line, not just the pieces.'},
    ],
    suggestedCategories: ['ovens', 'food-prep', 'refrigeration', 'service-display', 'work-tables'],
    suggestedProducts: ['combi-oven-10-gn', 'planetary-mixer-30l', 'reach-in-fridge-two-door', 'bain-marie-4-pan'],
    cta: 'Plan my bakery',
  },
  {
    slug: 'qsr',
    name: 'QSR',
    icon: Zap,
    tagline: 'Speed of service. Consistency. Throughput.',
    hero: {
      eyebrow: 'For QSR operators',
      headline: 'Spec for the rush, run on the lull.',
      subhead:
        'Fryers, grills, hot holding, beverage stations, packaging — designed for 60-second ticket times at lunch peak.',
    },
    pains: [
      {title: 'Throughput is non-negotiable', body: 'A 4-second slowdown per ticket kills 200 orders/day at peak. We spec for cycle time, not catalog spec.'},
      {title: 'Standardise across stores', body: 'Multi-outlet brands need identical kits. Our spec sheets are reorder-ready for 5th and 50th store opens.'},
      {title: 'Oil management = food cost', body: 'Bad fryer choice burns 30% more oil per kg. Filtration + cold-zone design pays back in 6 months.'},
    ],
    suggestedCategories: ['cooking-ranges', 'deep-fryers', 'refrigeration', 'service-display', 'work-tables'],
    suggestedProducts: ['twin-tank-fryer', 'four-burner-gas-stove', 'bain-marie-4-pan', 'reach-in-fridge-two-door'],
    cta: 'Plan my QSR kitchen',
  },
  {
    slug: 'fine-dining',
    name: 'Fine dining',
    icon: Sparkles,
    tagline: 'Multi-course. Precision. Garde manger to pass.',
    hero: {
      eyebrow: 'For fine-dining operators',
      headline: 'Equipment that disappears behind the plating.',
      subhead:
        'Combi ovens, blast chillers, sous-vide-ready stations, cold pass, salamanders — for 60–120 covers and 8+ courses.',
    },
    pains: [
      {title: 'Equipment is the chef\'s instrument', body: 'A celebrated chef rejects a brand of induction because the haptics are wrong. We carry pro-grade kit, not catalog filler.'},
      {title: 'HACCP without compromise', body: 'Blast chillers, separated prep zones, allergen workflow — built into the spec from day one.'},
      {title: 'Front-of-house is a kitchen too', body: 'Cold pass, plating windows, beverage stations. We design end-to-end.'},
    ],
    suggestedCategories: ['cooking-ranges', 'refrigeration', 'food-prep', 'ovens', 'service-display'],
    suggestedProducts: ['combi-oven-10-gn', 'blast-chiller-20-tray', 'three-tank-chinese-range', 'undercounter-prep-chiller'],
    cta: 'Plan my fine-dining kitchen',
  },
  {
    slug: 'hotel-kitchen',
    name: 'Hotel kitchen',
    icon: Building2,
    tagline: 'Banquet. Multi-outlet. Room service.',
    hero: {
      eyebrow: 'For hotel kitchens',
      headline: 'One central kitchen. Six outlets. Zero compromises.',
      subhead:
        'Banquet capacity for 500-cover events, three-meal coffee shop, specialty restaurants, IRD, breakfast buffets — spec\'d as one system.',
    },
    pains: [
      {title: 'Scale is unforgiving', body: 'A 200-room property serving 1,800 covers a day. Equipment choices compound across decades.'},
      {title: 'Multi-cuisine in one footprint', body: 'Indian + Chinese + Continental + breakfast all from a shared utility line. We spec for the worst-case simultaneous load.'},
      {title: 'Procurement teams need paperwork', body: 'Our quotes ship with full specs, drawings, freight, GST, AMC terms — everything Finance needs for sign-off.'},
    ],
    suggestedCategories: ['cooking-ranges', 'refrigeration', 'dishwashing', 'service-display', 'ventilation-exhaust'],
    suggestedProducts: ['three-tank-chinese-range', 'walk-in-cold-room-12sqm', 'hood-type-dishwasher', 'wall-canopy-hood-6ft'],
    cta: 'Plan my hotel kitchen',
  },
  {
    slug: 'resort-kitchen',
    name: 'Resort kitchen',
    icon: Trees,
    tagline: 'Multi-cuisine. Outdoor BBQ. Seasonal demand.',
    hero: {
      eyebrow: 'For resort kitchens',
      headline: 'Mountain or beach — your kitchen survives both seasons.',
      subhead:
        'Weather-resilient stations, outdoor BBQ + tandoor, banquet capacity, multi-restaurant base kitchen — for 80–300 room resorts.',
    },
    pains: [
      {title: 'Seasonal swings break equipment', body: 'Peak Diwali vs off-season — the same chillers serve 4× the load. Spec for the swing, not the average.'},
      {title: 'Remote locations, remote service', body: 'A breakdown means a 6-hour AMC drive. We spec equipment with field-serviceable parts.'},
      {title: 'Outdoor stations have rules', body: 'BBQ, tandoor, live counters — material grade matters in coastal humidity or hill cold.'},
    ],
    suggestedCategories: ['cooking-ranges', 'indian-cooking', 'refrigeration', 'ventilation-exhaust', 'food-prep'],
    suggestedProducts: ['gas-tandoor-medium', 'three-tank-chinese-range', 'walk-in-cold-room-12sqm', 'planetary-mixer-30l'],
    cta: 'Plan my resort kitchen',
  },
  {
    slug: 'bar',
    name: 'Bar',
    icon: Wine,
    tagline: 'Cocktails. Ice. Glassware. Garnish prep.',
    hero: {
      eyebrow: 'For bars + nightlife',
      headline: 'Every second between order and pour is a tip.',
      subhead:
        'Back-bar coolers, dedicated ice, glass washers, garnish stations, draught — spec\'d for 200-cover bars and 500-cover lounges.',
    },
    pains: [
      {title: 'Ice is the silent killer', body: 'Bad ice spec = warm cocktails by 11 PM. We dimension ice machines to peak DJ-night demand.'},
      {title: 'Glass throughput defines speed', body: 'A bar without a glass washer at the well is a slow bar. We design the back-bar around the wash flow.'},
      {title: 'Refrigeration choice is brand', body: 'Glass-door back-bar coolers do double duty as merchandising. Pick the wrong one and you lose visual sales.'},
    ],
    suggestedCategories: ['bar-equipment', 'refrigeration', 'dishwashing', 'service-display', 'sinks-plumbing'],
    suggestedProducts: ['back-bar-cooler-2-door', 'ice-cube-machine-150kg', 'undercounter-dishwasher', 'three-bowl-pot-sink'],
    cta: 'Plan my bar',
  },
  {
    slug: 'hospital-kitchen',
    name: 'Hospital kitchen',
    icon: Stethoscope,
    tagline: 'HACCP. Bulk. Diet variations. Tray assembly.',
    hero: {
      eyebrow: 'For hospital food service',
      headline: 'A kitchen audited by Joint Commission, not Zomato.',
      subhead:
        'Bulk cookers, tray-line conveyors, diet-coded refrigeration, dedicated allergen workflow — for 200–800 bed institutions.',
    },
    pains: [
      {title: 'HACCP is not optional', body: 'Temperature logs, allergen separation, diet-coded storage — built into our equipment selection, not bolted on after.'},
      {title: 'Diet variations multiply complexity', body: 'Normal + diabetic + soft + post-surgical + paediatric. Twenty SKUs of diet cards per meal. Spec for the cards.'},
      {title: 'Tray assembly is the bottleneck', body: 'A 600-bed tray line in 90 minutes — that\'s a manufacturing problem, not a kitchen problem. We design it that way.'},
    ],
    suggestedCategories: ['cooking-ranges', 'refrigeration', 'food-prep', 'dishwashing', 'service-display'],
    suggestedProducts: ['three-tank-chinese-range', 'walk-in-cold-room-12sqm', 'hood-type-dishwasher', 'bain-marie-4-pan'],
    cta: 'Plan my hospital kitchen',
  },
  {
    slug: 'school-canteen',
    name: 'School canteen',
    icon: GraduationCap,
    tagline: 'Two sittings. Compliance. Predictable menus.',
    hero: {
      eyebrow: 'For school canteens',
      headline: 'Two sittings. 600 students. 35 minutes each.',
      subhead:
        'Bulk cookers, three-bowl scullery, service counters, refrigeration — spec\'d for institutional FSSAI compliance and PTA budgets.',
    },
    pains: [
      {title: 'Peak demand in narrow windows', body: 'You have 35 minutes to feed 300 kids, twice a day. Cooking and service are pre-prep heavy.'},
      {title: 'Hygiene auditing never stops', body: 'Parents inspect. Authorities inspect. We spec for auditable workflows from day one.'},
      {title: 'Capex must justify itself', body: 'PTA budgets are tight. We help you choose equipment that lasts 8+ years, not 3.'},
    ],
    suggestedCategories: ['cooking-ranges', 'indian-cooking', 'refrigeration', 'dishwashing', 'service-display'],
    suggestedProducts: ['four-burner-indian-bhatti', 'reach-in-fridge-two-door', 'undercounter-dishwasher', 'bain-marie-4-pan'],
    cta: 'Plan my school canteen',
  },
  {
    slug: 'corporate-cafeteria',
    name: 'Corporate cafeteria',
    icon: Briefcase,
    tagline: 'Breakfast, lunch, snacks. Multi-cuisine.',
    hero: {
      eyebrow: 'For corporate cafeterias',
      headline: 'Five cuisines. One lunch hour. 1,200 employees.',
      subhead:
        'Live counters, salad bars, espresso, beverage stations, dishwashing pit — spec\'d for IT-park and large-office tenant kitchens.',
    },
    pains: [
      {title: 'Lunch hour is one hour', body: '1,200 covers in 60 minutes. Service throughput defines the kitchen, not cooking capacity.'},
      {title: 'Multi-cuisine on a single utility', body: 'North Indian + South Indian + Continental + Chinese + healthy bowl — all from one shared utility line.'},
      {title: 'Vendor changes every 3 years', body: 'Equipment outlives operators. We spec for handover and reuse.'},
    ],
    suggestedCategories: ['cooking-ranges', 'service-display', 'refrigeration', 'coffee-espresso', 'food-prep'],
    suggestedProducts: ['three-tank-chinese-range', 'two-group-espresso-machine', 'bain-marie-4-pan', 'reach-in-fridge-two-door'],
    cta: 'Plan my corporate cafeteria',
  },
  {
    slug: 'catering-kitchen',
    name: 'Catering kitchen',
    icon: ChefHat,
    tagline: 'Off-site delivery. Bulk batches. Hot + cold transport.',
    hero: {
      eyebrow: 'For catering kitchens',
      headline: 'Cook here. Deliver hot 60 km away.',
      subhead:
        'Bulk cookers, blast chillers, hot-holding cabinets, packaging stations, refrigerated transport prep — for 100 to 5,000 cover events.',
    },
    pains: [
      {title: 'Hot food + transport is hard', body: 'Bain marie capacity, hot-holding cabinets, transport-safe insulated boxes — every hand-off is a temperature risk.'},
      {title: 'Batch consistency at scale', body: 'A wedding biryani for 800 needs the same biryani for 80. Bulk-cooker spec defines whether you can scale.'},
      {title: 'Demand is event-driven', body: 'Three weddings on a Saturday, two events on Tuesday. Equipment must handle 5× peak without rusting in low periods.'},
    ],
    suggestedCategories: ['cooking-ranges', 'refrigeration', 'service-display', 'food-prep', 'work-tables'],
    suggestedProducts: ['three-tank-chinese-range', 'blast-chiller-20-tray', 'bain-marie-4-pan', 'ss-work-table-8ft-drawers'],
    cta: 'Plan my catering kitchen',
  },
  {
    slug: 'sweet-shop',
    name: 'Sweet shop',
    icon: Cookie,
    tagline: 'Halwai bhattis. Mithai displays. Milk-based prep.',
    hero: {
      eyebrow: 'For mithai + sweet retailers',
      headline: 'Bhatti to display. Production to retail.',
      subhead:
        'Traditional bhattis, khoya pans, refrigerated mithai displays, milk-room refrigeration — for 50 sqft kiosks to 2,000 sqft destinations.',
    },
    pains: [
      {title: 'Tradition is your differentiator', body: 'A wholesaler\'s bhatti can\'t make Sohan halwa. We work with traditional halwai setups, not against them.'},
      {title: 'Display = retail', body: 'A poorly-lit chilled display costs you walk-in conversion. Display chillers are sales equipment.'},
      {title: 'Festive peaks are 10×', body: 'Diwali, Eid, Rakhi — equipment must handle 10× the normal load for 2 weeks, four times a year.'},
    ],
    suggestedCategories: ['indian-cooking', 'refrigeration', 'service-display', 'food-prep', 'cooking-ranges'],
    suggestedProducts: ['four-burner-indian-bhatti', 'reach-in-fridge-two-door', 'bain-marie-4-pan', 'planetary-mixer-30l'],
    cta: 'Plan my sweet shop',
  },
  {
    slug: 'new-venture',
    name: "I'm building something new",
    icon: Wand2,
    tagline: 'No kitchen yet. No business yet. Just a vision.',
    hero: {
      eyebrow: 'For first-time founders',
      headline: 'You\'re not behind. You\'re early.',
      subhead:
        'Tell us the kind of place you want to build. We\'ll suggest the right equipment, the right footprint, and a realistic capital plan — before you sign a lease.',
    },
    pains: [
      {title: 'You don\'t know what you don\'t know', body: 'Hood vs no hood. Bhatti vs Chinese range. ESP vs ducted exhaust. We\'ll explain it in plain language.'},
      {title: 'Capex sets your runway', body: 'A ₹4L kitchen vs a ₹20L kitchen is a different business. We help you cost the trade-offs before you commit.'},
      {title: 'The lease decision is irreversible', body: 'Power, water, gas, exhaust routing — every site decision affects the kitchen spec. Consult before you sign.'},
    ],
    suggestedCategories: ['refrigeration', 'cooking-ranges', 'work-tables', 'food-prep', 'ventilation-exhaust', 'dishwashing'],
    suggestedProducts: ['ss-work-table-4ft', 'four-burner-gas-stove', 'undercounter-prep-chiller', 'undercounter-dishwasher'],
    cta: 'Start with the AI planner',
  },
];

export const businessTypeBySlug = Object.fromEntries(
  businessTypes.map((b) => [b.slug, b]),
);
