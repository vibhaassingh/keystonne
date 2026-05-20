import {Truck, ShieldCheck, Wrench, Receipt} from 'lucide-react';

/**
 * Glass-card trust strip — four pills explaining the procurement
 * promises a B2B kitchen buyer asks about: freight, GST/invoicing,
 * warranty, installation. Defaults locked in CLAUDE.md §10.
 */
const ITEMS = [
  {
    icon: Truck,
    title: 'Pan-India freight included',
    body: 'Door delivery to every PIN code, included in catalog price.',
    accent: 'rgba(99, 102, 241, 0.18)', // indigo
  },
  {
    icon: Receipt,
    title: 'GST invoice · 18%',
    body: 'ITC-eligible invoice on every order; e-way bill arranged.',
    accent: 'rgba(5, 150, 105, 0.18)', // emerald
  },
  {
    icon: ShieldCheck,
    title: '1-year warranty standard',
    body: 'Free replacement parts; AMC plans available.',
    accent: 'rgba(245, 158, 11, 0.18)', // amber
  },
  {
    icon: Wrench,
    title: 'Installation included',
    body: 'Free for orders above ₹10L. Otherwise ₹49,900 or 5%.',
    accent: 'rgba(14, 116, 144, 0.18)', // cyan
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Procurement promises" className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-12">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {ITEMS.map(({icon: Icon, title, body, accent}) => (
          <li
            key={title}
            className="card card-hover relative overflow-hidden p-5"
          >
            {/* Tinted corner glow */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
              style={{background: accent}}
            />
            <div className="relative">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl text-white"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-brand-primary-600), var(--color-brand-primary))',
                  boxShadow: '0 8px 20px -8px rgba(67,56,202,0.55)',
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-semibold text-ink">{title}</div>
              <div className="mt-1 text-[12px] leading-snug text-gray-600">
                {body}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
