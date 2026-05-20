import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router';
import {Mail, Phone, MapPin, Building2, Check, ArrowRight} from 'lucide-react';
import {cn} from '~/lib/utils/cn';

export const meta = () => [
  {title: 'Contact sales — Keystonne'},
  {name: 'description', content: 'Reach out to the Keystonne sales team — call, email, or send a project brief.'},
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
    <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
      <span className="eyebrow">Contact</span>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Talk to the Keystonne sales team.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
        Working on a kitchen project, evaluating us as a vendor, or stuck on
        a specific spec? We&apos;ll get back within one working day.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          {submitted ? (
            <div className="card p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Check className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-ink">
                Got it — thank you.
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Our sales team will reach out within one working day.
                Reference: <span className="tabular font-semibold text-ink">CN-{Date.now().toString().slice(-6)}</span>
              </p>
              <Link
                to="/"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
              >
                Back to home <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-8">
              <span className="eyebrow">Send a brief</span>
              <h2 className="mt-2 text-lg font-semibold text-ink">
                Tell us what you&apos;re working on.
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full name" error={errors.name?.message}>
                  <Input {...register('name', {required: 'Required'})} placeholder="Arjun Mehta" />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'Required',
                      pattern: {value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email'},
                    })}
                    placeholder="arjun@example.in"
                  />
                </Field>
                <Field label="Mobile">
                  <Input type="tel" {...register('mobile')} placeholder="+91 98XXX XXXXX" />
                </Field>
                <Field label="Business / project name">
                  <Input {...register('business')} placeholder="Lakeside Café" />
                </Field>
              </div>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  rows={5}
                  {...register('message', {required: 'Tell us a bit about the project'})}
                  className={cn(inputCls, 'mt-1 resize-none')}
                  placeholder="What are you working on? Size, location, timing, any specific equipment questions."
                />
              </Field>
              <button
                type="submit"
                className="mt-5 inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-3 text-sm font-semibold"
              >
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <aside className="md:col-span-5">
          <div className="card p-6">
            <span className="eyebrow">Reach us directly</span>
            <ul className="mt-4 space-y-4 text-sm">
              <Item icon={Phone} label="Sales line" value="+91 80 0000 0000" />
              <Item icon={Mail}  label="Email" value="hello@keystonne.in" />
              <Item icon={MapPin} label="Office" value="Bengaluru · open weekdays 09:00–18:00 IST" />
              <Item icon={Building2} label="Registered" value="Keystonne Foods + Hospitality Pvt. Ltd." />
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-brand-primary/30 bg-brand-primary-50 p-4 text-[12px] text-brand-primary">
            <div className="font-semibold">Already a partner?</div>
            <p className="mt-1 text-gray-700">
              Use the in-dashboard messaging thread on your deal page —
              specialist sales reps handle partner deals separately.
            </p>
            <Link to="/partner/login" className="mt-2 inline-flex items-center gap-1 font-semibold hover:underline">
              Partner sign in →
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

const inputCls =
  'w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15';

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
function Item({icon: Icon, label, value}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-500">{label}</div>
        <div className="text-ink">{value}</div>
      </div>
    </li>
  );
}
