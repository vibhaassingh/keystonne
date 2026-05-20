import {useState} from 'react';
import {Link} from 'react-router';
import {
  Upload, FileText, ArrowRight, Sparkles, Check, X, AlertCircle,
} from 'lucide-react';
import {products} from '~/lib/mock/products';
import {useQuoteCart} from '~/lib/quoteCart';
import {formatINR} from '~/lib/utils/formatINR';
import {cn} from '~/lib/utils/cn';

/**
 * BOQ upload placeholder. Apple-style drop-zone in a premium-panel with
 * dashed blue border (blue is the AI guidance accent). "Parse" fires a
 * mock 1.5s delay then renders a plausible matched/unmatched line-item
 * table — confidence scores get calm ks-soft tints, the action below is
 * amber (procurement intent: converts to a quote).
 */

export const meta = () => [
  {title: 'Upload your BOQ — Keystonne'},
];

const MOCK_PARSE_RESULT = [
  {raw: 'SS Work Table 6 ft x 30"',                  matched: 'ss-work-table-6ft',          qty: 4, confidence: 0.98},
  {raw: 'Two-Door Vertical Reach-In Refrigerator',   matched: 'reach-in-fridge-two-door',   qty: 2, confidence: 0.96},
  {raw: 'Chinese Range — 2 Burner + 1 Tank',         matched: 'two-burner-chinese-range',   qty: 1, confidence: 0.92},
  {raw: 'Bain Marie 4-pan',                          matched: 'bain-marie-4-pan',           qty: 2, confidence: 0.99},
  {raw: '4-Burner Bhatti, Tawa Plate',               matched: 'four-burner-indian-bhatti',  qty: 1, confidence: 0.95},
  {raw: 'Undercounter Dishwasher (60 racks/hr)',     matched: 'undercounter-dishwasher',    qty: 1, confidence: 0.97},
  {raw: '8x4 ft SS Prep Table w/ 2 drawers',         matched: 'ss-work-table-8ft-drawers',  qty: 1, confidence: 0.93},
  {raw: 'Wall canopy hood w/ ESP, 6 ft',             matched: 'wall-canopy-hood-6ft',       qty: 1, confidence: 0.94},
  {raw: 'Steam-jacketed kettle, 50 L (handi pulao)', matched: null,                          qty: 1, confidence: 0.41, note: 'No catalog match — quote separately'},
];

export default function UploadBoq() {
  const [filename, setFilename] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const {add, clear} = useQuoteCart();

  function onChoose(file) {
    if (!file) return;
    setFilename(file.name);
    setParsed(false);
  }
  function parse() {
    setParsing(true);
    setTimeout(() => {
      setParsing(false);
      setParsed(true);
    }, 1500);
  }
  function reset() {
    setFilename(null);
    setParsing(false);
    setParsed(false);
  }

  function addMatchedToCart() {
    clear();
    for (const r of MOCK_PARSE_RESULT) {
      if (r.matched) add(r.matched, r.qty);
    }
  }

  const matched = MOCK_PARSE_RESULT.filter((r) => r.matched);
  const unmatched = MOCK_PARSE_RESULT.filter((r) => !r.matched);
  const matchedTotal = matched.reduce((s, r) => {
    const p = products.find((p) => p.slug === r.matched);
    return s + (p?.priceINR ?? 0) * r.qty;
  }, 0);

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-16">
      <header className="mb-9">
        <span
          className="apple-eyebrow"
          style={{color: 'var(--ks-blue-dark)'}}
        >
          <Sparkles
            className="h-3 w-3"
            style={{color: 'var(--ks-blue)'}}
          />
          BOQ → Quote
        </span>
        <h1
          className="mt-3 text-[32px] font-semibold tracking-tight md:text-[44px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Upload your BOQ. We&apos;ll turn it into a quote.
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Drop a PDF, DOCX, or Excel BOQ from your architect or consultant.
          We extract every line, match it to our catalog, and flag anything
          that needs a custom quote.
        </p>
      </header>

      {!parsed ? (
        <div
          className="rounded-[var(--ks-radius-xl)] p-12 text-center transition-colors"
          style={{
            background: filename ? 'var(--ks-blue-soft)' : 'var(--ks-card-solid)',
            border: filename
              ? '2px dashed rgba(0,113,227,0.45)'
              : '2px dashed var(--ks-line)',
            boxShadow: 'var(--ks-shadow-card)',
          }}
        >
          <div
            className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
            style={
              filename
                ? {background: 'var(--ks-blue)', color: '#ffffff'}
                : {
                    background: 'var(--ks-card-tint)',
                    color: 'var(--ks-ink)',
                    border: '1px solid var(--ks-line-soft)',
                  }
            }
          >
            <Upload className="h-6 w-6" strokeWidth={1.6} />
          </div>
          {filename ? (
            <>
              <div
                className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-medium"
                style={{
                  background: 'var(--ks-card-solid)',
                  border: '1px solid var(--ks-line-soft)',
                  color: 'var(--ks-ink)',
                }}
              >
                <FileText
                  className="h-3.5 w-3.5"
                  style={{color: 'var(--ks-blue)'}}
                />
                {filename}
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Remove file"
                  style={{color: 'var(--ks-muted)'}}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={parse}
                  disabled={parsing}
                  className="apple-button-primary"
                  style={
                    parsing
                      ? undefined
                      : {background: 'var(--ks-blue)', borderColor: 'rgba(0,113,227,0.5)'}
                  }
                >
                  {parsing ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Parsing your BOQ…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Parse with AI
                      <ArrowRight className="h-4 w-4 opacity-80" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2
                className="mt-5 text-lg font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Drop your BOQ here
              </h2>
              <p
                className="mt-1 text-sm"
                style={{color: 'var(--ks-muted)'}}
              >
                PDF · DOCX · XLSX · CSV up to 10 MB
              </p>
              <label className="apple-button-primary mt-6 inline-flex cursor-pointer">
                Choose file
                <input
                  type="file"
                  accept=".pdf,.docx,.xlsx,.csv"
                  onChange={(e) => onChoose(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
              <p
                className="mt-4 text-[11px]"
                style={{color: 'var(--ks-muted)'}}
              >
                Demo mode — file isn&apos;t uploaded anywhere. Click any
                file to see the mock parse result.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary banner */}
          <div className="premium-panel flex flex-wrap items-center justify-between gap-3 p-6">
            <div className="flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-2xl"
                style={{
                  background: 'var(--ks-emerald-soft)',
                  color: 'var(--ks-emerald-dark)',
                }}
              >
                <Check className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{color: 'var(--ks-ink)'}}
                >
                  Parsed {MOCK_PARSE_RESULT.length} lines · matched{' '}
                  {matched.length}
                </div>
                <div
                  className="text-[12px]"
                  style={{color: 'var(--ks-muted)'}}
                >
                  {filename ?? 'your-boq.pdf'} · {unmatched.length} item
                  {unmatched.length !== 1 ? 's' : ''} need a custom quote
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={reset}
                className="apple-button-ghost"
                style={{padding: '0.5rem 0.9rem', fontSize: '12px'}}
              >
                Upload another
              </button>
              <Link
                to="/quote"
                onClick={addMatchedToCart}
                className="apple-button-amber"
                style={{padding: '0.5rem 0.9rem', fontSize: '12px'}}
              >
                <FileText className="h-3.5 w-3.5" />
                Request as a quote
              </Link>
            </div>
          </div>

          {/* Matched */}
          <div className="premium-panel overflow-hidden">
            <div
              className="px-6 py-5"
              style={{borderBottom: '1px solid var(--ks-line-soft)'}}
            >
              <h2
                className="text-base font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                Matched to catalog ({matched.length})
              </h2>
              <p
                className="text-[12px]"
                style={{color: 'var(--ks-muted)'}}
              >
                Total:{' '}
                <span
                  style={{
                    color: 'var(--ks-ink)',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatINR(matchedTotal)}
                </span>{' '}
                + 18% GST
              </p>
            </div>
            <table className="spec-hairline-table">
              <thead>
                <tr>
                  <th>Raw line</th>
                  <th>Matched product</th>
                  <th className="num">Qty</th>
                  <th className="num">Confidence</th>
                  <th className="num">Line total</th>
                </tr>
              </thead>
              <tbody>
                {matched.map((r, i) => {
                  const p = products.find((p) => p.slug === r.matched);
                  const lineTotal = (p?.priceINR ?? 0) * r.qty;
                  return (
                    <tr key={i}>
                      <td
                        className="italic"
                        style={{color: 'var(--ks-ink-2)'}}
                      >
                        &ldquo;{r.raw}&rdquo;
                      </td>
                      <td>
                        <Link
                          to={`/products/${r.matched}`}
                          className="font-medium"
                          style={{color: 'var(--ks-ink)'}}
                        >
                          {p?.name}
                        </Link>
                      </td>
                      <td className="num">{r.qty}</td>
                      <td className="num">
                        <ConfidencePill v={r.confidence} />
                      </td>
                      <td
                        className="num"
                        style={{color: 'var(--ks-ink)', fontWeight: 600}}
                      >
                        {formatINR(lineTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Unmatched */}
          {unmatched.length > 0 && (
            <div
              className="rounded-[var(--ks-radius-lg)] p-6"
              style={{
                background: '#fff8eb',
                border: '1px solid rgba(184,107,0,0.22)',
              }}
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{color: 'var(--ks-amber-dark)'}}
                />
                <div className="flex-1">
                  <div
                    className="text-sm font-semibold"
                    style={{color: '#7a4500'}}
                  >
                    Need a custom quote ({unmatched.length})
                  </div>
                  <p
                    className="mt-1 text-[12px]"
                    style={{color: '#7a4500'}}
                  >
                    These lines don&apos;t match a catalog item — usually
                    means they&apos;re custom fabrication or in a category
                    we project-price. We&apos;ll quote them separately and
                    bundle into the same invoice.
                  </p>
                  <ul className="mt-3 space-y-2 text-[13px]">
                    {unmatched.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                        style={{color: '#5b3300'}}
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{background: 'var(--ks-amber-dark)'}}
                        />
                        <span>
                          <span className="italic">&ldquo;{r.raw}&rdquo;</span>
                          {r.note && (
                            <span
                              className="ml-2"
                              style={{color: '#7a4500', opacity: 0.75}}
                            >
                              · {r.note}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function ConfidencePill({v}) {
  const styles =
    v >= 0.95
      ? {
          background: 'var(--ks-emerald-soft)',
          color: 'var(--ks-emerald-dark)',
          border: '1px solid rgba(10,127,86,0.22)',
        }
      : v >= 0.85
      ? {
          background: '#fff4dd',
          color: 'var(--ks-amber-dark)',
          border: '1px solid rgba(184,107,0,0.22)',
        }
      : {
          background: 'rgba(194,65,12,0.10)',
          color: '#9a3412',
          border: '1px solid rgba(194,65,12,0.25)',
        };
  return (
    <span
      className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium')}
      style={{...styles, fontVariantNumeric: 'tabular-nums'}}
    >
      {Math.round(v * 100)}%
    </span>
  );
}
