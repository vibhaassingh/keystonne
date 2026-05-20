import {Link} from 'react-router';
import {FileText, MessageCircle, Phone} from 'lucide-react';

/**
 * Sticky bottom strip that rides every collection + product page. Three
 * affordances: request a quote, talk to a specialist, call sales. Acts as
 * a constant safety net for buyers who scroll past the inline CTAs.
 */
export function RequestQuoteCTA({prefilledSku} = {}) {
  const quoteHref = prefilledSku ? `/quote?sku=${prefilledSku}` : '/quote';
  return (
    <div
      role="region"
      aria-label="Quick contact"
      className="sticky bottom-0 z-20 border-t border-gray-200 bg-white/95 shadow-[0_-6px_18px_-12px_rgba(0,0,0,0.18)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-primary-50 text-brand-primary">
            <MessageCircle className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">
              Need it on freight, with installation, in 4 weeks?
            </div>
            <div className="text-[12px] text-gray-600">
              Our specialists put together complete kitchen quotes —
              freight, GST, installation included.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="tel:+918000000000"
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-ink hover:border-ink/40"
          >
            <Phone className="h-3.5 w-3.5" />
            Call sales
          </a>
          <Link
            to={quoteHref}
            prefetch="intent"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-3 py-2 text-xs font-semibold text-white hover:bg-brand-primary-700"
          >
            <FileText className="h-3.5 w-3.5" />
            Request a quote
          </Link>
        </div>
      </div>
    </div>
  );
}
