import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import {X} from 'lucide-react';

/**
 * Quiet top strip on the new Apple-inspired graphite-white shell.
 * Subtle off-white surface, muted copy, hairline bottom border, no
 * gradient stripe. One precise line of commerce reassurance + one
 * partner CTA on the right. Dismissible — preference persists in
 * localStorage.
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
    <div
      className="relative text-[12px]"
      style={{
        background: 'var(--ks-page-warm)',
        color: 'var(--ks-muted)',
        borderBottom: '1px solid var(--ks-line-soft)',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-1.5">
        <span>
          India-only demo · GST shown separately ·
          {' '}<span style={{color: 'var(--ks-ink-2)'}}>4–7 working day delivery on stock items</span>
        </span>

        <div className="flex items-center gap-3">
          <Link
            to="/partner"
            prefetch="intent"
            className="font-medium transition-colors"
            style={{color: 'var(--ks-blue)'}}
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
            className="opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
