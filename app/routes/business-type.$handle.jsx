import {Link, useParams} from 'react-router';
import {
  ArrowRight, ChevronRight, MessageCircle, Sparkles, Wand2, Quote, ArrowUpRight,
} from 'lucide-react';
import {businessTypeBySlug, businessTypes} from '~/lib/mock/businessTypes';
import {categoryBySlug} from '~/lib/mock/categories';
import {productBySlug} from '~/lib/mock/products';
import {ProductCard} from '~/components/ProductCard';
import {RequestQuoteCTA} from '~/components/RequestQuoteCTA';
import {cn} from '~/lib/utils/cn';

/**
 * Apple-style "solution" page for each of the 14 locked business types
 * (CLAUDE.md §6 — slugs / names / IA do not change).
 *
 * Structure:
 *   1. Editorial hero — eyebrow + display headline + procurement-pain
 *      subhead + dual CTAs + a sample "at a glance" side panel
 *   2. Pain points — three premium cards with numbered chips
 *   3. AI planner band — a quiet pre-filled invite to the wizard
 *   4. Suggested categories — neutral Apple cards
 *   5. Suggested products — uses the updated FeaturedRow / ProductCard
 *   6. Cross-link to other ventures
 *   7. Sticky procurement strip
 *
 * Special-cased copy for `new-venture` per brief §10.
 */

export const meta = ({params}) => {
  const b = businessTypeBySlug[params.handle];
  const name = b?.name ?? 'Business type';
  return [
    {title: `${name} kitchens — Keystonne`},
    {
      name: 'description',
      content:
        b?.tagline ??
        'Commercial kitchen equipment specified for India.',
    },
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

  const isNewVenture = b.slug === 'new-venture';

  return (
    <>
      <Hero b={b} cats={cats} isNewVenture={isNewVenture} />
      <Pains b={b} isNewVenture={isNewVenture} />
      <PlannerBand b={b} isNewVenture={isNewVenture} />
      <Categories cats={cats} b={b} />
      {products.length > 0 && (
        <SuggestedProducts b={b} products={products} isNewVenture={isNewVenture} />
      )}
      {b.testimonial && <TestimonialPanel t={b.testimonial} />}
      <CrossLink current={b.slug} />
      <RequestQuoteCTA />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */

function Hero({b, cats, isNewVenture}) {
  const Icon = b.icon;

  // New-venture overrides per brief §10 — copy speaks to first-time
  // founders, secondary CTA points back to the wizard rather than the catalog.
  const eyebrow = isNewVenture
    ? 'For first-time founders'
    : b.hero.eyebrow;
  const headlineMain = isNewVenture
    ? 'Still shaping the concept?'
    : b.hero.headline;
  const headlineMuted = isNewVenture
    ? 'Start with the kitchen.'
    : null;
  const subhead = isNewVenture
    ? 'Tell us your menu, service model, city, and budget. Keystonne will turn it into a first equipment plan.'
    : b.hero.subhead;

  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-8 md:px-6 md:pt-12">
      <div className="apple-hero relative overflow-hidden px-6 py-12 md:px-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Breadcrumbs name={b.name} />

            <span className="apple-eyebrow mt-5">
              <Icon className="h-3 w-3" strokeWidth={1.7} />
              {eyebrow}
            </span>

            <h1 className="apple-display mt-4">
              {headlineMain}
              {headlineMuted && (
                <>
                  {' '}
                  <span style={{color: 'var(--ks-muted)'}}>
                    {headlineMuted}
                  </span>
                </>
              )}
            </h1>

            <p
              className="apple-subhead mt-5 max-w-xl"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {subhead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/kitchen-planner?venture=${b.slug}`}
                prefetch="intent"
                className="apple-button-primary"
              >
                <Wand2 className="h-4 w-4" />
                {b.cta}
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link
                to={isNewVenture ? '/collections/all' : '/quote'}
                prefetch="intent"
                className="apple-button-ghost"
              >
                {isNewVenture ? (
                  <>Browse the catalog</>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4" />
                    Talk to a specialist
                  </>
                )}
              </Link>
            </div>
          </div>

          {/* ── Sample stat panel — Apple-style "at a glance" card ── */}
          <aside className="md:col-span-5">
            <SamplePanel b={b} cats={cats} isNewVenture={isNewVenture} />
          </aside>
        </div>
      </div>
    </section>
  );
}

function SamplePanel({b, cats, isNewVenture}) {
  const Icon = b.icon;
  return (
    <div
      className="rounded-[var(--ks-radius-lg)] p-6"
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px solid var(--ks-line-soft)',
        boxShadow: 'var(--ks-shadow-card)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="apple-eyebrow">At a glance</span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{
            background: '#f0f0f3',
            color: 'var(--ks-ink)',
          }}
        >
          <Icon className="h-3 w-3" strokeWidth={1.7} />
          {b.name}
        </span>
      </div>

      <div
        className="mt-4 text-[22px] font-semibold leading-tight md:text-[24px]"
        style={{color: 'var(--ks-ink)'}}
      >
        {b.tagline}
      </div>

      <div
        className="mt-5 rounded-[var(--ks-radius-md)] p-4"
        style={{
          background: 'var(--ks-page-warm)',
          border: '1px solid var(--ks-line-soft)',
        }}
      >
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.10em]"
          style={{color: 'var(--ks-muted)'}}
        >
          Categories typically spec&apos;d
        </div>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {cats.slice(0, 6).map((c) => (
            <li
              key={c.slug}
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px]"
              style={{
                background: 'var(--ks-card-solid)',
                border: '1px solid var(--ks-line-soft)',
                color: 'var(--ks-ink-2)',
              }}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/kitchen-planner?venture=${b.slug}`}
        prefetch="intent"
        className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium"
        style={{color: 'var(--ks-blue)'}}
      >
        {isNewVenture
          ? 'Start with the AI planner'
          : `Plan a ${b.name.toLowerCase()} kitchen`}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

/* ── Pains ─────────────────────────────────────────────────────── */

function Pains({b, isNewVenture}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">What operators actually fight</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          {isNewVenture
            ? 'The three problems first-time founders hit hardest.'
            : `Three problems we hear from ${b.name.toLowerCase()} operators.`}
        </h2>
      </header>

      <ul className="grid gap-3 md:grid-cols-3">
        {b.pains.map((p, i) => (
          <li
            key={p.title}
            className="premium-card flex h-full flex-col gap-3 p-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="tabular grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold"
                style={{
                  background: 'var(--ks-ink)',
                  color: '#ffffff',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="text-[15px] font-semibold leading-snug"
                style={{color: 'var(--ks-ink)'}}
              >
                {p.title}
              </h3>
            </div>
            <p
              className="text-[13px] leading-relaxed"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {p.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Planner band ──────────────────────────────────────────────── */

function PlannerBand({b, isNewVenture}) {
  // Per-venture, plain-language seed string that pre-fills the planner.
  const seed = `${b.name} kitchen — ${b.tagline.toLowerCase().replace(/\.$/, '')}.`;
  const href = `/kitchen-planner?venture=${b.slug}&q=${encodeURIComponent(seed)}`;

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-8 md:px-6 md:py-12">
      <div className="premium-panel p-6 md:p-9">
        <div className="grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <span className="apple-eyebrow">
              <Sparkles className="h-3 w-3" style={{color: 'var(--ks-blue)'}} />
              AI Kitchen Planner
            </span>
            <h2
              className="mt-3 text-xl font-semibold tracking-tight md:text-2xl"
              style={{color: 'var(--ks-ink)'}}
            >
              {isNewVenture
                ? 'Describe what you’re building. We’ll plan the kitchen.'
                : `Plan the ${b.name.toLowerCase()} you’re building, in five questions.`}
            </h2>
            <p
              className="mt-2 max-w-xl text-[14px] leading-relaxed"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Cuisine, capacity, location, budget — anything the planner
              should know. You&apos;ll receive a station-grouped equipment
              plan and a first-pass capex estimate. The seed has been
              pre-filled for {isNewVenture ? 'a new venture' : `a ${b.name.toLowerCase()}`}.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              to={href}
              prefetch="intent"
              className="apple-button-primary"
            >
              <Wand2 className="h-4 w-4" />
              Launch the planner
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Categories ────────────────────────────────────────────────── */

function Categories({cats, b}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-7 max-w-2xl">
        <span className="apple-eyebrow">Equipment for the spec</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Categories you&apos;ll need first.
        </h2>
        <p
          className="mt-2 max-w-xl text-[14px] leading-relaxed"
          style={{color: 'var(--ks-ink-2)'}}
        >
          A {b.name.toLowerCase()} usually starts with {cats.length} categories
          on the spec sheet. Browse to compare; the planner will pull from
          the same catalog.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cats.map((c) => {
          const Icon = c.icon;
          return (
            <li key={c.slug}>
              <Link
                to={`/collections/${c.slug}`}
                prefetch="intent"
                className="group flex h-full flex-col rounded-[var(--ks-radius-md)] p-4 transition-colors"
                style={{
                  background: 'var(--ks-card-solid)',
                  border: '1px solid var(--ks-line-soft)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{background: '#f0f0f3'}}
                  >
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.6}
                      style={{color: 'var(--ks-ink)'}}
                    />
                  </div>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    style={{color: 'var(--ks-muted)'}}
                  />
                </div>
                <div
                  className="mt-3 text-[13px] font-semibold leading-snug"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {c.name}
                </div>
                <p
                  className="mt-1 line-clamp-2 text-[11px] leading-snug"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  {c.blurb}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── Suggested products row ────────────────────────────────────── */

function SuggestedProducts({b, products, isNewVenture}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-12">
      <header className="mb-7 max-w-2xl">
        <span className="apple-eyebrow">
          {isNewVenture
            ? 'Common starter kit'
            : `Hand-picked for ${b.name.toLowerCase()}`}
        </span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
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
  );
}

/* ── Testimonial ───────────────────────────────────────────────── */

function TestimonialPanel({t}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-12">
      <div className="premium-panel relative overflow-hidden p-8 md:p-14">
        <Quote
          className="h-10 w-10"
          strokeWidth={1.5}
          style={{color: 'var(--ks-line)'}}
        />
        <blockquote
          className="mt-4 max-w-3xl text-xl font-medium leading-snug md:text-2xl"
          style={{color: 'var(--ks-ink)'}}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <footer
          className="mt-6 text-sm"
          style={{color: 'var(--ks-ink-2)'}}
        >
          <span
            className="font-semibold"
            style={{color: 'var(--ks-ink)'}}
          >
            {t.name}
          </span>
          {' — '}
          {t.role}
          {t.location && (
            <>
              ,{' '}
              <span style={{color: 'var(--ks-muted)'}}>{t.location}</span>
            </>
          )}
        </footer>
      </div>
    </section>
  );
}

/* ── Cross-link ────────────────────────────────────────────────── */

function CrossLink({current}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <header className="mb-6 max-w-2xl">
        <span className="apple-eyebrow">Or browse by venture</span>
        <h2
          className="mt-3 text-xl font-semibold tracking-tight md:text-2xl"
          style={{color: 'var(--ks-ink)'}}
        >
          Building something else? We cover that too.
        </h2>
      </header>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {businessTypes
          .filter((bt) => bt.slug !== current)
          .map((bt) => {
            const Icon = bt.icon;
            const isNewVenture = bt.slug === 'new-venture';
            return (
              <li key={bt.slug}>
                <Link
                  to={`/business-type/${bt.slug}`}
                  prefetch="intent"
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors',
                  )}
                  style={{
                    background: isNewVenture
                      ? 'var(--ks-blue-soft)'
                      : 'var(--ks-card-solid)',
                    color: isNewVenture
                      ? 'var(--ks-blue)'
                      : 'var(--ks-ink-2)',
                    border: '1px solid ' + (isNewVenture ? 'rgba(0,113,227,0.18)' : 'var(--ks-line-soft)'),
                  }}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {bt.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

/* ── Bits ──────────────────────────────────────────────────────── */

function Breadcrumbs({name}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[12px]"
      style={{color: 'var(--ks-muted)'}}
    >
      <Link to="/" className="hover:underline">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <span>Build for…</span>
      <ChevronRight className="h-3 w-3" />
      <span style={{color: 'var(--ks-ink)'}}>{name}</span>
    </nav>
  );
}

function UnknownVenture() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1
        className="text-2xl font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        We don&apos;t have a page for that venture yet.
      </h1>
      <p
        className="mt-2 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Start with the AI planner — describe your venture and we&apos;ll
        suggest the right equipment.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/kitchen-planner"
          className="apple-button-primary"
        >
          Build my kitchen
        </Link>
        <Link
          to="/business-type/new-venture"
          className="apple-button-ghost"
        >
          I&apos;m starting from scratch
        </Link>
      </div>
    </section>
  );
}
