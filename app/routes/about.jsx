import {Link} from 'react-router';
import {ArrowRight, Sparkles, Handshake, Wand2, Layers} from 'lucide-react';

export const meta = () => [
  {title: 'About — Keystonne'},
  {
    name: 'description',
    content:
      "India's commercial kitchen procurement platform — catalog, AI planner, and a formalised partner network in one app.",
  },
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-4 pt-12 md:px-6 md:pt-20">
        <span className="apple-eyebrow">About Keystonne</span>
        <h1
          className="mt-3 text-[32px] font-semibold tracking-tight md:text-[56px] md:leading-[1.04]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Commercial kitchen procurement, made transparent.
        </h1>
        <p
          className="mt-5 max-w-3xl text-base md:text-lg"
          style={{color: 'var(--ks-ink-2)'}}
        >
          India runs on its commercial kitchens — over a million of them.
          Today, sourcing a kitchen means stitching together a dozen vendors
          over forty WhatsApp messages, paying opaque markups, and
          discovering installation delays the week before opening.
          Keystonne is building the procurement platform this industry
          deserves: one catalog, one quote, one invoice.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
        <h2
          className="text-[24px] font-semibold tracking-tight md:text-[32px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Three product surfaces, one platform.
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          <Pillar
            icon={Layers}
            title="Storefront"
            body="Dense, spec-grade catalog. Every product ships with dimensions, power draw, freight class, and lead time published up front. GST invoice on every order."
            href="/collections/refrigeration"
            cta="Browse the catalog"
          />
          <Pillar
            icon={Handshake}
            title="Partner Portal"
            body="Formalises the consultant + chef network India's kitchens already run on. Published commission rates, real-time deal tracking, GST + TDS handled, payouts on installation."
            href="/partner"
            cta="Become a partner"
            accent="emerald"
          />
          <Pillar
            icon={Wand2}
            title="AI Layer"
            body="Describe your kitchen — we hand back an equipment plan and instant capex estimate. Drop in a BOQ from your consultant and we extract every line + flag custom items."
            href="/kitchen-planner"
            cta="Plan a kitchen"
            accent="blue"
          />
        </ul>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-12 md:px-6 md:pb-16">
        <div className="premium-panel p-7 md:p-10">
          <div
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-muted)'}}
          >
            <Sparkles className="h-3.5 w-3.5" />
            What we believe
          </div>
          <ul
            className="mt-5 space-y-5 text-base"
            style={{color: 'var(--ks-ink-2)'}}
          >
            <li>
              <span
                className="font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Spec quality is sales quality.
              </span>{' '}
              The single biggest reason kitchens fail in their first year
              is over- or under-spec&apos;d equipment. We publish enough
              detail per product that buyers can verify the spec themselves.
            </li>
            <li>
              <span
                className="font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Transparent commissions outperform kickbacks.
              </span>{' '}
              Every Keystonne partner sees the same per-category rate ×
              tier multiplier. No backroom deals. The numbers compound for
              everyone.
            </li>
            <li>
              <span
                className="font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                AI earns its keep when it saves chef time.
              </span>{' '}
              Our planner doesn&apos;t suggest equipment — it suggests
              workflow, with equipment grouped by station. That&apos;s the
              level of usefulness this market expects.
            </li>
            <li>
              <span
                className="font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                India-first defaults.
              </span>{' '}
              ₹ Indian comma grouping, 18% GST shown separately,
              DD-MMM-YYYY dates, 71/29 payment terms, e-way bills, Form
              16A. Nothing assumed from elsewhere.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-20 md:px-6">
        <div className="apple-hero p-7 md:p-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="apple-eyebrow">Next step</span>
              <h2
                className="mt-2 text-[22px] font-semibold tracking-tight md:text-[28px]"
                style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
              >
                Working on a kitchen project right now?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/kitchen-planner"
                className="apple-button-primary"
                style={{background: 'var(--ks-blue)', borderColor: 'rgba(0,113,227,0.5)'}}
              >
                <Wand2 className="h-4 w-4" /> Plan a kitchen
              </Link>
              <Link
                to="/contact"
                className="apple-button-ghost"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({icon: Icon, title, body, href, cta, accent}) {
  const accentColor =
    accent === 'emerald'
      ? 'var(--ks-emerald)'
      : accent === 'blue'
      ? 'var(--ks-blue)'
      : 'var(--ks-ink)';
  return (
    <li className="premium-card p-6">
      <div
        className="grid h-11 w-11 place-items-center rounded-2xl"
        style={{
          background: 'var(--ks-card-tint)',
          color: 'var(--ks-ink)',
          border: '1px solid var(--ks-line-soft)',
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <h3
        className="mt-4 text-lg font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        {title}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{color: 'var(--ks-ink-2)'}}
      >
        {body}
      </p>
      <Link
        to={href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
        style={{color: accentColor}}
      >
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </li>
  );
}
