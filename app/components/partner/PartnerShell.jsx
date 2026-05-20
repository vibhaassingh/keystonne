import {useState} from 'react';
import {Link, NavLink} from 'react-router';
import {
  LayoutDashboard, Briefcase, FileText, Wallet, Folder, User,
  LogOut, Menu, X, ChevronRight, Sparkles, ArrowLeft,
} from 'lucide-react';
import {KeystonneLogo} from '~/components/KeystonneLogo';
import {usePartnerSession} from '~/lib/usePartnerSession';
import {demoPartner} from '~/lib/mock/partner';
import {cn} from '~/lib/utils/cn';

/**
 * Wraps every /partner/dashboard/* route. Provides:
 *   - Partner topbar (independent of the storefront header — uses the
 *     emerald partner-accent so partners always know which surface
 *     they're in)
 *   - Left sidebar with section navigation; collapses to mobile drawer
 *   - Main content area
 *
 * Renders nothing until `hydrated` to avoid SSR flash; the
 * useRequirePartnerLogin redirect happens on the route component itself.
 */

const NAV = [
  {to: '/partner/dashboard',           label: 'Overview',  icon: LayoutDashboard, end: true},
  {to: '/partner/dashboard/deals',     label: 'Deals',     icon: Briefcase},
  {to: '/partner/dashboard/quotes',    label: 'Quotes',    icon: FileText},
  {to: '/partner/dashboard/earnings',  label: 'Earnings',  icon: Wallet},
  {to: '/partner/dashboard/payouts',   label: 'Payouts',   icon: Wallet},
  {to: '/partner/dashboard/resources', label: 'Resources', icon: Folder},
  {to: '/partner/dashboard/profile',   label: 'Profile',   icon: User},
];

export function PartnerShell({children}) {
  const {logout} = usePartnerSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      {/* Partner topbar — replaces the storefront announcement+header on
          dashboard routes for clearer context-switch. */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-emerald-950/85 text-white backdrop-blur-xl supports-[backdrop-filter]:bg-emerald-950/75">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 md:gap-5 md:py-3.5">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg text-white/85 hover:bg-white/10 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <KeystonneLogo className="hidden md:block" />
          <KeystonneLogo variant="monogram" className="md:hidden" />

          <span className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 sm:inline-flex">
            <Sparkles className="h-3 w-3" />
            Partner workspace
          </span>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium text-white/75 hover:bg-white/10 hover:text-white md:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Storefront
            </Link>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-[11px] font-bold text-white">
                {demoPartner.initials}
              </div>
              <div className="hidden text-left leading-tight sm:block">
                <div className="text-[11px] text-white/65">
                  {demoPartner.tier} · {demoPartner.city}
                </div>
                <div className="text-[12px] font-semibold text-white">
                  {demoPartner.name}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="grid h-9 w-9 place-items-center rounded-lg text-white/65 hover:bg-white/10 hover:text-white"
              aria-label="Log out"
              title="Log out of demo partner"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto flex max-w-[1400px] gap-6 px-0 py-0 md:px-6 md:py-6">
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
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Navigate
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main column */}
        <main className="min-w-0 flex-1 px-4 pb-12 md:px-0">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar({onNavigate}) {
  return (
    <nav aria-label="Partner sections" className="rounded-2xl border border-gray-200 bg-white/85 p-2 backdrop-blur">
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
                  isActive
                    ? 'bg-partner-accent/10 text-partner-accent font-semibold'
                    : 'text-ink/80 hover:bg-gray-100 hover:text-ink',
                )
              }
            >
              {({isActive}) => (
                <>
                  <Icon className={cn('h-4 w-4', isActive ? 'text-partner-accent' : 'text-gray-500')} />
                  {label}
                  {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
