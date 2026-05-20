import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {
  ArrowRight,
  Wand2,
  ShoppingBag,
  Handshake,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import {cn} from '~/lib/utils/cn';

/**
 * Modern hero — mesh-gradient surface with a "liquid glass" foreground card
 * for the slide content. Three hand-written B2B slides covering the three
 * Keystonne pillars (buyer, catalog, partner). Auto-rotates every 7s;
 * hover-pauses; dot pagination + play/pause control.
 */

const SLIDES = [
  {
    id: 'new-venture',
    eyebrow: 'For new ventures',
    headline: 'Open your kitchen with one quote — not 40 vendor calls.',
    body: 'Tell us the cuisine, the capacity, the space. We hand back a spec’d kitchen — equipment, freight, installation, GST invoice — in 48 hours.',
    cta: {label: 'Build my kitchen', to: '/kitchen-planner', icon: Wand2},
    mesh: 'mesh-indigo',
    panel: {
      kind: 'kitchen',
      label: 'Sample build',
      lines: [
        ['Concept', '120-cover · cloud kitchen'],
        ['Location', 'Whitefield, Bengaluru'],
        ['Categories', 'Refrigeration · Ranges · Prep · Vent'],
      ],
      footer: ['All-in quote', '₹14.2 L'],
    },
  },
  {
    id: 'catalog',
    eyebrow: '5,000+ spec-grade products',
    headline: 'The catalog India’s kitchens were waiting for.',
    body: 'Refrigeration, ranges, work tables, dishwashing — every item ships with dimensions, power draw, freight class, and lead time published up front.',
    cta: {label: 'Browse refrigeration', to: '/collections/refrigeration', icon: ShoppingBag},
    mesh: 'mesh-indigo',
    panel: {
      kind: 'product',
      label: 'Two-door reach-in',
      lines: [
        ['Capacity', '1,240 L'],
        ['Material', '304 SS · R290'],
        ['Lead time', '7 days'],
      ],
      footer: ['Catalog price', '₹1,29,000'],
    },
  },
  {
    id: 'partner',
    eyebrow: 'For partners',
    headline: 'Spec for clients, earn transparently — without WhatsApp chasing.',
    body: 'Kitchen consultants, chefs, F&B managers: register your project, track every stage, and get paid the moment the kitchen is installed.',
    cta: {label: 'Become a partner', to: '/partner', icon: Handshake},
    mesh: 'mesh-emerald',
    panel: {
      kind: 'earnings',
      label: 'Partner dashboard',
      lines: [
        ['YTD earnings', '₹2.85 L'],
        ['Pending payouts', '₹72,000'],
        ['Active deals', '6 · Silver tier'],
      ],
      footer: ['Next tier', '₹1.68 L away'],
    },
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
      className="mx-auto max-w-[1400px] px-4 pt-6"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl text-white transition-all duration-700',
          slide.mesh,
        )}
        style={{
          boxShadow:
            '0 30px 80px -30px rgba(10,13,20,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Floating orbs for depth — pure CSS, no images */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 right-1/3 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />
        </div>

        <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
          {/* Text */}
          <div className="col-span-7 px-6 py-12 md:px-14 md:py-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              {slide.eyebrow}
            </span>
            <h2 className="mt-5 max-w-xl text-[34px] font-semibold leading-[1.04] tracking-tight md:text-[52px]">
              {slide.headline}
            </h2>
            <p className="mt-5 max-w-lg text-base text-white/85 md:text-lg">
              {slide.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={slide.cta.to}
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl btn-accent px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
                {slide.cta.label}
                <ArrowRight className="h-4 w-4 opacity-80" />
              </Link>
              <Link
                to="/quote"
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
              >
                Talk to a specialist
              </Link>
            </div>
          </div>

          {/* Glass panel */}
          <div className="col-span-5 hidden md:block">
            <div className="m-10 ml-0">
              <GlassPanel panel={slide.panel} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-5 right-5 flex items-center gap-3">
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
                  i === idx ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/60',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
        </div>
      </div>
    </section>
  );
}

/** Frosted glass card with the slide's sample data — the "liquid" piece */
function GlassPanel({panel}) {
  return (
    <div
      className="rounded-2xl border border-white/25 bg-white/15 p-6 backdrop-blur-2xl"
      style={{
        boxShadow:
          '0 20px 50px -20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.30)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
          {panel.label}
        </span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {panel.lines.map(([k, v]) => (
          <li key={k} className="flex items-baseline justify-between gap-3">
            <span className="text-[12px] uppercase tracking-wider text-white/60">
              {k}
            </span>
            <span className="tabular text-right text-sm font-semibold text-white">
              {v}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl bg-black/20 p-3 ring-1 ring-white/10">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-wider text-white/65">
            {panel.footer[0]}
          </span>
          <span className="tabular text-2xl font-semibold text-white">
            {panel.footer[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
