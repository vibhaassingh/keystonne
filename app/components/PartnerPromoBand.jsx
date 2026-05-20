import {Link} from 'react-router';
import {Handshake, ChevronRight} from 'lucide-react';

/**
 * Full-width band on the home page that introduces the partner programme to
 * consultants, chefs, designers, and procurement leads. Visually distinct —
 * uses the partner-accent emerald — so partners always recognise where the
 * portal lives, separate from the buyer storefront.
 */
export function PartnerPromoBand() {
  return (
    <section className="bg-partner-accent text-white">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-12 md:grid-cols-12 md:items-center md:px-6 md:py-16">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90">
            <Handshake className="h-3.5 w-3.5" />
            For consultants · chefs · designers · F&B managers
          </span>
          <h2 className="mt-3 text-2xl font-semibold leading-tight md:text-4xl">
            Spec kitchens. Earn transparently. Get paid on installation.
          </h2>
          <p className="mt-3 max-w-xl text-white/85 md:text-lg">
            Keystonne formalises the consultant network India&apos;s
            commercial kitchens already run on. Register your project,
            track the deal end-to-end, and watch the commission ledger
            move in real time. No more WhatsApp chasing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/partner"
              prefetch="intent"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-partner-accent hover:bg-white/95"
            >
              How the programme works
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/partner/apply"
              prefetch="intent"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Apply to join
            </Link>
          </div>
        </div>

        {/* Stat panel */}
        <div className="md:col-span-5">
          <ul className="grid grid-cols-3 divide-x divide-white/15 overflow-hidden rounded-lg bg-white/5">
            <Stat label="Avg commission" value="6.5%" sub="On closed orders" />
            <Stat label="Median payout time" value="11 days" sub="From install" />
            <Stat label="Active partners" value="850+" sub="Across India" />
          </ul>

          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li>· Bronze → Silver → Gold tiers with transparent thresholds</li>
            <li>· GST + TDS handled automatically; UPI / bank payouts</li>
            <li>· Co-branded PDFs for client-facing spec sheets</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stat({label, value, sub}) {
  return (
    <li className="p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
        {label}
      </div>
      <div className="tabular text-2xl font-semibold text-white">
        {value}
      </div>
      <div className="text-[11px] text-white/70">{sub}</div>
    </li>
  );
}
