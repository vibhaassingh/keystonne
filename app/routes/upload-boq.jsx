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
 * Placeholder BOQ upload page. In Phase 1 we don't actually parse PDFs —
 * the "Parse" button fires a mock 1.5s delay then renders a plausible
 * line-item table with confidence scores so the demo viewer can see what
 * the LLM-backed version will deliver in Phase 4.
 */

export const meta = () => [
  {title: 'Upload your BOQ — Keystonne'},
];

// Pretend the LLM extracted these from the uploaded PDF.
const MOCK_PARSE_RESULT = [
  {raw: 'SS Work Table 6 ft x 30"',                      matched: 'ss-work-table-6ft',           qty: 4, confidence: 0.98},
  {raw: 'Two-Door Vertical Reach-In Refrigerator',       matched: 'reach-in-fridge-two-door',    qty: 2, confidence: 0.96},
  {raw: 'Chinese Range — 2 Burner + 1 Tank',             matched: 'two-burner-chinese-range',    qty: 1, confidence: 0.92},
  {raw: 'Bain Marie 4-pan',                              matched: 'bain-marie-4-pan',            qty: 2, confidence: 0.99},
  {raw: '4-Burner Bhatti, Tawa Plate',                   matched: 'four-burner-indian-bhatti',   qty: 1, confidence: 0.95},
  {raw: 'Undercounter Dishwasher (60 racks/hr)',         matched: 'undercounter-dishwasher',     qty: 1, confidence: 0.97},
  {raw: '8x4 ft SS Prep Table w/ 2 drawers',             matched: 'ss-work-table-8ft-drawers',   qty: 1, confidence: 0.93},
  {raw: 'Wall canopy hood w/ ESP, 6 ft',                 matched: 'wall-canopy-hood-6ft',        qty: 1, confidence: 0.94},
  {raw: 'Steam-jacketed kettle, 50 L (handi pulao)',     matched: null,                          qty: 1, confidence: 0.41, note: 'No catalog match — quote separately'},
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
    <section className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-14">
      <header className="mb-8">
        <span className="eyebrow">
          <Sparkles className="h-3 w-3" />
          BOQ → Quote
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Upload your BOQ. We&apos;ll turn it into a quote.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
          Drop a PDF, DOCX, or Excel BOQ from your architect or consultant.
          We extract every line, match it to our catalog, and flag anything
          that needs a custom quote.
        </p>
      </header>

      {!parsed ? (
        <div
          className={cn(
            'card border-2 border-dashed p-12 text-center transition-colors',
            filename
              ? 'border-brand-primary bg-brand-primary-50'
              : 'border-gray-300 bg-white',
          )}
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-primary text-white">
            <Upload className="h-6 w-6" />
          </div>
          {filename ? (
            <>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-ink">
                <FileText className="h-3.5 w-3.5 text-brand-primary" />
                {filename}
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Remove file"
                  className="text-gray-400 hover:text-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={parse}
                  disabled={parsing}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
                    parsing ? 'bg-gray-200 text-gray-500' : 'btn-primary',
                  )}
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
              <h2 className="mt-4 text-lg font-semibold text-ink">
                Drop your BOQ here
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                PDF · DOCX · XLSX · CSV up to 10 MB
              </p>
              <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl btn-primary px-5 py-3 text-sm font-semibold">
                Choose file
                <input
                  type="file"
                  accept=".pdf,.docx,.xlsx,.csv"
                  onChange={(e) => onChoose(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
              <p className="mt-3 text-[11px] text-gray-500">
                Demo mode — file isn&apos;t uploaded anywhere. Click any
                file to see the mock parse result.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary banner */}
          <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">
                  Parsed {MOCK_PARSE_RESULT.length} lines · matched {matched.length}
                </div>
                <div className="text-[12px] text-gray-500">
                  {filename ?? 'your-boq.pdf'} · {unmatched.length} item{unmatched.length !== 1 ? 's' : ''} need a custom quote
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-[12px] font-semibold text-ink hover:border-ink/40"
              >
                Upload another
              </button>
              <Link
                to="/quote"
                onClick={addMatchedToCart}
                className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-3 py-2 text-[12px] font-semibold"
              >
                <FileText className="h-3.5 w-3.5" />
                Request as a quote
              </Link>
            </div>
          </div>

          {/* Matched */}
          <div className="card overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold text-ink">Matched to catalog ({matched.length})</h2>
              <p className="text-[12px] text-gray-500">
                Total: <span className="tabular font-semibold text-ink">{formatINR(matchedTotal)}</span> + 18% GST
              </p>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3">Raw line</th>
                  <th className="px-5 py-3">Matched product</th>
                  <th className="tabular px-5 py-3 text-right">Qty</th>
                  <th className="tabular px-5 py-3 text-right">Confidence</th>
                  <th className="tabular px-5 py-3 text-right">Line total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {matched.map((r, i) => {
                  const p = products.find((p) => p.slug === r.matched);
                  const lineTotal = (p?.priceINR ?? 0) * r.qty;
                  return (
                    <tr key={i}>
                      <td className="px-5 py-3 italic text-gray-700">"{r.raw}"</td>
                      <td className="px-5 py-3">
                        <Link to={`/products/${r.matched}`} className="font-medium text-ink hover:text-brand-primary">
                          {p?.name}
                        </Link>
                      </td>
                      <td className="tabular px-5 py-3 text-right">{r.qty}</td>
                      <td className="tabular px-5 py-3 text-right">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                            r.confidence >= 0.95 ? 'bg-emerald-100 text-emerald-700'
                            : r.confidence >= 0.85 ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700',
                          )}
                        >
                          {Math.round(r.confidence * 100)}%
                        </span>
                      </td>
                      <td className="tabular px-5 py-3 text-right font-semibold text-ink">
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
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-amber-900">
                    Need a custom quote ({unmatched.length})
                  </div>
                  <p className="mt-1 text-[12px] text-amber-900/75">
                    These lines don&apos;t match a catalog item — usually
                    means they&apos;re custom fabrication or in a category
                    we project-price. We&apos;ll quote them separately and
                    bundle into the same invoice.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[13px] text-amber-900/80">
                    {unmatched.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                        <span>
                          <span className="italic">"{r.raw}"</span>
                          {r.note && <span className="ml-2 text-amber-900/60">· {r.note}</span>}
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
