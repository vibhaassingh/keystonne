import {Link} from 'react-router';
import {Handshake, ArrowRight, ShieldCheck, ChevronRight} from 'lucide-react';

/**
 * Premium partner module on the storefront home — graphite + emerald,
 * no mesh, no decorative halo. The "money colour" rule from the brief
 * is enforced: emerald shows up only on the commission amount, the
 * status pill, and the secondary "Apply" CTA inside the sample card.
 *
 * Composition pairs editorial copy on the left with a worked sample
 * commission calculation on the right — so the reader sees the
 * actual mechanic rather than a marketing pitch.
 */
export function PartnerPromoBand() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 md:py-20">
      <div className="premium-panel relative overflow-hidden p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          {/* ── Left: editorial copy ──────────────────────────── */}
          <div className="md:col-span-7">
            <span className="apple-eyebrow">
              <Handshake className="h-3 w-3" />
              Keystonne Partner Network
            </span>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight md:text-[40px]"
              style={{color: 'var(--ks-ink)'}}
            >
              Turn kitchen influence into{' '}
              <span style={{color: 'var(--ks-emerald)'}}>transparent commission</span>.
            </h2>
            <p
              className="mt-4 max-w-xl text-[15px] leading-relaxed"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Register projects, build co-branded quotes, and see every
              rupee from project protection through to payout. No
              WhatsApp chasing; no opaque kickbacks; one transparent
              ledger.
            </p>

            <ul className="mt-6 space-y-2">
              {[
                'Per-category rates published — same for every partner',
                'Deal protection with a 30-day attribution window',
                'GST + TDS handled; payout after installation sign-off',
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[14px]"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0"
                    strokeWidth={1.7}
                    style={{color: 'var(--ks-emerald)'}}
                  />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/partner"
                prefetch="intent"
                className="apple-button-primary"
              >
                How the programme works
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link
                to="/partner/login"
                prefetch="intent"
                className="text-[13px] font-medium"
                style={{color: 'var(--ks-blue)'}}
              >
                Demo the dashboard →
              </Link>
            </div>
          </div>

          {/* ── Right: sample commission card ────────────────── */}
          <div className="md:col-span-5">
            <SampleCommissionCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function SampleCommissionCard() {
  return (
    <div
      className="rounded-[var(--ks-radius-lg)] p-6"
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px solid var(--ks-line)',
        boxShadow: 'var(--ks-shadow-card)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="apple-eyebrow">Sample protected project</span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{
            background: 'var(--ks-emerald-soft)',
            color: 'var(--ks-emerald-dark)',
          }}
        >
          <ShieldCheck className="h-3 w-3" />
          Protected
        </span>
      </div>

      <div
        className="mt-4 text-[15px] font-semibold leading-tight"
        style={{color: 'var(--ks-ink)'}}
      >
        120-cover restaurant kitchen
      </div>
      <div
        className="text-[12px]"
        style={{color: 'var(--ks-muted)'}}
      >
        Refrigeration + cooking + work tables
      </div>

      <dl
        className="mt-5 space-y-2.5 border-t pt-4 text-[13px]"
        style={{borderColor: 'var(--ks-line-soft)'}}
      >
        <Row k="Quote value" v="₹24,80,000" />
        <Row k="Commission rate" v="5.6% blended" muted />
        <Row k="TDS withheld" v="10% statutory" muted />
      </dl>

      <div
        className="mt-5 flex items-baseline justify-between rounded-xl px-4 py-3"
        style={{background: 'var(--ks-emerald-soft)'}}
      >
        <div
          className="text-[11px] font-medium uppercase tracking-[0.10em]"
          style={{color: 'var(--ks-emerald-dark)'}}
        >
          Estimated commission
        </div>
        <div
          className="tabular text-[22px] font-semibold"
          style={{color: 'var(--ks-emerald)'}}
        >
          ₹1,38,000
        </div>
      </div>

      <div
        className="mt-4 flex items-center justify-between text-[11px]"
        style={{color: 'var(--ks-muted)'}}
      >
        <span>Payout window: install sign-off + 11 days</span>
        <Link
          to="/partner/apply"
          prefetch="intent"
          className="inline-flex items-center font-semibold"
          style={{color: 'var(--ks-emerald)'}}
        >
          Apply
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Row({k, v, muted}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt style={{color: muted ? 'var(--ks-muted)' : 'var(--ks-ink-2)'}}>{k}</dt>
      <dd
        className="tabular font-medium"
        style={{color: muted ? 'var(--ks-ink-2)' : 'var(--ks-ink)'}}
      >
        {v}
      </dd>
    </div>
  );
}
