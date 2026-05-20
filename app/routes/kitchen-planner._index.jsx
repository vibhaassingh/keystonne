import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router';
import {
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, Wand2, Check,
} from 'lucide-react';
import {businessTypes} from '~/lib/mock/businessTypes';

/**
 * Five-step Kitchen Wizard. Apple-style setup flow on the graphite-white
 * wash: ink stepper, premium-panel stage container, calm pill chips,
 * blue AI accent on the final "Build my kitchen" CTA (blue is the AI
 * guidance colour). Steps and data shape preserved from Phase 1.
 *
 *   1. Venture           (or "I'm starting from scratch")
 *   2. Menu / cuisine    (tag chips + free text)
 *   3. Capacity          (covers / sittings)
 *   4. Budget            (capex band)
 *   5. → Results         (navigate to /kitchen-planner/results)
 */

export const meta = () => [
  {title: 'AI Kitchen Planner — Keystonne'},
];

const CUISINE_TAGS = [
  'Coffee', 'Bakery', 'North Indian', 'South Indian', 'Chinese',
  'Continental', 'Italian / pasta', 'Tandoor / kebab', 'Bar / cocktails',
  'Sweets / mithai', 'Pan-Asian', 'Healthy bowls',
];

const BUDGET_BANDS = [
  {value: 'lt5l',   label: 'Under ₹5 L',     hint: 'Small footprint, single station'},
  {value: '5-15l',  label: '₹5 L – ₹15 L',   hint: 'Café, single cloud-kitchen brand'},
  {value: '15-40l', label: '₹15 L – ₹40 L',  hint: 'Multi-cuisine kitchen, restaurant'},
  {value: '40l-1cr',label: '₹40 L – ₹1 Cr',  hint: 'Multi-outlet, banquet-capable'},
  {value: 'gt1cr',  label: 'Above ₹1 Cr',    hint: 'Hotel, institutional, resort'},
];

const STEPS = [
  {n: 1, label: 'Venture', hint: 'What kind of place are you building?'},
  {n: 2, label: 'Cuisine', hint: "What's the menu look like?"},
  {n: 3, label: 'Scale',   hint: 'How many covers per service?'},
  {n: 4, label: 'Budget',  hint: "What's the capex band?"},
  {n: 5, label: 'Plan',    hint: 'Get your recommended kitchen.'},
];

export default function KitchenPlanner() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    venture: params.get('venture') || '',
    cuisines: [],
    description: params.get('q') || '',
    coversPerService: 60,
    sittings: 2,
    budget: '5-15l',
  });

  useEffect(() => {
    if (data.venture) setStep(2);
    else if (data.description) setStep(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function patch(p) { setData((d) => ({...d, ...p})); }

  function canAdvance() {
    if (step === 1) return Boolean(data.venture);
    if (step === 2) return data.cuisines.length > 0 || data.description.trim().length > 5;
    if (step === 3) return data.coversPerService > 0;
    if (step === 4) return Boolean(data.budget);
    return true;
  }

  function next() {
    if (!canAdvance()) return;
    if (step < 5) {
      setStep((s) => s + 1);
    } else {
      const q = new URLSearchParams({
        venture: data.venture,
        cuisines: data.cuisines.join(','),
        covers: String(data.coversPerService),
        sittings: String(data.sittings),
        budget: data.budget,
        ...(data.description ? {q: data.description} : {}),
      });
      navigate(`/kitchen-planner/results?${q.toString()}`);
    }
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-16">
      <header className="mb-9 flex items-center justify-between gap-4">
        <div>
          <span
            className="apple-eyebrow"
            style={{color: 'var(--ks-blue-dark)'}}
          >
            <Sparkles
              className="h-3 w-3"
              style={{color: 'var(--ks-blue)'}}
            />
            AI Kitchen Planner
          </span>
          <h1
            className="mt-3 text-[32px] font-semibold tracking-tight md:text-[44px]"
            style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
          >
            Spec a kitchen in five questions.
          </h1>
        </div>
        <span
          className="hidden text-[12px] md:inline"
          style={{color: 'var(--ks-muted)'}}
        >
          Free · No login required · ~3 minutes
        </span>
      </header>

      <Stepper current={step} onJump={(n) => n < step && setStep(n)} />

      <div className="mt-8 premium-panel p-7 md:p-10">
        <div
          className="text-[11px] font-medium uppercase tracking-[0.10em]"
          style={{color: 'var(--ks-blue-dark)'}}
        >
          Step {step} of 5
        </div>
        <h2
          className="mt-2 text-xl font-semibold md:text-2xl"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.012em'}}
        >
          {STEPS[step - 1].hint}
        </h2>

        <div className="mt-6">
          {step === 1 && <StepVenture data={data} patch={patch} />}
          {step === 2 && <StepCuisine data={data} patch={patch} />}
          {step === 3 && <StepScale data={data} patch={patch} />}
          {step === 4 && <StepBudget data={data} patch={patch} />}
          {step === 5 && <StepReview data={data} />}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="apple-button-ghost justify-center disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance()}
          className={
            !canAdvance()
              ? 'apple-button-ghost justify-center'
              : step === 5
              ? 'apple-button-primary justify-center'
              : 'apple-button-primary justify-center'
          }
          style={
            !canAdvance()
              ? {opacity: 0.5, cursor: 'not-allowed'}
              : step === 5
              ? {background: 'var(--ks-blue)', borderColor: 'rgba(0,113,227,0.5)'}
              : undefined
          }
        >
          {step === 5 ? (
            <>
              <Wand2 className="h-4 w-4" />
              Build my kitchen
              <ArrowRight className="h-4 w-4 opacity-80" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <p
        className="mt-7 text-center text-[11px]"
        style={{color: 'var(--ks-muted)'}}
      >
        Phase 1 demo — recommendations come from a curated mock dataset.
        The real LLM kicks in in Phase 4.
      </p>
    </section>
  );
}

/* ────────────────────  Stepper  ──────────────────── */

function Stepper({current, onJump}) {
  return (
    <ol className="grid grid-cols-5 gap-2">
      {STEPS.map((s) => {
        const state =
          s.n < current ? 'done' : s.n === current ? 'now' : 'upcoming';
        const isClickable = state !== 'upcoming';
        return (
          <li key={s.n}>
            <button
              type="button"
              onClick={() => onJump?.(s.n)}
              disabled={!isClickable}
              className="flex w-full items-center gap-2 rounded-2xl p-3 text-left transition-colors"
              style={{
                background:
                  state === 'now'
                    ? 'var(--ks-card-solid)'
                    : state === 'done'
                    ? 'var(--ks-emerald-soft)'
                    : 'var(--ks-card-tint)',
                border:
                  state === 'now'
                    ? '1px solid var(--ks-ink)'
                    : state === 'done'
                    ? '1px solid rgba(10,127,86,0.22)'
                    : '1px solid var(--ks-line-soft)',
                opacity: state === 'upcoming' ? 0.6 : 1,
                boxShadow: state === 'now' ? 'var(--ks-shadow-card)' : 'none',
              }}
            >
              <div
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold"
                style={{
                  background:
                    state === 'done'
                      ? 'var(--ks-emerald)'
                      : state === 'now'
                      ? 'var(--ks-ink)'
                      : 'var(--ks-line-soft)',
                  color: state === 'upcoming' ? 'var(--ks-muted)' : '#ffffff',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {state === 'done' ? <Check className="h-3.5 w-3.5" /> : s.n}
              </div>
              <div
                className="text-[11px] font-medium uppercase tracking-[0.10em]"
                style={{
                  color:
                    state === 'now'
                      ? 'var(--ks-ink)'
                      : state === 'done'
                      ? 'var(--ks-emerald-dark)'
                      : 'var(--ks-muted)',
                }}
              >
                {s.label}
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ────────────────────  Steps  ──────────────────── */

function StepVenture({data, patch}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {businessTypes.map((b) => {
        const Icon = b.icon;
        const active = data.venture === b.slug;
        return (
          <li key={b.slug}>
            <button
              type="button"
              onClick={() => patch({venture: b.slug})}
              className="flex w-full items-start gap-3 rounded-2xl p-3.5 text-left transition-colors"
              style={{
                background: active ? 'var(--ks-card-solid)' : 'var(--ks-card-tint)',
                border: active
                  ? '1px solid var(--ks-ink)'
                  : '1px solid var(--ks-line-soft)',
                boxShadow: active ? 'var(--ks-shadow-card)' : 'none',
              }}
            >
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={
                  active
                    ? {background: 'var(--ks-ink)', color: '#ffffff'}
                    : {
                        background: 'var(--ks-card-solid)',
                        color: 'var(--ks-ink-2)',
                        border: '1px solid var(--ks-line-soft)',
                      }
                }
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {b.name}
                </div>
                <div
                  className="mt-0.5 line-clamp-2 text-[11px]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  {b.tagline}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function StepCuisine({data, patch}) {
  function toggleCuisine(t) {
    patch({
      cuisines: data.cuisines.includes(t)
        ? data.cuisines.filter((c) => c !== t)
        : [...data.cuisines, t],
    });
  }
  return (
    <>
      <div
        className="mb-4 text-[12px]"
        style={{color: 'var(--ks-ink-2)'}}
      >
        Pick what your kitchen will cook — multi-select.
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {CUISINE_TAGS.map((t) => {
          const active = data.cuisines.includes(t);
          return (
            <li key={t}>
              <button
                type="button"
                onClick={() => toggleCuisine(t)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
                style={{
                  background: active ? 'var(--ks-ink)' : 'var(--ks-card-solid)',
                  color: active ? '#ffffff' : 'var(--ks-ink)',
                  border: active
                    ? '1px solid var(--ks-ink)'
                    : '1px solid var(--ks-line)',
                }}
              >
                {active && <Check className="h-3 w-3" />}
                {t}
              </button>
            </li>
          );
        })}
      </ul>

      <label className="mt-7 block">
        <div
          className="mb-2 text-[12px] font-medium"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Anything else? (Optional)
        </div>
        <textarea
          rows={3}
          value={data.description}
          onChange={(e) => patch({description: e.target.value})}
          placeholder="e.g. We focus on specialty coffee, all-day breakfast, light bakes. Already have a 4ft hood vent in the unit."
          className="w-full resize-none rounded-xl px-3.5 py-3 text-sm focus:outline-none"
          style={{
            background: '#fafafa',
            border: '1px solid var(--ks-line-soft)',
            color: 'var(--ks-ink)',
          }}
        />
      </label>
    </>
  );
}

function StepScale({data, patch}) {
  return (
    <div className="grid gap-7 md:grid-cols-2">
      <div>
        <div
          className="text-[12px] font-medium"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Covers / orders per service
        </div>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={data.coversPerService}
            onChange={(e) => patch({coversPerService: Number(e.target.value)})}
            className="flex-1"
            style={{accentColor: 'var(--ks-ink)'}}
          />
          <span
            className="w-16 text-right text-lg font-semibold"
            style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
          >
            {data.coversPerService}
          </span>
        </div>
        <p
          className="mt-2 text-[12px]"
          style={{color: 'var(--ks-muted)'}}
        >
          {data.coversPerService <= 60
            ? 'Small — single hot line covers it.'
            : data.coversPerService <= 150
            ? 'Medium — multi-station kitchen.'
            : 'Large — banquet / multi-outlet capacity.'}
        </p>
      </div>

      <div>
        <div
          className="text-[12px] font-medium"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Sittings per day
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => patch({sittings: n})}
              className="rounded-xl px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                background:
                  data.sittings === n ? 'var(--ks-ink)' : 'var(--ks-card-solid)',
                color: data.sittings === n ? '#ffffff' : 'var(--ks-ink)',
                border:
                  data.sittings === n
                    ? '1px solid var(--ks-ink)'
                    : '1px solid var(--ks-line)',
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <p
          className="mt-2 text-[12px]"
          style={{color: 'var(--ks-muted)'}}
        >
          Restaurants typically run 2 sittings (lunch + dinner). Cloud
          kitchens run 1 continuous. Hotels run 3 – 4.
        </p>
      </div>
    </div>
  );
}

function StepBudget({data, patch}) {
  return (
    <ul className="grid gap-2 md:grid-cols-2">
      {BUDGET_BANDS.map((b) => {
        const active = data.budget === b.value;
        return (
          <li key={b.value}>
            <button
              type="button"
              onClick={() => patch({budget: b.value})}
              className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-colors"
              style={{
                background: active ? 'var(--ks-card-solid)' : 'var(--ks-card-tint)',
                border: active
                  ? '1px solid var(--ks-ink)'
                  : '1px solid var(--ks-line-soft)',
                boxShadow: active ? 'var(--ks-shadow-card)' : 'none',
              }}
            >
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{color: 'var(--ks-ink)'}}
                >
                  {b.label}
                </div>
                <div
                  className="text-[12px]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  {b.hint}
                </div>
              </div>
              {active && (
                <Check
                  className="h-4 w-4"
                  style={{color: 'var(--ks-ink)'}}
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function StepReview({data}) {
  const venture = businessTypes.find((b) => b.slug === data.venture);
  return (
    <div className="space-y-4 text-sm">
      <p style={{color: 'var(--ks-ink-2)'}}>
        Confirm the inputs — we&apos;ll generate a category-grouped
        equipment plan, narrative, and instant capex estimate on the next
        page.
      </p>
      <ul
        className="rounded-2xl p-5"
        style={{
          background: 'var(--ks-card-tint)',
          border: '1px solid var(--ks-line-soft)',
        }}
      >
        <ReviewRow k="Venture" v={venture?.name ?? '—'} />
        <ReviewRow
          k="Cuisine"
          v={data.cuisines.length ? data.cuisines.join(' · ') : '—'}
        />
        <ReviewRow
          k="Scale"
          v={`${data.coversPerService} covers per service × ${data.sittings} sittings = ${data.coversPerService * data.sittings} covers/day`}
        />
        <ReviewRow
          k="Budget"
          v={BUDGET_BANDS.find((b) => b.value === data.budget)?.label ?? '—'}
        />
        {data.description && <ReviewRow k="Notes" v={data.description} />}
      </ul>
    </div>
  );
}

function ReviewRow({k, v}) {
  return (
    <li
      className="flex items-baseline justify-between gap-3 py-2"
      style={{borderBottom: '1px solid var(--ks-line-soft)'}}
    >
      <span
        className="text-[11px] uppercase tracking-[0.08em]"
        style={{color: 'var(--ks-muted)'}}
      >
        {k}
      </span>
      <span
        className="text-right font-medium"
        style={{color: 'var(--ks-ink)'}}
      >
        {v}
      </span>
    </li>
  );
}
