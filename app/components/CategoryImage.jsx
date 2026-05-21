import {Package} from 'lucide-react';
import {categoryBySlug} from '~/lib/mock/categories';
import {getCategoryMedia} from '~/lib/mock/media';
import {ImageWithFallback} from '~/components/ImageWithFallback';

/**
 * Category image — cover-fit context shot used by the home category
 * grid, mega-nav flyout, station tiles, and the /collections/:handle
 * landing hero. Fallback: a calm gradient block with the category's
 * Lucide icon, which is the visual identity the category cards
 * already used pre-image system. So the fallback feels intentional,
 * not "asset not found".
 *
 * Variants:
 *   tile  — used on the home featured-categories grid (16:10)
 *   hero  — used at the top of /collections/:handle landing (16:7)
 *   small — used in mega-nav flyouts and supporting modules (1:1)
 */
export function CategoryImage({slug, variant = 'tile', priority = false}) {
  const cat = categoryBySlug[slug];
  if (!cat) return null;
  const media = getCategoryMedia(slug);
  const Icon = cat.icon ?? Package;

  const aspect =
    variant === 'hero' ? '16 / 7' : variant === 'small' ? '1 / 1' : '16 / 10';
  const src = variant === 'hero' ? media.heroImage ?? media.image : media.image;
  const alt = media.imageAlt ?? `${cat.name} category — kitchen context`;

  const accent = cat.accent ?? '#1d1d1f';

  return (
    <div className="category-image-tile">
      <ImageWithFallback
        src={src}
        alt={alt}
        aspect={aspect}
        fit="cover"
        priority={priority}
        rounded="rounded-[var(--ks-radius-lg)]"
        fallback={
          <div className="relative h-full w-full overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(accent, 0.12)} 0%, ${hexToRgba(accent, 0.02)} 100%), var(--ks-card-tint)`,
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <Icon
                className={variant === 'hero' ? 'h-24 w-24' : variant === 'small' ? 'h-8 w-8' : 'h-16 w-16'}
                strokeWidth={1.2}
                style={{color: 'var(--ks-ink-2)'}}
              />
            </div>
            {variant !== 'small' && (
              <div
                className="absolute bottom-3 left-4 text-[11px] font-medium uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                {cat.name}
              </div>
            )}
          </div>
        }
      />
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
