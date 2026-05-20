import {useMemo} from 'react';
import {Link, useSearchParams} from 'react-router';
import {
  ArrowRight, ChevronLeft, FileText, Wand2, Sparkles, Quote, ShoppingCart, Check,
} from 'lucide-react';
import {businessTypeBySlug} from '~/lib/mock/businessTypes';
import {productBySlug} from '~/lib/mock/products';
import {recommendFor, sizeBucketFor} from '~/lib/mock/wizardRecommendations';
import {useQuoteCart} from '~/lib/quoteCart';
import {formatINR} from '~/lib/utils/formatINR';
import {gstFor} from '~/lib/utils/formatGST';
import {categoryBySlug} from '~/lib/mock/categories';
import {cn} from '~/lib/utils/cn';

export const meta = () => [
  {title: 'Your kitchen plan — Keystonne'},
];

const INSTALLATION_FLAT = 49_900;
const INSTALLATION_PCT = 0.05;

export default function KitchenResults() {
  const [params] = useSearchParams();
  const ventureSlug = params.get('venture') || 'new-venture';
  const venture = businessTypeBySlug[ventureSlug] ?? businessTypeBySlug['new-venture'];
  const covers = Number(params.get('covers')) || 60;
  const sittings = Number(params.get('sittings')) || 2;
  const cuisines = (params.get('cuisines') || '').split(',').filter(Boolean);
  const description = params.get('q') || '';

  const rec = useMemo(() => recommendFor(ventureSlug, sizeBucketFor(covers)), [ventureSlug, covers]);

  // Resolve recommended equipment into real product objects + line totals.
  const groups = rec.equipment.map((g) => {
    const items = g.items.map((it) => {
      const p = productBySlug[it.sku];
      const unit = p?.priceINR ?? null;
      const lineTotal = unit ? unit * it.qty : null;
      return {...it, product: p, unit, lineTotal};
    });
    const groupSubtotal = items.reduce((s, l) => s + (l.lineTotal ?? 0), 0);
    return {...g, items, groupSubtotal};
  });
  const subtotal = groups.reduce((s, g) => s + g.groupSubtotal, 0);
  const {gst, total: subtotalWithGst} = gstFor(subtotal);
  const installation = Math.max(INSTALLATION_FLAT, Math.round(subtotal * INSTALLATION_PCT));
  const installationIncluded = subtotal > 10_00_000;
  const grandTotal = subtotalWithGst + (installationIncluded ? 0 : installation);

  const {add, clear} = useQuoteCart();
  const Icon = venture.icon;

  function addAllToCart() {
    clear();
    for (const g of groups) {
      for (const item of g.items) {
        if (item.product) add(item.product.slug, item.qty);
      }
    }
  }

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      {/* Hero summary */}
      <div
        className="relative overflow-hidden rounded-3xl text-white mesh-indigo"
        style={{boxShadow: '0 30px 80px -30px rgba(10,13,20,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'}}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl" />
        </div>

        <div className="relative grid gap-6 px-6 py-12 md:grid-cols-12 md:items-center md:px-14 md:py-16">
          <div className="md:col-span-8">
            <Link
              to="/kitchen-planner"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-white/70 hover:text-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Adjust inputs
            </Link>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Your plan
            </div>
            <h1 className="mt-4 text-[34px] font-semibold leading-[1.04] tracking-tight md:text-[48px]">
              {rec.headline}
            </h1>

            <ul className="mt-5 flex flex-wrap gap-2 text-[12px]">
              <Pill icon={Icon} text={venture.name} />
              <Pill text={`${covers} covers × ${sittings} sittings`} />
              <Pill text={`${covers * sittings} covers/day`} />
              {cuisines.slice(0, 3).map((c) => <Pill key={c} text={c} />)}
              {cuisines.length > 3 && <Pill text={`+${cuisines.length - 3} more`} />}
            </ul>

            {description && (
              <blockquote className="mt-5 max-w-2xl rounded-xl border border-white/15 bg-white/5 p-4 text-[14px] italic text-white/85 backdrop-blur">
                <Quote className="mb-2 h-4 w-4 text-white/40" />
                {description}
              </blockquote>
            )}
          </div>

          {/* Estimate panel */}
          <aside className="md:col-span-4">
            <div
              className="rounded-2xl border border-white/25 bg-white/12 p-6 backdrop-blur-2xl"
              style={{boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.28)'}}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                Capex estimate
              </span>
              <div className="tabular mt-2 text-4xl font-semibold text-white">
                {formatINR(grandTotal)}
              </div>
              <p className="mt-1 text-[12px] text-white/70">
                All-in: equipment + GST + {installationIncluded ? 'installation included' : `installation (${formatINR(installation)})`}
              </p>
              <ul className="mt-5 space-y-1 text-[13px]">
                <Row k="Equipment subtotal" v={formatINR(subtotal)} />
                <Row k="GST · 18%" v={formatINR(gst)} muted />
                <Row k="Installation" v={installationIncluded ? 'Included' : formatINR(installation)} muted />
                <Row k="Freight (pan-India)" v="Included" muted />
              </ul>
              <div className="mt-5 space-y-2">
                <Link
                  to="/quote"
                  onClick={addAllToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary"
                >
                  <FileText className="h-4 w-4" />
                  Request as a single quote
                </Link>
                <button
                  type="button"
                  onClick={addAllToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add all to cart
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Narrative */}
      <section className="mt-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="eyebrow">How a chef would set this up</span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            The workflow we&apos;d build around.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700 md:text-base">
            {rec.narrative.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="md:col-span-5">
          <div className="card p-5">
            <span className="eyebrow">Stations</span>
            <ul className="mt-4 space-y-2">
              {rec.stations.map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="tabular grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-primary-50 text-[11px] font-bold text-brand-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-brand-accent/30 bg-brand-accent/5 p-4 text-[12px] text-gray-700">
            <div className="flex items-center gap-1.5 font-semibold text-brand-accent">
              <Sparkles className="h-3.5 w-3.5" />
              A real LLM ships Phase 4
            </div>
            <p className="mt-1">
              For Phase 1, recommendations come from a curated dataset of
              ~30 venture × scale combinations. The architecture is
              identical to the LLM-backed version we&apos;ll ship next.
            </p>
          </div>
        </aside>
      </section>

      {/* Equipment groups */}
      <section className="mt-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">The kit</span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Equipment, grouped by category.
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {groups.reduce((s, g) => s + g.items.length, 0)} line items
              across {groups.length} categories.
            </p>
          </div>
          <button
            type="button"
            onClick={addAllToCart}
            className="inline-flex items-center gap-1.5 rounded-xl btn-accent px-4 py-2.5 text-sm font-semibold"
          >
            <ShoppingCart className="h-4 w-4" />
            Add all to cart
          </button>
        </div>

        <ul className="space-y-4">
          {groups.map((g) => {
            const cat = categoryBySlug[Object.keys(categoryBySlug).find(
              (k) => categoryBySlug[k].name === g.category,
            )];
            const CatIcon = cat?.icon ?? Sparkles;
            return (
              <li key={g.category} className="card overflow-hidden">
                <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-xl text-white"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
                    }}
                  >
                    <CatIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-ink">{g.category}</h3>
                    <p className="text-[12px] text-gray-500">
                      {g.items.length} item{g.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="tabular text-right">
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">Group subtotal</div>
                    <div className="text-sm font-semibold text-ink">
                      {g.groupSubtotal > 0 ? formatINR(g.groupSubtotal) : 'On quote'}
                    </div>
                  </div>
                </div>
                <ul className="divide-y divide-gray-100">
                  {g.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 px-5 py-3">
                      {item.product ? (
                        <div
                          className="h-12 w-12 shrink-0 rounded-lg"
                          style={{background: `linear-gradient(135deg, ${item.product.accent}, #00000022)`}}
                        />
                      ) : (
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-100" />
                      )}
                      <div className="min-w-0 flex-1">
                        <Link
                          to={item.product ? `/products/${item.product.slug}` : '#'}
                          className="text-sm font-semibold text-ink hover:text-brand-primary"
                        >
                          {item.product?.name ?? item.sku}
                        </Link>
                        {item.note && (
                          <div className="text-[12px] italic text-gray-500">{item.note}</div>
                        )}
                      </div>
                      <div className="tabular text-right text-sm">
                        <div className="text-gray-500">Qty <span className="font-semibold text-ink">{item.qty}</span></div>
                      </div>
                      <div className="tabular w-28 text-right text-sm font-semibold text-ink">
                        {item.lineTotal != null ? formatINR(item.lineTotal) : 'On quote'}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Final CTA */}
      <div className="mt-10 rounded-3xl border border-gray-200 bg-white/85 p-6 backdrop-blur md:p-10" style={{boxShadow: 'var(--shadow-glass)'}}>
        <div className="grid gap-4 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <h3 className="text-xl font-semibold text-ink md:text-2xl">
              Ready to turn this into a quote?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ll add every item to your cart and route you to the
              quote form. You can edit the list there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link
              to="/quote"
              onClick={addAllToCart}
              className="inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-3 text-sm font-semibold"
            >
              <FileText className="h-4 w-4" />
              Request a quote
              <ArrowRight className="h-4 w-4 opacity-80" />
            </Link>
            <Link
              to="/kitchen-planner"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
            >
              <Wand2 className="h-4 w-4 text-brand-accent" />
              Plan another
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({icon: Icon, text}) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-white/90 backdrop-blur">
      {Icon && <Icon className="h-3 w-3" />}
      {text}
    </li>
  );
}

function Row({k, v, muted}) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <span className={muted ? 'text-white/60' : 'text-white/80'}>{k}</span>
      <span className="tabular font-semibold text-white">{v}</span>
    </li>
  );
}
