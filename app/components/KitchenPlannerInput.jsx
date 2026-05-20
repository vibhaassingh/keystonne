import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Wand2, ArrowRight, Sparkles} from 'lucide-react';

/**
 * Hero-adjacent teaser for the AI Kitchen Wizard. Modern glass card with
 * a soft inner highlight and a subtle gradient border, conveying the
 * "magic" affordance without being cartoonish.
 */
const EXAMPLES = [
  '120-cover café in Indiranagar — coffee-first menu',
  'Cloud kitchen, North Indian + biryani, two brands',
  '50-room boutique hotel kitchen with banquet support',
  'School canteen for 600 students, two meal sittings',
];

export function KitchenPlannerInput() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const q = text.trim();
    navigate(
      q ? `/kitchen-planner?q=${encodeURIComponent(q)}` : '/kitchen-planner',
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 md:py-14">
      {/* Outer gradient halo — gives the card a soft glow */}
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-1 rounded-3xl opacity-50 blur-2xl"
          style={{
            background:
              'linear-gradient(120deg, rgba(99,102,241,0.30), rgba(245,158,11,0.20), rgba(5,150,105,0.20))',
          }}
        />
        <div
          className="relative rounded-3xl border border-white/60 bg-white/80 p-6 backdrop-blur-2xl md:p-9"
          style={{
            boxShadow:
              '0 20px 50px -20px rgba(10,13,20,0.18), inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/15 bg-brand-primary-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary">
              <Sparkles className="h-3 w-3" />
              AI Kitchen Planner
            </span>
            <span className="text-[11px] text-gray-500">
              Free · No login required · ~3 minutes
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Describe your kitchen. We&apos;ll plan it.
          </h2>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Cuisine, capacity, location, space — anything we should know.
            Get a category-grouped equipment plan and an instant quote
            estimate.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="kp-textarea" className="sr-only">
              Describe your kitchen
            </label>
            <textarea
              id="kp-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="e.g. Opening a 60-seat café in Bengaluru. Specialty coffee, all-day breakfast, light bakes. Around 1,200 sq ft, with a 4ft hood vent already in place."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 md:text-base"
            />

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setText(ex)}
                    className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] text-gray-600 backdrop-blur transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl btn-primary px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 md:self-auto"
              >
                <Wand2 className="h-4 w-4" />
                Plan my kitchen
                <ArrowRight className="h-4 w-4 opacity-80" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
