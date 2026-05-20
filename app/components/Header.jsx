import {Suspense} from 'react';
import {Await, Link, NavLink, Form} from 'react-router';
import {Search, ShoppingCart, User, Menu, Wand2} from 'lucide-react';
import {useAside} from '~/components/Aside';
import {KeystonneLogo} from '~/components/KeystonneLogo';
import {useQuoteCart} from '~/lib/quoteCart';
import {cn} from '~/lib/utils/cn';

/**
 * Sticky frosted-glass header on a deep-ink surface. The dark surface
 * carries the white-fill Keystonne wordmark cleanly; backdrop-blur over
 * the body's mesh gradient gives the "liquid glass" depth without
 * losing logo contrast.
 */
export function Header({isLoggedIn}) {
  return (
    <header
      className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink/85 text-white backdrop-blur-xl supports-[backdrop-filter]:bg-ink/75"
      style={{boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px -16px rgba(0,0,0,0.4)'}}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:gap-6 md:py-3.5">
        <MobileMenuTrigger />

        <KeystonneLogo className="hidden md:block" />
        <KeystonneLogo variant="monogram" className="md:hidden" />

        {/* Search — dominant centre element, glass-styled */}
        <Form
          method="get"
          action="/search"
          className="relative flex-1 max-w-[720px]"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search Keystonne
          </label>
          <div className="group relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="header-search"
              type="search"
              name="q"
              placeholder="Search 5,000+ commercial kitchen products by name, SKU, or category"
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/95 pl-10 pr-28 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary-500 focus:outline-none focus:ring-2 focus:ring-brand-primary-500/30"
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-lg btn-accent px-3.5 py-1.5 text-xs font-semibold transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              Search
            </button>
          </div>
        </Form>

        <nav className="flex items-center gap-1.5 md:gap-2.5" aria-label="Account">
          <KitchenPlannerCTA />
          <AccountLink isLoggedIn={isLoggedIn} />
          <QuoteCartLink />
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
      className="grid h-10 w-10 place-items-center rounded-lg text-white/85 hover:bg-white/10 md:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

function KitchenPlannerCTA() {
  return (
    <Link
      to="/kitchen-planner"
      prefetch="intent"
      className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-brand-accent/40 bg-brand-accent/10 px-3 py-2 text-xs font-semibold text-brand-accent backdrop-blur transition-colors hover:bg-brand-accent hover:text-white"
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
      className="hidden md:flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs hover:bg-white/10"
    >
      <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
        <User className="h-3.5 w-3.5 text-white/85" />
      </div>
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[10px] uppercase tracking-wider text-white/55">
          Sign in
        </span>
        <Suspense fallback={<span className="font-semibold">Account</span>}>
          <Await
            resolve={isLoggedIn}
            errorElement={<span className="font-semibold">Account</span>}
          >
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

function QuoteCartLink() {
  const {count, hydrated} = useQuoteCart();
  const {open} = useAside();
  const display = hydrated ? count : 0;

  return (
    <button
      type="button"
      onClick={() => open('cart')}
      className="relative inline-flex items-center gap-2 rounded-lg btn-accent px-3.5 py-2 text-xs font-semibold transition-colors"
      aria-label={`Quote cart, ${display} items`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline">Cart</span>
      <span
        className={cn(
          'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-ink',
          display === 0 && 'opacity-70',
        )}
      >
        {display}
      </span>
    </button>
  );
}
