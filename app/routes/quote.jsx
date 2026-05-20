import {useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import {useForm} from 'react-hook-form';
import {Check, FileText, ArrowRight, Phone, Mail} from 'lucide-react';
import {productBySlug} from '~/lib/mock/products';
import {useQuoteCart} from '~/lib/quoteCart';
import {formatINR} from '~/lib/utils/formatINR';
import {formatDate} from '~/lib/utils/formatDate';
import {cn} from '~/lib/utils/cn';

/**
 * Quote-request form. Lists the items being quoted on (cart + optional
 * prefilled SKU from a product page), then collects buyer details. Submit
 * is console.log + success screen — no backend in Phase 1.
 */

export const meta = () => [{title: 'Request a quote — Keystonne'}];

const BUSINESS_TYPES = [
  {value: 'cafe', label: 'Café'},
  {value: 'cloud-kitchen', label: 'Cloud kitchen'},
  {value: 'qsr', label: 'QSR'},
  {value: 'fine-dining', label: 'Fine dining'},
  {value: 'bakery', label: 'Bakery'},
  {value: 'hotel-kitchen', label: 'Hotel kitchen'},
  {value: 'hospital-kitchen', label: 'Hospital / institutional'},
  {value: 'catering-kitchen', label: 'Catering'},
  {value: 'new-venture', label: 'New venture — building from scratch'},
  {value: 'other', label: 'Something else'},
];

export default function QuotePage() {
  const [params] = useSearchParams();
  const prefillSlug = params.get('sku');
  const prefillProduct = prefillSlug ? productBySlug[prefillSlug] : null;

  const {items, subtotal, gst, total, clear} = useQuoteCart();

  // The quote bundle is: cart items + (optional) prefilled product the user
  // landed on directly. We display them merged, deduplicating by slug.
  const bundle = buildBundle(items, prefillProduct);

  const [submitted, setSubmitted] = useState(false);
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
    defaultValues: {
      businessType: '',
      city: '',
      timeline: 'within-a-month',
    },
  });

  function onSubmit(values) {
    const payload = {
      id: `quote_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      bundle: bundle.map((b) => ({slug: b.slug, qty: b.qty, name: b.name, priceINR: b.priceINR})),
      subtotal,
      gst,
      total,
      buyer: values,
    };
    // Phase 2 will POST to /api/quotes; today we capture in the console
    // so demo viewers can inspect what's being collected.
    // eslint-disable-next-line no-console
    console.log('[demo] Quote submitted:', payload);
    setSubmitted(true);
    reset();
  }

  if (submitted) return <SuccessScreen onReset={() => { setSubmitted(false); clear(); }} />;

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-12">
      <h1 className="text-2xl font-semibold text-ink md:text-3xl">
        Request a quote
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-gray-600">
        Tell us a little about the project — we&apos;ll return a single
        all-in quote, including freight and installation, within 24 hours.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-12">
        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7">
          <FormSection title="Your details">
            <Field label="Full name" error={errors.name?.message}>
              <input
                type="text"
                {...register('name', {required: 'Tell us your name'})}
                className={inputCls(errors.name)}
                placeholder="Arjun Mehta"
              />
            </Field>
            <Field label="Work email" error={errors.email?.message}>
              <input
                type="email"
                {...register('email', {
                  required: 'Work email needed',
                  pattern: {value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email'},
                })}
                className={inputCls(errors.email)}
                placeholder="arjun@lakesidecafe.in"
              />
            </Field>
            <Field label="Mobile (with country code)" error={errors.phone?.message}>
              <input
                type="tel"
                {...register('phone', {required: 'Mobile needed for delivery coordination'})}
                className={inputCls(errors.phone)}
                placeholder="+91 98XXX XXXXX"
              />
            </Field>
          </FormSection>

          <FormSection title="Business details">
            <Field label="Business name" error={errors.businessName?.message}>
              <input
                type="text"
                {...register('businessName', {required: 'Business name (or "Personal venture")'})}
                className={inputCls(errors.businessName)}
                placeholder="Lakeside Café"
              />
            </Field>
            <Field label="Business type">
              <select
                {...register('businessType')}
                className={inputCls()}
              >
                <option value="">Select…</option>
                {BUSINESS_TYPES.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <input
                type="text"
                {...register('city')}
                className={inputCls()}
                placeholder="Bengaluru"
              />
            </Field>
            <Field label="GSTIN (optional)">
              <input
                type="text"
                {...register('gstin')}
                className={inputCls()}
                placeholder="29ABCDE1234F1Z5"
              />
            </Field>
          </FormSection>

          <FormSection title="Project">
            <Field label="When do you need this?">
              <select {...register('timeline')} className={inputCls()}>
                <option value="urgent">Urgent — within 2 weeks</option>
                <option value="within-a-month">Within a month</option>
                <option value="1-3-months">1–3 months out</option>
                <option value="exploring">Exploring options</option>
              </select>
            </Field>
            <Field label="Anything else we should know?">
              <textarea
                {...register('notes')}
                rows={4}
                className={inputCls()}
                placeholder="Capacity, site layout, gas/electric availability, existing equipment to integrate, etc."
              />
            </Field>
          </FormSection>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary-700 disabled:opacity-60 md:w-auto md:px-8"
          >
            <FileText className="h-4 w-4" />
            Send my quote request
            <ArrowRight className="h-4 w-4 opacity-80" />
          </button>
          <p className="mt-2 text-[12px] text-gray-500">
            By submitting you accept our standard 71% advance + 29% pre-dispatch terms.
          </p>
        </form>

        <aside className="md:col-span-5">
          <div className="sticky top-2 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                Items in this quote ({bundle.length})
              </h2>
              {bundle.length === 0 ? (
                <p className="text-sm text-gray-600">
                  No specific items — we&apos;ll build the spec from your
                  notes. You can also{' '}
                  <Link to="/collections/all" className="text-brand-primary hover:underline">
                    add products to your cart
                  </Link>{' '}
                  first.
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {bundle.map((b) => (
                    <li key={b.slug} className="flex items-start gap-3 py-2">
                      <div
                        className="h-10 w-10 shrink-0 rounded"
                        style={{background: b.accent}}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-2 text-[13px] font-semibold text-ink">
                          {b.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Qty {b.qty}{' '}
                          {b.priceINR ? `· ${formatINR(b.priceINR)} each` : '· Project priced'}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {bundle.length > 0 && subtotal > 0 && (
                <div className="mt-3 border-t border-gray-100 pt-3 text-[13px]">
                  <Row label="Subtotal" value={formatINR(subtotal)} />
                  <Row label="GST · 18%" value={formatINR(gst)} muted />
                  <Row label="Estimate" value={formatINR(total)} strong />
                </div>
              )}
            </div>

            <div className="rounded-lg bg-brand-primary-50 p-4 text-[13px] text-brand-primary">
              <div className="font-semibold">Talk to a specialist now</div>
              <ul className="mt-2 space-y-1.5 text-gray-700">
                <li className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-brand-primary" />
                  Sales line: +91 80 0000 0000
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-brand-primary" />
                  hello@keystonne.in
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/** Merge cart items + optional pre-filled product (deduped by slug). */
function buildBundle(items, prefillProduct) {
  const seen = new Set();
  const out = [];
  for (const line of items) {
    seen.add(line.slug);
    out.push({
      slug: line.slug,
      qty: line.qty,
      name: line.product.name,
      priceINR: line.product.priceINR,
      accent: line.product.accent,
    });
  }
  if (prefillProduct && !seen.has(prefillProduct.slug)) {
    out.push({
      slug: prefillProduct.slug,
      qty: 1,
      name: prefillProduct.name,
      priceINR: prefillProduct.priceINR,
      accent: prefillProduct.accent,
    });
  }
  return out;
}

function FormSection({title, children}) {
  return (
    <fieldset className="mb-6 rounded-lg border border-gray-200 bg-white p-5">
      <legend className="px-2 text-xs font-bold uppercase tracking-wider text-gray-500">
        {title}
      </legend>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({label, error, children}) {
  return (
    <label className="block">
      <div className="mb-1 text-[12px] font-semibold text-gray-700">{label}</div>
      {children}
      {error && <div className="mt-1 text-[11px] text-red-600">{error}</div>}
    </label>
  );
}

function inputCls(error) {
  return cn(
    'w-full rounded-md border bg-white px-3 py-2 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2',
    error
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20',
  );
}

function Row({label, value, strong, muted}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={muted ? 'text-gray-500' : 'text-gray-700'}>{label}</span>
      <span className={`tabular ${strong ? 'text-base font-semibold text-ink' : 'font-medium text-ink'}`}>
        {value}
      </span>
    </div>
  );
}

function SuccessScreen({onReset}) {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <Check className="h-8 w-8" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold text-ink">Quote request sent.</h1>
      <p className="mt-3 text-sm text-gray-600">
        Our team will reach out within 24 hours with an itemised quote —
        including freight, installation, and the GST invoice you can use
        for ITC. We&apos;ve cleared your cart.
      </p>
      <p className="mt-1 text-[12px] text-gray-500">
        Reference: <span className="tabular">QT-{Date.now().toString().slice(-6)}</span> ·{' '}
        Filed on {formatDate(new Date())}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/collections/all"
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-700"
        >
          Continue browsing
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/40"
        >
          Submit another
        </button>
      </div>
    </section>
  );
}
