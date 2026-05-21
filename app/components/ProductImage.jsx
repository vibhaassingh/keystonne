import {useState} from 'react';
import {Package, Images, FileText, Box, Video} from 'lucide-react';
import {categoryBySlug} from '~/lib/mock/categories';
import {
  getProductMedia,
  getProductImageCount,
  getProductHeroImage,
} from '~/lib/mock/media';
import {ImageWithFallback} from '~/components/ImageWithFallback';
import {cn} from '~/lib/utils/cn';

/**
 * Product image component family.
 *
 *   <ProductImage product={p} variant="card" />     // single hero shot
 *                                  variant="thumb"  // small thumbnail
 *                                  variant="gallery"// main + role thumbs
 *
 * All variants share the same designed fallback: a calm tinted well +
 * the product's category Lucide icon + a faint blueprint grid backdrop
 * that signals "spec sheet" rather than "loading…". The Phase 1 brief
 * forbids stock photos that imply specific brands; until real product
 * shots arrive, the fallback IS the visual identity for the catalog.
 *
 * Variant matrix:
 *   card     — used in ProductCard / FeaturedRow / collection grid.
 *              4:3 aspect, image-count pill + media badges in corners.
 *   thumb    — used in WorksWithRow / compare / cart drawer / dashboard
 *              deal cards. 1:1 aspect, no badges.
 *   gallery  — used on the PDP. Renders a main image with a thumbnail
 *              rail of role-tagged shots underneath.
 */
export function ProductImage({product, variant = 'card', priority = false}) {
  const cat = categoryBySlug[product.category];
  const Icon = cat?.icon ?? Package;
  const hero = getProductHeroImage(product.slug);
  const imageCount = getProductImageCount(product.slug);
  const media = getProductMedia(product.slug);

  const fallback = <ProductFallback product={product} Icon={Icon} variant={variant} />;

  if (variant === 'gallery') {
    return <ProductGallery product={product} fallback={fallback} priority={priority} />;
  }

  const aspect = variant === 'thumb' ? '1 / 1' : '4 / 3';

  return (
    <div className="product-image-frame relative">
      <ImageWithFallback
        src={hero?.src}
        alt={hero?.alt ?? `${product.name} — product image`}
        fallback={fallback}
        aspect={aspect}
        fit="contain"
        priority={priority}
      />

      {variant === 'card' && imageCount > 1 && (
        <span className="image-count-pill">
          <Images className="h-3 w-3" strokeWidth={1.8} />
          {imageCount}
        </span>
      )}

      {variant === 'card' && (
        <MediaBadges
          hasSpecSheet={media.hasSpecSheet}
          hasCAD={media.hasCAD}
          hasVideo={media.hasVideo}
        />
      )}
    </div>
  );
}

/* ── Gallery — PDP main + thumbnail rail ──────────────────────── */

function ProductGallery({product, fallback, priority}) {
  const media = getProductMedia(product.slug);
  const [activeIdx, setActiveIdx] = useState(0);
  const images = media.images?.length ? media.images : [null];
  const active = images[activeIdx];

  return (
    <div className="pdp-gallery">
      <ImageWithFallback
        src={active?.src}
        alt={active?.alt ?? `${product.name} — gallery image ${activeIdx + 1}`}
        fallback={fallback}
        aspect="4 / 3"
        fit="contain"
        priority={priority}
        rounded="rounded-[var(--ks-radius-lg)]"
      />

      {images.length > 1 && (
        <ul className="pdp-thumb-rail">
          {images.map((img, i) => (
            <li key={img?.src ?? `thumb-${i}`}>
              <button
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`Show image ${i + 1} of ${images.length}${img?.role ? ` (${img.role})` : ''}`}
                aria-pressed={i === activeIdx}
                className={cn(
                  'pdp-thumb',
                  i === activeIdx && 'is-active',
                )}
              >
                <ImageWithFallback
                  src={img?.src}
                  alt=""
                  fallback={
                    <ProductFallback product={product} Icon={categoryBySlug[product.category]?.icon ?? Package} variant="thumb" />
                  }
                  aspect="1 / 1"
                  fit="contain"
                  rounded="rounded-md"
                  frameClassName="border-none bg-transparent"
                />
                {img?.role && (
                  <span className="pdp-thumb-label">{img.role}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Media badges — corner chips on card variant ─────────────── */

function MediaBadges({hasSpecSheet, hasCAD, hasVideo}) {
  if (!hasSpecSheet && !hasCAD && !hasVideo) return null;
  return (
    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
      {hasVideo && (
        <Badge>
          <Video className="h-2.5 w-2.5" strokeWidth={2} />
          Video
        </Badge>
      )}
      {hasSpecSheet && (
        <Badge>
          <FileText className="h-2.5 w-2.5" strokeWidth={2} />
          Spec sheet
        </Badge>
      )}
      {hasCAD && (
        <Badge>
          <Box className="h-2.5 w-2.5" strokeWidth={2} />
          CAD
        </Badge>
      )}
    </div>
  );
}

function Badge({children}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        color: 'var(--ks-ink-2)',
        border: '1px solid var(--ks-line-soft)',
        backdropFilter: 'saturate(180%) blur(8px)',
        WebkitBackdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      {children}
    </span>
  );
}

/* ── Designed fallback — Lucide icon on blueprint backdrop ────── */

function ProductFallback({product, Icon, variant}) {
  const accent = product.accent ?? '#1d1d1f';
  const iconSize =
    variant === 'thumb' ? 'h-7 w-7' : variant === 'gallery' ? 'h-24 w-24' : 'h-14 w-14';

  return (
    <div className="relative h-full w-full">
      {/* Blueprint backdrop — extremely subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Soft accent tint behind the icon — drawn from product.accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 60% at 50% 55%, ${hexToRgba(accent, 0.06)} 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <Icon
          className={iconSize}
          strokeWidth={1.4}
          style={{color: 'var(--ks-ink-2)'}}
        />
      </div>
    </div>
  );
}

function hexToRgba(hex, alpha) {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map((c) => c + c).join('') : v, 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
