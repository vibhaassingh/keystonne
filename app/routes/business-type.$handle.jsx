import {Link, useParams} from 'react-router';
import {
  ArrowRight, ChevronRight, Wand2, MessageCircle, Quote, ArrowUpRight,
} from 'lucide-react';
import {businessTypeBySlug, businessTypes} from '~/lib/mock/businessTypes';
import {categoryBySlug} from '~/lib/mock/categories';
import {productBySlug} from '~/lib/mock/products';
import {ProductCard} from '~/components/ProductCard';
import {RequestQuoteCTA} from '~/components/RequestQuoteCTA';
import {cn} from '~/lib/utils/cn';

/**
 * Templated landing page for every business type Keystonne sells to.
 * Driven by `app/lib/mock/businessTypes.js`. The 14 entries are locked
 * by CLAUDE.md §6 — the page handles unknown slugs by falling back to
 * the new-venture entry.
 */

export const meta = ({params}) => {
  const b = businessTypeBySlug[params.handle];
  const name = b?.name ?? 'Business type';
  return [
    {title: `${name} kitchens — Keystonne`},
    {name: 'description', content: b?.tagline ?? 'Commercial kitchen equipment for India.'},
  ];
};

export default function BusinessTypePage() {
  const params = useParams();
  const handle = params.handle;
  const b = businessTypeBySlug[handle];

  if (!b) return <UnknownVenture />;

  const cats = b.suggestedCategories
    .map((slug) => categoryBySlug[slug])
    .filter(Boolean);
  const products = b.suggestedProducts
    .map((slug) => productBySlug[slug])
    .filter(Boolean);

  const Icon = b.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto max-w-[1400px] px-4 pt-8 md:px-6">
        <div
          className="relative overflow-hidden rounded-3xl text-white mesh-indigo"
          style={{boxShadow: '0 30px 80px -30px rgba(10,13,20,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'}}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl" />
          </div>

          <div className="relative grid gap-6 px-6 py-12 md:grid-cols-12 md:items-center md:px-14 md:py-20">
            <div className="md:col-span-8">
              <Breadcrumbs name={b.name} />

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
                <Icon className="h-3.5 w-3.5" />
                {b.hero.eyebrow}
              </div>

              <h1 className="mt-5 max-w-3xl text-[36px] font-semibold leading-[1.04] tracking-tight md:text-[56px]">
                {b.hero.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
                {b.hero.subhead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={`/kitchen-planner?venture=${b.slug}`}
                  prefetch="intent"
                  className="inline-flex items-center gap-2 rounded-xl btn-accent px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                >
                  <Wand2 className="h-4 w-4" />
                  {b.cta}
                  <ArrowRight className="h-4 w-4 opacity-80" />
                </Link>
                <Link
                  to="/quote"
                  prefetch="intent"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to a specialist
                </Link>
              </div>
            </div>

            {/* Stat panel */}
            <aside className="md:col-span-4">
              <div
                className="rounded-2xl border border-white/25 bg-white/12 p-6 backdrop-blur-2xl"
                style={{boxShadow: '0 20px 50px -20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.28)'}}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                  At a glance
                </span>
                <div className="tabular mt-2 text-3xl font-semibold text-white md:text-4xl">
                  {b.name}
                </div>
                <p className="mt-2 text-sm text-white/75">{b.tagline}</p>

                <div className="mt-5 rounded-xl bg-black/20 p-3 ring-1 ring-white/10">
                  <div className="text-[11px] uppercase tracking-wider text-white/60">
                    Categories spec'd most
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cats.map((c) => (
                      <span key={c.slug} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/90">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <header className="mb-8 max-w-xl">
          <span className="eyebrow">What operators actually fight</span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {b.slug === 'new-venture'
              ? 'The three problems first-time founders hit hardest.'
              : `The three problems we hear from ${b.name.toLowerCase()} operators.`}
          </h2>
        </header>

        <ul className="grid gap-4 md:grid-cols-3">
          {b.pains.map((p, i) => (
            <li key={p.title} className="card p-6">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-8 w-8 place-items-center rounded-lg text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
                    boxShadow: '0 6px 16px -8px rgba(67,56,202,0.5)',
                  }}
                >
                  <span className="tabular text-[12px] font-semibold">0{i + 1}</span>
                </div>
                <h3 className="text-base font-semibold text-ink">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Suggested categories */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 md:px-6 md:pb-16">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">Equipment for the spec</span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Categories you'll need first.
            </h2>
          </div>
        </header>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.slug}>
                <Link
                  to={`/collections/${c.slug}`}
                  prefetch="intent"
                  className="card card-hover group flex h-full flex-col gap-3 p-4"
                >
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl text-white"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
                      boxShadow: '0 6px 16px -8px rgba(67,56,202,0.5)',
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-ink">
                      {c.name}
                    </div>
                    <div className="mt-1 line-clamp-2 text-[11px] text-gray-500">
                      {c.blurb}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Shop <ArrowUpRight className="h-3 w-3" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Suggested products */}
      {products.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-12 md:px-6 md:pb-16">
          <header className="mb-6">
            <span className="eyebrow">
              {b.slug === 'new-venture'
                ? 'Common starter kit'
                : `Hand-picked for ${b.name.toLowerCase()}`}
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Start with these.
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Testimonial — only if defined */}
      {b.testimonial && (
        <section className="mx-auto max-w-[1400px] px-4 pb-12 md:px-6 md:pb-16">
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-14 md:py-16"
            style={{
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.10), rgba(245,158,11,0.08)), white',
              border: '1px solid rgba(10,13,20,0.06)',
              boxShadow: 'var(--shadow-glass)',
            }}
          >
            <Quote className="h-10 w-10 text-brand-primary/30" />
            <blockquote className="mt-4 max-w-3xl text-xl font-medium leading-snug text-ink md:text-2xl">
              "{b.testimonial.quote}"
            </blockquote>
            <footer className="mt-6 text-sm text-gray-600">
              <span className="font-semibold text-ink">{b.testimonial.name}</span>
              {' — '}{b.testimonial.role}
              {b.testimonial.location && (
                <>, <span className="text-gray-500">{b.testimonial.location}</span></>
              )}
            </footer>
          </div>
        </section>
      )}

      {/* Cross-link to other types */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 md:px-6 md:pb-16">
        <header className="mb-5">
          <span className="eyebrow">Or browse by venture</span>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Building something else? We cover that too.
          </h2>
        </header>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {businessTypes
            .filter((bt) => bt.slug !== b.slug)
            .map((bt) => {
              const IconBt = bt.icon;
              return (
                <li key={bt.slug}>
                  <Link
                    to={`/business-type/${bt.slug}`}
                    prefetch="intent"
                    className={cn(
                      'flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 text-[13px] font-medium text-ink backdrop-blur transition-colors hover:border-brand-primary hover:text-brand-primary',
                      bt.slug === 'new-venture' && 'border-brand-accent/30 bg-brand-accent/5 text-brand-accent hover:border-brand-accent hover:text-brand-accent',
                    )}
                  >
                    <IconBt className="h-4 w-4" />
                    {bt.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>

      <RequestQuoteCTA />
    </>
  );
}

function Breadcrumbs({name}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[12px] text-white/60">
      <Link to="/" className="hover:text-white">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-white/80">Build for…</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-white">{name}</span>
    </nav>
  );
}

/**
 * Unknown slug → fallback to the new-venture entry rather than a 404.
 * Per CLAUDE.md §6, "new-venture" is the universal "I don't know yet" path.
 */
function UnknownVenture() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-ink">
        We don't have a page for that venture yet.
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        But we work with operators in every commercial-kitchen format in
        India. Start with the AI planner — describe your venture and
        we'll suggest the right equipment.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/kitchen-planner"
          className="inline-flex items-center gap-1.5 rounded-xl btn-accent px-5 py-3 text-sm font-semibold"
        >
          Build my kitchen
        </Link>
        <Link
          to="/business-type/new-venture"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
        >
          I'm starting from scratch
        </Link>
      </div>
    </section>
  );
}
