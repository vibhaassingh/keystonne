import {Link} from 'react-router';
import {Construction, ArrowRight} from 'lucide-react';

/**
 * Placeholder per CLAUDE.md §6 — admin console is Phase 2. We render a
 * scoping note so anyone landing on /admin sees exactly what's planned
 * instead of a 404. Apple-style premium-card grid.
 */

export const meta = () => [{title: 'Admin — Coming in Phase 2'}];

const PHASE2_MODULES = [
  {name: 'Partner application review', body: 'Approve, reject, request changes on 9-step applications. Push to active partner list with one click.'},
  {name: 'Deal adjudication', body: 'Resolve conflict states (KD-####) between partners. Documentary trail attached to every decision.'},
  {name: 'Commission rules engine', body: 'Edit per-category rates, tier multipliers, promotional uplifts. Schedule changes for future effective dates.'},
  {name: 'Payout batches', body: 'Weekly payout runs — preview totals, mark TDS, push to Zoho Books for invoicing, settle to UPI / NEFT.'},
  {name: 'Catalog management', body: 'Add / retire products, sync from Shopify Storefront API, manage stock + lead-time per category.'},
  {name: 'Quote queue', body: 'Sales-team workspace for incoming /quote submissions. SLA tracking on the 24-hour response promise.'},
  {name: 'Reports + financials', body: 'GMV, partner-driven GMV, gross commission paid out, TDS aggregation, GSTR-1 export.'},
  {name: 'Audit log + RBAC', body: 'Every internal action logged. Role-based access for sales, ops, finance, and founders.'},
];

export default function AdminPlaceholder() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-16 md:px-6 md:py-24">
      <div
        className="mx-auto grid h-16 w-16 place-items-center rounded-2xl"
        style={{
          background: 'var(--ks-blue-soft)',
          color: 'var(--ks-blue-dark)',
        }}
      >
        <Construction className="h-7 w-7" strokeWidth={1.6} />
      </div>
      <h1
        className="mt-6 text-[32px] font-semibold tracking-tight md:text-[44px]"
        style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
      >
        Admin console — coming in Phase 2.
      </h1>
      <p
        className="mt-3 max-w-2xl text-sm md:text-base"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Phase 1 is a demo-grade build of the partner + buyer surfaces.
        The internal admin console ships with the Supabase wire-up in
        Phase 2 — these are the modules planned for that release.
      </p>

      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {PHASE2_MODULES.map((m) => (
          <li key={m.name} className="premium-card p-6">
            <div
              className="text-[10px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-muted)'}}
            >
              Module
            </div>
            <div
              className="mt-1.5 text-base font-semibold"
              style={{color: 'var(--ks-ink)'}}
            >
              {m.name}
            </div>
            <p
              className="mt-2 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {m.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/partner"
          className="apple-button-primary"
        >
          Partner programme
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/"
          className="apple-button-ghost"
        >
          Back to storefront
        </Link>
      </div>
    </section>
  );
}
