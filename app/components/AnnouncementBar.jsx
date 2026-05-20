import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import {BadgeCheck, Truck, FileCheck2, X} from 'lucide-react';

/**
 * Thin top bar above the header. Three trust pills on the left, partner CTA
 * on the right. Dismissible — preference persists in localStorage so it stays
 * out of the way once a buyer has acknowledged it.
 */
export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  // Hydrate dismissed state on mount. SSR renders the bar by default; this
  // prevents a flash where the bar disappears after JS loads if the user
  // had dismissed it previously.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem('keystonne:announcement-dismissed') === '1') {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  return (
    <div className="bg-ink text-white text-[12px] md:text-[13px] font-medium tabular">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-1.5">
        <ul className="hidden md:flex items-center gap-5 text-white/85">
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-brand-accent" />
            Trade pricing for verified businesses
          </li>
          <li className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-brand-accent" />
            Pan-India freight included
          </li>
          <li className="flex items-center gap-1.5">
            <FileCheck2 className="h-3.5 w-3.5 text-brand-accent" />
            GST invoice on every order
          </li>
        </ul>

        {/* Mobile: one compact line that summarises the trust strip. */}
        <span className="md:hidden text-white/85">
          Pan-India freight · GST invoice · Trade pricing
        </span>

        <div className="flex items-center gap-3">
          <Link
            to="/partner"
            prefetch="intent"
            className="text-brand-accent hover:text-brand-accent-hover transition-colors"
          >
            Earn commission — become a partner →
          </Link>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => {
              setHidden(true);
              if (typeof window !== 'undefined') {
                window.localStorage.setItem(
                  'keystonne:announcement-dismissed',
                  '1',
                );
              }
            }}
            className="text-white/60 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
