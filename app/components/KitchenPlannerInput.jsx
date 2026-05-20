import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Wand2, ArrowRight, Sparkles} from 'lucide-react';
import {cn} from '~/lib/utils/cn';

/**
 * Quiet AI-command module — a single .premium-panel with a textarea,
 * a row of venture chips, and one primary action. Per the redesign
 * brief: this should read as a focused command input, NOT a second
 * hero. The hero already sells the proposition; this is where the
 * buyer actually gives us the brief.
 */
const VENTURE_CHIPS = [
  {label: 'Cloud kitchen', value: 'cloud-kitchen'},
  {label: 'Café', value: 'cafe'},
  {label: 'Hotel kitchen', value: 'hotel-kitchen'},
  {label: 'Bakery', value: 'bakery'},
  {label: 'New venture', value: 'new-venture'},
];

export function KitchenPlannerInput() {
  const [text, setText] = useState('');
  const [venture, setVenture] = useState(null);
  const navigate = useNavigate();

  function submit(e) {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (text.trim()) params.set('q', text.trim());
    if (venture) params.set('venture', venture);
    const qs = params.toString();
    navigate(qs ? `/kitchen-planner?${qs}` : '/kitchen-planner');
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-14">
      <div className="premium-panel p-6 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="apple-eyebrow">
            <Sparkles className="h-3 w-3" style={{color: 'var(--ks-blue)'}} />
            AI Kitchen Planner
          </span>
          <span className="text-[12px]" style={{color: 'var(--ks-muted)'}}>
            Free · No login required · ~3 minutes
          </span>
        </div>

        <h2
          className="mt-4 text-2xl font-semibold tracking-tight md:text-[28px]"
          style={{color: 'var(--ks-ink)'}}
        >
          Describe the kitchen you are building.
        </h2>
        <p className="mt-1.5 text-sm" style={{color: 'var(--ks-ink-2)'}}>
          Cuisine, capacity, location, budget — anything the planner should
          know. You&apos;ll receive a station-grouped equipment plan and a
          first-pass capex estimate.
        </p>

        <form onSubmit={submit} className="mt-6">
          <label htmlFor="kp-textarea" className="sr-only">
            Describe your kitchen
          </label>
          <textarea
            id="kp-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Example: 80-cover cloud kitchen in Pune serving biryani and north Indian meals, ₹18L equipment budget, two brands sharing one prep line."
            className="w-full resize-none rounded-[var(--ks-radius-md)] px-4 py-3 text-sm leading-relaxed focus:outline-none"
            style={{
              background: '#fafafa',
              border: '1px solid var(--ks-line)',
              color: 'var(--ks-ink)',
            }}
          />

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {VENTURE_CHIPS.map((chip) => (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => {
                    setVenture(venture === chip.value ? null : chip.value);
                  }}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors',
                    venture === chip.value
                      ? 'shadow-[inset_0_0_0_1px_var(--ks-ink)]'
                      : 'border',
                  )}
                  style={{
                    background:
                      venture === chip.value ? 'var(--ks-ink)' : 'var(--ks-card-solid)',
                    color:
                      venture === chip.value ? '#ffffff' : 'var(--ks-ink-2)',
                    borderColor:
                      venture === chip.value ? 'var(--ks-ink)' : 'var(--ks-line)',
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="apple-button-primary self-start md:self-auto"
            >
              <Wand2 className="h-4 w-4" />
              Generate equipment plan
              <ArrowRight className="h-4 w-4 opacity-70" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
