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
 * Apple-style quote request form. Three fieldset sections on the left,
 * sticky bundle + direct-reach panel on the right. RHF handles
 * validation; submit is console.log + success screen with a
 * reference number — no real backend.
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
  const bundle = buildBundle(items, prefillProduct);

  const [submitted, setSubmitted] = useState(false);
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
    defaultValues: {businessType: '', city: '', timeline: 'within-a-month'},
  });

  function onSubmit(values) {
    const payload = {
      id: `quote_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      bundle: bundle.map((b) => ({
        slug: b.slug,
        qty: b.qty,
        name: b.name,
        priceINR: b.priceINR,
      })),
      subtotal,
      gst,
      total,
      buyer: values,
    };
    // eslint-disable-next-line no-console
    console.log('[demo] Quote submitted:', payload);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <SuccessScreen
        onReset={() => {
          setSubmitted(false);
          clear();
        }}
      />
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
      <header className="mb-10">
        <span className="apple-eyebrow">Request a quote</span>
        <h1
          className="mt-3 text-[32px] font-semibold tracking-tight md:text-[40px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Tell us about the project.
        </h1>
        <p
          className="mt-3 max-w-2xl text-[15px] leading-relaxed"
          style={{color: 'var(--ks-ink-2)'}}
        >
          We&apos;ll return a single all-in quote — including freight,
          installation, and the GST invoice you can use for ITC — within
          24 hours.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-7 space-y-5"
        >
          <FormSection title="Your details">
            <Field label="Full name" error={errors.name?.message}>
              <Input
                type="text"
                {...register('name', {required: 'Tell us your name'})}
                placeholder="Arjun Mehta"
              />
            </Field>
            <Field label="Work email" error={errors.email?.message}>
              <Input
                type="email"
                {...register('email', {
                  required: 'Work email needed',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Invalid email',
                  },
                })}
                placeholder="arjun@lakesidecafe.in"
              />
            </Field>
            <Field
              label="Mobile (with country code)"
              error={errors.phone?.message}
            >
              <Input
                type="tel"
                {...register('phone', {
                  required: 'Mobile needed for delivery coordination',
                })}
                placeholder="+91 98XXX XXXXX"
              />
            </Field>
          </FormSection>

          <FormSection title="Business details">
            <Field
              label="Business name"
              error={errors.businessName?.message}
            >
              <Input
                type="text"
                {...register('businessName', {
                  required: 'Business name (or "Personal venture")',
                })}
                placeholder="Lakeside Café"
              />
            </Field>
            <Field label="Business type">
              <select {...register('businessType')} className={inputCls()}>
                <option value="">Select…</option>
                {BUSINESS_TYPES.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <Input
                type="text"
                {...register('city')}
                placeholder="Bengaluru"
              />
            </Field>
            <Field label="GSTIN (optional)">
              <Input
                type="text"
                {...register('gstin')}
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
            className="apple-button-amber w-full justify-center md:w-auto"
          >
            <FileText className="h-4 w-4" />
            Send my quote request
            <ArrowRight className="h-4 w-4 opacity-70" />
          </button>
          <p
            className="text-[12px]"
            style={{color: 'var(--ks-muted)'}}
          >
            By submitting you accept our standard 71% advance + 29%
            pre-dispatch terms.
          </p>
        </form>

        <aside className="md:col-span-5">
          <div className="sticky top-2 space-y-4">
            <div
              className="rounded-[var(--ks-radius-md)] p-5"
              style={{
                background: 'var(--ks-card-solid)',
                border: '1px solid var(--ks-line-soft)',
              }}
            >
              <span className="apple-eyebrow">
                Items in this quote ({bundle.length})
              </span>
              {bundle.length === 0 ? (
                <p
                  className="mt-3 text-sm"
                  style={{color: 'var(--ks-ink-2)'}}
                >
                  No specific items — we&apos;ll build the spec from your
                  notes. You can also{' '}
                  <Link
                    to="/collections/all"
                    className="font-medium hover:underline"
                    style={{color: 'var(--ks-blue)'}}
                  >
                    add products to your cart
                  </Link>{' '}
                  first.
                </p>
              ) : (
                <ul
                  className="mt-3 divide-y"
                  style={{borderColor: 'var(--ks-line-soft)'}}
                >
                  {bundle.map((b) => (
                    <li
                      key={b.slug}
                      className="flex items-start gap-3 py-2.5"
                      style={{
                        borderTop:
                          bundle.indexOf(b) === 0
                            ? 'none'
                            : '1px solid var(--ks-line-soft)',
                      }}
                    >
                      <div
                        className="h-10 w-10 shrink-0 rounded-md"
                        style={{
                          background: `linear-gradient(180deg, ${tint(b.accent, 0.10)}, ${tint(b.accent, 0.04)})`,
                          border: '1px solid var(--ks-line-soft)',
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div
                          className="line-clamp-2 text-[13px] font-semibold"
                          style={{color: 'var(--ks-ink)'}}
                        >
                          {b.name}
                        </div>
                        <div
                          className="text-[11px]"
                          style={{color: 'var(--ks-muted)'}}
                        >
                          Qty {b.qty}{' '}
                          {b.priceINR
                            ? `· ${formatINR(b.priceINR)} each`
                            : '· Project priced'}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {bundle.length > 0 && subtotal > 0 && (
                <div
                  className="mt-3 space-y-1.5 border-t pt-3 text-[13px]"
                  style={{borderColor: 'var(--ks-line-soft)'}}
                >
                  <Row k="Subtotal" v={formatINR(subtotal)} />
                  <Row k="GST · 18%" v={formatINR(gst)} muted />
                  <Row k="Estimate" v={formatINR(total)} strong />
                </div>
              )}
            </div>

            <div
              className="rounded-[var(--ks-radius-md)] p-5 text-[13px]"
              style={{
                background: 'var(--ks-blue-soft)',
                color: 'var(--ks-blue-dark)',
                border: '1px solid rgba(0,113,227,0.18)',
              }}
            >
              <div
                className="font-semibold"
                style={{color: 'var(--ks-blue-dark)'}}
              >
                Talk to a specialist now
              </div>
              <ul className="mt-2 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
                  Sales line: +91 80 0000 0000
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
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
    <fieldset
      className="rounded-[var(--ks-radius-md)] p-5"
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px solid var(--ks-line-soft)',
      }}
    >
      <legend
        className="px-2 text-[11px] font-semibold uppercase tracking-[0.10em]"
        style={{color: 'var(--ks-muted)'}}
      >
        {title}
      </legend>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({label, error, children}) {
  return (
    <label className="block">
      <div
        className="mb-1.5 text-[12px] font-medium"
        style={{color: 'var(--ks-ink-2)'}}
      >
        {label}
      </div>
      {children}
      {error && (
        <div
          className="mt-1 text-[11px]"
          style={{color: '#c2410c'}}
        >
          {error}
        </div>
      )}
    </label>
  );
}

function inputCls(error) {
  return cn(
    'w-full rounded-md px-3 py-2 text-sm focus:outline-none',
    error
      ? 'focus:ring-2'
      : '',
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(inputCls(), props.className)}
      style={{
        background: '#fafafa',
        border: '1px solid var(--ks-line)',
        color: 'var(--ks-ink)',
        ...(props.style || {}),
      }}
    />
  );
}

function Row({k, v, muted, strong}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span style={{color: muted ? 'var(--ks-muted)' : 'var(--ks-ink-2)'}}>{k}</span>
      <span
        className={`tabular ${strong ? 'text-[15px] font-semibold' : 'font-medium'}`}
        style={{color: 'var(--ks-ink)'}}
      >
        {v}
      </span>
    </div>
  );
}

function SuccessScreen({onReset}) {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <div
        className="mx-auto grid h-14 w-14 place-items-center rounded-full"
        style={{
          background: 'var(--ks-emerald-soft)',
          color: 'var(--ks-emerald-dark)',
        }}
      >
        <Check className="h-7 w-7" strokeWidth={1.6} />
      </div>
      <h1
        className="mt-5 text-[28px] font-semibold"
        style={{color: 'var(--ks-ink)'}}
      >
        Quote request sent.
      </h1>
      <p
        className="mt-3 text-sm"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Our team will reach out within 24 hours with an itemised quote —
        including freight, installation, and the GST invoice you can use
        for ITC. We&apos;ve cleared your cart.
      </p>
      <p
        className="mt-1 text-[12px]"
        style={{color: 'var(--ks-muted)'}}
      >
        Reference:{' '}
        <span
          className="tabular"
          style={{color: 'var(--ks-ink)'}}
        >
          QT-{Date.now().toString().slice(-6)}
        </span>{' '}
        · Filed on {formatDate(new Date())}
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link to="/collections/all" className="apple-button-primary">
          Continue browsing
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="apple-button-ghost"
        >
          Submit another
        </button>
      </div>
    </section>
  );
}

function tint(hex, opacity) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
