import {useState} from 'react';
import {Copy, QrCode, Check, Share2} from 'lucide-react';

/**
 * Personal referral link + QR code. Vanity URL pattern is
 * `keystonne.com/p/{handle}`. Copy-to-clipboard with brief success state.
 */
export function ReferralLinkPanel({handle}) {
  const [copied, setCopied] = useState(false);
  const url = `https://keystonne.com/p/${handle}`;

  function copyUrl() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card relative overflow-hidden p-5">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{background: 'var(--color-brand-primary)'}}
      />
      <div className="relative">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
          Your referral link
        </div>
        <div className="mt-3 flex items-stretch gap-2">
          <code className="tabular flex-1 truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-ink">
            {url}
          </code>
          <button
            type="button"
            onClick={copyUrl}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[12px] font-semibold text-ink hover:border-ink/40"
          >
            {copied ? (
              <><Check className="h-3.5 w-3.5 text-emerald-600" /> Copied</>
            ) : (
              <><Copy className="h-3.5 w-3.5" /> Copy</>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-[12px] font-medium text-ink hover:border-ink/40">
            <QrCode className="h-3.5 w-3.5" />
            QR code
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-[12px] font-medium text-ink hover:border-ink/40">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg btn-primary px-2.5 py-2 text-[12px] font-semibold"
          >
            Preview page
          </a>
        </div>

        <p className="mt-3 text-[11px] text-gray-500">
          Every visit through your link is attributed to your account for
          90 days. Cart items inherit the attribution automatically.
        </p>
      </div>
    </div>
  );
}
