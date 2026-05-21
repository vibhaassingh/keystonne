import {useState} from 'react';
import {cn} from '~/lib/utils/cn';

/**
 * Universal image with graceful fallback.
 *
 * Phase 1 of the image-intensive catalog pass — most real .webp assets
 * don't exist yet, so the registry in `app/lib/mock/media.js` names
 * paths that may 404. This component renders the named src, listens for
 * the load error, and swaps to a designed fallback (passed via the
 * `fallback` prop, normally a Lucide icon on a neutral well) so the
 * surface stays intact instead of showing a broken-image glyph.
 *
 * Layout safety:
 *   - `aspect` (default 4/3) sets `aspect-ratio` on the frame so the
 *     space is reserved before the image loads — no CLS.
 *   - `fit` ('contain' | 'cover') controls object-fit. Equipment shots
 *     usually want `contain` to keep proportions; category / context
 *     shots want `cover` to fill the frame.
 *   - `priority` flips loading="eager" (use only for above-fold images).
 *
 * Accessibility:
 *   - `alt` is required when src is set. For purely decorative usage
 *     pass `alt=""` and add `role="presentation"`.
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
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

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
          onError={() => setErrored(true)}
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
