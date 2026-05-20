import {Link} from 'react-router';
import {
  ArrowRight, Plus, Wand2, FileText, ChevronRight, AlertCircle,
} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {EarningsCard} from '~/components/partner/EarningsCard';
import {TierProgressBar} from '~/components/partner/TierProgressBar';
import {ReferralLinkPanel} from '~/components/partner/ReferralLinkPanel';
import {DealStatusPill} from '~/components/partner/DealStatusPill';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {demoPartner} from '~/lib/mock/partner';
import {deals} from '~/lib/mock/deals';
import {formatINR, formatINRCompact} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';

/**
 * Partner dashboard — overview. Routed at /partner/dashboard. Renders
 * inside PartnerShell, redirects to /partner/login if the demo session
 * flag isn't set.
 *
 *  ┌─────────────────────────────────────────┐
 *  │  Header: greeting + next-best-action    │
 *  │  Earnings cards (4)                     │
 *  │  Tier progress + Referral panel         │
 *  │  Recent deals table                     │
 *  │  Conflict / attention panel             │
 *  └─────────────────────────────────────────┘
 */

export const meta = () => [
  {title: 'Partner overview — Keystonne'},
];

export default function PartnerOverview() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  if (!hydrated || !isLoggedIn) return null;

  const recentDeals = [...deals]
    .sort((a, b) => (a.registeredAt < b.registeredAt ? 1 : -1))
    .slice(0, 5);

  const needsAttention = deals.filter(
    (d) => d.state === 'conflict' || d.state === 'submitted',
  );

  const t = demoPartner.totals;
  const totalGoalPct = Math.min(
    100,
    Math.round((demoPartner.ytdClosed / demoPartner.yearlyTargetINR) * 100),
  );

  return (
    <PartnerShell>
      {/* Greeting + next best action */}
      <header className="mb-6 grid gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="eyebrow">Overview</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Good to see you back, {demoPartner.name.split(' ')[0]}.
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            You&apos;ve closed{' '}
            <span className="tabular font-semibold text-ink">
              {formatINRCompact(demoPartner.ytdClosed)}
            </span>{' '}
            this year against a{' '}
            <span className="tabular">
              {formatINRCompact(demoPartner.yearlyTargetINR)}
            </span>{' '}
            target — {totalGoalPct}% of the way there.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
          <Link
            to="/partner/dashboard/deals/new"
            className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
          >
            <Plus className="h-4 w-4" />
            Register a deal
          </Link>
          <Link
            to="/kitchen-planner"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/40"
          >
            <Wand2 className="h-4 w-4 text-brand-accent" />
            AI planner
          </Link>
        </div>
      </header>

      {/* Earnings tiles */}
      <ul className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li>
          <EarningsCard
            label="Total earned · YTD"
            valueINR={t.totalEarned}
            sub="Booked across all closed deals"
            accent="indigo"
            trend={{direction: 'up', label: '+18% vs last quarter'}}
          />
        </li>
        <li>
          <EarningsCard
            label="Paid out"
            valueINR={t.paidCommission}
            sub="Net of TDS, settled to UPI"
            accent="emerald"
          />
        </li>
        <li>
          <EarningsCard
            label="Pending"
            valueINR={t.pendingCommission}
            sub="Awaiting installation sign-off"
            accent="amber"
          />
        </li>
        <li>
          <EarningsCard
            label="Accruing"
            valueINR={t.accruedCommission}
            sub="From deals in progress"
            accent="indigo"
          />
        </li>
      </ul>

      {/* Tier progress + Referral side by side */}
      <div className="mb-6 grid gap-3 lg:grid-cols-12">
        <div className="card p-5 lg:col-span-7">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
              Tier progress
            </span>
            <Link
              to="/partner"
              className="text-[12px] font-semibold text-brand-primary hover:underline"
            >
              How tiers work →
            </Link>
          </div>
          <div className="mt-4">
            <TierProgressBar
              tier={demoPartner.tier}
              currentSales={demoPartner.tierProgress.currentSales}
              nextTier={demoPartner.tierProgress.nextTier}
              nextTierThreshold={demoPartner.tierProgress.nextTierThreshold}
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
            <SmallStat label="Active deals" value={demoPartner.activeDeals} />
            <SmallStat label="Won (YTD)" value={demoPartner.wonDealsYTD} />
            <SmallStat label="Lost (YTD)" value={demoPartner.lostDealsYTD} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <ReferralLinkPanel handle={demoPartner.referralCode} />
        </div>
      </div>

      {/* Attention panel — conflict / waiting */}
      {needsAttention.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-amber-900">
                {needsAttention.length} deal{needsAttention.length > 1 ? 's' : ''} need your attention
              </div>
              <ul className="mt-2 space-y-1.5 text-[13px] text-amber-900/80">
                {needsAttention.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/partner/dashboard/deals/${d.id}`}
                        className="font-semibold text-amber-900 hover:underline"
                      >
                        {d.project}
                      </Link>
                      <span className="ml-2 text-amber-900/60">{d.id}</span>
                    </div>
                    <DealStatusPill state={d.state} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recent deals */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-ink">Recent deals</h2>
            <p className="text-[12px] text-gray-500">
              The last 5 deals you registered, newest first.
            </p>
          </div>
          <Link
            to="/partner/dashboard/deals"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-3">Project</th>
              <th className="px-5 py-3">Client</th>
              <th className="tabular px-5 py-3 text-right">Value</th>
              <th className="px-5 py-3 text-right">Registered</th>
              <th className="px-5 py-3 text-right">Status</th>
              <th className="px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentDeals.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <Link
                    to={`/partner/dashboard/deals/${d.id}`}
                    className="font-semibold text-ink hover:text-brand-primary"
                  >
                    {d.project}
                  </Link>
                  <div className="text-[11px] text-gray-500">
                    {d.id} · {d.city}
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-700">
                  {d.client}
                  <div className="text-[11px] text-gray-500">
                    {d.decisionMaker}
                  </div>
                </td>
                <td className="tabular px-5 py-4 text-right font-semibold text-ink">
                  {formatINR(d.estValueINR)}
                </td>
                <td className="tabular px-5 py-4 text-right text-gray-600">
                  {formatDate(d.registeredAt)}
                </td>
                <td className="px-5 py-4 text-right">
                  <DealStatusPill state={d.state} />
                </td>
                <td className="px-2 py-4 text-right">
                  <Link
                    to={`/partner/dashboard/deals/${d.id}`}
                    aria-label="Open deal"
                    className="grid h-7 w-7 place-items-center rounded text-gray-400 hover:bg-gray-100 hover:text-ink"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Next best action footer */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <NbaCard
          title="Build a quote with the catalog"
          body="Use the quote builder to assemble line items, share a co-branded PDF, and track opens."
          to="/partner/dashboard/quotes/new"
          cta="Open quote builder"
        />
        <NbaCard
          title="Spec a kitchen with the AI planner"
          body="Describe the project to get a category-grouped equipment list. Convert directly into a deal registration."
          to="/kitchen-planner"
          cta="Launch planner"
          icon={Wand2}
        />
      </div>
    </PartnerShell>
  );
}

function SmallStat({label, value}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-gray-500">
        {label}
      </div>
      <div className="tabular mt-1 text-lg font-semibold text-ink">
        {value}
      </div>
    </div>
  );
}

function NbaCard({title, body, to, cta, icon: Icon = FileText}) {
  return (
    <Link
      to={to}
      className="card card-hover group flex items-start gap-3 p-5"
    >
      <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
        style={{
          background:
            'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
          boxShadow: '0 8px 20px -8px rgba(67,56,202,0.45)',
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-base font-semibold text-ink">{title}</div>
        <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
          {body}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-primary group-hover:underline">
          {cta} <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
