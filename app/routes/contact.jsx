import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router';
import {Mail, Phone, MapPin, Building2, Check, ArrowRight} from 'lucide-react';
import {cn} from '~/lib/utils/cn';

export const meta = () => [
  {title: 'Contact sales — Keystonne'},
  {
    name: 'description',
    content:
      'Reach out to the Keystonne sales team — call, email, or send a project brief.',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {name: '', email: '', mobile: '', message: ''},
  });

  function onSubmit(values) {
    // eslint-disable-next-line no-console
    console.log('[demo] Contact form submitted:', values);
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-20">
      <span className="apple-eyebrow">Contact</span>
      <h1
        className="mt-3 text-[32px] font-semibold tracking-tight md:text-[48px]"
        style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
      >
        Talk to the Keystonne sales team.
      </h1>
      <p
        className="mt-3 max-w-2xl text-sm md:text-base"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Working on a kitchen project, evaluating us as a vendor, or stuck
        on a specific spec? We&apos;ll get back within one working day.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          {submitted ? (
            <div className="premium-panel p-10 text-center">
              <div
                className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
                style={{
                  background: 'var(--ks-emerald-soft)',
                  color: 'var(--ks-emerald-dark)',
                }}
              >
                <Check className="h-7 w-7" strokeWidth={1.6} />
              </div>
              <h2
                className="mt-5 text-xl font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Got it — thank you.
              </h2>
              <p
                className="mt-2 text-sm"
                style={{color: 'var(--ks-ink-2)'}}
              >
                Our sales team will reach out within one working day.
                Reference:{' '}
                <span
                  style={{
                    color: 'var(--ks-ink)',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  CN-{Date.now().toString().slice(-6)}
                </span>
              </p>
              <Link
                to="/"
                className="apple-link mt-5 inline-flex items-center gap-1 text-sm"
              >
                Back to home <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="premium-panel p-6 md:p-8"
            >
              <span className="apple-eyebrow">Send a brief</span>
              <h2
                className="mt-3 text-lg font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Tell us what you&apos;re working on.
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full name" error={errors.name?.message}>
                  <Input
                    {...register('name', {required: 'Required'})}
                    placeholder="Arjun Mehta"
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'Required',
                      pattern: {
                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        message: 'Invalid email',
                      },
                    })}
                    placeholder="arjun@example.in"
                  />
                </Field>
                <Field label="Mobile">
                  <Input
                    type="tel"
                    {...register('mobile')}
                    placeholder="+91 98XXX XXXXX"
                  />
                </Field>
                <Field label="Business / project name">
                  <Input
                    {...register('business')}
                    placeholder="Lakeside Café"
                  />
                </Field>
              </div>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  rows={5}
                  {...register('message', {
                    required: 'Tell us a bit about the project',
                  })}
                  className={cn(inputCls, 'mt-1 resize-none')}
                  style={inputStyle}
                  placeholder="What are you working on? Size, location, timing, any specific equipment questions."
                />
              </Field>
              <button
                type="submit"
                className="apple-button-primary mt-6"
              >
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <aside className="md:col-span-5">
          <div className="premium-panel p-6">
            <span className="apple-eyebrow">Reach us directly</span>
            <ul className="mt-4 space-y-4 text-sm">
              <Item icon={Phone} label="Sales line" value="+91 80 0000 0000" />
              <Item icon={Mail} label="Email" value="hello@keystonne.in" />
              <Item
                icon={MapPin}
                label="Office"
                value="Bengaluru · open weekdays 09:00–18:00 IST"
              />
              <Item
                icon={Building2}
                label="Registered"
                value="Keystonne Foods + Hospitality Pvt. Ltd."
              />
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
              className="text-[12px] font-semibold"
              style={{color: 'var(--ks-blue-dark)'}}
            >
              Already a partner?
            </div>
            <p
              className="mt-1 text-[12px]"
              style={{color: 'var(--ks-blue-dark)'}}
            >
              Use the in-dashboard messaging thread on your deal page —
              specialist sales reps handle partner deals separately.
            </p>
            <Link
              to="/partner/login"
              className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold"
              style={{color: 'var(--ks-blue-dark)'}}
            >
              Partner sign in →
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

const inputCls =
  'w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none';
const inputStyle = {
  background: '#fafafa',
  border: '1px solid var(--ks-line-soft)',
  color: 'var(--ks-ink)',
};

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

function Item({icon: Icon, label, value}) {
  return (
    <li className="flex items-start gap-3">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0"
        style={{color: 'var(--ks-blue)'}}
        strokeWidth={1.6}
      />
      <div>
        <div
          className="text-[10px] uppercase tracking-[0.10em]"
          style={{color: 'var(--ks-muted)'}}
        >
          {label}
        </div>
        <div style={{color: 'var(--ks-ink)'}}>{value}</div>
      </div>
    </li>
  );
}
