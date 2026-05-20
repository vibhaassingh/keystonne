import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {products, productBySlug} from '~/lib/mock/products';
import {gstFor} from '~/lib/utils/formatGST';

/**
 * Phase 1 cart — localStorage only, no Shopify integration. Holds Keystonne
 * mock-catalog items by slug + quantity. Phase 2 replaces with the real
 * Hydrogen cart against a connected Shopify dev store.
 *
 * Shape persisted to localStorage:  [{slug: string, qty: number}, ...]
 */

const STORAGE_KEY = 'keystonne:quote-cart';

const QuoteCartContext = createContext(null);

export function QuoteCartProvider({children}) {
  const [lines, setLines] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount. SSR yields an empty cart; the client
  // takes over once mounted. The `hydrated` flag suppresses count badges
  // during the brief mismatch window so we don't flash "0" then update.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(sanitize(parsed));
      }
    } catch {
      // Ignore parse errors — start with an empty cart.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const api = useMemo(() => {
    function add(slug, qty = 1) {
      if (!productBySlug[slug]) return;
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === slug);
        if (existing) {
          return prev.map((l) =>
            l.slug === slug ? {...l, qty: l.qty + qty} : l,
          );
        }
        return [...prev, {slug, qty}];
      });
    }

    function remove(slug) {
      setLines((prev) => prev.filter((l) => l.slug !== slug));
    }

    function setQty(slug, qty) {
      const next = Math.max(1, Math.floor(qty));
      setLines((prev) =>
        prev.map((l) => (l.slug === slug ? {...l, qty: next} : l)),
      );
    }

    function clear() {
      setLines([]);
    }

    // Hydrated items + derived totals.
    const items = lines
      .map((l) => {
        const product = productBySlug[l.slug];
        if (!product) return null;
        const unit = product.priceINR ?? 0;
        const lineTotal = unit * l.qty;
        return {...l, product, unit, lineTotal};
      })
      .filter(Boolean);

    const subtotal = items.reduce((s, l) => s + l.lineTotal, 0);
    const {gst, total} = gstFor(subtotal);
    const count = items.reduce((s, l) => s + l.qty, 0);

    // True when any line is a "quote only" item (no priceINR). Toggles the
    // cart from "checkout-ready" mode into pure "quote request" mode.
    const hasQuoteOnly = items.some((l) => typeof l.product.priceINR !== 'number');

    return {
      items,
      count,
      subtotal,
      gst,
      total,
      hasQuoteOnly,
      hydrated,
      add,
      remove,
      setQty,
      clear,
    };
  }, [lines, hydrated]);

  return (
    <QuoteCartContext.Provider value={api}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) {
    throw new Error('useQuoteCart must be used within QuoteCartProvider');
  }
  return ctx;
}

/** Drop unknown slugs and clamp qty ≥ 1. */
function sanitize(arr) {
  return arr
    .filter((l) => l && typeof l.slug === 'string' && productBySlug[l.slug])
    .map((l) => ({slug: l.slug, qty: Math.max(1, Math.floor(Number(l.qty) || 1))}));
}

/** Stable seed for demo screenshots — call from a route loader if needed. */
export function getDemoSeed() {
  return [products[0].slug, products[2].slug, products[4].slug];
}
