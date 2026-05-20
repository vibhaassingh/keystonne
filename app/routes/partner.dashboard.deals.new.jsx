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
  const [items, setItems] = useState([{sku: products[0].slug, qty: 1}]);
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
    setItems((it) => [...it, {sku: products[0].slug, qty: 1}]);
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
        <section className="mx-auto max-w-xl py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">
            Deal registered.
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Attribution locked. Our partner-ops team will review within one
            working day. You can register additional deals or jump back to
            your dashboard.
          </p>
          <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-gray-200 bg-white px-5 py-3">
            <span className="text-[11px] uppercase tracking-wider text-gray-500">
              Deal ID
            </span>
            <span className="tabular mt-0.5 text-lg font-semibold text-ink">
              {refId}
            </span>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/partner/dashboard/deals')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/40"
            >
              View all deals
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setRefId(null);
                setItems([{sku: products[0].slug, qty: 1}]);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
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
        className="mb-4 inline-flex items-center gap-1 text-[12px] font-semibold text-gray-500 hover:text-brand-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to deals
      </Link>

      <header className="mb-6">
        <span className="eyebrow">New deal</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Register a project.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
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

          <Section title={`Line items (${items.length})`} actions={
            <button type="button" onClick={addItem} className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-ink/40">
              <Plus className="h-3.5 w-3.5" /> Add line
            </button>
          }>
            <ul className="space-y-3">
              {items.map((line, i) => {
                const p = products.find((p) => p.slug === line.sku);
                const lineTotal = (p?.priceINR ?? 0) * line.qty;
                return (
                  <li key={i} className="grid gap-3 rounded-xl border border-gray-200 bg-white p-3 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-7">
                      <select
                        value={line.sku}
                        onChange={(e) => updateItem(i, {sku: e.target.value})}
                        className={cn(inputCls, 'text-[13px]')}
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
                      />
                    </div>
                    <div className="tabular text-right text-sm font-semibold text-ink md:col-span-2">
                      {p?.priceINR ? formatINR(lineTotal) : 'Quote'}
                    </div>
                    <div className="md:col-span-1 md:text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        disabled={items.length === 1}
                        aria-label="Remove line"
                        className="inline-grid h-8 w-8 place-items-center rounded text-gray-400 hover:bg-gray-100 hover:text-red-600 disabled:opacity-40"
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
              placeholder="Site context, electrical / gas availability, timing constraints…"
            />
          </Section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="sticky top-2 space-y-4">
            <div className="card p-5">
              <span className="eyebrow">Summary</span>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Line items" v={items.length} />
                <Row k="Est. priced total" v={formatINR(total)} />
                <Row k="Est. commission" v={formatINR(Math.round(total * 0.066 * 1.1))} note="6.6% blended × Silver 1.10×" />
              </dl>

              <div className="my-4 glass-divider" />

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
              >
                <Save className="h-4 w-4" />
                Register deal
              </button>
              <p className="mt-2 text-[11px] text-gray-500">
                Attribution locks the moment you submit.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-brand-accent/30 bg-brand-accent/5 p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Try the planner instead
              </div>
              <p className="mt-1.5 text-[12px] text-gray-700">
                Describe the kitchen in plain language and we&apos;ll
                pre-fill this form with suggested line items.
              </p>
              <Link
                to="/kitchen-planner"
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-accent hover:underline"
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
  'w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15';

function Section({title, actions, children}) {
  return (
    <fieldset className="mb-5 card p-5">
      <div className="mb-4 flex items-center justify-between">
        <legend className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
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
      <div className="mb-1.5 text-[12px] font-semibold text-gray-700">{label}</div>
      {children}
      {error && <div className="mt-1 text-[11px] text-red-600">{error}</div>}
    </label>
  );
}

function Input(props) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

function Row({k, v, note}) {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <dt className="text-gray-600">{k}</dt>
        {note && <div className="text-[11px] text-gray-400">{note}</div>}
      </div>
      <dd className="tabular font-semibold text-ink">{v}</dd>
    </div>
  );
}
