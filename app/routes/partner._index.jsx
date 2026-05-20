import {useState} from 'react';
import {Link} from 'react-router';
import {
  ArrowRight, ArrowUpRight, ChevronDown, Handshake, Check,
  Sparkles, Wallet, Calendar, TrendingUp, ShieldCheck,
} from 'lucide-react';
import {
  personas, tiers, commissionRates, howItWorks, faqs,
} from '~/lib/mock/partnerProgram';
import {formatINRCompact} from '~/lib/utils/formatINR';
import {cn} from '~/lib/utils/cn';

/**
 * Partner-programme marketing page. The conversion page for the partner
 * portal — every partner-portal route ultimately hangs off here.
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

function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-8 md:px-6">
      <div
        className="relative overflow-hidden rounded-3xl text-white mesh-emerald"
        style={{boxShadow: '0 30px 80px -30px rgba(5,46,30,0.55), inset 0 1px 0 rgba(255,255,255,0.08)'}}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl" />
        </div>

        <div className="relative grid gap-8 px-6 py-14 md:grid-cols-12 md:items-center md:px-14 md:py-24">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
              <Handshake className="h-3.5 w-3.5" />
              Keystonne Partner Programme
            </span>
            <h1 className="mt-5 max-w-2xl text-[36px] font-semibold leading-[1.04] tracking-tight md:text-[56px]">
              Spec kitchens. Earn transparently. Get paid on installation.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
              India’s commercial-kitchen sales already run on a network of
              consultants, chefs, and F&B leaders. Keystonne formalises it
              — published commission rates, real-time deal tracking, GST
              + TDS handled, payouts on installation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/partner/apply"
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-partner-accent shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/partner/login"
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
              >
                Existing partner? Sign in
              </Link>
            </div>
            <p className="mt-4 text-[12px] text-white/60">
              No joining fee. No exclusivity clauses. We earn when you earn.
            </p>
          </div>

          <aside className="md:col-span-5">
            <div
              className="rounded-2xl border border-white/25 bg-white/12 p-6 backdrop-blur-2xl"
              style={{boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.28)'}}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                  Programme at a glance
                </span>
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                  Live
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <Stat label="Avg commission" value="6.5%" sub="On closed orders" />
                <Stat label="Median payout" value="11d" sub="From install" />
                <Stat label="Active partners" value="850+" sub="Across India" />
              </div>

              <div className="mt-6 space-y-3 text-sm text-white/85">
                <Bullet>Bronze · Silver · Gold tiers with published thresholds</Bullet>
                <Bullet>GST + TDS handled automatically; Form 16A every quarter</Bullet>
                <Bullet>UPI / bank payouts weekly · co-branded quote PDFs</Bullet>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stat({label, value, sub}) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">{label}</div>
      <div className="tabular mt-1 text-2xl font-semibold text-white">{value}</div>
      <div className="text-[11px] text-white/65">{sub}</div>
    </div>
  );
}

function Bullet({children}) {
  return (
    <div className="flex items-start gap-2">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
      <span>{children}</span>
    </div>
  );
}

function Promises() {
  const items = [
    {icon: TrendingUp, title: 'Published rates', body: 'Every partner sees the same per-category rate × tier multiplier. No backroom negotiations.'},
    {icon: Calendar, title: 'Real-time tracking', body: 'Watch your deal move from registered → quoted → won → installed → paid. No more WhatsApp chasing.'},
    {icon: Wallet, title: 'Paid on installation', body: 'Commission releases the moment the kitchen is signed off. Median 11 days end-to-end.'},
    {icon: ShieldCheck, title: 'Compliance handled', body: 'GST, TDS, Form 16A all generated automatically. You stay clean.'},
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Why partners switch</span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Four promises the informal market can’t make.
        </h2>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({icon: Icon, title, body}) => (
          <li key={title} className="card p-5">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl text-white"
              style={{background: 'linear-gradient(135deg, var(--color-partner-accent), #047857)', boxShadow: '0 6px 16px -8px rgba(5,150,105,0.55)'}}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-gray-600">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Four steps. Apply once. Earn for every deal.
        </h2>
      </header>
      <ol className="grid gap-4 md:grid-cols-4">
        {howItWorks.map((s) => (
          <li key={s.n} className="card relative overflow-hidden p-6">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />
            <div className="relative">
              <div className="tabular text-[44px] font-semibold leading-none text-partner-accent/30">
                0{s.n}
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Personas() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Who joins</span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          The people the Indian commercial-kitchen market already runs on.
        </h2>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.slug} className="card card-hover p-5">
              <div className="flex items-start gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-white"
                  style={{background: 'linear-gradient(135deg, var(--color-partner-accent), #047857)'}}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                    {p.blurb}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-gray-500">
                    <span><b className="tabular text-ink">{p.avgDealsPerYear}</b> deals/yr</span>
                    <span><b className="text-ink">{p.typicalDealSize}</b> typical</span>
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

function CommissionTable() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Transparent commissions</span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Every rate. Published.
        </h2>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          Base rate × tier multiplier = paid commission. Calculated on
          catalog price net of GST. We send a line-item breakdown with
          every payout.
        </p>
      </header>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-3">Category</th>
              <th className="tabular px-5 py-3 text-right">Base rate</th>
              <th className="tabular px-5 py-3 text-right">Silver (×1.10)</th>
              <th className="tabular px-5 py-3 text-right">Gold (×1.20)</th>
              <th className="tabular px-5 py-3 text-right">Platinum (×1.30)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {commissionRates.map((r) => (
              <tr key={r.category}>
                <td className="px-5 py-3 font-medium text-ink">{r.category}</td>
                <td className="tabular px-5 py-3 text-right">{r.rate.toFixed(1)}%</td>
                <td className="tabular px-5 py-3 text-right text-gray-600">{(r.rate * 1.1).toFixed(2)}%</td>
                <td className="tabular px-5 py-3 text-right font-semibold text-partner-accent">{(r.rate * 1.2).toFixed(2)}%</td>
                <td className="tabular px-5 py-3 text-right text-gray-600">{(r.rate * 1.3).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Tiers</span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Move up by closing deals. Unlock more on every step.
        </h2>
      </header>

      <ul className="grid gap-3 lg:grid-cols-4">
        {tiers.map((t, i) => (
          <li
            key={t.slug}
            className={cn(
              'card relative overflow-hidden p-6',
              i === 2 && 'ring-2 ring-partner-accent',
            )}
          >
            {i === 2 && (
              <span className="absolute right-4 top-4 rounded-full bg-partner-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Sweet spot
              </span>
            )}
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
              Tier
            </div>
            <div className="mt-1 text-2xl font-semibold text-ink">{t.name}</div>
            <div className="tabular mt-1 text-sm text-gray-600">
              {t.threshold === null
                ? t.thresholdLabel
                : t.threshold === 0
                ? 'Approved partner'
                : `From ${formatINRCompact(t.threshold)} closed sales`}
            </div>
            <div className="mt-3 inline-flex items-center rounded-full bg-partner-accent/10 px-2.5 py-0.5 text-[11px] font-bold text-partner-accent">
              {t.commissionMultiplier.toFixed(2)}× multiplier
            </div>
            <ul className="mt-5 space-y-2 text-[13px] text-gray-700">
              {t.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-partner-accent" />
                  {perk}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Payout() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <div
        className="rounded-3xl border border-gray-200 bg-white/85 p-6 backdrop-blur-2xl md:p-10"
        style={{boxShadow: 'var(--shadow-glass)'}}
      >
        <header className="mb-8 max-w-2xl">
          <span className="eyebrow">Payout</span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Where the money sits at every stage.
          </h2>
        </header>

        <ol className="grid gap-3 md:grid-cols-5">
          {[
            {state: 'Accrued',    body: 'When your deal closes — commission booked but not yet payable.', accent: 'bg-amber-100 text-amber-700'},
            {state: 'Approved',   body: 'When we dispatch the equipment — commission moves toward payable.', accent: 'bg-emerald-100 text-emerald-700'},
            {state: 'Paid',       body: 'When installation is signed off — UPI / bank payout within a week.', accent: 'bg-green-100 text-green-700'},
            {state: 'TDS',        body: 'Statutory deduction (typically 10%) — Form 16A every quarter.', accent: 'bg-indigo-100 text-indigo-700'},
            {state: 'Statement',  body: 'Monthly statement with every line-item breakdown for your records.', accent: 'bg-slate-100 text-slate-700'},
          ].map((s, i) => (
            <li key={s.state} className="relative">
              <div className="card p-4">
                <div className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider', s.accent)}>
                  {i + 1}. {s.state}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-700">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          The questions partners always ask.
        </h2>
      </header>

      <ul className="space-y-2">
        {faqs.map((item, i) => (
          <li key={item.q} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-semibold text-ink">{item.q}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-gray-400 transition-transform',
                  open === i && 'rotate-180 text-brand-primary',
                )}
              />
            </button>
            {open === i && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-4 text-[14px] leading-relaxed text-gray-700">
                {item.a}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-12 text-white md:px-14 md:py-16 mesh-emerald"
        style={{boxShadow: '0 30px 80px -30px rgba(5,46,30,0.55)'}}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <h3 className="text-2xl font-semibold leading-tight md:text-4xl">
              Ready to make the next kitchen you spec pay you back?
            </h3>
            <p className="mt-3 max-w-xl text-white/85">
              Nine steps. Three working days to a decision. No joining fee.
              Apply now and join 850+ Keystonne partners across India.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link
              to="/partner/apply"
              prefetch="intent"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-partner-accent shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Apply to join <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
