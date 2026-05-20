import {Suspense} from 'react';
import {Await, Link, NavLink, Form} from 'react-router';
import {Search, ShoppingCart, User, Menu, Sparkles} from 'lucide-react';
import {useAside} from '~/components/Aside';
import {KeystonneLogo} from '~/components/KeystonneLogo';
import {useQuoteCart} from '~/lib/quoteCart';
import {cn} from '~/lib/utils/cn';

/**
 * Sticky Apple-inspired header — translucent off-white, hairline border,
 * graphite-toned wordmark, calm search input, single procurement CTA.
 *
 * Action-colour discipline (CLAUDE redesign brief):
 *   amber  = procurement / commercial intent  → only the cart
 *   blue   = system links + AI guidance       → "Build my kitchen"
 *   graphite = default neutral                 → search submit, account
 */
export function Header({isLoggedIn}) {
  return (
    <header className="apple-nav sticky top-0 z-40">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:gap-6 md:py-3.5">
        <MobileMenuTrigger />

        <KeystonneLogo tone="dark" className="hidden md:block" />
        <KeystonneLogo variant="monogram" tone="dark" className="md:hidden" />

        {/* Search — the dominant centre element, calmer and lighter. */}
        <Form
          method="get"
          action="/search"
          className="relative flex-1 max-w-[680px]"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search Keystonne
          </label>
          <div className="group relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{color: 'var(--ks-muted)'}}
            />
            <input
              id="header-search"
              type="search"
              name="q"
              placeholder="Search products, categories, or SKUs"
              className="h-10 w-full rounded-full pl-10 pr-3 text-sm transition-colors focus:outline-none"
              style={{
                background: '#f0f0f3',
                color: 'var(--ks-ink)',
                border: '1px solid transparent',
              }}
              autoComplete="off"
            />
          </div>
        </Form>

        {/* CTA cluster — single procurement intent, system links elsewhere. */}
        <nav className="flex items-center gap-1 md:gap-2" aria-label="Account">
          <KitchenPlannerLink />
          <AccountLink isLoggedIn={isLoggedIn} />
          <QuoteCartButton />
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
      className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-black/5 md:hidden"
      style={{color: 'var(--ks-ink)'}}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

/** AI-guidance entry — blue ink only (system/AI usage per brief). */
function KitchenPlannerLink() {
  return (
    <Link
      to="/kitchen-planner"
      prefetch="intent"
      className="hidden lg:inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium transition-colors"
      style={{color: 'var(--ks-blue)'}}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Build my kitchen
    </Link>
  );
}

function AccountLink({isLoggedIn}) {
  return (
    <NavLink
      to="/account"
      prefetch="intent"
      className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-black/5"
      style={{color: 'var(--ks-ink-2)'}}
    >
      <User className="h-4 w-4" />
      <Suspense fallback={<span>Account</span>}>
        <Await resolve={isLoggedIn} errorElement={<span>Account</span>}>
          {(loggedIn) => <span>{loggedIn ? 'My Account' : 'Account'}</span>}
        </Await>
      </Suspense>
    </NavLink>
  );
}

/** Cart is the one procurement-intent control — uses amber. */
function QuoteCartButton() {
  const {count, hydrated} = useQuoteCart();
  const {open} = useAside();
  const display = hydrated ? count : 0;

  return (
    <button
      type="button"
      onClick={() => open('cart')}
      className="apple-button-amber !py-1.5 !text-[13px]"
      aria-label={`Quote cart, ${display} items`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline">Cart</span>
      <span
        className={cn(
          'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold',
          display === 0 && 'opacity-70',
        )}
        style={{color: 'var(--ks-ink)'}}
      >
        {display}
      </span>
    </button>
  );
}
