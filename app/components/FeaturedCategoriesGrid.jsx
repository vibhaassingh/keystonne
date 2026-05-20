import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import {categories} from '~/lib/mock/categories';

/**
 * 14-tile grid showing every catalog category. Each tile is a soft
 * brand-coloured panel with the Lucide icon, the category name, and
 * a "Shop now" affordance. No stock photography (CLAUDE.md §4).
 *
 * Tiles cycle through a small palette of brand-aligned accents so the
 * grid reads as a varied catalog without resorting to product photos.
 */

const PALETTE = [
  '#0E3B6A', // brand-primary
  '#0F766E', // teal-700
  '#9A3412', // orange-800
  '#1E40AF', // blue-800
  '#854D0E', // amber-800
  '#0E7490', // cyan-700
  '#5B21B6', // purple-800
  '#0F172A', // slate-900
  '#7C2D12', // orange-900
  '#155E75', // cyan-800
  '#1F2937', // gray-800
  '#0B2E55', // brand-primary-700
  '#047857', // emerald-700
  '#1D4ED8', // blue-700
];

export function FeaturedCategoriesGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:py-14">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
            Shop the catalog
          </span>
          <h2 className="mt-1 text-2xl font-semibold text-ink md:text-3xl">
            Featured categories
          </h2>
        </div>
        <Link
          to="/collections/all"
          prefetch="intent"
          className="hidden items-center gap-1 text-sm font-semibold text-brand-primary hover:underline md:inline-flex"
        >
          Browse all 14 categories <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((c, i) => {
          const Icon = c.icon;
          const bg = PALETTE[i % PALETTE.length];
          return (
            <li key={c.slug}>
              <Link
                to={`/collections/${c.slug}`}
                prefetch="intent"
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                <div
                  className="grid aspect-[5/3] place-items-center"
                  style={{background: `linear-gradient(135deg, ${bg}, ${shade(bg, -18)})`}}
                >
                  <Icon className="h-9 w-9 text-white/95 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <span className="text-[13px] font-semibold leading-snug text-ink">
                    {c.name}
                  </span>
                  <span className="line-clamp-2 text-[11px] text-gray-500">
                    {c.blurb}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Lighten / darken a hex color by amount (positive = lighter, negative = darker). */
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
