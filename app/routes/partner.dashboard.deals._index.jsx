import {useState, useMemo} from 'react';
import {Link} from 'react-router';
import {Plus, Search, ChevronRight, Filter} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {DealStatusPill} from '~/components/partner/DealStatusPill';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {deals, DEAL_STATE_META} from '~/lib/mock/deals';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';
import {cn} from '~/lib/utils/cn';

export const meta = () => [{title: 'Deals — Keystonne Partner'}];

const FILTERS = [
  {value: 'all',       label: 'All'},
  {value: 'open',      label: 'Open'},        // not lost / expired / paid
  {value: 'attention', label: 'Attention'},   // conflict + submitted
  {value: 'closed',    label: 'Closed'},      // won/installed/accrued/approved/paid
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
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Deals</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Every project, every state.
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {deals.length} deals total · {visible.length} shown
          </p>
        </div>
        <Link
          to="/partner/dashboard/deals/new"
          className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          Register a deal
        </Link>
      </header>

      <div className="mb-4 grid gap-3 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, clients, or KD-IDs"
              className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15"
            />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
            <Filter className="ml-2 h-3.5 w-3.5 text-gray-400" />
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  'flex-1 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition-colors',
                  filter === f.value
                    ? 'bg-brand-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-3">Project</th>
              <th className="px-5 py-3">Client</th>
              <th className="tabular px-5 py-3 text-right">Est. value</th>
              <th className="px-5 py-3 text-right">Registered</th>
              <th className="px-5 py-3 text-right">Status</th>
              <th className="px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">
                  No deals match your filters.
                </td>
              </tr>
            )}
            {visible.map((d) => (
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
    </PartnerShell>
  );
}
