import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {ArrowRight, Wand2, ShoppingBag, Handshake, Pause, Play} from 'lucide-react';
import {cn} from '~/lib/utils/cn';

/**
 * Three hand-written B2B slides covering the three pillars Keystonne sells:
 * buyer (new venture), catalog (existing kitchens), partner (the network).
 * Auto-rotates every 7s; hover-pauses; dot pagination + play/pause control.
 */

const SLIDES = [
  {
    id: 'new-venture',
    eyebrow: 'For new ventures',
    headline: 'Open your kitchen with one quote — not 40 vendor calls.',
    body: 'Tell us the cuisine, the capacity, the space. We hand back a spec’d kitchen — equipment, freight, installation, and a single invoice — in 48 hours.',
    cta: {label: 'Build my kitchen', to: '/kitchen-planner', icon: Wand2},
    accentFrom: 'from-brand-primary',
    accentTo: 'to-brand-primary-700',
    panel: 'bg-brand-accent',
    panelLabel: 'A full kitchen',
    panelDetail: '120-cover · cloud kitchen · Bengaluru',
    panelPrice: '₹14.2 L',
  },
  {
    id: 'catalog',
    eyebrow: '5,000+ spec-grade products',
    headline: 'The catalog India’s kitchens were waiting for.',
    body: 'Refrigeration, ranges, work tables, dishwashing — every item lists dimensions, power draw, freight class, and lead time. GST invoice on every order; ITC-eligible.',
    cta: {label: 'Browse refrigeration', to: '/collections/refrigeration', icon: ShoppingBag},
    accentFrom: 'from-slate-900',
    accentTo: 'to-brand-primary',
    panel: 'bg-white text-ink',
    panelLabel: 'Two-Door Reach-In',
    panelDetail: '1240 L · 304 SS · R290',
    panelPrice: '₹1,29,000',
  },
  {
    id: 'partner',
    eyebrow: 'For partners',
    headline: 'Spec for clients, earn transparently — without WhatsApp chasing.',
    body: 'Kitchen consultants, chefs, F&B managers: register your project, track every stage, and get paid the moment the kitchen is installed.',
    cta: {label: 'Become a partner', to: '/partner', icon: Handshake},
    accentFrom: 'from-partner-accent',
    accentTo: 'to-emerald-900',
    panel: 'bg-white text-ink',
    panelLabel: 'YTD earnings',
    panelDetail: 'Silver tier · 6 active deals',
    panelPrice: '₹2,85,000',
  },
];

const ROTATE_MS = 7000;

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      if (!hoverRef.current) setIdx((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const slide = SLIDES[idx];
  const Icon = slide.cta.icon;

  return (
    <section
      className="relative mx-auto max-w-[1400px] px-4 pt-6"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-xl bg-gradient-to-br text-white shadow-md transition-colors duration-700',
          slide.accentFrom,
          slide.accentTo,
        )}
      >
        <div className="grid gap-6 md:grid-cols-12 md:items-center">
          {/* Text */}
          <div className="col-span-7 px-6 py-10 md:px-12 md:py-16">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/85 backdrop-blur">
              {slide.eyebrow}
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight md:text-[44px]">
              {slide.headline}
            </h2>
            <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
              {slide.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to={slide.cta.to}
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-accent-hover"
              >
                <Icon className="h-4 w-4" />
                {slide.cta.label}
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link
                to="/quote"
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Talk to a specialist
              </Link>
            </div>
          </div>

          {/* Visual panel */}
          <div className="col-span-5 hidden md:block">
            <div className="m-8 ml-0 grid place-items-center">
              <div
                className={cn(
                  'flex h-[280px] w-[280px] flex-col justify-between rounded-lg p-6 shadow-xl ring-1 ring-black/5',
                  slide.panel,
                )}
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
                  Sample
                </span>
                <div>
                  <div className="text-sm font-semibold opacity-90">
                    {slide.panelLabel}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider opacity-60">
                    {slide.panelDetail}
                  </div>
                </div>
                <div className="tabular text-3xl font-semibold">
                  {slide.panelPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5" role="tablist">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
        </div>
      </div>
    </section>
  );
}
