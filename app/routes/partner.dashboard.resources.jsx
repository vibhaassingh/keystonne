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
      <header className="mb-7">
        <span className="apple-eyebrow">Resources</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Spec sheets, CADs, training.
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Everything you need to spec confidently. Tier-gated items unlock
          as you grow.
        </p>
      </header>

      <div className="relative mb-7 max-w-md">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
          style={{color: 'var(--ks-muted)'}}
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources by name or type"
          className="h-11 w-full rounded-full pl-10 pr-3 text-sm focus:outline-none"
          style={{
            background: 'var(--ks-card-tint)',
            border: '1px solid var(--ks-line-soft)',
            color: 'var(--ks-ink)',
          }}
        />
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([tag, items]) => (
          <section key={tag}>
            <div className="mb-3 flex items-center gap-2">
              <Folder
                className="h-4 w-4"
                style={{color: 'var(--ks-muted)'}}
                strokeWidth={1.6}
              />
              <h2
                className="text-base font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                {tag}
              </h2>
              <span
                className="text-[11px]"
                style={{color: 'var(--ks-muted)'}}
              >
                {items.length}
              </span>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {items.map((r) => {
                const Icon = ICONS[r.type] ?? FileText;
                const requiredIdx = r.tierMin ? TIER_ORDER.indexOf(r.tierMin) : 0;
                const locked = requiredIdx > partnerTierIdx;
                return (
                  <li
                    key={r.id}
                    className="premium-card flex items-center gap-4 p-4"
                  >
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                      style={
                        locked
                          ? {
                              background: 'var(--ks-card-tint)',
                              color: 'var(--ks-muted)',
                              border: '1px solid var(--ks-line-soft)',
                            }
                          : {
                              background: 'var(--ks-card-tint)',
                              color: 'var(--ks-ink)',
                              border: '1px solid var(--ks-line-soft)',
                            }
                      }
                    >
                      {locked ? (
                        <Lock className="h-5 w-5" strokeWidth={1.6} />
                      ) : (
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-sm font-semibold"
                        style={{color: 'var(--ks-ink)'}}
                      >
                        {r.title}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        {r.type} · {r.sizeMB} MB
                        {r.tierMin ? ` · ${r.tierMin}+ only` : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => tryDownload(r)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium',
                      )}
                      style={
                        locked
                          ? {
                              background: 'var(--ks-card-tint)',
                              color: 'var(--ks-muted)',
                              border: '1px solid var(--ks-line-soft)',
                            }
                          : {
                              background: 'var(--ks-card-solid)',
                              color: 'var(--ks-ink)',
                              border: '1px solid var(--ks-line)',
                            }
                      }
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
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-[12px] font-medium"
          style={{
            background: 'var(--ks-ink)',
            color: '#ffffff',
            boxShadow: 'var(--ks-shadow-float)',
          }}
        >
          {toast}
        </div>
      )}
    </PartnerShell>
  );
}
