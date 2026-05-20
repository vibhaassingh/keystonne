import {useState, useMemo} from 'react';
import {Link} from 'react-router';
import {Plus, Search, ChevronRight} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {DealStatusPill} from '~/components/partner/DealStatusPill';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {deals} from '~/lib/mock/deals';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';
import {cn} from '~/lib/utils/cn';

export const meta = () => [{title: 'Deals — Keystonne Partner'}];

const FILTERS = [
  {value: 'all',       label: 'All'},
  {value: 'open',      label: 'Open'},
  {value: 'attention', label: 'Attention'},
  {value: 'closed',    label: 'Closed'},
  {value: 'lost',      label: 'Lost / expired'},
];

function categorise(d) {
  if (['lost', 'expired'].includes(d.state)) return 'lost';
  if (['conflict', 'submitted'].includes(d.state)) return 'attention';
  if (['won', 'installed', 'commission_accrued', 'commission_approved', 'paid'].includes(d.state)) return 'closed';
  return 'open';
}

export default function PartnerDeals() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  const visible = useMemo(() => {
    let out = [...deals];
    if (filter !== 'all') out = out.filter((d) => categorise(d) === filter);
    if (q) {
      const needle = q.toLowerCase();
      out = out.filter(
        (d) =>
          d.project.toLowerCase().includes(needle) ||
          d.client.toLowerCase().includes(needle) ||
          d.id.toLowerCase().includes(needle),
      );
    }
    return out.sort((a, b) => (a.registeredAt < b.registeredAt ? 1 : -1));
  }, [filter, q]);

  if (!hydrated || !isLoggedIn) return null;

  return (
    <PartnerShell>
      <header className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="apple-eyebrow">Deals</span>
          <h1
            className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            Every project, every state.
          </h1>
          <p
            className="mt-2 text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {deals.length} deals total · {visible.length} shown
          </p>
        </div>
        <Link
          to="/partner/dashboard/deals/new"
          className="partner-action"
        >
          <Plus className="h-4 w-4" />
          Register a deal
        </Link>
      </header>

      <div className="mb-5 grid gap-3 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{color: 'var(--ks-muted)'}}
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, clients, or KD-IDs"
              className="h-11 w-full rounded-full pl-10 pr-3 text-sm focus:outline-none"
              style={{
                background: 'var(--ks-card-tint)',
                border: '1px solid var(--ks-line-soft)',
                color: 'var(--ks-ink)',
              }}
            />
          </div>
        </div>
        <div className="md:col-span-5">
          <div
            className="flex items-center gap-1 rounded-full p-1"
            style={{
              background: 'var(--ks-card-tint)',
              border: '1px solid var(--ks-line-soft)',
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  'flex-1 rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                )}
                style={
                  filter === f.value
                    ? {
                        background: 'var(--ks-ink)',
                        color: '#ffffff',
                      }
                    : {color: 'var(--ks-ink-2)'}
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="premium-panel overflow-hidden">
        <table className="spec-hairline-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th className="num">Est. value</th>
              <th className="num">Registered</th>
              <th className="num">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm"
                  style={{color: 'var(--ks-muted)'}}
                >
                  No deals match your filters.
                </td>
              </tr>
            )}
            {visible.map((d) => (
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
    </PartnerShell>
  );
}
