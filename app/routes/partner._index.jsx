import {useState} from 'react';
import {Link} from 'react-router';
import {
  ArrowRight, ArrowUpRight, ChevronDown, Handshake, ShieldCheck,
  Wallet, TrendingUp, FileText, Check,
} from 'lucide-react';
import {
  personas, tiers, commissionRates, howItWorks, faqs,
} from '~/lib/mock/partnerProgram';
import {formatINRCompact} from '~/lib/utils/formatINR';
import {cn} from '~/lib/utils/cn';

/**
 * Apple-style /partner landing. The previous emerald-mesh hero +
 * glass-stat panel is retired; the page now reads as premium
 * financial / procurement infrastructure on the same graphite-white
 * surface as the storefront. Emerald is reserved for commission
 * amounts, status pills, and one "Apply" CTA where the partner
 * commits — every other action stays on the neutral graphite +
 * blue palette.
 */

export const meta = () => [
  {title: 'Keystonne Partners — Spec kitchens. Earn transparently.'},
  {
    name: 'description',
    content:
      'For kitchen consultants, executive chefs, F&B managers, and procurement leads. Register projects, track commissions in real time, get paid on installation.',
  },
];

export default function PartnerLanding() {
  return (
    <>
      <Hero />
      <Promises />
      <HowItWorks />
      <Personas />
      <CommissionTable />
      <Tiers />
      <Payout />
      <FAQ />
      <FinalCTA />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-8 md:px-6 md:pt-12">
      <div className="apple-hero relative overflow-hidden px-6 py-12 md:px-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="apple-eyebrow">
              <Handshake className="h-3 w-3" strokeWidth={1.7} />
              Keystonne Partner Network
            </span>

            <h1 className="apple-display mt-4">
              Turn kitchen influence into{' '}
              <span style={{color: 'var(--ks-emerald)'}}>transparent commission</span>.
            </h1>

            <p
              className="apple-subhead mt-5 max-w-xl"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Register deals, build quotes, track status, and see commission
              from project protection to payout. India&apos;s commercial
              kitchen sales already run on this network — we&apos;ve made the
              ledger transparent.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/partner/apply"
                prefetch="intent"
                className="apple-button-primary"
              >
                Apply as partner
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link
                to="/partner/login"
                prefetch="intent"
                className="apple-button-ghost"
              >
                Log in as demo partner
              </Link>
            </div>

            <p
              className="mt-5 text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              No joining fee. No exclusivity. Decision within 3 working days.
            </p>
          </div>

          <aside className="md:col-span-5">
            <SampleCommissionCard />
          </aside>
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
        border: '1px solid var(--ks-line-soft)',
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
        className="mt-4 text-[20px] font-semibold leading-tight md:text-[22px]"
        style={{color: 'var(--ks-ink)'}}
      >
        120-cover restaurant kitchen
      </div>
      <div
        className="text-[12px]"
        style={{color: 'var(--ks-muted)'}}
      >
        Refrigeration + cooking + work tables · 47 line items
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
        <span>Payout: after installation + approval · ~11 days</span>
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

/* ── Promises ──────────────────────────────────────────────────── */

function Promises() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Deal protection',
      body:
        '30-day attribution window opens the day you register a project. Conflicts are adjudicated by partner-ops within 5 working days.',
    },
    {
      icon: TrendingUp,
      title: 'Published rates',
      body:
        'Every partner sees the same per-category rate × tier multiplier. No backroom deals; the table below is the table.',
    },
    {
      icon: FileText,
      title: 'Quote collaboration',
      body:
        'Build co-branded quote PDFs in the dashboard, share to the client, track opens — without leaving the partner workspace.',
    },
    {
      icon: Wallet,
      title: 'Payout visibility',
      body:
        'Accrued → approved → paid in a real-time ledger. GST + TDS handled automatically; Form 16A every quarter.',
    },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">Why partners switch</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Four promises the informal market can&apos;t make.
        </h2>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({icon: Icon, title, body}) => (
          <li key={title} className="premium-card p-5">
            <div
              className="grid h-9 w-9 place-items-center rounded-lg"
              style={{background: '#f0f0f3'}}
            >
              <Icon
                className="h-4 w-4"
                strokeWidth={1.6}
                style={{color: 'var(--ks-ink)'}}
              />
            </div>
            <h3
              className="mt-3 text-[14px] font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              {title}
            </h3>
            <p
              className="mt-1 text-[12px] leading-relaxed"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── How it works ──────────────────────────────────────────────── */

function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">How it works</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Four steps. Apply once. Earn for every deal.
        </h2>
      </header>
      <ol className="grid gap-3 md:grid-cols-4">
        {howItWorks.map((s) => (
          <li key={s.n} className="premium-card p-6">
            <div
              className="tabular text-[44px] font-semibold leading-none"
              style={{color: 'var(--ks-line)'}}
            >
              0{s.n}
            </div>
            <h3
              className="mt-4 text-[15px] font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              {s.title}
            </h3>
            <p
              className="mt-1.5 text-[13px] leading-relaxed"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── Personas ──────────────────────────────────────────────────── */

function Personas() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">Who joins</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          The network India&apos;s commercial kitchens already run on.
        </h2>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.slug} className="premium-card p-5">
              <div className="flex items-start gap-3">
                <div
                  className="grid h-9 w-9 place-items-center rounded-lg"
                  style={{background: '#f0f0f3'}}
                >
                  <Icon
                    className="h-4 w-4"
                    strokeWidth={1.6}
                    style={{color: 'var(--ks-ink)'}}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-[15px] font-semibold"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="mt-1 text-[12px] leading-relaxed"
                    style={{color: 'var(--ks-ink-2)'}}
                  >
                    {p.blurb}
                  </p>
                  <div
                    className="mt-3 flex items-center gap-4 text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    <span>
                      <b
                        className="tabular"
                        style={{color: 'var(--ks-ink)'}}
                      >
                        {p.avgDealsPerYear}
                      </b>{' '}
                      deals/yr
                    </span>
                    <span>
                      <b style={{color: 'var(--ks-ink)'}}>
                        {p.typicalDealSize}
                      </b>{' '}
                      typical
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── Commission table ──────────────────────────────────────────── */

function CommissionTable() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">Transparent commissions</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Every rate. Published.
        </h2>
        <p
          className="mt-3 max-w-2xl text-[14px] leading-relaxed"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Base rate × tier multiplier = paid commission. Calculated on
          catalog price net of GST. Line-item breakdown sent with every
          payout.
        </p>
      </header>

      <div
        className="overflow-hidden rounded-[var(--ks-radius-md)]"
        style={{
          background: 'var(--ks-card-solid)',
          border: '1px solid var(--ks-line-soft)',
        }}
      >
        <table className="spec-hairline-table w-full text-[13px]">
          <thead
            style={{
              background: 'var(--ks-page-warm)',
              color: 'var(--ks-muted)',
            }}
          >
            <tr>
              <th>Category</th>
              <th className="num">Base rate</th>
              <th className="num">Silver (×1.10)</th>
              <th className="num">Gold (×1.20)</th>
              <th className="num">Platinum (×1.30)</th>
            </tr>
          </thead>
          <tbody>
            {commissionRates.map((r) => (
              <tr key={r.category}>
                <td style={{color: 'var(--ks-ink)'}}>{r.category}</td>
                <td className="num" style={{color: 'var(--ks-ink-2)'}}>
                  {r.rate.toFixed(1)}%
                </td>
                <td className="num" style={{color: 'var(--ks-muted)'}}>
                  {(r.rate * 1.1).toFixed(2)}%
                </td>
                <td
                  className="num font-semibold"
                  style={{color: 'var(--ks-emerald)'}}
                >
                  {(r.rate * 1.2).toFixed(2)}%
                </td>
                <td className="num" style={{color: 'var(--ks-muted)'}}>
                  {(r.rate * 1.3).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── Tiers ─────────────────────────────────────────────────────── */

function Tiers() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">Tiers</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Move up by closing. Unlock more on every step.
        </h2>
      </header>

      <ul className="grid gap-3 lg:grid-cols-4">
        {tiers.map((t, i) => {
          const highlighted = i === 2;
          return (
            <li
              key={t.slug}
              className="premium-card relative p-6"
              style={
                highlighted
                  ? {
                      boxShadow: `0 0 0 1px var(--ks-emerald), 0 18px 50px rgba(0,0,0,.07)`,
                    }
                  : undefined
              }
            >
              {highlighted && (
                <span
                  className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{
                    background: 'var(--ks-emerald-soft)',
                    color: 'var(--ks-emerald-dark)',
                  }}
                >
                  Sweet spot
                </span>
              )}
              <div className="apple-eyebrow">Tier</div>
              <div
                className="mt-1 text-2xl font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                {t.name}
              </div>
              <div
                className="tabular mt-1 text-[13px]"
                style={{color: 'var(--ks-ink-2)'}}
              >
                {t.threshold === null
                  ? t.thresholdLabel
                  : t.threshold === 0
                  ? 'Approved partner'
                  : `From ${formatINRCompact(t.threshold)} closed sales`}
              </div>
              <div
                className="mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{
                  background: 'var(--ks-emerald-soft)',
                  color: 'var(--ks-emerald-dark)',
                }}
              >
                {t.commissionMultiplier.toFixed(2)}× multiplier
              </div>
              <ul
                className="mt-5 space-y-2 text-[13px]"
                style={{color: 'var(--ks-ink-2)'}}
              >
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      strokeWidth={2}
                      style={{color: 'var(--ks-emerald)'}}
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── Payout pipeline ───────────────────────────────────────────── */

function Payout() {
  const stages = [
    {state: 'Accrued',   body: 'Deal closes → commission booked but not yet payable.'},
    {state: 'Approved',  body: 'We dispatch the equipment → moves toward payable.'},
    {state: 'Paid',      body: 'Installation signed off → UPI / bank within a week.'},
    {state: 'TDS',       body: 'Statutory deduction at source → Form 16A quarterly.'},
    {state: 'Statement', body: 'Monthly itemised statement for your records.'},
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <div className="premium-panel p-6 md:p-10">
        <header className="mb-8 max-w-2xl">
          <span className="apple-eyebrow">Payout</span>
          <h2
            className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
            style={{color: 'var(--ks-ink)'}}
          >
            Where the money sits at every stage.
          </h2>
        </header>

        <ol className="grid gap-3 md:grid-cols-5">
          {stages.map((s, i) => (
            <li
              key={s.state}
              className="rounded-[var(--ks-radius-md)] p-4"
              style={{
                background: 'var(--ks-card-solid)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <div
                className="tabular text-[11px] font-semibold uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                Stage {i + 1}
              </div>
              <div
                className="mt-2 text-[14px] font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                {s.state}
              </div>
              <p
                className="mt-1.5 text-[12px] leading-relaxed"
                style={{color: 'var(--ks-ink-2)'}}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────── */

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="apple-eyebrow">FAQ</span>
        <h2
          className="mt-3 text-2xl font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)'}}
        >
          The questions partners always ask.
        </h2>
      </header>

      <ul className="space-y-2">
        {faqs.map((item, i) => (
          <li
            key={item.q}
            className="overflow-hidden rounded-[var(--ks-radius-md)]"
            style={{
              background: 'var(--ks-card-solid)',
              border: '1px solid var(--ks-line-soft)',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span
                className="text-[15px] font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform',
                  open === i && 'rotate-180',
                )}
                style={{color: open === i ? 'var(--ks-ink)' : 'var(--ks-muted)'}}
              />
            </button>
            {open === i && (
              <div
                className="border-t px-5 pb-5 pt-4 text-[14px] leading-relaxed"
                style={{
                  borderColor: 'var(--ks-line-soft)',
                  color: 'var(--ks-ink-2)',
                }}
              >
                {item.a}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <div className="apple-hero relative overflow-hidden px-6 py-12 md:px-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <h3
              className="text-2xl font-semibold leading-tight tracking-tight md:text-[36px]"
              style={{color: 'var(--ks-ink)'}}
            >
              Ready to make the next kitchen you spec{' '}
              <span style={{color: 'var(--ks-emerald)'}}>pay you back</span>?
            </h3>
            <p
              className="mt-3 max-w-xl text-[15px] leading-relaxed"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Nine steps. Three working days to a decision. No joining fee.
              Apply now and join 850+ Keystonne partners across India.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link
              to="/partner/apply"
              prefetch="intent"
              className="partner-action"
            >
              Apply to join
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
