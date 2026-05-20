import {Link} from 'react-router';
import {FileText, Phone} from 'lucide-react';

/**
 * Sticky procurement strip pinned to the bottom of catalog + product
 * pages. Apple-style: translucent white with a hairline top and a
 * single primary amber CTA on the right. Calm copy on the left
 * reinforces the procurement promise without shouting.
 */
export function RequestQuoteCTA({prefilledSku} = {}) {
  const quoteHref = prefilledSku ? `/quote?sku=${prefilledSku}` : '/quote';
  return (
    <div
      role="region"
      aria-label="Quote shortcut"
      className="procurement-strip sticky bottom-0 z-20"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <div
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
            style={{
              background: '#f0f0f3',
              color: 'var(--ks-ink)',
            }}
          >
            <FileText className="h-4 w-4" strokeWidth={1.6} />
          </div>
          <div>
            <div
              className="text-[13px] font-semibold leading-snug"
              style={{color: 'var(--ks-ink)'}}
            >
              Bundle into a single all-in quote
            </div>
            <div
              className="text-[12px]"
              style={{color: 'var(--ks-muted)'}}
            >
              Freight, GST invoice, installation — one document, one number.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <a
            href="tel:+918000000000"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium"
            style={{color: 'var(--ks-blue)'}}
          >
            <Phone className="h-3.5 w-3.5" />
            Talk to procurement
          </a>
          <Link
            to={quoteHref}
            prefetch="intent"
            className="apple-button-amber !py-2 !text-[13px]"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </div>
  );
}
