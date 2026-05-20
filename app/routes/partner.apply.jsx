import {useState} from 'react';
import {Link} from 'react-router';
import {useForm} from 'react-hook-form';
import {
  Check, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react';
import {personas, applySteps} from '~/lib/mock/partnerProgram';
import {cn} from '~/lib/utils/cn';

/**
 * Partner application — single React Hook Form instance with nine logical
 * steps. We validate per-step via `trigger()` so the user can't advance
 * with missing required fields. Final step (Review) is read-only; submit
 * writes the payload to the console + reaches a success screen with a
 * reference number — no real backend in Phase 1 (CLAUDE.md §2).
 */

export const meta = () => [
  {title: 'Apply to join the Keystonne Partner Programme'},
  {name: 'description', content: '9-step application — KYC, persona, references, payout. Decision within 3 working days.'},
];

const FIELDS_PER_STEP = {
  1: ['persona'],
  2: ['name', 'email', 'mobile', 'city'],
  3: ['businessKind', 'businessName', 'yearsExperience'],
  4: ['pan', 'gstin', 'address'],
  5: ['payoutMethod', 'payoutId'],
  6: ['p1Name', 'p1Client', 'p1Value'],
  7: ['source'],
  8: ['agreeProgramme', 'agreeConduct'],
  9: [],
};

export default function PartnerApply() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState(null);

  const form = useForm({
    mode: 'onTouched',
    defaultValues: {
      persona: '',
      name: '',
      email: '',
      mobile: '',
      city: '',
      businessKind: 'self',
      businessName: '',
      yearsExperience: '',
      pan: '',
      gstin: '',
      address: '',
      payoutMethod: 'upi',
      payoutId: '',
      ifsc: '',
      accountName: '',
      p1Name: '',
      p1Client: '',
      p1Value: '',
      p2Name: '',
      p2Client: '',
      p2Value: '',
      source: '',
      refName: '',
      refRole: '',
      refContact: '',
      agreeProgramme: false,
      agreeConduct: false,
      agreeTDS: false,
    },
  });
  const {handleSubmit, trigger, watch, register, formState: {errors}, getValues} = form;

  async function next() {
    const fields = FIELDS_PER_STEP[step] || [];
    const ok = fields.length === 0 ? true : await trigger(fields);
    if (ok) setStep((s) => Math.min(s + 1, 9));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function onSubmit(values) {
    const id = `KP-${Date.now().toString(36).toUpperCase().slice(-7)}`;
    // eslint-disable-next-line no-console
    console.log('[demo] Partner application submitted:', {id, ...values});
    setRefId(id);
    setSubmitted(true);
  }

  if (submitted) return <SuccessScreen refId={refId} />;

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Become a Keystonne partner</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Apply in 9 steps. Decision in 3 days.
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Everything below is reviewed by our partner-ops team. Take 10
          minutes; we&apos;ll lock in your status quickly.
        </p>
      </header>

      <Stepper current={step} onJump={(n) => n < step && setStep(n)} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="card p-6 md:p-8">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
            Step {step} of 9
          </div>
          <h2 className="text-xl font-semibold text-ink md:text-2xl">
            {applySteps[step - 1].label}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {applySteps[step - 1].hint}
          </p>

          <div className="mt-6 grid gap-4">
            {step === 1 && <PersonaStep register={register} errors={errors} watch={watch} />}
            {step === 2 && <PersonalStep register={register} errors={errors} />}
            {step === 3 && <BusinessStep register={register} errors={errors} watch={watch} />}
            {step === 4 && <TaxStep register={register} errors={errors} />}
            {step === 5 && <PayoutStep register={register} errors={errors} watch={watch} />}
            {step === 6 && <PortfolioStep register={register} errors={errors} />}
            {step === 7 && <ReferenceStep register={register} errors={errors} />}
            {step === 8 && <AgreementsStep register={register} errors={errors} />}
            {step === 9 && <ReviewStep values={getValues()} />}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm hover:border-ink/40 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < 9 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl btn-primary px-5 py-2.5 text-sm font-semibold"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl btn-accent px-5 py-2.5 text-sm font-semibold"
            >
              Submit application
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-[11px] text-gray-500">
        Demo mode — submissions are captured to the browser console. Real
        Supabase integration ships in Phase 2.
      </p>
    </section>
  );
}

/* ───────────────────────────  Stepper  ─────────────────────────── */

function Stepper({current, onJump}) {
  return (
    <ol className="grid grid-cols-3 gap-2 sm:grid-cols-9">
      {applySteps.map((s) => {
        const state =
          s.n < current ? 'done' : s.n === current ? 'now' : 'upcoming';
        return (
          <li key={s.n}>
            <button
              type="button"
              onClick={() => onJump?.(s.n)}
              disabled={state === 'upcoming'}
              className={cn(
                'group flex w-full items-start gap-2 rounded-xl border bg-white/70 p-3 text-left transition-colors backdrop-blur',
                state === 'now'
                  ? 'border-brand-primary shadow-[0_8px_24px_-12px_rgba(67,56,202,0.35)]'
                  : state === 'done'
                  ? 'border-emerald-300 hover:border-emerald-500'
                  : 'border-gray-200 opacity-60',
              )}
            >
              <div
                className={cn(
                  'tabular grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold',
                  state === 'done' && 'bg-emerald-600 text-white',
                  state === 'now' && 'bg-brand-primary text-white',
                  state === 'upcoming' && 'bg-gray-100 text-gray-500',
                )}
              >
                {state === 'done' ? <Check className="h-3.5 w-3.5" /> : s.n}
              </div>
              <div className="hidden text-[11px] font-semibold uppercase tracking-wider text-gray-600 sm:block">
                {s.label}
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ───────────────────────────  Steps  ────────────────────────────── */

function PersonaStep({register, errors, watch}) {
  const selected = watch('persona');
  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2">
        {personas.map((p) => {
          const Icon = p.icon;
          const isSelected = selected === p.slug;
          return (
            <li key={p.slug}>
              <label
                className={cn(
                  'card card-hover flex cursor-pointer items-start gap-3 p-4 transition-all',
                  isSelected && 'ring-2 ring-brand-primary',
                )}
              >
                <input
                  type="radio"
                  value={p.slug}
                  {...register('persona', {required: 'Pick the role that best fits you.'})}
                  className="sr-only"
                />
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                  style={{background: 'linear-gradient(135deg, var(--color-partner-accent), #047857)'}}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink">{p.name}</div>
                  <div className="mt-0.5 text-[12px] leading-snug text-gray-600">
                    {p.blurb}
                  </div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
      {errors.persona && <ErrorText>{errors.persona.message}</ErrorText>}
    </>
  );
}

function PersonalStep({register, errors}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Full name" error={errors.name?.message}>
        <Input {...register('name', {required: 'Tell us your name'})} placeholder="Arjun Mehta" />
      </Field>
      <Field label="Work email" error={errors.email?.message}>
        <Input
          type="email"
          {...register('email', {
            required: 'Work email needed',
            pattern: {value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email'},
          })}
          placeholder="arjun@example.in"
        />
      </Field>
      <Field label="Mobile (with country code)" error={errors.mobile?.message}>
        <Input
          type="tel"
          {...register('mobile', {required: 'Mobile required for OTP and payouts'})}
          placeholder="+91 98XXX XXXXX"
        />
      </Field>
      <Field label="City" error={errors.city?.message}>
        <Input {...register('city', {required: 'Which city are you based in?'})} placeholder="Bengaluru" />
      </Field>
    </div>
  );
}

function BusinessStep({register, errors, watch}) {
  const kind = watch('businessKind');
  return (
    <div className="grid gap-4">
      <Field label="How do you operate?">
        <div className="grid grid-cols-2 gap-2">
          {[
            {value: 'self', label: 'Self-employed / consultant'},
            {value: 'firm', label: 'Firm / agency'},
          ].map((o) => (
            <label
              key={o.value}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-sm transition-colors',
                kind === o.value ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-gray-300 hover:border-ink/40',
              )}
            >
              <input
                type="radio"
                value={o.value}
                {...register('businessKind')}
                className="sr-only"
              />
              <span className="font-medium text-ink">{o.label}</span>
            </label>
          ))}
        </div>
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label={kind === 'firm' ? 'Firm name' : 'Practice / brand name'}
          error={errors.businessName?.message}
        >
          <Input
            {...register('businessName', {required: 'Name required (your own brand is fine)'})}
            placeholder="Lakeside Kitchen Consulting"
          />
        </Field>
        <Field label="Years in the trade" error={errors.yearsExperience?.message}>
          <Input
            type="number"
            min={0}
            max={60}
            {...register('yearsExperience', {required: 'Best estimate is fine', min: {value: 0, message: 'Must be ≥ 0'}})}
            placeholder="8"
          />
        </Field>
      </div>
    </div>
  );
}

function TaxStep({register, errors}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="PAN" error={errors.pan?.message}>
          <Input
            {...register('pan', {
              required: 'PAN is required for TDS compliance',
              pattern: {value: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: 'Should look like ABCDE1234F'},
            })}
            placeholder="ABCDE1234F"
            style={{textTransform: 'uppercase'}}
          />
        </Field>
        <Field label="GSTIN (optional)" error={errors.gstin?.message}>
          <Input
            {...register('gstin', {
              pattern: {
                value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
                message: 'Looks like an invalid GSTIN',
              },
            })}
            placeholder="29ABCDE1234F1Z5"
            style={{textTransform: 'uppercase'}}
          />
        </Field>
      </div>
      <Field label="Business address" error={errors.address?.message}>
        <Textarea
          rows={3}
          {...register('address', {required: 'Required for Form 16A delivery'})}
          placeholder="Floor / Building, Street, Locality, City, State, PIN"
        />
      </Field>
    </div>
  );
}

function PayoutStep({register, errors, watch}) {
  const method = watch('payoutMethod');
  return (
    <div className="grid gap-4">
      <Field label="Payout method">
        <div className="grid grid-cols-2 gap-2">
          {[
            {value: 'upi', label: 'UPI'},
            {value: 'bank', label: 'Bank transfer (NEFT)'},
          ].map((o) => (
            <label
              key={o.value}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-sm transition-colors',
                method === o.value ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-gray-300 hover:border-ink/40',
              )}
            >
              <input
                type="radio"
                value={o.value}
                {...register('payoutMethod')}
                className="sr-only"
              />
              <span className="font-medium text-ink">{o.label}</span>
            </label>
          ))}
        </div>
      </Field>

      {method === 'upi' ? (
        <Field label="UPI ID" error={errors.payoutId?.message}>
          <Input
            {...register('payoutId', {required: 'UPI ID for direct payouts'})}
            placeholder="arjun@upi"
          />
        </Field>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Account number" error={errors.payoutId?.message}>
            <Input
              {...register('payoutId', {required: 'Bank account required'})}
              placeholder="XXXXXX1234"
            />
          </Field>
          <Field label="IFSC">
            <Input {...register('ifsc')} placeholder="HDFC0001234" style={{textTransform: 'uppercase'}} />
          </Field>
          <Field label="Account holder name">
            <Input {...register('accountName')} placeholder="Arjun Mehta" />
          </Field>
        </div>
      )}
    </div>
  );
}

function PortfolioStep({register, errors}) {
  return (
    <div className="grid gap-6">
      <PortfolioProject n={1} register={register} errors={errors} />
      <div className="text-[11px] uppercase tracking-wider text-gray-400">
        Project 2 (optional but recommended)
      </div>
      <PortfolioProject n={2} register={register} errors={errors} optional />
    </div>
  );
}

function PortfolioProject({n, register, errors, optional}) {
  const prefix = `p${n}`;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Field
        label={`Project ${n} name`}
        error={errors[`${prefix}Name`]?.message}
      >
        <Input
          {...register(`${prefix}Name`, optional ? {} : {required: 'A recent example helps us verify.'})}
          placeholder="Lakeside Café, Whitefield"
        />
      </Field>
      <Field label="Client / brand" error={errors[`${prefix}Client`]?.message}>
        <Input
          {...register(`${prefix}Client`, optional ? {} : {required: 'Who owns the project?'})}
          placeholder="Lakeside Hospitality LLP"
        />
      </Field>
      <Field label="Approx project value" error={errors[`${prefix}Value`]?.message}>
        <Input
          {...register(`${prefix}Value`, optional ? {} : {required: 'Rough number is fine.'})}
          placeholder="₹12 L"
        />
      </Field>
    </div>
  );
}

function ReferenceStep({register, errors}) {
  return (
    <div className="grid gap-4">
      <Field label="How did you hear about Keystonne?" error={errors.source?.message}>
        <select
          {...register('source', {required: 'Pick one'})}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        >
          <option value="">Select…</option>
          <option value="referral">Existing Keystonne partner</option>
          <option value="hospitality-event">Hospitality industry event</option>
          <option value="search">Google / search</option>
          <option value="social">Social — LinkedIn / Instagram</option>
          <option value="news">Trade press / news</option>
          <option value="direct">Keystonne sales team reached out</option>
          <option value="other">Other</option>
        </select>
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Reference name (optional)">
          <Input {...register('refName')} placeholder="Vivek Iyer" />
        </Field>
        <Field label="Their role / firm">
          <Input {...register('refRole')} placeholder="Head Chef, Vivanta" />
        </Field>
        <Field label="How to reach them">
          <Input {...register('refContact')} placeholder="vivek@…" />
        </Field>
      </div>
    </div>
  );
}

function AgreementsStep({register, errors}) {
  return (
    <div className="space-y-3">
      <Check2 label="I accept the Keystonne commission programme terms (published rates × tier multipliers)." error={errors.agreeProgramme?.message}>
        <input
          type="checkbox"
          {...register('agreeProgramme', {required: 'Required to participate'})}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
        />
      </Check2>
      <Check2 label="I will recommend Keystonne only where it's the right fit for my client and disclose my partner status in the spec sheet." error={errors.agreeConduct?.message}>
        <input
          type="checkbox"
          {...register('agreeConduct', {required: 'Required — this is the ethics floor'})}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
        />
      </Check2>
      <Check2 label="I understand TDS (typically 10%) will be deducted at source and Form 16A issued quarterly.">
        <input
          type="checkbox"
          {...register('agreeTDS')}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
        />
      </Check2>
    </div>
  );
}

function Check2({label, error, children}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-ink/40">
      {children}
      <span className="flex-1 text-sm text-ink">
        {label}
        {error && <ErrorText className="mt-1">{error}</ErrorText>}
      </span>
    </label>
  );
}

function ReviewStep({values}) {
  const blocks = [
    ['Persona', {Role: values.persona, City: values.city}],
    ['Personal', {Name: values.name, Email: values.email, Mobile: values.mobile}],
    ['Business', {Type: values.businessKind, Name: values.businessName, Experience: `${values.yearsExperience} years`}],
    ['Tax', {PAN: values.pan, GSTIN: values.gstin || '—'}],
    ['Payout', {Method: values.payoutMethod, ID: values.payoutId || '—'}],
    ['Portfolio', {
      'Project 1': `${values.p1Name || '—'} (${values.p1Client || '—'}, ${values.p1Value || '—'})`,
      'Project 2': values.p2Name ? `${values.p2Name} (${values.p2Client}, ${values.p2Value})` : '—',
    }],
    ['Reference', {Source: values.source, Vouches: values.refName ? `${values.refName} (${values.refRole})` : '—'}],
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Confirm everything looks right. Submitting opens a review with our
        partner-ops team; we&apos;ll be in touch within 3 working days.
      </p>
      {blocks.map(([title, fields]) => (
        <div key={title} className="rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
            {title}
          </div>
          <dl className="mt-2 grid grid-cols-1 gap-1 text-sm md:grid-cols-2">
            {Object.entries(fields).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 py-0.5">
                <dt className="text-gray-500">{k}</dt>
                <dd className="tabular text-right font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────  Atoms  ────────────────────────────── */

function Field({label, error, children}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[12px] font-semibold text-gray-700">{label}</div>
      {children}
      {error && <ErrorText className="mt-1">{error}</ErrorText>}
    </label>
  );
}

const inputBase =
  'w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20';

function Input(props) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}
function Textarea(props) {
  return <textarea {...props} className={cn(inputBase, 'resize-none', props.className)} />;
}
function ErrorText({children, className}) {
  return <span className={cn('block text-[11px] text-red-600', className)}>{children}</span>;
}

/* ───────────────────────────  Success  ──────────────────────────── */

function SuccessScreen({refId}) {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <Check className="h-8 w-8" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">
        Application received.
      </h1>
      <p className="mt-3 text-sm text-gray-600 md:text-base">
        Our partner-ops team reviews every application personally. Expect a
        decision within 3 working days — we&apos;ll reach out on the mobile
        and email you provided.
      </p>
      <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-gray-200 bg-white px-5 py-3">
        <span className="text-[11px] uppercase tracking-wider text-gray-500">
          Reference
        </span>
        <span className="tabular mt-0.5 text-lg font-semibold text-ink">
          {refId}
        </span>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to="/partner"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/40"
        >
          Back to programme overview
        </Link>
        <Link
          to="/partner/login"
          className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
        >
          Preview the dashboard
        </Link>
      </div>
    </section>
  );
}
