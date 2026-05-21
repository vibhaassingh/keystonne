import {useState, useEffect} from 'react';
import {cn} from '~/lib/utils/cn';

/**
 * Universal image with graceful fallback.
 *
 * Phase 1 of the image-intensive catalog pass — most real .webp assets
 * don't exist yet, so the registry in `app/lib/mock/media.js` names
 * paths that may not resolve. We can't rely on `<img onError>` alone
 * because some SPA hosts (notably Vercel) serve the SPA index.html as
 * a 200 fallback for unknown static paths, which leaves the `<img>`
 * stuck in a perpetual loading state without firing onError.
 *
 * Solution: preflight the URL with `new Image()` and only mount the
 * real `<img>` once it resolves. If it doesn't, we render the fallback
 * (a Lucide-icon-on-blueprint composition supplied by ProductImage or
 * CategoryImage) directly. The preflight is async but the reserved
 * frame uses `aspect-ratio` so there's no CLS during the check.
 *
 * Layout safety:
 *   - `aspect` (default 4/3) sets `aspect-ratio` on the frame so the
 *     space is reserved before the image resolves.
 *   - `fit` ('contain' | 'cover') controls object-fit. Equipment shots
 *     usually want `contain` to keep proportions; category / context
 *     shots want `cover` to fill the frame.
 *   - `priority` flips loading="eager" (use only for above-fold images).
 *
 * Accessibility:
 *   - `alt` is required when src is set. For purely decorative usage
 *     pass `alt=""`.
 */
export function ImageWithFallback({
  src,
  alt = '',
  fallback,
  aspect = '4 / 3',
  fit = 'contain',
  priority = false,
  className,
  frameClassName,
  rounded = 'rounded-[var(--ks-radius-md)]',
  ...rest
}) {
  // 'pending' until the preflight resolves; 'ok' if it loaded, 'fail'
  // if it errored or src is missing. The fallback is shown for both
  // 'pending' (so users see a designed placeholder during the check)
  // and 'fail' (so a broken image never appears).
  const [state, setState] = useState(src ? 'pending' : 'fail');

  useEffect(() => {
    if (!src) {
      setState('fail');
      return undefined;
    }
    setState('pending');
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      // Reject SPA index.html being served as a 200 fallback —
      // a valid image has positive natural dimensions.
      if (cancelled) return;
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setState('ok');
      } else {
        setState('fail');
      }
    };
    img.onerror = () => {
      if (!cancelled) setState('fail');
    };
    img.src = src;
    return () => {
      cancelled = true;
      // Cancel decoding by clearing src so the browser frees the
      // pending request.
      img.src = '';
    };
  }, [src]);

  const showImage = state === 'ok';

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        rounded,
        frameClassName,
      )}
      style={{
        aspectRatio: aspect,
        background: 'var(--ks-card-tint)',
        border: '1px solid var(--ks-line-soft)',
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('h-full w-full', className)}
          style={{
            objectFit: fit,
            // Equipment cutouts breathe with a little padding inside
            // the well; context shots fill edge-to-edge.
            padding: fit === 'contain' ? '8%' : 0,
          }}
          {...rest}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {fallback}
        </div>
      )}
    </div>
  );
}
