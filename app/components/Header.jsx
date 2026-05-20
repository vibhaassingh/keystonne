import {Suspense} from 'react';
import {Await, Link, NavLink, Form} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {Search, ShoppingCart, User, Menu, Wand2} from 'lucide-react';
import {useAside} from '~/components/Aside';
import {KeystonneLogo} from '~/components/KeystonneLogo';
import {cn} from '~/lib/utils/cn';

/**
 * Main header band — dark "ink" surface with a dominant search bar.
 * WebstaurantStore DNA: logo left, big search centre, action cluster right.
 *
 * Props are passed by PageLayout; only `cart` and `isLoggedIn` are used here.
 * `header` and `publicStoreDomain` (Shopify menu data) are intentionally
 * unused — the storefront uses our locked 14-category taxonomy via MegaNav,
 * not Shopify's admin-defined menu.
 */
export function Header({cart, isLoggedIn}) {
  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:gap-6 md:py-4">
        {/* Mobile menu trigger */}
        <MobileMenuTrigger />

        {/* Logo */}
        <KeystonneLogo className="hidden md:block" />
        <KeystonneLogo variant="monogram" className="md:hidden" />

        {/* Search — the dominant element. Submits to /search via GET. */}
        <Form
          method="get"
          action="/search"
          className="relative flex-1 max-w-[720px]"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search Keystonne
          </label>
          <input
            id="header-search"
            type="search"
            name="q"
            placeholder="Search 5,000+ commercial kitchen products by name, SKU, or category"
            className="h-11 w-full rounded-md border border-white/10 bg-white px-4 pr-12 text-sm text-ink placeholder:text-gray-500 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
            autoComplete="off"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1 top-1 grid h-9 w-9 place-items-center rounded bg-brand-accent text-white transition-colors hover:bg-brand-accent-hover"
          >
            <Search className="h-4 w-4" />
          </button>
        </Form>

        {/* CTA cluster */}
        <nav className="flex items-center gap-2 md:gap-3" aria-label="Account">
          <KitchenPlannerCTA />
          <AccountLink isLoggedIn={isLoggedIn} />
          <CartLink cart={cart} />
        </nav>
      </div>
    </header>
  );
}

function MobileMenuTrigger() {
  const {open} = useAside();
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={() => open('mobile')}
      className="grid h-10 w-10 place-items-center rounded text-white hover:bg-white/10 md:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

/** Primary partner-facing micro-CTA. Hidden on small screens to keep space. */
function KitchenPlannerCTA() {
  return (
    <Link
      to="/kitchen-planner"
      prefetch="intent"
      className="hidden lg:inline-flex items-center gap-1.5 rounded border border-brand-accent/60 px-3 py-2 text-xs font-semibold text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
    >
      <Wand2 className="h-3.5 w-3.5" />
      Build my kitchen
    </Link>
  );
}

function AccountLink({isLoggedIn}) {
  return (
    <NavLink
      to="/account"
      prefetch="intent"
      className="hidden md:flex items-center gap-1.5 rounded px-2 py-2 text-xs hover:bg-white/10"
    >
      <User className="h-4 w-4 text-white/80" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[11px] text-white/60">Sign in</span>
        <Suspense fallback={<span className="font-semibold">Account</span>}>
          <Await resolve={isLoggedIn} errorElement={<span className="font-semibold">Account</span>}>
            {(loggedIn) => (
              <span className="font-semibold">
                {loggedIn ? 'My Account' : 'Account'}
              </span>
            )}
          </Await>
        </Suspense>
      </span>
    </NavLink>
  );
}

function CartLink({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(resolved) => <CartBadgeFromResolved cart={resolved} />}
      </Await>
    </Suspense>
  );
}

function CartBadgeFromResolved({cart}) {
  const optimistic = useOptimisticCart(cart);
  return <CartBadge count={optimistic?.totalQuantity ?? 0} />;
}

function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
      }}
      className="relative inline-flex items-center gap-2 rounded bg-brand-accent px-3 py-2 text-xs font-semibold text-white hover:bg-brand-accent-hover transition-colors"
      aria-label={`Cart, ${count} items`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline">Cart</span>
      <span
        className={cn(
          'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-ink',
          count === 0 && 'opacity-70',
        )}
      >
        {count}
      </span>
    </a>
  );
}
