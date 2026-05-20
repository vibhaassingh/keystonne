import {DEAL_STATE_META} from '~/lib/mock/deals';

/**
 * Colour-coded pill for any of the 13 deal states.
 * Colours come from `--color-status-*` tokens in app.css.
 */
export function DealStatusPill({state, size = 'sm'}) {
  const meta = DEAL_STATE_META[state] ?? {label: state, color: 'draft'};
  const colorVar = `var(--color-status-${meta.color})`;
  const cls =
    size === 'lg'
      ? 'px-3 py-1 text-[12px]'
      : 'px-2 py-0.5 text-[11px]';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider ${cls}`}
      style={{
        background: `color-mix(in srgb, ${colorVar} 14%, transparent)`,
        color: colorVar,
        border: `1px solid color-mix(in srgb, ${colorVar} 25%, transparent)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{background: colorVar}}
      />
      {meta.label}
    </span>
  );
}
