/**
 * Static reference data for the partner programme — personas, commission
 * rates, tier rules, FAQ. Used by /partner, /partner/apply, and later by
 * the dashboard (Sprint 7-8). Numbers are invented but defensible for the
 * Indian commercial-kitchen market; no real brand references (CLAUDE.md §5).
 */

import {
  ChefHat, Briefcase, Building2, Lightbulb, Wrench, ShoppingBag,
} from 'lucide-react';

export const personas = [
  {
    slug: 'kitchen-consultant',
    name: 'Kitchen consultant',
    icon: Lightbulb,
    blurb: 'Independent specialists who design kitchens for restaurants, hotels, and institutions. The single biggest spec influence in the Indian market.',
    avgDealsPerYear: 18,
    typicalDealSize: '₹4–25 L',
  },
  {
    slug: 'chef',
    name: 'Executive / head chef',
    icon: ChefHat,
    blurb: 'You run the kitchen. You know what works and what fails. We pay you to surface that judgement.',
    avgDealsPerYear: 6,
    typicalDealSize: '₹3–18 L',
  },
  {
    slug: 'fnb-manager',
    name: 'F&B manager',
    icon: Briefcase,
    blurb: 'Hotel and resort F&B leaders running capex sign-off on multi-outlet builds.',
    avgDealsPerYear: 8,
    typicalDealSize: '₹15–80 L',
  },
  {
    slug: 'procurement',
    name: 'Facilities / procurement',
    icon: Building2,
    blurb: 'Institutional buyers — hospitals, schools, corporate campuses. Multi-year frame agreements.',
    avgDealsPerYear: 5,
    typicalDealSize: '₹20–100 L',
  },
  {
    slug: 'designer',
    name: 'Interior designer / architect',
    icon: ChefHat, // reuse — visually fine; could be Pencil
    blurb: 'Studios that design entire F&B spaces and need a kitchen partner that ships in their drawing\'s timeline.',
    avgDealsPerYear: 12,
    typicalDealSize: '₹8–50 L',
  },
  {
    slug: 'dealer-contractor',
    name: 'Dealer / service contractor',
    icon: Wrench,
    blurb: 'Equipment dealers and AMC contractors who refer projects upstream to Keystonne.',
    avgDealsPerYear: 22,
    typicalDealSize: '₹2–12 L',
  },
];

export const tiers = [
  {
    slug: 'bronze',
    name: 'Bronze',
    threshold: 0,
    thresholdLabel: 'Approved partner',
    commissionMultiplier: 1.0,
    perks: [
      'Public referral link + QR',
      'Deal registration + tracking',
      'Quarterly leaderboard',
    ],
  },
  {
    slug: 'silver',
    name: 'Silver',
    threshold: 10_00_000,
    thresholdLabel: '₹10L closed YTD',
    commissionMultiplier: 1.1,
    perks: [
      'All Bronze perks',
      '+10% commission uplift',
      'Co-branded quote PDFs',
      'Priority specialist support',
    ],
  },
  {
    slug: 'gold',
    name: 'Gold',
    threshold: 35_00_000,
    thresholdLabel: '₹35L closed YTD',
    commissionMultiplier: 1.2,
    perks: [
      'All Silver perks',
      '+20% commission uplift',
      'Early access to new categories',
      'Lead-routing from Keystonne inbound',
      'Vanity URL (keystonne.com/p/yourname)',
    ],
  },
  {
    slug: 'platinum',
    name: 'Platinum',
    threshold: null,
    thresholdLabel: 'Invite only',
    commissionMultiplier: 1.3,
    perks: [
      'All Gold perks',
      '+30% commission uplift',
      'Quarterly business review with our founders',
      'Co-marketing budget',
      'Annual partner summit',
    ],
  },
];

/**
 * Base commission rate per category. Final paid rate = base × tier multiplier.
 * Numbers are deliberately publishable — transparency is the entire point.
 */
export const commissionRates = [
  {category: 'Refrigeration',           rate: 6.0},
  {category: 'Ventilation & Exhaust',   rate: 6.0},
  {category: 'Cooking Ranges',          rate: 7.0},
  {category: 'Indian Cooking Equipment', rate: 7.0},
  {category: 'Ovens',                   rate: 6.0},
  {category: 'Deep Fryers',             rate: 6.0},
  {category: 'Food Prep Equipment',     rate: 8.0},
  {category: 'Work Tables',             rate: 4.0},
  {category: 'Storage',                 rate: 4.0},
  {category: 'Sinks & Plumbing',        rate: 4.0},
  {category: 'Dishwashing',             rate: 7.0},
  {category: 'Service & Display',       rate: 7.0},
  {category: 'Coffee & Espresso',       rate: 9.0},
  {category: 'Bar Equipment',           rate: 8.0},
];

export const howItWorks = [
  {
    n: 1,
    title: 'Apply',
    body: 'Nine-step application — KYC, persona, references, payout details. We review within 3 working days.',
  },
  {
    n: 2,
    title: 'Register deals',
    body: 'Log every project the moment you spec it. We lock attribution so two partners never compete over the same client.',
  },
  {
    n: 3,
    title: 'Quote together',
    body: 'Use our quote builder to assemble line items, share a co-branded PDF, and track open/accept events.',
  },
  {
    n: 4,
    title: 'Get paid',
    body: 'On installation completion, your commission moves from accrued → approved → paid. Median payout: 11 days.',
  },
];

export const faqs = [
  {
    q: 'How are commissions calculated?',
    a: 'Each catalog category has a published base rate (4-9%). Your tier (Bronze → Platinum) applies a multiplier (1.0× → 1.3×). The final rate is calculated on the catalog price net of GST. We share the line-item breakdown on every payout.',
  },
  {
    q: 'When do I get paid?',
    a: 'A commission accrues the day you register a deal that closes. It moves to "approved" once Keystonne dispatches the equipment. It moves to "paid" once installation is signed off — median 11 days from install. UPI and bank-transfer payouts are processed weekly.',
  },
  {
    q: 'How is TDS handled?',
    a: 'Statutory TDS (typically 10% under Section 194H) is deducted at source. We issue a Form 16A every quarter. If you\'re below the threshold or have a lower-deduction certificate, upload it once and we apply it automatically.',
  },
  {
    q: 'What if two partners register the same deal?',
    a: 'First-to-register wins, with a 30-day "protection window". If we detect a conflict, our partner-ops team adjudicates within 5 working days based on documented client interactions. The rules are public and identical for every partner.',
  },
  {
    q: 'Can I bring my own pricing?',
    a: 'No — our catalog price is the catalog price. This is the entire reason transparent commission programmes beat the kickback model: the buyer sees one price, you earn a known cut, no one negotiates on the side.',
  },
  {
    q: 'Do you charge a joining fee?',
    a: 'No. Applying, listing on the directory, registering deals, and using the quote builder is free for every approved partner. We only earn when you earn.',
  },
  {
    q: 'Can I lose my tier?',
    a: 'Tiers are calculated on a rolling 12-month basis. If your closed-sales volume drops below the threshold, you slip down a tier at the next quarterly review. Platinum status is reviewed annually and is invite-only.',
  },
  {
    q: 'What about ethics — am I obligated to recommend Keystonne?',
    a: 'No. We expect you to recommend the best fit for your client, full stop. If our spec isn\'t right, say so. Programmes that pressure recommendations don\'t survive contact with reality; this one doesn\'t do that.',
  },
];

/** The 9-step apply flow. Each step is rendered as its own panel in the form. */
export const applySteps = [
  {n: 1, label: 'Persona',     hint: 'Tell us how you\'ll work with Keystonne.'},
  {n: 2, label: 'Personal',    hint: 'Name, email, mobile, city.'},
  {n: 3, label: 'Business',    hint: 'Firm or self-employed — and how long.'},
  {n: 4, label: 'Tax',         hint: 'PAN required; GSTIN optional.'},
  {n: 5, label: 'Payout',      hint: 'UPI ID or bank account for commission payouts.'},
  {n: 6, label: 'Portfolio',   hint: 'Two recent projects so we can verify.'},
  {n: 7, label: 'Reference',   hint: 'Where you heard about us; who can vouch.'},
  {n: 8, label: 'Agreements',  hint: 'Commission programme + code of conduct.'},
  {n: 9, label: 'Review',      hint: 'Confirm everything looks right and submit.'},
];
