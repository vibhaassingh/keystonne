import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {useForm} from 'react-hook-form';
import {ChevronLeft, Plus, Trash2, Save, Sparkles, Check} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {businessTypes} from '~/lib/mock/businessTypes';
import {products} from '~/lib/mock/products';
import {formatINR} from '~/lib/utils/formatINR';
import {cn} from '~/lib/utils/cn';

export const meta = () => [{title: 'Register a deal — Keystonne Partner'}];

export default function NewDeal() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  const navigate = useNavigate();
  const [items, setItems] = useState([{uid: `l-${Date.now()}`, sku: products[0].slug, qty: 1}]);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState(null);
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      project: '', client: '', decisionMaker: '',
      contactEmail: '', contactMobile: '',
      city: '', venture: 'cafe', expectedCloseAt: '',
      notes: '',
    },
  });

  function addItem() {
    setItems((it) => [
      ...it,
      {uid: `l-${Date.now()}-${it.length}`, sku: products[0].slug, qty: 1},
    ]);
  }
  function removeItem(idx) {
    setItems((it) => it.filter((_, i) => i !== idx));
  }
  function updateItem(idx, patch) {
    setItems((it) => it.map((line, i) => (i === idx ? {...line, ...patch} : line)));
  }

  function onSubmit(values) {
    const id = `KD-${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const linesResolved = items.map((l) => {
      const p = products.find((p) => p.slug === l.sku);
      return {sku: l.sku, name: p?.name, qty: l.qty, unitINR: p?.priceINR ?? null};
    });
    const estValueINR = linesResolved.reduce((s, l) => s + (l.unitINR ?? 0) * l.qty, 0);
    // eslint-disable-next-line no-console
    console.log('[demo] Deal registered:', {id, ...values, lines: linesResolved, estValueINR});
    setRefId(id);
    setSubmitted(true);
  }

  if (!hydrated || !isLoggedIn) return null;

  if (submitted) {
    return (
      <PartnerShell>
        <section className="mx-auto max-w-xl py-16 text-center md:py-24">
          <div
            className="mx-auto grid h-16 w-16 place-items-center rounded-full"
            style={{
              background: 'var(--ks-emerald-soft)',
              color: 'var(--ks-emerald-dark)',
            }}
          >
            <Check className="h-8 w-8" strokeWidth={1.6} />
          </div>
          <h1
            className="mt-6 text-[32px] font-semibold tracking-tight md:text-[40px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            Deal registered.
          </h1>
          <p
            className="mt-3 text-sm md:text-base"
            style={{color: 'var(--ks-ink-2)'}}
          >
            Attribution locked. Our partner-ops team will review within one
            working day. You can register additional deals or jump back to
            your dashboard.
          </p>
          <div
            className="mt-7 inline-flex flex-col items-center rounded-2xl px-5 py-3"
            style={{
              background: 'var(--ks-card-tint)',
              border: '1px solid var(--ks-line-soft)',
            }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-[0.10em]"
              style={{color: 'var(--ks-muted)'}}
            >
              Deal ID
            </span>
            <span
              className="mt-0.5 text-lg font-semibold"
              style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
            >
              {refId}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/partner/dashboard/deals')}
              className="apple-button-ghost"
            >
              View all deals
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setRefId(null);
                setItems([{uid: `l-${Date.now()}`, sku: products[0].slug, qty: 1}]);
              }}
              className="apple-button-primary"
            >
              Register another
            </button>
          </div>
        </section>
      </PartnerShell>
    );
  }

  const total = items.reduce((s, l) => {
    const p = products.find((p) => p.slug === l.sku);
    return s + (p?.priceINR ?? 0) * l.qty;
  }, 0);

  return (
    <PartnerShell>
      <Link
        to="/partner/dashboard/deals"
        className="mb-5 inline-flex items-center gap-1 text-[12px] font-medium"
        style={{color: 'var(--ks-muted)'}}
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to deals
      </Link>

      <header className="mb-7">
        <span className="apple-eyebrow">New deal</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Register a project.
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Lock attribution the moment you spec — first-to-register wins
          (with a 30-day protection window).
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Section title="Project">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Project name" error={errors.project?.message}>
                <Input {...register('project', {required: 'Required'})} placeholder="Lakeside Café, Whitefield" />
              </Field>
              <Field label="Venture type">
                <select
                  {...register('venture')}
                  className={inputCls}
                  style={inputStyle}
                >
                  {businessTypes.map((b) => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="City" error={errors.city?.message}>
                <Input {...register('city', {required: 'Required'})} placeholder="Bengaluru" />
              </Field>
              <Field label="Expected close" error={errors.expectedCloseAt?.message}>
                <Input type="date" {...register('expectedCloseAt', {required: 'Required'})} />
              </Field>
            </div>
          </Section>

          <Section title="Client">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Client / brand" error={errors.client?.message}>
                <Input {...register('client', {required: 'Required'})} placeholder="Lakeside Hospitality LLP" />
              </Field>
              <Field label="Decision maker" error={errors.decisionMaker?.message}>
                <Input {...register('decisionMaker', {required: 'Required'})} placeholder="Priya Krishnan" />
              </Field>
              <Field label="Email">
                <Input type="email" {...register('contactEmail')} placeholder="priya@lakeside.in" />
              </Field>
              <Field label="Mobile">
                <Input type="tel" {...register('contactMobile')} placeholder="+91 98XXX XXXXX" />
              </Field>
            </div>
          </Section>

          <Section
            title={`Line items (${items.length})`}
            actions={
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{
                  background: 'var(--ks-card-solid)',
                  border: '1px solid var(--ks-line)',
                  color: 'var(--ks-ink)',
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add line
              </button>
            }
          >
            <ul className="space-y-3">
              {items.map((line, i) => {
                const p = products.find((p) => p.slug === line.sku);
                const lineTotal = (p?.priceINR ?? 0) * line.qty;
                return (
                  <li
                    key={line.uid}
                    className="grid gap-3 rounded-xl p-3 md:grid-cols-12 md:items-center"
                    style={{
                      background: 'var(--ks-card-tint)',
                      border: '1px solid var(--ks-line-soft)',
                    }}
                  >
                    <div className="md:col-span-7">
                      <select
                        value={line.sku}
                        onChange={(e) => updateItem(i, {sku: e.target.value})}
                        className={cn(inputCls, 'text-[13px]')}
                        style={inputStyle}
                      >
                        {products.map((p) => (
                          <option key={p.slug} value={p.slug}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="number"
                        min={1}
                        value={line.qty}
                        onChange={(e) => updateItem(i, {qty: Math.max(1, parseInt(e.target.value || '1', 10))})}
                        className={cn(inputCls, 'text-center')}
                        style={inputStyle}
                      />
                    </div>
                    <div
                      className="text-right text-sm font-semibold md:col-span-2"
                      style={{
                        color: 'var(--ks-ink)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {p?.priceINR ? formatINR(lineTotal) : 'Quote'}
                    </div>
                    <div className="md:col-span-1 md:text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        disabled={items.length === 1}
                        aria-label="Remove line"
                        className="inline-grid h-8 w-8 place-items-center rounded-full disabled:opacity-40"
                        style={{color: 'var(--ks-muted)'}}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>

          <Section title="Notes (optional)">
            <textarea
              rows={4}
              {...register('notes')}
              className={cn(inputCls, 'resize-none')}
              style={inputStyle}
              placeholder="Site context, electrical / gas availability, timing constraints…"
            />
          </Section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="partner-finance-card">
              <span className="apple-eyebrow">Summary</span>
              <dl className="mt-4 space-y-3 text-sm">
                <Row k="Line items" v={items.length} />
                <Row k="Est. priced total" v={formatINR(total)} />
                <Row
                  k="Est. commission"
                  v={formatINR(Math.round(total * 0.066 * 1.1))}
                  note="6.6% blended × Silver 1.10×"
                  accent="emerald"
                />
              </dl>

              <div className="apple-divider my-5" />

              <button
                type="submit"
                className="partner-action w-full justify-center"
              >
                <Save className="h-4 w-4" />
                Register deal
              </button>
              <p
                className="mt-3 text-[11px]"
                style={{color: 'var(--ks-muted)'}}
              >
                Attribution locks the moment you submit.
              </p>
            </div>

            <div
              className="rounded-2xl p-5"
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
                Try the planner instead
              </div>
              <p
                className="mt-2 text-[12px]"
                style={{color: 'var(--ks-blue-dark)'}}
              >
                Describe the kitchen in plain language and we&apos;ll
                pre-fill this form with suggested line items.
              </p>
              <Link
                to="/kitchen-planner"
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold"
                style={{color: 'var(--ks-blue-dark)'}}
              >
                Launch AI planner →
              </Link>
            </div>
          </div>
        </aside>
      </form>
    </PartnerShell>
  );
}

const inputCls =
  'w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none';

const inputStyle = {
  background: '#fafafa',
  border: '1px solid var(--ks-line-soft)',
  color: 'var(--ks-ink)',
};

function Section({title, actions, children}) {
  return (
    <fieldset className="premium-panel mb-5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <legend
          className="text-[11px] font-medium uppercase tracking-[0.10em]"
          style={{color: 'var(--ks-muted)'}}
        >
          {title}
        </legend>
        {actions}
      </div>
      {children}
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

function Input(props) {
  return (
    <input
      {...props}
      className={cn(inputCls, props.className)}
      style={inputStyle}
    />
  );
}

function Row({k, v, note, accent}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <dt style={{color: 'var(--ks-ink-2)'}}>{k}</dt>
        {note && (
          <div
            className="text-[11px]"
            style={{color: 'var(--ks-muted)'}}
          >
            {note}
          </div>
        )}
      </div>
      <dd
        className="font-semibold"
        style={{
          color: accent === 'emerald' ? 'var(--ks-emerald)' : 'var(--ks-ink)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {v}
      </dd>
    </div>
  );
}

