import {Link} from 'react-router';
import {Aside} from '~/components/Aside';
import {AnnouncementBar} from '~/components/AnnouncementBar';
import {Header} from '~/components/Header';
import {MegaNav} from '~/components/MegaNav';
import {Footer} from '~/components/Footer';
import {QuoteCartDrawer} from '~/components/QuoteCartDrawer';
import {categories} from '~/lib/mock/categories';

/**
 * Top-level chrome that wraps every route. Order top → bottom:
 *
 *   AnnouncementBar  (trust pills + partner CTA, dismissible)
 *   Header           (logo · search · account · cart)
 *   MegaNav          (14 categories, desktop only)
 *   <Outlet />       (the route content)
 *   Footer           (4-col link grid + trust strip + legal)
 *
 * Aside.Provider supplies the cart drawer + mobile category drawer.
 * SearchAside from the scaffold is dropped — Keystonne's search is inline
 * in the header (a B2B catalog needs always-visible search).
 */
export function PageLayout({children = null, isLoggedIn}) {
  return (
    <Aside.Provider>
      <Aside type="cart" heading="Your cart">
        <QuoteCartDrawer />
      </Aside>
      <MobileCategoryAside />
      <AnnouncementBar />
      <Header isLoggedIn={isLoggedIn} />
      <MegaNav />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </Aside.Provider>
  );
}

/**
 * Mobile category drawer — the responsive replacement for MegaNav. Lists all
 * 14 categories vertically, plus partner + planner shortcuts at the bottom.
 */
function MobileCategoryAside() {
  return (
    <Aside type="mobile" heading="Browse Keystonne">
      <nav aria-label="Mobile menu" className="p-4">
        <ul
          className="divide-y"
          style={{borderColor: 'var(--ks-line-soft)'}}
        >
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.slug}>
                <Link
                  to={`/collections/${c.slug}`}
                  prefetch="intent"
                  className="flex items-center gap-3 py-3 text-sm font-medium"
                  style={{color: 'var(--ks-ink)'}}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{color: 'var(--ks-muted)'}}
                    strokeWidth={1.6}
                  />
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 space-y-2">
          <Link
            to="/kitchen-planner"
            prefetch="intent"
            className="block rounded-full px-4 py-2.5 text-center text-sm font-medium"
            style={{
              background: 'var(--ks-blue)',
              color: '#ffffff',
              border: '1px solid rgba(0,113,227,0.5)',
            }}
          >
            Build my kitchen with AI
          </Link>
          <Link
            to="/partner"
            prefetch="intent"
            className="block rounded-full px-4 py-2.5 text-center text-sm font-medium"
            style={{
              background: 'var(--ks-card-solid)',
              color: 'var(--ks-emerald-dark)',
              border: '1px solid rgba(10,127,86,0.25)',
            }}
          >
            Become a partner
          </Link>
        </div>
      </nav>
    </Aside>
  );
}
