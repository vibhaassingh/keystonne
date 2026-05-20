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
 * inside the Apple-style PartnerShell, redirects to /partner/login if
 * the demo session flag isn't set.
 *
 * Composition:
 *   ┌────────────────────────────────────────────────────┐
 *   │ Greeting + dual CTAs                               │
 *   │ Earnings tiles (4 finance cards)                   │
 *   │ Tier progress + Referral side by side              │
 *   │ Attention strip (conflicts / waiting)              │
 *   │ Recent deals (spec-hairline-table)                 │
 *   │ Two next-best-action cards                         │
 *   └────────────────────────────────────────────────────┘
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
      {/* Greeting + dual CTAs */}
      <header className="mb-7 grid gap-4 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="apple-eyebrow">Overview</span>
          <h1
            className="mt-3 text-[28px] font-semibold tracking-tight md:text-[36px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            Good to see you back, {demoPartner.name.split(' ')[0]}.
          </h1>
          <p
            className="mt-2 text-sm md:text-base"
            style={{color: 'var(--ks-ink-2)'}}
          >
            You&apos;ve closed{' '}
            <span
              style={{
                color: 'var(--ks-ink)',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {formatINRCompact(demoPartner.ytdClosed)}
            </span>{' '}
            this year against a{' '}
            <span style={{fontVariantNumeric: 'tabular-nums'}}>
              {formatINRCompact(demoPartner.yearlyTargetINR)}
            </span>{' '}
            target — {totalGoalPct}% of the way there.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
          <Link
            to="/partner/dashboard/deals/new"
            className="partner-action"
          >
            <Plus className="h-4 w-4" />
            Register a deal
          </Link>
          <Link
            to="/kitchen-planner"
            className="apple-button-ghost"
          >
            <Wand2
              className="h-4 w-4"
              style={{color: 'var(--ks-blue)'}}
              strokeWidth={1.6}
            />
            AI planner
          </Link>
        </div>
      </header>

      {/* Earnings tiles */}
      <ul className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li>
          <EarningsCard
            label="Total earned · YTD"
            valueINR={t.totalEarned}
            sub="Booked across all closed deals"
            accent="ink"
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
            accent="ink"
          />
        </li>
      </ul>

      {/* Tier progress + Referral side by side */}
      <div className="mb-7 grid gap-4 lg:grid-cols-12">
        <div className="premium-panel p-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-muted)'}}
            >
              Tier progress
            </span>
            <Link
              to="/partner"
              className="apple-link text-[12px]"
            >
              How tiers work →
            </Link>
          </div>
          <div className="mt-5">
            <TierProgressBar
              tier={demoPartner.tier}
              currentSales={demoPartner.tierProgress.currentSales}
              nextTier={demoPartner.tierProgress.nextTier}
              nextTierThreshold={demoPartner.tierProgress.nextTierThreshold}
            />
          </div>
          <div
            className="mt-6 grid grid-cols-3 gap-3 pt-5"
            style={{borderTop: '1px solid var(--ks-line-soft)'}}
          >
            <SmallStat label="Active deals" value={demoPartner.activeDeals} />
            <SmallStat label="Won (YTD)" value={demoPartner.wonDealsYTD} accent="emerald" />
            <SmallStat label="Lost (YTD)" value={demoPartner.lostDealsYTD} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <ReferralLinkPanel handle={demoPartner.referralCode} />
        </div>
      </div>

      {/* Attention strip — conflict / waiting */}
      {needsAttention.length > 0 && (
        <div
          className="mb-7 rounded-[var(--ks-radius-lg)] p-5"
          style={{
            background: '#fff8eb',
            border: '1px solid rgba(184,107,0,0.22)',
          }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{color: 'var(--ks-amber-dark)'}}
            />
            <div className="flex-1">
              <div
                className="text-sm font-semibold"
                style={{color: '#7a4500'}}
              >
                {needsAttention.length} deal
                {needsAttention.length > 1 ? 's' : ''} need your attention
              </div>
              <ul className="mt-3 space-y-2 text-[13px]">
                {needsAttention.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3"
                    style={{color: '#7a4500'}}
                  >
                    <div className="min-w-0">
                      <Link
                        to={`/partner/dashboard/deals/${d.id}`}
                        className="font-semibold hover:underline"
                        style={{color: '#5b3300'}}
                      >
                        {d.project}
                      </Link>
                      <span className="ml-2 opacity-70">{d.id}</span>
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
      <div className="premium-panel overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2
              className="text-base font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              Recent deals
            </h2>
            <p
              className="text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              The last 5 deals you registered, newest first.
            </p>
          </div>
          <Link
            to="/partner/dashboard/deals"
            className="apple-link inline-flex items-center gap-1 text-sm"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <table className="spec-hairline-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th className="num">Value</th>
              <th className="num">Registered</th>
              <th className="num">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {recentDeals.map((d) => (
              <tr key={d.id}>
                <td>
                  <Link
                    to={`/partner/dashboard/deals/${d.id}`}
                    className="font-semibold"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {d.project}
                  </Link>
                  <div
                    className="text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {d.id} · {d.city}
                  </div>
                </td>
                <td style={{color: 'var(--ks-ink-2)'}}>
                  {d.client}
                  <div
                    className="text-[11px]"
                    style={{color: 'var(--ks-muted)'}}
                  >
                    {d.decisionMaker}
                  </div>
                </td>
                <td
                  className="num"
                  style={{color: 'var(--ks-ink)', fontWeight: 600}}
                >
                  {formatINR(d.estValueINR)}
                </td>
                <td className="num" style={{color: 'var(--ks-ink-2)'}}>
                  {formatDate(d.registeredAt)}
                </td>
                <td className="num">
                  <DealStatusPill state={d.state} />
                </td>
                <td className="num" style={{width: 32}}>
                  <Link
                    to={`/partner/dashboard/deals/${d.id}`}
                    aria-label="Open deal"
                    className="inline-grid h-7 w-7 place-items-center rounded-full"
                    style={{color: 'var(--ks-muted)'}}
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
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <NbaCard
          title="Build a quote with the catalog"
          body="Use the quote builder to assemble line items, share a co-branded PDF, and track opens."
          to="/partner/dashboard/quotes/new"
          cta="Open quote builder"
          icon={FileText}
        />
        <NbaCard
          title="Spec a kitchen with the AI planner"
          body="Describe the project to get a category-grouped equipment list. Convert directly into a deal registration."
          to="/kitchen-planner"
          cta="Launch planner"
          icon={Wand2}
          aiTone
        />
      </div>
    </PartnerShell>
  );
}

function SmallStat({label, value, accent = 'ink'}) {
  const valueColor =
    accent === 'emerald' ? 'var(--ks-emerald)' : 'var(--ks-ink)';
  return (
    <div>
      <div
        className="text-[10px] font-medium uppercase tracking-[0.10em]"
        style={{color: 'var(--ks-muted)'}}
      >
        {label}
      </div>
      <div
        className="mt-1 text-lg font-semibold"
        style={{color: valueColor, fontVariantNumeric: 'tabular-nums'}}
      >
        {value}
      </div>
    </div>
  );
}

function NbaCard({title, body, to, cta, icon: Icon = FileText, aiTone}) {
  return (
    <Link
      to={to}
      className="premium-card group block p-6"
    >
      <div className="flex items-start gap-4">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
          style={
            aiTone
              ? {
                  background: 'var(--ks-blue-soft)',
                  color: 'var(--ks-blue-dark)',
                }
              : {
                  background: 'var(--ks-card-tint)',
                  color: 'var(--ks-ink)',
                  border: '1px solid var(--ks-line-soft)',
                }
          }
        >
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-base font-semibold"
            style={{color: 'var(--ks-ink)'}}
          >
            {title}
          </div>
          <p
            className="mt-1 text-[13px] leading-relaxed"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {body}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium"
            style={{
              color: aiTone ? 'var(--ks-blue)' : 'var(--ks-ink)',
            }}
          >
            {cta} <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
