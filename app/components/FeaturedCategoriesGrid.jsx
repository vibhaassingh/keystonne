import {Link} from 'react-router';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {categories} from '~/lib/mock/categories';

/**
 * Bento-style grid of all 14 categories. Two featured tiles span wide
 * (first + ninth) and break up the rhythm; the rest are uniform. Glass
 * surfaces over coloured gradients give depth without using real photos.
 */

const PALETTE = [
  ['#4338CA', '#1E1B4B'], // indigo
  ['#0F766E', '#022C22'], // teal
  ['#B45309', '#451A03'], // amber
  ['#1D4ED8', '#0B2E55'], // blue
  ['#9333EA', '#3B0764'], // purple
  ['#0E7490', '#083344'], // cyan
  ['#DC2626', '#450A0A'], // red
  ['#475569', '#0F172A'], // slate
  ['#C2410C', '#431407'], // orange-700
  ['#0D9488', '#042F2E'], // teal-600
  ['#374151', '#0A0D14'], // gray-700
  ['#3730A3', '#1E1B4B'], // indigo-700
  ['#047857', '#022C22'], // emerald
  ['#1E40AF', '#1E1B4B'], // blue-800
];

export function FeaturedCategoriesGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Shop the catalog</span>
          <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
            14 categories. One quote.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-gray-600 md:text-base">
            Browse the catalog, or describe the kitchen you’re building and
            we’ll pull a spec across every category for you.
          </p>
        </div>
        <Link
          to="/collections/all"
          prefetch="intent"
          className="hidden items-center gap-1 text-sm font-semibold text-brand-primary hover:underline md:inline-flex"
        >
          Browse all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Bento grid: featured tiles span wider; rest are 1×1 */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => {
          const isFeatured = i === 0 || i === 7; // bento accents
          const [c1, c2] = PALETTE[i % PALETTE.length];
          const Icon = c.icon;
          return (
            <li
              key={c.slug}
              className={isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <Link
                to={`/collections/${c.slug}`}
                prefetch="intent"
                className="group relative block h-full overflow-hidden rounded-2xl"
                style={{
                  boxShadow:
                    '0 1px 2px rgba(10,13,20,0.06), 0 8px 24px -16px rgba(10,13,20,0.18)',
                }}
              >
                {/* Gradient backdrop */}
                <div
                  className="absolute inset-0"
                  style={{background: `linear-gradient(135deg, ${c1}, ${c2})`}}
                />
                {/* Floating orb */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl"
                  style={{background: c1}}
                />
                {/* Inner glass card */}
                <div className="relative flex h-full flex-col justify-between p-4 text-white md:p-5">
                  <div className="flex items-start justify-between">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur"
                      style={{boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)'}}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className={isFeatured ? 'mt-12' : 'mt-8'}>
                    <h3
                      className={`font-semibold leading-tight tracking-tight ${
                        isFeatured ? 'text-xl md:text-2xl' : 'text-base'
                      }`}
                    >
                      {c.name}
                    </h3>
                    {isFeatured && (
                      <p className="mt-2 line-clamp-2 text-[13px] text-white/75">
                        {c.blurb}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
