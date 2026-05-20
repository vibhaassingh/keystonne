/**
 * The 14 catalog categories — slugs locked by CLAUDE.md §6. Used by:
 *  - MegaNav (top-level + subgroups)
 *  - FeaturedCategoriesGrid on the home page
 *  - Footer category column
 *  - Collection routes (/collections/:handle)
 *
 * Icons reference Lucide names (rendered in components, not strings).
 */

import {
  Refrigerator,
  Fan,
  Flame,
  CookingPot,
  CakeSlice,
  ChefHat,
  Layers,
  Boxes,
  Droplets,
  Sparkles,
  Soup,
  Coffee,
  Wine,
  Utensils,
} from 'lucide-react';

export const categories = [
  {
    slug: 'refrigeration',
    name: 'Refrigeration',
    icon: Refrigerator,
    blurb: 'Reach-ins, undercounters, walk-ins, blast chillers, ice machines.',
    subgroups: [
      {title: 'Reach-In Refrigeration', items: ['Single-door', 'Two-door', 'Three-door']},
      {title: 'Undercounter', items: ['Refrigerators', 'Freezers', 'Worktop combos']},
      {title: 'Walk-In', items: ['Cold rooms', 'Freezer rooms', 'Pre-fab panels']},
      {title: 'Specialty', items: ['Blast chillers', 'Ice machines', 'Display chillers']},
    ],
  },
  {
    slug: 'ventilation-exhaust',
    name: 'Ventilation & Exhaust',
    icon: Fan,
    blurb: 'Hoods, ESP filters, make-up air units.',
    subgroups: [
      {title: 'Exhaust Hoods', items: ['Wall-canopy', 'Island-canopy', 'Back-shelf']},
      {title: 'Air Treatment', items: ['ESP units', 'Grease filters', 'Make-up air']},
      {title: 'Ducting', items: ['SS ducting', 'Dampers', 'Roof penetrations']},
    ],
  },
  {
    slug: 'cooking-ranges',
    name: 'Cooking Ranges',
    icon: Flame,
    blurb: 'Indian bhattis, Chinese ranges, gas burners, induction.',
    subgroups: [
      {title: 'Indian Ranges', items: ['Two-burner bhatti', 'Four-burner bhatti', 'Chapati plate']},
      {title: 'Chinese Ranges', items: ['Single-tank', 'Two-tank', 'Three-tank']},
      {title: 'Burners & Stoves', items: ['Gas burners', 'Induction', 'Hot tops']},
      {title: 'Accessories', items: ['Stock-pot stands', 'Side splashes', 'Burner grates']},
    ],
  },
  {
    slug: 'indian-cooking',
    name: 'Indian Cooking Equipment',
    icon: ChefHat,
    blurb: 'Tandoors, dosa plates, idli steamers, traditional bhattis.',
    subgroups: [
      {title: 'Tandoors', items: ['Charcoal', 'Gas', 'Electric']},
      {title: 'South Indian', items: ['Dosa plates', 'Idli steamers', 'Vada makers']},
      {title: 'Sweets & Bhattis', items: ['Bhatti for halwai', 'Mithai counters', 'Khoya pans']},
    ],
  },
  {
    slug: 'ovens',
    name: 'Ovens',
    icon: CakeSlice,
    blurb: 'Convection, deck, rotary, combi ovens.',
    subgroups: [
      {title: 'Convection', items: ['Tabletop', 'Floor-standing', 'Combi']},
      {title: 'Deck Ovens', items: ['Single-deck', 'Double-deck', 'Stone hearth']},
      {title: 'Bakery', items: ['Rotary rack', 'Proofers', 'Dough sheeters']},
    ],
  },
  {
    slug: 'deep-fryers',
    name: 'Deep Fryers',
    icon: Soup,
    blurb: 'Single-tank, twin-tank, continuous, oil-management.',
    subgroups: [
      {title: 'By Tank', items: ['Single-tank', 'Twin-tank', 'Continuous']},
      {title: 'Specialty', items: ['Pressure fryers', 'Oil filtration', 'Donut fryers']},
    ],
  },
  {
    slug: 'food-prep',
    name: 'Food Prep Equipment',
    icon: CookingPot,
    blurb: 'Mixers, grinders, mincers, dough mixers, food processors.',
    subgroups: [
      {title: 'Mixers', items: ['Planetary', 'Spiral dough', 'Hand-held']},
      {title: 'Cutting', items: ['Slicers', 'Mincers', 'Vegetable cutters']},
      {title: 'Grinders', items: ['Wet grinders', 'Masala grinders', 'Meat grinders']},
    ],
  },
  {
    slug: 'work-tables',
    name: 'Work Tables',
    icon: Layers,
    blurb: 'Stainless steel prep tables in every common size.',
    subgroups: [
      {title: 'Standard', items: ['Open tables', 'Tables with undershelf', 'Tables with drawers']},
      {title: 'Specialty', items: ['Sink + table combos', 'Heated work tops', 'Mobile prep']},
    ],
  },
  {
    slug: 'storage',
    name: 'Storage',
    icon: Boxes,
    blurb: 'SS racks, wall shelves, lockers, ingredient bins.',
    subgroups: [
      {title: 'Shelving', items: ['Floor racks', 'Wall shelves', 'Pot racks']},
      {title: 'Storage', items: ['Ingredient bins', 'Lockers', 'Mobile dunnage']},
    ],
  },
  {
    slug: 'sinks-plumbing',
    name: 'Sinks & Plumbing',
    icon: Droplets,
    blurb: 'Wash sinks, scullery, pre-rinse spray, drainage.',
    subgroups: [
      {title: 'Sinks', items: ['Single bowl', 'Two bowl', 'Three bowl', 'Pot sinks']},
      {title: 'Plumbing', items: ['Pre-rinse spray', 'Hose reels', 'Floor drains']},
    ],
  },
  {
    slug: 'dishwashing',
    name: 'Dishwashing',
    icon: Sparkles,
    blurb: 'Undercounter, hood-type, conveyor, glass + pot washers.',
    subgroups: [
      {title: 'Dishwashers', items: ['Undercounter', 'Hood-type', 'Conveyor']},
      {title: 'Specialty', items: ['Glass washers', 'Pot washers', 'Soaking sinks']},
    ],
  },
  {
    slug: 'service-display',
    name: 'Service & Display',
    icon: Utensils,
    blurb: 'Bain marie, hot cases, cold display, salad bars.',
    subgroups: [
      {title: 'Hot Service', items: ['Bain marie', 'Hot cases', 'Carving stations']},
      {title: 'Cold Service', items: ['Salad bars', 'Cold cases', 'Sweet displays']},
    ],
  },
  {
    slug: 'coffee-espresso',
    name: 'Coffee & Espresso',
    icon: Coffee,
    blurb: 'Espresso machines, grinders, batch brewers.',
    subgroups: [
      {title: 'Espresso', items: ['Single-group', 'Two-group', 'Three-group']},
      {title: 'Brewers', items: ['Batch brewers', 'Pour-over', 'Decanters']},
      {title: 'Grinders', items: ['On-demand', 'Doser', 'Bulk']},
    ],
  },
  {
    slug: 'bar-equipment',
    name: 'Bar Equipment',
    icon: Wine,
    blurb: 'Back-bar coolers, ice machines, blenders, glass washers.',
    subgroups: [
      {title: 'Refrigeration', items: ['Back-bar coolers', 'Bottle coolers', 'Ice bins']},
      {title: 'Prep', items: ['Blenders', 'Juicers', 'Cocktail stations']},
      {title: 'Cleaning', items: ['Glass washers', 'Speed rails', 'Bar mats']},
    ],
  },
];

/** Quick lookup by slug. */
export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);
