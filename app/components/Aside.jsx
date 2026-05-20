import {createContext, useContext, useEffect, useId, useState} from 'react';
import {X} from 'lucide-react';
import {cn} from '~/lib/utils/cn';

/**
 * Slide-over panel used for the cart drawer and the mobile menu.
 * Tailwind-styled rewrite of the original scaffold component — same API
 * (Aside, Aside.Provider, useAside) so existing call sites keep working.
 *
 * Mode is a single string ("cart" | "mobile" | "search" | "closed") held in
 * context, so only one panel can be open at a time. Esc closes it.
 *
 * @param {{
 *   children?: React.ReactNode;
 *   type: 'search' | 'cart' | 'mobile';
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const id = useId();

  useEffect(() => {
    if (!expanded) return;
    const ac = new AbortController();
    document.addEventListener(
      'keydown',
      (e) => e.key === 'Escape' && close(),
      {signal: ac.signal},
    );
    // Lock body scroll while the drawer is open.
    document.body.style.overflow = 'hidden';
    return () => {
      ac.abort();
      document.body.style.overflow = '';
    };
  }, [close, expanded]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={id}
      aria-hidden={!expanded}
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-200',
        expanded
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close panel"
        onClick={close}
        className="absolute inset-0 bg-ink/40"
      />

      {/* Panel */}
      <aside
        className={cn(
          'absolute right-0 top-0 flex h-full w-[90vw] max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-200',
          expanded ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3
            id={id}
            className="text-xs font-bold uppercase tracking-wider text-gray-500"
          >
            {heading}
          </h3>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded text-gray-500 hover:bg-gray-100 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
