import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import {Sparkles, X} from 'lucide-react';

/**
 * Thin top strip. Minimal, almost iridescent — a single line of compact
 * trust copy and a partner CTA, on a near-black bar with subtle gradient
 * stripe. Dismissible — preference persists in localStorage.
 */
export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem('keystonne:announcement-dismissed') === '1') {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  return (
    <div className="relative overflow-hidden bg-ink text-white">
      {/* Subtle gradient stripe along the bottom for "liquid" feel */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(245,158,11,0.5), transparent)',
        }}
      />
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-1.5 text-[12px]">
        <span className="text-white/85">
          <span className="text-white/55">Trade pricing</span> for verified
          businesses ·{' '}
          <span className="text-white/55">Pan-India freight</span> included ·{' '}
          <span className="text-white/55">GST invoice</span> on every order
        </span>

        <div className="flex items-center gap-3">
          <Link
            to="/partner"
            prefetch="intent"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-accent transition-colors hover:text-amber-300"
          >
            <Sparkles className="h-3 w-3" />
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
            className="text-white/40 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
