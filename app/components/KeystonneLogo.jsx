import {Link} from 'react-router';
import {cn} from '~/lib/utils/cn';

/**
 * Brand-aware logo lockup. White-fill SVGs, so always render on a dark
 * surface (ink #0B0F14 or brand-primary).
 *
 * variant:
 *   "wordmark" (default) — full KEYSTONNE® wordmark, used in the header
 *   "monogram"           — "K" + ®, compact contexts
 *   "mark"               — bare "K", loading / watermarks
 */
export function KeystonneLogo({
  variant = 'wordmark',
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

  const img = (
    <img
      src={sources[variant]}
      alt=""
      className={cn(heights[variant], 'w-auto select-none', className)}
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
