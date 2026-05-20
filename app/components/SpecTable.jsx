import {cn} from '~/lib/utils/cn';

/**
 * Hairline spec sheet — no zebra stripes, no chunky backgrounds.
 * Keys read as muted labels, values as graphite tabular figures.
 * `dense` halves the row padding for sidebar usage.
 */
export function SpecTable({specs, dense = false}) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <table
      className={cn(
        'spec-hairline-table w-full text-[13px]',
        dense && 'text-[12px]',
      )}
      style={{
        background: 'var(--ks-card-solid)',
        border: '1px solid var(--ks-line-soft)',
        borderRadius: 'var(--ks-radius-md)',
        overflow: 'hidden',
      }}
    >
      <tbody>
        {Object.entries(specs).map(([k, v]) => (
          <tr key={k}>
            <th
              scope="row"
              className={cn(
                'whitespace-nowrap text-left font-medium',
                dense ? 'py-2 pl-3 pr-3' : 'py-3 pl-4 pr-3',
              )}
              style={{
                color: 'var(--ks-muted)',
                fontSize: dense ? 11 : 12,
                letterSpacing: '0.02em',
                width: '40%',
              }}
            >
              {k}
            </th>
            <td
              className={cn(
                'num text-right',
                dense ? 'py-2 pr-3 pl-3' : 'py-3 pr-4 pl-3',
              )}
              style={{color: 'var(--ks-ink)'}}
            >
              {v}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
