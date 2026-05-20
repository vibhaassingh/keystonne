import {useMemo} from 'react';
import {Link, useSearchParams} from 'react-router';
import {
  ArrowRight, ChevronLeft, FileText, Wand2, Sparkles, Quote, ShoppingCart,
} from 'lucide-react';
import {businessTypeBySlug} from '~/lib/mock/businessTypes';
import {productBySlug} from '~/lib/mock/products';
import {recommendFor, sizeBucketFor} from '~/lib/mock/wizardRecommendations';
import {useQuoteCart} from '~/lib/quoteCart';
import {formatINR} from '~/lib/utils/formatINR';
import {gstFor} from '~/lib/utils/formatGST';
import {categoryBySlug} from '~/lib/mock/categories';

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

  const rec = useMemo(
    () => recommendFor(ventureSlug, sizeBucketFor(covers)),
    [ventureSlug, covers],
  );

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
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-16">
      {/* Editorial summary header */}
      <div className="apple-hero overflow-hidden">
        <div className="grid gap-8 px-6 py-12 md:grid-cols-12 md:items-center md:px-14 md:py-16">
          <div className="md:col-span-7">
            <Link
              to="/kitchen-planner"
              className="inline-flex items-center gap-1 text-[12px] font-medium"
              style={{color: 'var(--ks-muted)'}}
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Adjust inputs
            </Link>

            <span
              className="apple-eyebrow mt-4"
              style={{color: 'var(--ks-blue-dark)'}}
            >
              <Sparkles
                className="h-3 w-3"
                style={{color: 'var(--ks-blue)'}}
              />
              Your plan
            </span>
            <h1
              className="mt-3 text-[34px] font-semibold leading-[1.04] tracking-tight md:text-[52px]"
              style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
            >
              {rec.headline}
            </h1>

            <ul className="mt-5 flex flex-wrap gap-2 text-[12px]">
              <Pill icon={Icon} text={venture.name} />
              <Pill text={`${covers} covers × ${sittings} sittings`} />
              <Pill text={`${covers * sittings} covers/day`} accent="ink" />
              {cuisines.slice(0, 3).map((c) => (
                <Pill key={c} text={c} />
              ))}
              {cuisines.length > 3 && (
                <Pill text={`+${cuisines.length - 3} more`} />
              )}
            </ul>

            {description && (
              <blockquote
                className="mt-6 max-w-2xl rounded-2xl p-5 text-[14px] italic"
                style={{
                  background: 'var(--ks-card-tint)',
                  border: '1px solid var(--ks-line-soft)',
                  color: 'var(--ks-ink-2)',
                }}
              >
                <Quote
                  className="mb-2 h-4 w-4"
                  style={{color: 'var(--ks-muted)'}}
                />
                {description}
              </blockquote>
            )}
          </div>

          {/* Estimate panel — calm white card on hero */}
          <aside className="md:col-span-5">
            <div className="commercial-buy-box">
              <span
                className="apple-eyebrow"
                style={{color: 'var(--ks-muted)'}}
              >
                Capex estimate
              </span>
              <div
                className="mt-3 text-[44px] font-semibold leading-none md:text-[56px]"
                style={{
                  color: 'var(--ks-ink)',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.022em',
                }}
              >
                {formatINR(grandTotal)}
              </div>
              <p
                className="mt-2 text-[13px]"
                style={{color: 'var(--ks-muted)'}}
              >
                All-in: equipment + GST +{' '}
                {installationIncluded
                  ? 'installation included'
                  : `installation (${formatINR(installation)})`}
              </p>
              <ul
                className="mt-5 space-y-2 text-[13px]"
                style={{borderTop: '1px solid var(--ks-line-soft)', paddingTop: '1rem'}}
              >
                <Row k="Equipment subtotal" v={formatINR(subtotal)} />
                <Row k="GST · 18%" v={formatINR(gst)} muted />
                <Row
                  k="Installation"
                  v={installationIncluded ? 'Included' : formatINR(installation)}
                  muted
                />
                <Row k="Freight (pan-India)" v="Included" muted />
              </ul>
              <div className="mt-5 space-y-2">
                <Link
                  to="/quote"
                  onClick={addAllToCart}
                  className="apple-button-amber w-full justify-center"
                >
                  <FileText className="h-4 w-4" />
                  Request as a single quote
                </Link>
                <button
                  type="button"
                  onClick={addAllToCart}
                  className="apple-button-ghost w-full justify-center"
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
      <section className="mt-14 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="apple-eyebrow">How a chef would set this up</span>
          <h2
            className="mt-3 text-[26px] font-semibold tracking-tight md:text-[32px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            The workflow we&apos;d build around.
          </h2>
          <div
            className="mt-5 space-y-4 text-sm leading-relaxed md:text-base"
            style={{color: 'var(--ks-ink-2)'}}
          >
            {rec.narrative.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="md:col-span-5">
          <div className="premium-panel p-6">
            <span className="apple-eyebrow">Stations</span>
            <ul className="mt-4 space-y-3">
              {rec.stations.map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold"
                    style={{
                      background: 'var(--ks-card-tint)',
                      border: '1px solid var(--ks-line-soft)',
                      color: 'var(--ks-ink)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="pt-0.5 text-sm"
                    style={{color: 'var(--ks-ink)'}}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-4 rounded-2xl p-5"
            style={{
              background: 'var(--ks-blue-soft)',
              border: '1px solid rgba(0,113,227,0.18)',
            }}
          >
            <div
              className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-blue-dark)'}}
            >
              <Sparkles className="h-3.5 w-3.5" />
              A real LLM ships Phase 4
            </div>
            <p
              className="mt-2 text-[12px]"
              style={{color: 'var(--ks-blue-dark)'}}
            >
              For Phase 1, recommendations come from a curated dataset of
              ~30 venture × scale combinations. The architecture is
              identical to the LLM-backed version we&apos;ll ship next.
            </p>
          </div>
        </aside>
      </section>

      {/* Equipment groups */}
      <section className="mt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="apple-eyebrow">The kit</span>
            <h2
              className="mt-3 text-[26px] font-semibold tracking-tight md:text-[32px]"
              style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
            >
              Equipment, grouped by category.
            </h2>
            <p
              className="mt-1 text-sm"
              style={{color: 'var(--ks-ink-2)'}}
            >
              {groups.reduce((s, g) => s + g.items.length, 0)} line items
              across {groups.length} categories.
            </p>
          </div>
          <button
            type="button"
            onClick={addAllToCart}
            className="apple-button-amber"
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
              <li key={g.category} className="premium-panel overflow-hidden">
                <div
                  className="flex items-center gap-3 px-6 py-5"
                  style={{borderBottom: '1px solid var(--ks-line-soft)'}}
                >
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{
                      background: 'var(--ks-card-tint)',
                      color: 'var(--ks-ink)',
                      border: '1px solid var(--ks-line-soft)',
                    }}
                  >
                    <CatIcon className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-base font-semibold"
                      style={{color: 'var(--ks-ink)'}}
                    >
                      {g.category}
                    </h3>
                    <p
                      className="text-[12px]"
                      style={{color: 'var(--ks-muted)'}}
                    >
                      {g.items.length} item{g.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-[10px] font-medium uppercase tracking-[0.10em]"
                      style={{color: 'var(--ks-muted)'}}
                    >
                      Group subtotal
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
                    >
                      {g.groupSubtotal > 0 ? formatINR(g.groupSubtotal) : 'On quote'}
                    </div>
                  </div>
                </div>
                <ul>
                  {g.items.map((item, i) => (
                    <li
                      key={item.sku}
                      className="flex items-center gap-4 px-6 py-3"
                      style={{
                        borderBottom:
                          i === g.items.length - 1
                            ? 'none'
                            : '1px solid var(--ks-line-soft)',
                      }}
                    >
                      {item.product ? (
                        <div
                          className="h-12 w-12 shrink-0 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${item.product.accent}, rgba(0,0,0,0.06))`,
                            border: '1px solid var(--ks-line-soft)',
                          }}
                        />
                      ) : (
                        <div
                          className="h-12 w-12 shrink-0 rounded-lg"
                          style={{
                            background: 'var(--ks-card-tint)',
                            border: '1px solid var(--ks-line-soft)',
                          }}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <Link
                          to={item.product ? `/products/${item.product.slug}` : '#'}
                          className="text-sm font-semibold"
                          style={{color: 'var(--ks-ink)'}}
                        >
                          {item.product?.name ?? item.sku}
                        </Link>
                        {item.note && (
                          <div
                            className="text-[12px] italic"
                            style={{color: 'var(--ks-muted)'}}
                          >
                            {item.note}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <div style={{color: 'var(--ks-muted)'}}>
                          Qty{' '}
                          <span
                            style={{
                              color: 'var(--ks-ink)',
                              fontWeight: 600,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {item.qty}
                          </span>
                        </div>
                      </div>
                      <div
                        className="w-28 text-right text-sm font-semibold"
                        style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
                      >
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
      <div className="apple-hero mt-12 p-7 md:p-12">
        <div className="grid gap-4 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <span className="apple-eyebrow">Next step</span>
            <h3
              className="mt-3 text-[22px] font-semibold tracking-tight md:text-[28px]"
              style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
            >
              Ready to turn this into a quote?
            </h3>
            <p
              className="mt-2 text-sm md:text-base"
              style={{color: 'var(--ks-ink-2)'}}
            >
              We&apos;ll add every item to your cart and route you to the
              quote form. You can edit the list there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link
              to="/quote"
              onClick={addAllToCart}
              className="apple-button-amber"
            >
              <FileText className="h-4 w-4" />
              Request a quote
              <ArrowRight className="h-4 w-4 opacity-80" />
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
              Plan another
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({icon: Icon, text, accent}) {
  return (
    <li
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
      style={
        accent === 'ink'
          ? {
              background: 'var(--ks-ink)',
              color: '#ffffff',
              border: '1px solid var(--ks-ink)',
            }
          : {
              background: 'var(--ks-card-solid)',
              color: 'var(--ks-ink-2)',
              border: '1px solid var(--ks-line)',
            }
      }
    >
      {Icon && <Icon className="h-3 w-3" strokeWidth={1.8} />}
      {text}
    </li>
  );
}

function Row({k, v, muted}) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <span style={{color: muted ? 'var(--ks-muted)' : 'var(--ks-ink-2)'}}>
        {k}
      </span>
      <span
        className="font-semibold"
        style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
      >
        {v}
      </span>
    </li>
  );
}
