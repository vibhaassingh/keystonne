import {Link} from 'react-router';
import {ArrowRight, Wand2, Handshake, Layers} from 'lucide-react';

/**
 * Sprint 2 placeholder home. The chrome (announcement bar, header, mega nav,
 * footer) wraps this page in PageLayout. Sprint 3 fills in HeroCarousel,
 * "Build my kitchen" input, TrustStrip, FeaturedCategoriesGrid, etc.
 */

export const meta = () => [
  {title: 'Keystonne — Commercial Kitchen Procurement for India'},
  {
    name: 'description',
    content:
      'Catalog, spec, quote, and source commercial kitchen equipment in India. For restaurants, hotels, cloud kitchens, and institutions.',
  },
];

export default function Homepage() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-16 text-center md:py-24">
      <span className="inline-block rounded-full bg-brand-primary-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
        India · Commercial kitchens
      </span>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink md:text-5xl md:leading-[1.05]">
        Source every piece of your kitchen, with a plan that adds up.
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 md:text-lg">
        Restaurants, hotels, cloud kitchens, institutions — Keystonne brings
        the catalog, the AI kitchen planner, and India&apos;s leading
        consultant network into one workspace.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/kitchen-planner"
          prefetch="intent"
          className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-white hover:bg-brand-accent-hover"
        >
          <Wand2 className="h-4 w-4" />
          Build my kitchen
        </Link>
        <Link
          to="/collections/refrigeration"
          prefetch="intent"
          className="inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
        >
          Browse the catalog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        <Placeholder
          icon={Layers}
          eyebrow="Storefront"
          title="14 commercial-kitchen categories"
          body="Refrigeration, cooking ranges, ventilation, dishwashing, smallwares — sourced and ready to spec."
        />
        <Placeholder
          icon={Wand2}
          eyebrow="AI"
          title="Build my kitchen wizard"
          body="Describe your venture; get a category-grouped equipment plan and a single-click quote request."
        />
        <Placeholder
          icon={Handshake}
          eyebrow="Partners"
          title="A real commission network"
          body="Consultants, chefs, designers, and procurement teams earn transparently on every spec they win."
        />
      </div>

      <p className="mt-12 text-[12px] uppercase tracking-wider text-gray-500">
        Phase 1 demo — homepage gets its hero, featured rows, and category
        grid in Sprint 3.
      </p>
    </section>
  );
}

function Placeholder({icon: Icon, eyebrow, title, body}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 text-left">
      <Icon className="h-5 w-5 text-brand-accent" />
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {eyebrow}
      </div>
      <h3 className="mt-1 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
    </div>
  );
}
