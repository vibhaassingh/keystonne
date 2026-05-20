import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router';
import {ArrowRight, ChevronLeft, Sparkles, Wand2} from 'lucide-react';
import {usePartnerSession} from '~/lib/usePartnerSession';
import {demoPartner} from '~/lib/mock/partner';

/**
 * Demo partner login. There's no real auth in Phase 1 (CLAUDE.md §2);
 * we expose a single "Log in as Demo Partner" button that sets a
 * localStorage flag and routes to /partner/dashboard. Real Supabase
 * Auth ships in Phase 2.
 */

export const meta = () => [
  {title: 'Partner sign in — Keystonne'},
];

export default function PartnerLogin() {
  const {hydrated, isLoggedIn, login} = usePartnerSession();
  const navigate = useNavigate();

  // If they're already "logged in" send them straight to dashboard.
  useEffect(() => {
    if (hydrated && isLoggedIn) navigate('/partner/dashboard');
  }, [hydrated, isLoggedIn, navigate]);

  function demoLogin() {
    login();
    navigate('/partner/dashboard');
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
      <Link
        to="/partner"
        className="mb-6 inline-flex items-center gap-1 text-[12px] font-semibold text-gray-500 hover:text-brand-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to partner programme
      </Link>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Login panel */}
        <div className="md:col-span-7">
          <div
            className="rounded-3xl border border-gray-200 bg-white/85 p-6 backdrop-blur md:p-10"
            style={{boxShadow: 'var(--shadow-glass)'}}
          >
            <span className="eyebrow">Partner sign in</span>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Welcome back.
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to register a deal, build a quote, or check on your
              ledger.
            </p>

            {/* Real login fields — disabled in Phase 1 to make the demo
                affordance obvious. */}
            <form className="mt-6 grid gap-4 opacity-60">
              <Field label="Mobile or email">
                <input
                  disabled
                  placeholder="arjun@example.in or +91 98XXX XXXXX"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-ink"
                />
              </Field>
              <Field label="OTP">
                <input
                  disabled
                  placeholder="6-digit OTP sent to your mobile"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-ink"
                />
              </Field>
              <button
                type="button"
                disabled
                className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-500"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-dashed border-brand-primary/30 bg-brand-primary-50 p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Demo mode
              </div>
              <p className="mt-2 text-sm text-gray-700">
                Real OTP login ships in Phase 2 (Supabase Auth). For now,
                click below to enter the dashboard as our sample partner
                <span className="font-semibold text-ink">
                  {' '}— {demoPartner.name}, {demoPartner.persona},{' '}
                  {demoPartner.city}.
                </span>
              </p>
              <button
                type="button"
                onClick={demoLogin}
                className="mt-4 inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-2.5 text-sm font-semibold"
              >
                Log in as Demo Partner
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              New here?{' '}
              <Link
                to="/partner/apply"
                className="font-semibold text-brand-primary hover:underline"
              >
                Apply to join
              </Link>{' '}
              · or{' '}
              <Link
                to="/partner/signup"
                className="font-semibold text-brand-primary hover:underline"
              >
                Sign up for the waitlist
              </Link>
            </p>
          </div>
        </div>

        {/* Side panel */}
        <aside className="md:col-span-5">
          <div className="card p-6">
            <Wand2 className="h-6 w-6 text-brand-accent" />
            <h2 className="mt-3 text-lg font-semibold text-ink">
              You&apos;re about to see real data.
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The demo dashboard ships with realistic figures from a
              Bengaluru-based Silver-tier kitchen consultant — 6 active
              deals, ₹18.2 L closed YTD, ₹85,000 in pending commission.
              Click through. Every page is real.
            </p>
            <ul className="mt-4 space-y-2 text-[13px] text-gray-700">
              {[
                'Overview · tier progress + earnings tiles + recent deals',
                'Deals · 6 sample projects across the 13 lifecycle states',
                'Quotes · 3 quotes (draft / sent / approved) with line items',
                'Earnings · commission ledger with status pills',
                'Payouts · request-payout flow with UPI / bank options',
                'Resources · spec sheets, CAD downloads, training',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({label, children}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[12px] font-semibold text-gray-700">{label}</div>
      {children}
    </label>
  );
}
