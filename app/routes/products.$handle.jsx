import {useState} from 'react';
import {Link, useParams} from 'react-router';
import {
  ChevronRight,
  ShoppingCart,
  FileText,
  Check,
  Star,
  Truck,
  ShieldCheck,
  Wrench,
  Receipt,
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
 * Product detail page. B2B layout: spec table is hero, marketing copy is
 * secondary. Dual CTA respects the ₹50K threshold (CLAUDE.md §7).
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
  const canAddToCart = typeof product.priceINR === 'number' && product.priceINR < 50_000;
  const {gst, total} = product.priceINR ? gstFor(product.priceINR) : {gst: 0, total: 0};

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('specs');
  const [justAdded, setJustAdded] = useState(false);
  const {add} = useQuoteCart();
  const {open} = useAside();

  function handleAdd() {
    add(product.slug, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    setTimeout(() => open('cart'), 200);
  }

  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-4 md:px-6">
          <Breadcrumbs product={product} cat={cat} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Gallery */}
          <div className="md:col-span-6">
            <div
              className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${product.accent}, ${shade(product.accent, -22)})`,
              }}
            >
              <Icon className="h-32 w-32 text-white/95" />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-brand-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumb row — placeholder variants of the same icon */}
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <li
                  key={i}
                  className={cn(
                    'aspect-square cursor-pointer rounded-md ring-2 ring-transparent',
                    i === 0 && 'ring-brand-primary',
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${shade(product.accent, i * 6)}, ${shade(product.accent, -22 + i * 4)})`,
                  }}
                >
                  <div className="grid h-full w-full place-items-center">
                    <Icon className="h-7 w-7 text-white/85" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Buy box */}
          <div className="md:col-span-6">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-brand-primary">
              {cat?.name}
            </div>
            <h1 className="mt-1 text-2xl font-semibold leading-tight text-ink md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-[13px] text-gray-600">
              <Stars value={product.rating} />
              <span className="tabular">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-700 md:text-base">
              {product.blurb}
            </p>

            {/* Price block */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              {canAddToCart ? (
                <>
                  <div className="flex items-baseline gap-3">
                    <div className="tabular text-3xl font-semibold text-ink">
                      {formatINR(product.priceINR)}
                    </div>
                    <div className="text-sm text-gray-500">per unit</div>
                  </div>
                  <div className="mt-1 text-[12px] text-gray-500">
                    + {formatINR(gst)} GST (18%) ={' '}
                    <span className="tabular font-semibold text-ink">
                      {formatINR(total)}
                    </span>{' '}
                    landed
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Project pricing
                  </div>
                  <div className="mt-1 text-base font-semibold text-ink">
                    Request a quote — typically delivered in 24 hours
                  </div>
                  <div className="mt-1 text-[12px] text-gray-500">
                    Includes freight + installation + GST invoice.
                  </div>
                </>
              )}

              <ul className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-gray-700">
                <li className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-brand-primary" />
                  Ships in {product.leadDays} day{product.leadDays !== 1 ? 's' : ''}
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-primary" />
                  {product.warrantyMonths}-month warranty
                </li>
                <li className="flex items-center gap-1.5">
                  <Receipt className="h-3.5 w-3.5 text-brand-primary" />
                  GST invoice · 18%
                </li>
                <li className="flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-brand-primary" />
                  Installation supported
                </li>
              </ul>
            </div>

            {/* Dual CTA */}
            <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
              {canAddToCart && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Qty</span>
                  <QtyStepper qty={qty} onChange={setQty} />
                </div>
              )}

              {canAddToCart && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-colors md:flex-none md:px-6',
                    justAdded
                      ? 'bg-emerald-600'
                      : 'bg-brand-accent hover:bg-brand-accent-hover',
                  )}
                >
                  {justAdded ? (
                    <><Check className="h-4 w-4" /> Added to cart</>
                  ) : (
                    <><ShoppingCart className="h-4 w-4" /> Add to cart</>
                  )}
                </button>
              )}

              <Link
                to={`/quote?sku=${product.slug}`}
                prefetch="intent"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary-700 md:flex-none md:px-6"
              >
                <FileText className="h-4 w-4" />
                Request a quote
              </Link>
            </div>

            <p className="mt-4 text-[12px] text-gray-500">
              Terms: 71% advance · 29% before dispatch · 4–7 working days
              delivery anywhere in India.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-b border-gray-200">
          <div className="flex gap-6">
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
                  'border-b-2 px-1 py-3 text-sm font-semibold transition-colors',
                  tab === t.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-gray-500 hover:text-ink',
                )}
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
              <div className="space-y-3 text-sm leading-relaxed text-gray-700">
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
              <div className="space-y-3 text-sm text-gray-700">
                <SupportCard icon={ShieldCheck} title={`${product.warrantyMonths}-month warranty`}>
                  Free replacement of defective parts. Extended AMC
                  contracts available; ask the sales team.
                </SupportCard>
                <SupportCard icon={Truck} title={`Delivery in ${product.leadDays} days`}>
                  Pan-India freight included in catalog price. E-way bill
                  arranged. Larger walk-in / cold-room jobs include
                  installation + commissioning.
                </SupportCard>
                <SupportCard icon={Wrench} title="Installation">
                  Free if your total order exceeds ₹10L. Otherwise ₹49,900
                  or 5% of order value, whichever is higher.
                </SupportCard>
              </div>
            )}
          </div>

          <aside className="md:col-span-4">
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-[13px] text-gray-700">
                {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                  <li key={k} className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 font-semibold text-gray-600">{k}</span>
                    <span className="tabular text-right text-ink">{v}</span>
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
      <h1 className="text-2xl font-semibold text-ink">
        We can&apos;t find this product.
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        It may have been renamed or removed. Browse the catalog to find a
        replacement, or request a quote for your spec.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/collections/all"
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-700"
        >
          Browse catalog
        </Link>
        <Link
          to="/quote"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/50"
        >
          Request a quote
        </Link>
      </div>
    </section>
  );
}

function SupportCard({icon: Icon, title, children}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
      <div>
        <div className="font-semibold text-ink">{title}</div>
        <div className="text-[13px]">{children}</div>
      </div>
    </div>
  );
}

function Breadcrumbs({product, cat}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[12px] text-gray-500">
      <Link to="/" className="hover:text-brand-primary">Home</Link>
      <ChevronRight className="h-3 w-3" />
      {cat && (
        <>
          <Link
            to={`/collections/${cat.slug}`}
            className="hover:text-brand-primary"
          >
            {cat.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
        </>
      )}
      <span className="line-clamp-1 text-ink">{product.name}</span>
    </nav>
  );
}

function Stars({value}) {
  return (
    <span className="flex" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="h-4 w-4 text-gray-300" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{width: `${fill * 100}%`}}
              aria-hidden="true"
            >
              <Star className="h-4 w-4 text-brand-accent" fill="currentColor" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
