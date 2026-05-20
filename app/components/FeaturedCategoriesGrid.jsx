import {Link} from 'react-router';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {categories} from '~/lib/mock/categories';

/**
 * 14-tile Apple-style category grid. Compact white cards with a soft
 * icon chip, the category name, one-line procurement cue, and a tiny
 * lead-time / count signal in the corner — no mesh, no bento, no
 * colour-blocked tiles. The list reads like an Apple Store category
 * tray rather than a marketing collage.
 *
 * Lead-time signals are derived from the category blurb keywords so
 * the chips feel earned rather than decorative. Items not matched
 * fall through to a neutral "Spec'd to order" label.
 */

function leadSignalFor(slug) {
  // Quick lookup so the chips read consistently across builds.
  const MAP = {
    'refrigeration':         '7–21d',
    'ventilation-exhaust':   '14–21d',
    'cooking-ranges':        '7–21d',
    'indian-cooking':        '14–21d',
    'ovens':                 '14–21d',
    'deep-fryers':           '10–14d',
    'food-prep':             '7–14d',
    'work-tables':           '5–7d · stock',
    'storage':               '5–7d · stock',
    'sinks-plumbing':        '7–10d',
    'dishwashing':           '10–21d',
    'service-display':       '10–14d',
    'coffee-espresso':       '7–14d',
    'bar-equipment':         '7–14d',
  };
  return MAP[slug] ?? 'Spec\'d to order';
}

export function FeaturedCategoriesGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-20">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3 md:mb-10">
        <div>
          <span className="apple-eyebrow">Shop the catalog</span>
          <h2
            className="mt-3 text-3xl font-semibold tracking-tight md:text-[40px]"
            style={{color: 'var(--ks-ink)'}}
          >
            14 categories. One procurement workspace.
          </h2>
          <p
            className="mt-3 max-w-2xl text-[15px] leading-relaxed"
            style={{color: 'var(--ks-ink-2)'}}
          >
            Every category lists dimensions, capacity, power load, lead
            time, and GST-ready pricing — built so you can compare without
            calling a vendor.
          </p>
        </div>
        <Link
          to="/collections/all"
          prefetch="intent"
          className="hidden items-center gap-1 text-[13px] font-medium md:inline-flex"
          style={{color: 'var(--ks-blue)'}}
        >
          Browse all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {categories.map((c) => {
          const Icon = c.icon;
          const signal = leadSignalFor(c.slug);
          return (
            <li key={c.slug}>
              <Link
                to={`/collections/${c.slug}`}
                prefetch="intent"
                className="group flex h-full flex-col rounded-[var(--ks-radius-md)] p-4 transition-all duration-150"
                style={{
                  background: 'var(--ks-card-solid)',
                  border: '1px solid var(--ks-line-soft)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{
                      background: '#f0f0f3',
                    }}
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
                  className="mt-4 text-[14px] font-semibold leading-snug"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {c.name}
                </div>
                <p
                  className="mt-1.5 line-clamp-2 text-[12px] leading-snug"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  {c.blurb}
                </p>

                <div
                  className="mt-auto pt-4 text-[10px] font-medium uppercase tracking-[0.08em]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  Lead time · {signal}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
