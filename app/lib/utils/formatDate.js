/**
 * Format any Date-coercible value as DD-MMM-YYYY (e.g. "20-May-2026").
 * Locked default per CLAUDE.md §10.
 *
 *   formatDate('2026-05-20')       → "20-May-2026"
 *   formatDate(new Date())          → "20-May-2026"
 *   formatDate(null)                → "—"
 */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function formatDate(value) {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return `${String(d.getDate()).padStart(2, '0')}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;
}
