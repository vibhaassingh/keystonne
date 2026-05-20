import {Receipt, Truck, Wrench, ShieldCheck, FileText} from 'lucide-react';

/**
 * Minimal Apple-style trust row — five precise procurement claims on
 * a calm divider band. No tiles, no corner glows, no chip backgrounds —
 * just icon + label, separated by hairlines on desktop. The earlier
 * gradient-icon-chip version is retired with the rest of the
 * indigo/amber palette.
 */
const ITEMS = [
  {icon: Receipt, label: 'GST invoices', sub: 'ITC-eligible on every order'},
  {icon: Truck, label: '4–7 working day delivery', sub: 'Pan-India freight included'},
  {icon: Wrench, label: 'Installation guidance', sub: 'Free above ₹10L'},
  {icon: ShieldCheck, label: '1-year warranty', sub: 'Standard on every product'},
  {icon: FileText, label: 'Quote-ready BOQs', sub: 'Submit your own or build one'},
];

export function TrustStrip() {
  return (
    <section
      aria-label="Procurement promises"
      className="border-y"
      style={{
        background: 'var(--ks-page-warm)',
        borderColor: 'var(--ks-line-soft)',
      }}
    >
      <ul className="mx-auto grid max-w-[1400px] grid-cols-2 px-4 py-6 sm:grid-cols-3 md:grid-cols-5 md:py-7">
        {ITEMS.map(({icon: Icon, label, sub}, i) => (
          <li
            key={label}
            className={`flex items-start gap-3 px-3 py-2 md:py-0 ${
              i > 0 ? 'md:border-l' : ''
            }`}
            style={i > 0 ? {borderColor: 'var(--ks-line-soft)'} : undefined}
          >
            <Icon
              className="mt-0.5 h-4 w-4 shrink-0"
              strokeWidth={1.7}
              style={{color: 'var(--ks-ink)'}}
            />
            <div className="min-w-0">
              <div
                className="text-[13px] font-medium leading-snug"
                style={{color: 'var(--ks-ink)'}}
              >
                {label}
              </div>
              <div
                className="text-[11px] leading-snug"
                style={{color: 'var(--ks-muted)'}}
              >
                {sub}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
