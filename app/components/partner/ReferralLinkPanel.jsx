import {useState} from 'react';
import {Copy, QrCode, Check, Share2, ExternalLink} from 'lucide-react';

/**
 * Apple-style referral link panel. Hairline white surface, monospaced URL
 * row, copy/QR/share row, blue "Preview page" link. Vanity URL pattern
 * is `keystonne.com/p/{handle}`. Copy-to-clipboard with brief check state.
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
    <div className="premium-panel p-6">
      <div
        className="text-[11px] font-medium uppercase tracking-[0.10em]"
        style={{color: 'var(--ks-muted)'}}
      >
        Your referral link
      </div>

      <div className="mt-3 flex items-stretch gap-2">
        <code
          className="flex-1 truncate rounded-xl px-3 py-2.5 text-[13px]"
          style={{
            background: 'var(--ks-card-tint)',
            border: '1px solid var(--ks-line-soft)',
            color: 'var(--ks-ink)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {url}
        </code>
        <button
          type="button"
          onClick={copyUrl}
          className="apple-button-ghost"
          style={{padding: '0.5rem 0.9rem'}}
        >
          {copied ? (
            <>
              <Check
                className="h-3.5 w-3.5"
                style={{color: 'var(--ks-emerald)'}}
              />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[12px] font-medium"
          style={{
            background: 'var(--ks-card-solid)',
            border: '1px solid var(--ks-line-soft)',
            color: 'var(--ks-ink-2)',
          }}
        >
          <QrCode className="h-3.5 w-3.5" />
          QR code
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[12px] font-medium"
          style={{
            background: 'var(--ks-card-solid)',
            border: '1px solid var(--ks-line-soft)',
            color: 'var(--ks-ink-2)',
          }}
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[12px] font-medium"
          style={{
            background: 'var(--ks-blue-soft)',
            border: '1px solid rgba(0,113,227,0.20)',
            color: 'var(--ks-blue-dark)',
          }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Preview
        </a>
      </div>

      <p
        className="mt-4 text-[11px] leading-relaxed"
        style={{color: 'var(--ks-muted)'}}
      >
        Every visit through your link is attributed to your account for{' '}
        <span style={{color: 'var(--ks-ink)', fontWeight: 500}}>90 days</span>.
        Cart items inherit the attribution automatically.
      </p>
    </div>
  );
}
