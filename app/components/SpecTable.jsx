/**
 * Striped key-value spec table for product detail and quote pages. The
 * "spec table" pattern is what B2B buyers actually skim — dimensions,
 * power, capacity, material — so we render this above marketing copy.
 */
export function SpecTable({specs, dense = false}) {
  if (!specs || Object.keys(specs).length === 0) return null;
  return (
    <dl className="grid grid-cols-1 overflow-hidden rounded-md border border-gray-200 bg-white">
      {Object.entries(specs).map(([k, v], i) => (
        <div
          key={k}
          className={`grid grid-cols-3 gap-3 px-4 ${
            dense ? 'py-2 text-[12px]' : 'py-3 text-[13px]'
          } ${i % 2 === 1 ? 'bg-gray-50' : ''}`}
        >
          <dt className="col-span-1 font-semibold text-gray-600">{k}</dt>
          <dd className="col-span-2 tabular text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
