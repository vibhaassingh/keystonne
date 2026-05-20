import {Link} from 'react-router';
import {ArrowRight, Sparkles, Handshake, Wand2, Layers} from 'lucide-react';

export const meta = () => [
  {title: 'About — Keystonne'},
  {name: 'description', content: 'India\'s commercial kitchen procurement platform — catalog, AI planner, and a formalised partner network in one app.'},
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-4 pt-12 md:px-6 md:pt-16">
        <span className="eyebrow">About Keystonne</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-5xl md:leading-[1.04]">
          Commercial kitchen procurement, made transparent.
        </h1>
        <p className="mt-5 max-w-3xl text-base text-gray-600 md:text-lg">
          India runs on its commercial kitchens — over a million of them.
          Today, sourcing a kitchen means stitching together a dozen
          vendors over forty WhatsApp messages, paying opaque markups, and
          discovering installation delays the week before opening.
          Keystonne is building the procurement platform this industry
          deserves: one catalog, one quote, one invoice.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Three product surfaces, one platform.
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          <Pillar
            icon={Layers}
            title="Storefront"
            body="Dense, spec-grade catalog. Every product ships with dimensions, power draw, freight class, and lead time published up front. GST invoice on every order."
            href="/collections/all"
            cta="Browse the catalog"
          />
          <Pillar
            icon={Handshake}
            title="Partner Portal"
            body="Formalises the consultant + chef network India's kitchens already run on. Published commission rates, real-time deal tracking, GST + TDS handled, payouts on installation."
            href="/partner"
            cta="Become a partner"
          />
          <Pillar
            icon={Wand2}
            title="AI Layer"
            body="Describe your kitchen — we hand back an equipment plan and instant capex estimate. Drop in a BOQ from your consultant and we extract every line + flag custom items."
            href="/kitchen-planner"
            cta="Plan a kitchen"
          />
        </ul>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-12 md:px-6 md:pb-16">
        <div
          className="rounded-3xl border border-gray-200 bg-white/85 p-6 backdrop-blur md:p-10"
          style={{boxShadow: 'var(--shadow-glass)'}}
        >
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
            <Sparkles className="h-3.5 w-3.5" />
            What we believe
          </div>
          <ul className="mt-4 space-y-4 text-base text-gray-700">
            <li>
              <span className="font-semibold text-ink">Spec quality is sales quality.</span>{' '}
              The single biggest reason kitchens fail in their first year is over- or under-spec'd equipment. We publish enough detail per product that buyers can verify the spec themselves.
            </li>
            <li>
              <span className="font-semibold text-ink">Transparent commissions outperform kickbacks.</span>{' '}
              Every Keystonne partner sees the same per-category rate × tier multiplier. No backroom deals. The numbers compound for everyone.
            </li>
            <li>
              <span className="font-semibold text-ink">AI earns its keep when it saves chef time.</span>{' '}
              Our planner doesn't suggest equipment — it suggests workflow, with equipment grouped by station. That's the level of usefulness this market expects.
            </li>
            <li>
              <span className="font-semibold text-ink">India-first defaults.</span>{' '}
              ₹ Indian comma grouping, 18% GST shown separately, DD-MMM-YYYY dates, 71/29 payment terms, e-way bills, Form 16A. Nothing assumed from elsewhere.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-20 md:px-6">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-ink md:text-2xl">
            Working on a kitchen project right now?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/kitchen-planner"
              className="inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-3 text-sm font-semibold"
            >
              <Wand2 className="h-4 w-4" /> Plan a kitchen
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
            >
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({icon: Icon, title, body, href, cta}) {
  return (
    <li className="card card-hover p-6">
      <div
        className="grid h-10 w-10 place-items-center rounded-xl text-white"
        style={{background: 'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))'}}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
      <Link to={href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline">
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </li>
  );
}
