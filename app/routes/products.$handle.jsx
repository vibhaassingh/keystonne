import {useState} from 'react';
import {Link, useParams} from 'react-router';
import {
  ChevronRight, FileText, Check, Star, Truck, ShieldCheck, Wrench, Receipt,
  Phone, FileSignature, MapPin,
} from 'lucide-react';
import {productBySlug, productsByCategory} from '~/lib/mock/products';
import {categoryBySlug} from '~/lib/mock/categories';
import {SpecTable} from '~/components/SpecTable';
import {FeaturedRow} from '~/components/FeaturedRow';
import {RequestQuoteCTA} from '~/components/RequestQuoteCTA';
import {formatINR} from '~/lib/utils/formatINR';
import {gstFor} from '~/lib/utils/formatGST';
import {useQuoteCart} from '~/lib/quoteCart';
import {useAside} from '~/components/Aside';
import {QtyStepper} from '~/components/QuoteCartDrawer';
import {cn} from '~/lib/utils/cn';

/**
 * Apple-style B2B product detail page.
 *
 *   ┌────────────────────────────────────────────────┐
 *   │ Breadcrumbs                                    │
 *   │ ─────────────────────────────────────────────  │
 *   │ ┌──────────────┐  ┌─────────────────────────┐ │
 *   │ │ Gallery      │  │ Sticky commercial       │ │
 *   │ │ (neutral)    │  │ buy box (amber CTA)     │ │
 *   │ │              │  │                         │ │
 *   │ └──────────────┘  │ Procurement confidence  │ │
 *   │                   └─────────────────────────┘ │
 *   │ ─────────────────────────────────────────────  │
 *   │ Spec  Description  Warranty + Delivery          │
 *   │ (hairline specs)                                │
 *   │ Related row                                     │
 *   └────────────────────────────────────────────────┘
 *
 * Sticky procurement strip at the bottom of every PDP.
 */

export const meta = ({params}) => {
  const product = productBySlug[params.handle];
  if (!product) return [{title: 'Product — Keystonne'}];
  return [
    {title: `${product.name} — Keystonne`},
    {name: 'description', content: product.blurb},
  ];
};

export default function ProductDetail() {
  const params = useParams();
  const product = productBySlug[params.handle];

  if (!product) return <NotFound />;

  const cat = categoryBySlug[product.category];
  const Icon = cat?.icon ?? Star;
  const canAddToCart =
    typeof product.priceINR === 'number' && product.priceINR < 50_000;
  const {gst, total} = product.priceINR
    ? gstFor(product.priceINR)
    : {gst: 0, total: 0};

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('specs');
  const [justAdded, setJustAdded] = useState(false);
  const {add} = useQuoteCart();
  const {open} = useAside();

  function handleAdd() {
    add(product.slug, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    setTimeout(() => open('cart'), 220);
  }

  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section
        className="border-b"
        style={{
          background: 'var(--ks-page-warm)',
          borderColor: 'var(--ks-line-soft)',
        }}
      >
        <div className="mx-auto max-w-[1400px] px-4 py-4 md:px-6">
          <Breadcrumbs product={product} cat={cat} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* ── Gallery ──────────────────────────────────────── */}
          <div className="md:col-span-7">
            <div
              className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[var(--ks-radius-lg)]"
              style={{
                background: 'var(--ks-card-tint)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <Icon
                className="h-32 w-32"
                strokeWidth={1.2}
                style={{color: 'var(--ks-ink-2)'}}
              />
              {product.badge && (
                <span
                  className="absolute left-4 top-4 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={{
                    background: 'var(--ks-card-solid)',
                    color: 'var(--ks-ink)',
                    border: '1px solid var(--ks-line)',
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumb rail */}
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <li
                  key={i}
                  className={cn(
                    'aspect-square cursor-pointer rounded-md',
                    i === 0 && 'ring-2',
                  )}
                  style={{
                    background: 'var(--ks-card-tint)',
                    border: '1px solid var(--ks-line-soft)',
                    ...(i === 0 ? {'--tw-ring-color': 'var(--ks-ink)'} : {}),
                  }}
                >
                  <div className="grid h-full w-full place-items-center">
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.2}
                      style={{color: 'var(--ks-ink-2)'}}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Sticky buy box + procurement confidence ─────── */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-2 space-y-4">
              <div className="commercial-buy-box">
                <span className="apple-eyebrow">{cat?.name}</span>
                <h1
                  className="mt-2 text-[28px] font-semibold leading-tight tracking-tight md:text-[32px]"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {product.name}
                </h1>

                <div
                  className="mt-2 flex items-center gap-2 text-[12px]"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  <Stars value={product.rating} />
                  <span className="tabular">
                    {product.rating.toFixed(1)} · {product.reviewCount} reviews
                  </span>
                </div>

                <p
                  className="mt-4 text-[14px] leading-relaxed"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  {product.blurb}
                </p>

                {/* Price block */}
                <div
                  className="mt-6 rounded-[var(--ks-radius-md)] p-4"
                  style={{
                    background: 'var(--ks-page-warm)',
                    border: '1px solid var(--ks-line-soft)',
                  }}
                >
                  {canAddToCart ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <div
                          className="tabular text-[28px] font-semibold leading-none"
                          style={{color: 'var(--ks-ink)'}}
                        >
                          {formatINR(product.priceINR)}
                        </div>
                        <div
                          className="text-[13px]"
                          style={{color: 'var(--ks-muted)'}}
                        >
                          per unit
                        </div>
                      </div>
                      <div
                        className="mt-1 text-[12px]"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        +{formatINR(gst)} GST (18%) ={' '}
                        <span
                          className="tabular font-semibold"
                          style={{color: 'var(--ks-ink)'}}
                        >
                          {formatINR(total)}
                        </span>{' '}
                        landed
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        Project pricing
                      </div>
                      <div
                        className="mt-1 text-base font-semibold"
                        style={{color: 'var(--ks-ink)'}}
                      >
                        Request a quote — 24-hour turnaround
                      </div>
                      <div
                        className="mt-1 text-[12px]"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        Includes freight + installation + GST invoice.
                      </div>
                    </>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
                  {canAddToCart && (
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] uppercase tracking-[0.08em]"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        Qty
                      </span>
                      <QtyStepper qty={qty} onChange={setQty} />
                    </div>
                  )}

                  {canAddToCart ? (
                    <button
                      type="button"
                      onClick={handleAdd}
                      className={cn(
                        'flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:flex-none md:px-6',
                        justAdded ? '' : 'apple-button-amber',
                      )}
                      style={
                        justAdded
                          ? {
                              background: 'var(--ks-emerald)',
                              color: '#ffffff',
                              border: '1px solid transparent',
                            }
                          : undefined
                      }
                    >
                      {justAdded ? (
                        <><Check className="h-4 w-4" /> Added to quote</>
                      ) : (
                        <>Add to quote</>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={`/quote?sku=${product.slug}`}
                      prefetch="intent"
                      className="apple-button-amber flex-1 justify-center md:flex-none"
                    >
                      <FileText className="h-4 w-4" />
                      Request a quote
                    </Link>
                  )}

                  <a
                    href="tel:+918000000000"
                    className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium"
                    style={{color: 'var(--ks-blue)'}}
                  >
                    <Phone className="h-4 w-4" />
                    Talk to procurement
                  </a>
                </div>

                <p
                  className="mt-4 text-[12px]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  Terms: 71% advance · 29% before dispatch · 4–7 working days
                  delivery anywhere in India.
                </p>
              </div>

              {/* Procurement confidence module */}
              <div
                className="rounded-[var(--ks-radius-md)] p-5"
                style={{
                  background: 'var(--ks-card-solid)',
                  border: '1px solid var(--ks-line-soft)',
                }}
              >
                <span className="apple-eyebrow">Procurement confidence</span>
                <ul className="mt-3 space-y-2.5 text-[13px]">
                  <ConfidenceRow icon={Receipt} label="GST invoice-ready" sub="ITC-eligible" />
                  <ConfidenceRow icon={Truck} label={`Ships in ${product.leadDays} days`} sub="Pan-India" />
                  <ConfidenceRow icon={Wrench} label="Installation guidance" sub="Included over ₹10L" />
                  <ConfidenceRow icon={ShieldCheck} label={`${product.warrantyMonths}-month warranty`} sub="Standard" />
                  <ConfidenceRow icon={FileSignature} label="Quote-ready spec sheet" sub="Downloadable" />
                  <ConfidenceRow icon={MapPin} label="India delivery scope" sub="Every PIN code" />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────── */}
        <div
          className="mt-14 border-b"
          style={{borderColor: 'var(--ks-line-soft)'}}
        >
          <div className="flex gap-7">
            {[
              {id: 'specs', label: 'Specifications'},
              {id: 'description', label: 'Description'},
              {id: 'support', label: 'Warranty + Delivery'},
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'border-b-2 px-1 py-3 text-[13px] font-medium transition-colors',
                )}
                style={{
                  borderColor:
                    tab === t.id ? 'var(--ks-ink)' : 'transparent',
                  color: tab === t.id ? 'var(--ks-ink)' : 'var(--ks-muted)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            {tab === 'specs' && <SpecTable specs={product.specs} />}
            {tab === 'description' && (
              <div
                className="space-y-3 text-[14px] leading-relaxed"
                style={{color: 'var(--ks-ink-2)'}}
              >
                <p>{product.blurb}</p>
                <p>
                  Specified for India&apos;s commercial kitchen conditions —
                  fluctuating voltage, high ambient temperatures, hard
                  water, and PNG/LPG fuel switching where applicable.
                  Constructed and tested before dispatch.
                </p>
                <p>
                  Bulk projects (3+ units, or paired with other equipment)
                  are eligible for project pricing — use the &quot;Request a
                  quote&quot; option to receive an all-in invoice with
                  freight and installation.
                </p>
              </div>
            )}
            {tab === 'support' && (
              <div className="space-y-3">
                <SupportCard icon={ShieldCheck} title={`${product.warrantyMonths}-month warranty`}>
                  Free replacement of defective parts. Extended AMC contracts
                  available; ask the sales team.
                </SupportCard>
                <SupportCard icon={Truck} title={`Delivery in ${product.leadDays} days`}>
                  Pan-India freight included in catalog price. E-way bill
                  arranged. Larger walk-in / cold-room jobs include
                  installation + commissioning.
                </SupportCard>
                <SupportCard icon={Wrench} title="Installation">
                  Free if your total order exceeds ₹10L. Otherwise ₹49,900 or
                  5% of order value, whichever is higher.
                </SupportCard>
              </div>
            )}
          </div>

          <aside className="md:col-span-4">
            <div
              className="rounded-[var(--ks-radius-md)] p-4"
              style={{
                background: 'var(--ks-card-solid)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <span className="apple-eyebrow">At a glance</span>
              <ul className="mt-3 space-y-2 text-[13px]">
                {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                  <li
                    key={k}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <span style={{color: 'var(--ks-muted)'}}>{k}</span>
                    <span
                      className="tabular text-right font-medium"
                      style={{color: 'var(--ks-ink)'}}
                    >
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <FeaturedRow
          title={`More in ${cat?.name ?? 'this category'}`}
          eyebrow="Related"
          products={related}
          viewAllTo={`/collections/${product.category}`}
        />
      )}

      <RequestQuoteCTA prefilledSku={product.slug} />
    </>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1
        className="text-2xl font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        We can&apos;t find this product.
      </h1>
      <p
        className="mt-2 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        It may have been renamed or removed. Browse the catalog to find a
        replacement, or request a quote for your spec.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/collections/all" className="apple-button-primary">
          Browse catalog
        </Link>
        <Link to="/quote" className="apple-button-ghost">
          Request a quote
        </Link>
      </div>
    </section>
  );
}

function ConfidenceRow({icon: Icon, label, sub}) {
  return (
    <li className="flex items-start gap-3">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0"
        strokeWidth={1.6}
        style={{color: 'var(--ks-ink)'}}
      />
      <div className="flex-1">
        <div style={{color: 'var(--ks-ink)'}}>{label}</div>
        <div
          className="text-[11px]"
          style={{color: 'var(--ks-muted)'}}
        >
          {sub}
        </div>
      </div>
    </li>
  );
}

function SupportCard({icon: Icon, title, children}) {
  return (
    <div
      className="flex items-start gap-3 rounded-[var(--ks-radius-md)] p-4"
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px solid var(--ks-line-soft)',
      }}
    >
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0"
        strokeWidth={1.5}
        style={{color: 'var(--ks-ink)'}}
      />
      <div>
        <div
          className="font-semibold"
          style={{color: 'var(--ks-ink)'}}
        >
          {title}
        </div>
        <div
          className="text-[13px]"
          style={{color: 'var(--ks-ink-2)'}}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Breadcrumbs({product, cat}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[12px]"
      style={{color: 'var(--ks-muted)'}}
    >
      <Link to="/" className="hover:underline">Home</Link>
      <ChevronRight className="h-3 w-3" />
      {cat && (
        <>
          <Link
            to={`/collections/${cat.slug}`}
            className="hover:underline"
          >
            {cat.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
        </>
      )}
      <span
        className="line-clamp-1"
        style={{color: 'var(--ks-ink)'}}
      >
        {product.name}
      </span>
    </nav>
  );
}

function Stars({value}) {
  return (
    <span
      className="flex"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star
              className="h-3.5 w-3.5"
              style={{color: 'var(--ks-line)'}}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{width: `${fill * 100}%`}}
              aria-hidden="true"
            >
              <Star
                className="h-3.5 w-3.5"
                fill="currentColor"
                style={{color: 'var(--ks-amber)'}}
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}
