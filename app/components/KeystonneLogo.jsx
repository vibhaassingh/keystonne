import {Link} from 'react-router';
import {cn} from '~/lib/utils/cn';

/**
 * Brand-aware logo lockup.
 *
 * The Keystonne SVGs are authored as white-fill assets. That works on
 * dark surfaces directly (tone="light"); on the new Apple-inspired light
 * surfaces (tone="dark") we render them as graphite via a CSS filter —
 * `brightness(0)` collapses white to black, then a touch of contrast
 * dial-back keeps it from feeling harsh against an off-white nav. This
 * lets the redesigned light header reuse the same source assets without
 * shipping new dark-variant SVGs.
 *
 * variant:
 *   "wordmark" (default) — full KEYSTONNE® wordmark, used in the header
 *   "monogram"           — "K" + ®, compact contexts
 *   "mark"               — bare "K", loading / watermarks
 *
 * tone:
 *   "light" (default)    — white SVG; pair with dark surfaces
 *   "dark"               — filter-tinted graphite; pair with light surfaces
 */
export function KeystonneLogo({
  variant = 'wordmark',
  tone = 'light',
  className,
  href = '/',
  ariaLabel = 'Keystonne — commercial kitchen procurement',
}) {
  const sources = {
    wordmark: '/brand/keystonne-wordmark.svg',
    monogram: '/brand/keystonne-monogram.svg',
    mark: '/brand/keystonne-monogram-mark.svg',
  };

  const heights = {
    wordmark: 'h-7 md:h-8',
    monogram: 'h-7 md:h-9',
    mark: 'h-6 md:h-7',
  };

  // brightness(0) → pure black; opacity dial-back softens to graphite-ish.
  const toneStyle =
    tone === 'dark'
      ? {filter: 'brightness(0)', opacity: 0.88}
      : undefined;

  const img = (
    <img
      src={sources[variant]}
      alt=""
      className={cn(heights[variant], 'w-auto select-none', className)}
      style={toneStyle}
      draggable={false}
    />
  );

  if (href === null) return img;

  return (
    <Link
      to={href}
      aria-label={ariaLabel}
      prefetch="intent"
      className="inline-flex items-center"
    >
      {img}
    </Link>
  );
}
