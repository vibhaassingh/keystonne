import {useState} from 'react';
import {Link, NavLink} from 'react-router';
import {
  LayoutDashboard, Briefcase, FileText, Wallet, BanknoteArrowUp,
  Folder, User, LogOut, Menu, X, ArrowLeft,
} from 'lucide-react';
import {KeystonneLogo} from '~/components/KeystonneLogo';
import {usePartnerSession} from '~/lib/usePartnerSession';
import {demoPartner} from '~/lib/mock/partner';
import {cn} from '~/lib/utils/cn';

/**
 * Wraps every /partner/dashboard/* route. Apple-inspired finance shell:
 *   - Translucent apple-nav topbar matching the storefront chrome, with
 *     a small emerald "Partner workspace" chip so context stays clear
 *     without dyeing the whole header in colour.
 *   - Left sidebar in premium-panel form, ink labels, emerald icon
 *     accent + emerald rail when active.
 *   - Body sits on the graphite-white wash with the same max-width as
 *     the storefront for visual continuity.
 */

const NAV = [
  {to: '/partner/dashboard',           label: 'Overview',  icon: LayoutDashboard,  end: true},
  {to: '/partner/dashboard/deals',     label: 'Deals',     icon: Briefcase},
  {to: '/partner/dashboard/quotes',    label: 'Quotes',    icon: FileText},
  {to: '/partner/dashboard/earnings',  label: 'Earnings',  icon: Wallet},
  {to: '/partner/dashboard/payouts',   label: 'Payouts',   icon: BanknoteArrowUp},
  {to: '/partner/dashboard/resources', label: 'Resources', icon: Folder},
  {to: '/partner/dashboard/profile',   label: 'Profile',   icon: User},
];

export function PartnerShell({children}) {
  const {logout} = usePartnerSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{minHeight: '100vh', background: 'var(--ks-page)'}}>
      {/* Apple-nav topbar — calm graphite-white with a small workspace chip */}
      <div className="apple-nav sticky top-0 z-40">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 md:gap-5 md:px-6">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg md:hidden"
            style={{color: 'var(--ks-ink-2)'}}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/partner/dashboard" className="flex items-center gap-2">
            <KeystonneLogo tone="dark" className="hidden md:block" />
            <KeystonneLogo tone="dark" variant="monogram" className="md:hidden" />
          </Link>

          <span
            className="hidden items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.10em] sm:inline-flex"
            style={{
              background: 'var(--ks-emerald-soft)',
              color: 'var(--ks-emerald-dark)',
              border: '1px solid rgba(10,127,86,0.20)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{background: 'var(--ks-emerald)'}}
            />
            Partner workspace
          </span>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium md:inline-flex"
              style={{color: 'var(--ks-ink-2)'}}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Storefront
            </Link>
            <div
              className="flex items-center gap-2 rounded-full px-2.5 py-1.5"
              style={{
                background: 'var(--ks-card-tint)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <div
                className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white"
                style={{background: 'var(--ks-ink)'}}
              >
                {demoPartner.initials}
              </div>
              <div className="hidden text-left leading-tight sm:block">
                <div
                  className="text-[10px] uppercase tracking-[0.08em]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  {demoPartner.tier} · {demoPartner.city}
                </div>
                <div
                  className="text-[12px] font-semibold"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {demoPartner.name}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="grid h-9 w-9 place-items-center rounded-full transition-colors"
              style={{color: 'var(--ks-muted)'}}
              aria-label="Log out"
              title="Log out of demo partner"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto flex max-w-[1400px] gap-6 px-0 py-0 md:px-6 md:py-7">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 md:block">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 md:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
              className="absolute inset-0"
              style={{background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(8px)'}}
            />
            <div
              className="absolute left-0 top-0 h-full w-72 p-4"
              style={{background: 'var(--ks-card-solid)', boxShadow: 'var(--ks-shadow-float)'}}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  Navigate
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main column */}
        <main className="min-w-0 flex-1 px-4 pb-16 md:px-0">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar({onNavigate}) {
  return (
    <nav
      aria-label="Partner sections"
      className="premium-panel p-2"
      style={{borderRadius: 'var(--ks-radius-lg)'}}
    >
      <ul className="space-y-0.5">
        {NAV.map(({to, label, icon: Icon, end}) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              prefetch="intent"
              className={({isActive}) =>
                cn(
                  'group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors',
                )
              }
              style={({isActive}) =>
                isActive
                  ? {
                      background: 'var(--ks-emerald-soft)',
                      color: 'var(--ks-emerald-dark)',
                      fontWeight: 600,
                    }
                  : {color: 'var(--ks-ink-2)'}
              }
            >
              {({isActive}) => (
                <>
                  <Icon
                    className="h-4 w-4"
                    style={{color: isActive ? 'var(--ks-emerald)' : 'var(--ks-muted)'}}
                    strokeWidth={1.6}
                  />
                  {label}
                  {isActive && (
                    <span
                      className="ml-auto h-1.5 w-1.5 rounded-full"
                      style={{background: 'var(--ks-emerald)'}}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className="mx-2 my-2"
        style={{height: 1, background: 'var(--ks-line-soft)'}}
      />

      <Link
        to="/partner"
        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12px]"
        style={{color: 'var(--ks-muted)'}}
      >
        Partner programme overview
      </Link>
    </nav>
  );
}
