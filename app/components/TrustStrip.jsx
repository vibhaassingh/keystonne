import {Truck, ShieldCheck, Wrench, Receipt} from 'lucide-react';

/**
 * Below-hero confidence band. Four pills explaining the procurement
 * promises a B2B kitchen buyer asks about: freight, GST/invoicing,
 * warranty, installation. Defaults locked in CLAUDE.md §10.
 */
const ITEMS = [
  {
    icon: Truck,
    title: 'Pan-India freight included',
    body: 'Door delivery to every PIN code, included in catalog price.',
  },
  {
    icon: Receipt,
    title: 'GST invoice · 18%',
    body: 'ITC-eligible invoice on every order; e-way bill arranged.',
  },
  {
    icon: ShieldCheck,
    title: '1-year warranty standard',
    body: 'Free replacement parts; AMC plans available.',
  },
  {
    icon: Wrench,
    title: 'Installation included',
    body: 'Free for orders above ₹10L. Otherwise ₹49,900 or 5%.',
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Procurement promises"
      className="border-y border-gray-200 bg-white"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4 md:gap-6 md:py-8">
        {ITEMS.map(({icon: Icon, title, body}) => (
          <div key={title} className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-brand-primary-50 text-brand-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">{title}</div>
              <div className="text-[12px] leading-snug text-gray-600">
                {body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
