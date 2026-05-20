import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router';
import {
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, Wand2, Check,
} from 'lucide-react';
import {businessTypes} from '~/lib/mock/businessTypes';
import {cn} from '~/lib/utils/cn';

/**
 * Five-step Kitchen Wizard (CLAUDE.md §11 / §7). Steps:
 *
 *   1. Venture type   (or "I'm starting from scratch")
 *   2. Menu / cuisine (tag chips + free text)
 *   3. Capacity       (covers / orders per service + sittings)
 *   4. Budget         (capex band)
 *   5. → Results      (navigates to /kitchen-planner/results with the
 *                      collected payload encoded as querystring)
 *
 * Visually: same mesh-glass treatment as the hero so the wizard feels
 * native to the storefront. Pre-fills from any `?q=` / `?venture=`
 * query string sent from the home hero or a business-type page.
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
  {n: 2, label: 'Cuisine', hint: 'What\'s the menu look like?'},
  {n: 3, label: 'Scale',   hint: 'How many covers / orders per service?'},
  {n: 4, label: 'Budget',  hint: 'What\'s the capex band?'},
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

  // If a description prefilled, jump to step 2 (cuisine) so the user lands
  // somewhere relevant. Venture stays empty until they pick.
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
      // Encode as querystring and route to results.
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
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-14">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <span className="eyebrow">
            <Sparkles className="h-3 w-3" />
            AI Kitchen Planner
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Spec a kitchen in five questions.
          </h1>
        </div>
        <span className="hidden text-[12px] text-gray-500 md:inline">
          Free · No login required · ~3 minutes
        </span>
      </header>

      <Stepper current={step} onJump={(n) => n < step && setStep(n)} />

      <div className="mt-8 card p-6 md:p-9">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
          Step {step} of 5
        </div>
        <h2 className="text-xl font-semibold text-ink md:text-2xl">
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
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/40 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance()}
          className={cn(
            'inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold',
            canAdvance()
              ? step === 5 ? 'btn-accent' : 'btn-primary'
              : 'bg-gray-200 text-gray-500',
          )}
        >
          {step === 5 ? (
            <>
              <Wand2 className="h-4 w-4" />
              Build my kitchen
              <ArrowRight className="h-4 w-4 opacity-80" />
            </>
          ) : (
            <>Continue<ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      </div>

      <p className="mt-6 text-center text-[11px] text-gray-500">
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
        return (
          <li key={s.n}>
            <button
              type="button"
              onClick={() => onJump?.(s.n)}
              disabled={state === 'upcoming'}
              className={cn(
                'flex w-full items-center gap-2 rounded-xl border bg-white/70 p-3 text-left transition-colors backdrop-blur',
                state === 'now'
                  ? 'border-brand-primary shadow-[0_8px_24px_-12px_rgba(67,56,202,0.35)]'
                  : state === 'done'
                  ? 'border-emerald-300 hover:border-emerald-500'
                  : 'border-gray-200 opacity-60',
              )}
            >
              <div
                className={cn(
                  'tabular grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold',
                  state === 'done' && 'bg-emerald-600 text-white',
                  state === 'now' && 'bg-brand-primary text-white',
                  state === 'upcoming' && 'bg-gray-100 text-gray-500',
                )}
              >
                {state === 'done' ? <Check className="h-3.5 w-3.5" /> : s.n}
              </div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-gray-600">
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
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border bg-white p-3.5 text-left transition-colors',
                active
                  ? 'border-brand-primary ring-2 ring-brand-primary/20'
                  : 'border-gray-200 hover:border-ink/40',
              )}
            >
              <div
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
                  active ? 'text-white' : 'bg-gray-100 text-gray-600',
                )}
                style={
                  active
                    ? {background: 'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))'}
                    : undefined
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{b.name}</div>
                <div className="mt-0.5 line-clamp-2 text-[11px] text-gray-500">
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
      <div className="mb-4 text-[12px] font-semibold text-gray-600">
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
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors',
                  active
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-gray-300 bg-white text-ink hover:border-ink/40',
                )}
              >
                {active && <Check className="h-3 w-3" />}
                {t}
              </button>
            </li>
          );
        })}
      </ul>

      <label className="mt-6 block">
        <div className="mb-1.5 text-[12px] font-semibold text-gray-700">
          Anything else? (Optional)
        </div>
        <textarea
          rows={3}
          value={data.description}
          onChange={(e) => patch({description: e.target.value})}
          placeholder="e.g. We focus on specialty coffee, all-day breakfast, light bakes. Already have a 4ft hood vent in the unit."
          className="w-full resize-none rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15"
        />
      </label>
    </>
  );
}

function StepScale({data, patch}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="text-[12px] font-semibold text-gray-700">
          Covers / orders per service
        </div>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="range"
            min={20} max={500} step={10}
            value={data.coversPerService}
            onChange={(e) => patch({coversPerService: Number(e.target.value)})}
            className="flex-1 accent-brand-primary"
          />
          <span className="tabular w-16 text-right text-lg font-semibold text-ink">
            {data.coversPerService}
          </span>
        </div>
        <p className="mt-2 text-[12px] text-gray-500">
          {data.coversPerService <= 60 ? 'Small — single hot line covers it.' :
           data.coversPerService <= 150 ? 'Medium — multi-station kitchen.' :
           'Large — banquet / multi-outlet capacity.'}
        </p>
      </div>

      <div>
        <div className="text-[12px] font-semibold text-gray-700">
          Sittings per day
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => patch({sittings: n})}
              className={cn(
                'rounded-xl border px-3 py-2 text-sm font-semibold transition-colors',
                data.sittings === n
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-gray-300 bg-white text-ink hover:border-ink/40',
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12px] text-gray-500">
          Restaurants typically run 2 sittings (lunch + dinner). Cloud
          kitchens run 1 continuous. Hotels run 3-4.
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
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-colors',
                active
                  ? 'border-brand-primary ring-2 ring-brand-primary/20'
                  : 'border-gray-300 hover:border-ink/40',
              )}
            >
              <div>
                <div className="text-sm font-semibold text-ink">{b.label}</div>
                <div className="text-[12px] text-gray-500">{b.hint}</div>
              </div>
              {active && <Check className="h-4 w-4 text-brand-primary" />}
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
    <div className="space-y-3 text-sm">
      <p className="text-gray-600">
        Confirm the inputs — we&apos;ll generate a category-grouped
        equipment plan, narrative, and instant capex estimate on the next
        page.
      </p>
      <ul className="rounded-xl border border-gray-200 bg-white/70 p-4 backdrop-blur">
        <ReviewRow k="Venture"  v={venture?.name ?? '—'} />
        <ReviewRow k="Cuisine"  v={data.cuisines.length ? data.cuisines.join(' · ') : '—'} />
        <ReviewRow k="Scale"    v={`${data.coversPerService} covers per service × ${data.sittings} sittings = ${data.coversPerService * data.sittings} covers/day`} />
        <ReviewRow k="Budget"   v={BUDGET_BANDS.find((b) => b.value === data.budget)?.label ?? '—'} />
        {data.description && <ReviewRow k="Notes" v={data.description} />}
      </ul>
    </div>
  );
}

function ReviewRow({k, v}) {
  return (
    <li className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-[12px] uppercase tracking-wider text-gray-500">{k}</span>
      <span className="text-right font-medium text-ink">{v}</span>
    </li>
  );
}
