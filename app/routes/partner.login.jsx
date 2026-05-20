import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router';
import {ArrowRight, ChevronLeft, Sparkles} from 'lucide-react';
import {usePartnerSession} from '~/lib/usePartnerSession';
import {demoPartner} from '~/lib/mock/partner';

/**
 * Apple-style demo login. There's no real auth in Phase 1 — the
 * "Log in as Demo Partner" button sets a localStorage flag and routes
 * to the dashboard. Real Supabase OTP arrives in Phase 2 (CLAUDE.md §2).
 */

export const meta = () => [
  {title: 'Partner sign in — Keystonne'},
];

export default function PartnerLogin() {
  const {hydrated, isLoggedIn, login} = usePartnerSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && isLoggedIn) navigate('/partner/dashboard');
  }, [hydrated, isLoggedIn, navigate]);

  function demoLogin() {
    login();
    navigate('/partner/dashboard');
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-14 md:px-6 md:py-20">
      <Link
        to="/partner"
        className="mb-6 inline-flex items-center gap-1 text-[12px] font-medium"
        style={{color: 'var(--ks-muted)'}}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to partner programme
      </Link>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="premium-panel p-8 md:p-10">
            <span className="apple-eyebrow">Partner sign in</span>
            <h1
              className="mt-3 text-[28px] font-semibold tracking-tight md:text-[32px]"
              style={{color: 'var(--ks-ink)'}}
            >
              Welcome back.
            </h1>
            <p
              className="mt-2 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Sign in to register a deal, build a quote, or check on your
              ledger.
            </p>

            {/* Disabled "real" form — visible to communicate Phase 2 intent.
                Use fieldset[disabled] so the semantics are valid (form role
                doesn't support aria-disabled). */}
            <fieldset className="mt-6 grid gap-4 border-0 p-0" disabled>
              <Field label="Mobile or email">
                <DisabledInput placeholder="arjun@example.in or +91 98XXX XXXXX" />
              </Field>
              <Field label="OTP">
                <DisabledInput placeholder="6-digit OTP sent to your mobile" />
              </Field>
              <button
                type="button"
                disabled
                className="rounded-full px-4 py-2.5 text-sm font-medium"
                style={{
                  background: '#f0f0f3',
                  color: 'var(--ks-muted)',
                  border: '1px solid var(--ks-line-soft)',
                  cursor: 'not-allowed',
                }}
              >
                Sign in
              </button>
            </fieldset>

            <div
              className="mt-7 rounded-[var(--ks-radius-md)] p-5"
              style={{
                background: 'var(--ks-blue-soft)',
                border: '1px solid rgba(0,113,227,0.18)',
              }}
            >
              <div
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-blue-dark)'}}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Demo mode
              </div>
              <p
                className="mt-2 text-sm"
                style={{color: 'var(--ks-blue-dark)'}}
              >
                Real OTP login ships in Phase 2 (Supabase Auth). For now,
                click below to enter the dashboard as our sample partner —{' '}
                <span
                  className="font-semibold"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {demoPartner.name}, {demoPartner.persona}, {demoPartner.city}.
                </span>
              </p>
              <button
                type="button"
                onClick={demoLogin}
                className="apple-button-primary mt-4"
              >
                Log in as Demo Partner
                <ArrowRight className="h-4 w-4 opacity-70" />
              </button>
            </div>

            <p
              className="mt-6 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              New here?{' '}
              <Link
                to="/partner/apply"
                className="font-medium hover:underline"
                style={{color: 'var(--ks-blue)'}}
              >
                Apply to join
              </Link>{' '}
              · or{' '}
              <Link
                to="/partner/signup"
                className="font-medium hover:underline"
                style={{color: 'var(--ks-blue)'}}
              >
                Sign up for the waitlist
              </Link>
            </p>
          </div>
        </div>

        <aside className="md:col-span-5">
          <div className="premium-panel p-6">
            <span className="apple-eyebrow">You&apos;re about to see real data</span>
            <h2
              className="mt-3 text-lg font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              The demo dashboard is fully populated.
            </h2>
            <p
              className="mt-2 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              A Bengaluru-based Silver-tier kitchen consultant with 6 active
              deals, ₹18.2L closed YTD, and ₹85,000 pending commission.
              Click through — every page is real.
            </p>
            <ul
              className="mt-4 space-y-1.5 text-[13px]"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {[
                'Overview · tier progress + earnings tiles',
                'Deals · 6 sample projects across 13 states',
                'Quotes · draft / sent / approved',
                'Earnings · commission ledger',
                'Payouts · TDS breakdown + Form 16A',
                'Resources · spec sheets, CADs, training',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{background: 'var(--ks-ink)'}}
                  />
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
      <div
        className="mb-1.5 text-[12px] font-medium"
        style={{color: 'var(--ks-ink-2)'}}
      >
        {label}
      </div>
      {children}
    </label>
  );
}

function DisabledInput({placeholder}) {
  return (
    <input
      disabled
      placeholder={placeholder}
      className="w-full rounded-md px-3 py-2.5 text-sm"
      style={{
        background: '#fafafa',
        border: '1px solid var(--ks-line-soft)',
        color: 'var(--ks-muted)',
        cursor: 'not-allowed',
      }}
    />
  );
}
