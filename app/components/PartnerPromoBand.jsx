import {Link} from 'react-router';
import {Handshake, ChevronRight, Check} from 'lucide-react';

/**
 * Full-width band that introduces the partner programme. Uses the emerald
 * mesh gradient so partners always recognise where their workspace lives,
 * visually separate from the buyer storefront's indigo accent.
 */
export function PartnerPromoBand() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-12">
      <div
        className="relative overflow-hidden rounded-3xl text-white mesh-emerald"
        style={{
          boxShadow:
            '0 30px 80px -30px rgba(5,46,30,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl" />
        </div>

        <div className="relative grid gap-8 px-6 py-12 md:grid-cols-12 md:items-center md:px-12 md:py-16">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
              <Handshake className="h-3 w-3" />
              For consultants · chefs · designers · F&B managers
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Spec kitchens. Earn transparently. Get paid on installation.
            </h2>
            <p className="mt-4 max-w-xl text-white/85 md:text-lg">
              Keystonne formalises the consultant network India&apos;s
              commercial kitchens already run on. Register your project,
              track the deal end-to-end, and watch the commission ledger
              move in real time. No more WhatsApp chasing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/partner"
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-partner-accent shadow-lg transition-transform hover:-translate-y-0.5"
              >
                How the programme works
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/partner/apply"
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
              >
                Apply to join
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-2">
              {[
                'Bronze · Silver · Gold tiers with transparent thresholds',
                'GST + TDS handled automatically; UPI / bank payouts',
                'Co-branded PDFs for client-facing spec sheets',
                'Real-time ledger — earned · pending · paid',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Glass stats card */}
          <div className="md:col-span-5">
            <div
              className="rounded-2xl border border-white/25 bg-white/12 p-6 backdrop-blur-2xl"
              style={{
                boxShadow:
                  '0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.28)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
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

              <div className="mt-6 rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-white/60">
                  <span>Sample partner — Arjun, Bengaluru</span>
                  <span>Silver tier</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-sm text-white/70">YTD earnings</span>
                  <span className="tabular text-2xl font-semibold text-white">
                    ₹2,85,000
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500"
                    style={{width: '52%'}}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-white/60">
                  <span>Silver · ₹10L closed</span>
                  <span>Gold · ₹35L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({label, value, sub}) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
        {label}
      </div>
      <div className="tabular mt-1 text-2xl font-semibold text-white">
        {value}
      </div>
      <div className="text-[11px] text-white/65">{sub}</div>
    </div>
  );
}
