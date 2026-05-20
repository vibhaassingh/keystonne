import {useState} from 'react';
import {Folder, Lock, Download, Search, FileText, Film, Box} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {resources} from '~/lib/mock/resources';
import {demoPartner} from '~/lib/mock/partner';
import {cn} from '~/lib/utils/cn';

export const meta = () => [{title: 'Resources — Keystonne Partner'}];

const ICONS = {PDF: FileText, DWG: Box, MP4: Film, ZIP: Box};

const TIER_ORDER = ['Bronze', 'Silver', 'Gold', 'Platinum'];

export default function PartnerResources() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const [q, setQ] = useState('');
  const [toast, setToast] = useState(null);

  if (!hydrated || !isLoggedIn) return null;

  const partnerTierIdx = TIER_ORDER.indexOf(demoPartner.tier);

  function tryDownload(r) {
    const requiredIdx = r.tierMin ? TIER_ORDER.indexOf(r.tierMin) : 0;
    if (requiredIdx > partnerTierIdx) {
      setToast(`Unlock by reaching ${r.tierMin} tier.`);
    } else {
      setToast('Demo mode — file not available.');
    }
    setTimeout(() => setToast(null), 2400);
  }

  const filtered = q
    ? resources.filter((r) =>
        (r.title + r.type + r.tag).toLowerCase().includes(q.toLowerCase()),
      )
    : resources;

  const grouped = filtered.reduce((acc, r) => {
    (acc[r.tag] = acc[r.tag] || []).push(r);
    return acc;
  }, {});

  return (
    <PartnerShell>
      <header className="mb-6">
        <span className="eyebrow">Resources</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Spec sheets, CADs, training.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Everything you need to spec confidently. Tier-gated items unlock
          as you grow.
        </p>
      </header>

      <div className="mb-6 relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources by name or type"
          className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15"
        />
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([tag, items]) => (
          <section key={tag}>
            <div className="mb-3 flex items-center gap-2">
              <Folder className="h-4 w-4 text-gray-400" />
              <h2 className="text-base font-semibold text-ink">{tag}</h2>
              <span className="text-[11px] text-gray-500">{items.length}</span>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {items.map((r) => {
                const Icon = ICONS[r.type] ?? FileText;
                const requiredIdx = r.tierMin ? TIER_ORDER.indexOf(r.tierMin) : 0;
                const locked = requiredIdx > partnerTierIdx;
                return (
                  <li key={r.id} className="card flex items-center gap-4 p-4">
                    <div
                      className={cn(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
                        locked ? 'bg-gray-100 text-gray-400' : 'text-white',
                      )}
                      style={
                        locked
                          ? undefined
                          : {
                              background:
                                'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
                            }
                      }
                    >
                      {locked ? <Lock className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink">{r.title}</div>
                      <div className="text-[11px] text-gray-500">
                        {r.type} · {r.sizeMB} MB{r.tierMin ? ` · ${r.tierMin}+ only` : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => tryDownload(r)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold',
                        locked
                          ? 'bg-gray-100 text-gray-500'
                          : 'border border-gray-300 bg-white text-ink hover:border-ink/40',
                      )}
                    >
                      <Download className="h-3.5 w-3.5" />
                      {locked ? 'Locked' : 'Download'}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink/90 px-4 py-2 text-[12px] font-semibold text-white shadow-xl backdrop-blur"
        >
          {toast}
        </div>
      )}
    </PartnerShell>
  );
}
