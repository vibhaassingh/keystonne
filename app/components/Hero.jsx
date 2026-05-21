import {Link} from 'react-router';
import {
  ArrowRight, Sparkles, Snowflake, ChefHat, ShieldCheck, Wand2,
} from 'lucide-react';

/**
 * Apple-style storefront hero — a single bright editorial container
 * with a left copy column and a right product-theatre composition.
 *
 * Replaces the previous mesh-indigo / mesh-emerald rotating carousel.
 * The carousel was a "look at me" surface; this is a "look at the
 * product" surface — closer to the Apple Store homepage hero where the
 * device sells itself and the copy serves it.
 *
 * Product-theatre is built entirely from CSS cards (no stock photos),
 * sampling a real procurement workspace state. Three regions only —
 * project header, the spec + capex pair, and a "protected" status row
 * at the foot. Stations were dropped in Sprint 9 polish to keep one
 * dominant idea (the ₹14.2 L capex estimate) instead of a competing
 * chip rail. The numbers match the data the AI Wizard would actually
 * return for an 80-cover cloud kitchen build.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-8 md:px-6 md:pt-12">
      <div className="apple-hero relative overflow-hidden px-6 py-12 md:px-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          {/* ── Left: editorial copy ──────────────────────────── */}
          <div className="md:col-span-6">
            <span className="apple-eyebrow">
              <Sparkles className="h-3 w-3" />
              Commercial kitchen procurement for India
            </span>

            <h1 className="apple-display mt-4">
              Commercial kitchens,{' '}
              <span style={{color: 'var(--ks-muted)'}}>specified like a product.</span>
            </h1>

            <p
              className="apple-subhead mt-5 max-w-xl"
              style={{color: 'var(--ks-ink-2)'}}
            >
              Plan equipment, compare specs, request quotes, and manage
              partner-led projects from one procurement workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/kitchen-planner"
                prefetch="intent"
                className="apple-button-primary"
              >
                <Wand2 className="h-4 w-4" />
                Build my kitchen
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link
                to="/collections/all"
                prefetch="intent"
                className="apple-button-ghost"
              >
                Browse catalog
              </Link>
            </div>

            <p
              className="mt-5 text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              No login required for the planner · Phase 1 demo
            </p>
          </div>

          {/* ── Right: product-theatre composition ───────────── */}
          <div className="md:col-span-6">
            <ProductTheatre />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Faux "live workspace" panel composed from layered cards. Reads as a
 * glimpse of the procurement product itself rather than marketing
 * decoration. Numbers track the AI Wizard's mock recommendations for
 * an 80-cover cloud kitchen so the panel feels like real demo data.
 */
function ProductTheatre() {
  return (
    <div className="relative mx-auto max-w-[480px]">
      {/* Soft halo behind the panel — adds depth without mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -m-6 rounded-[36px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(0,113,227,0.05), transparent 70%)',
        }}
      />

      <div
        className="relative rounded-[28px] p-5"
        style={{
          background: 'var(--ks-card-solid)',
          border: '1px solid var(--ks-line-soft)',
          boxShadow: 'var(--ks-shadow-card-hover)',
        }}
      >
        {/* Header strip — pretend project header */}
        <div
          className="flex items-center justify-between pb-4"
          style={{borderBottom: '1px solid var(--ks-line-soft)'}}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{background: '#f0f0f3'}}
            >
              <ChefHat className="h-4 w-4" strokeWidth={1.6} style={{color: 'var(--ks-ink)'}} />
            </div>
            <div>
              <div
                className="text-[10px] font-medium uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                Sample build
              </div>
              <div
                className="text-[13px] font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Cloud kitchen · Bengaluru
              </div>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium"
            style={{
              background: 'var(--ks-emerald-soft)',
              color: 'var(--ks-emerald-dark)',
            }}
          >
            <ShieldCheck className="h-3 w-3" />
            Protected
          </span>
        </div>

        {/* Body — spec tile + capex estimate */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {/* Spec tile */}
          <div
            className="col-span-3 rounded-2xl p-4"
            style={{
              background: 'var(--ks-card-tint)',
              border: '1px solid var(--ks-line-soft)',
            }}
          >
            <div className="flex items-center gap-2">
              <Snowflake
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
                style={{color: 'var(--ks-blue)'}}
              />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.10em]"
                style={{color: 'var(--ks-muted)'}}
              >
                Refrigeration · 1 of 9 categories
              </span>
            </div>
            <div
              className="mt-3 text-[14px] font-semibold leading-snug"
              style={{color: 'var(--ks-ink)'}}
            >
              Two-Door Reach-In Refrigerator
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
              <SpecRow k="Capacity" v="1,240 L" />
              <SpecRow k="Material" v="304 SS" />
              <SpecRow k="Refrigerant" v="R290" />
              <SpecRow k="Lead time" v="7 days" />
            </dl>
          </div>

          {/* Capex pill */}
          <div
            className="col-span-2 flex flex-col justify-between rounded-2xl p-4"
            style={{
              background: 'var(--ks-ink)',
              color: '#ffffff',
            }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'rgba(255,255,255,0.6)'}}
            >
              All-in capex
            </span>
            <div>
              <div className="tabular text-[28px] font-semibold leading-none">
                ₹14.2 L
              </div>
              <div
                className="mt-1 text-[10px]"
                style={{color: 'rgba(255,255,255,0.6)'}}
              >
                inc. GST · freight · install
              </div>
            </div>
          </div>
        </div>

        {/* Status row */}
        <div
          className="mt-4 flex items-center justify-between rounded-xl px-3 py-2.5"
          style={{
            background: 'var(--ks-emerald-soft)',
            border: '1px solid rgba(10,127,86,0.18)',
          }}
        >
          <span className="text-[11px]" style={{color: 'var(--ks-emerald-dark)'}}>
            12 line items locked for this project
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-emerald-dark)'}}
          >
            30-day attribution
          </span>
        </div>
      </div>
    </div>
  );
}

function SpecRow({k, v}) {
  return (
    <>
      <dt style={{color: 'var(--ks-muted)'}}>{k}</dt>
      <dd
        className="tabular text-right font-medium"
        style={{color: 'var(--ks-ink)'}}
      >
        {v}
      </dd>
    </>
  );
}
