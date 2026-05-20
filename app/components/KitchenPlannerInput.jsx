import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Wand2, ArrowRight, Sparkles} from 'lucide-react';

/**
 * Hero-adjacent teaser for the AI Kitchen Wizard. Users type a kitchen
 * description and on submit we route to /kitchen-planner with the text
 * passed as a query string. Sprint 9 actually consumes that input; today
 * the route is a placeholder that echoes the value.
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
    navigate(q ? `/kitchen-planner?q=${encodeURIComponent(q)}` : '/kitchen-planner');
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            <Sparkles className="h-4 w-4 text-brand-accent" />
            AI Kitchen Planner
          </div>
          <span className="text-[11px] text-gray-500">
            Free · No login required · ~3 minutes
          </span>
        </div>

        <h2 className="mt-3 text-xl font-semibold text-ink md:text-2xl">
          Describe your kitchen. We&apos;ll plan it.
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Cuisine, capacity, location, space — anything we should know. Get a
          category-grouped equipment plan and an instant quote estimate.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="kp-textarea" className="sr-only">
            Describe your kitchen
          </label>
          <textarea
            id="kp-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="e.g. Opening a 60-seat café in Bengaluru. Focus on specialty coffee, all-day breakfast, light bakes. Around 1200 sq ft, with a 4ft hood vent already in place."
            className="w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setText(ex)}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] text-gray-600 hover:border-brand-primary hover:text-brand-primary"
                >
                  {ex}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-700 md:self-auto"
            >
              <Wand2 className="h-4 w-4" />
              Plan my kitchen
              <ArrowRight className="h-4 w-4 opacity-80" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
