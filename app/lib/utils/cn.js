/**
 * Tiny conditional-class joiner. Filters falsy values and joins with spaces.
 * Pattern is borrowed from clsx but avoids the dependency for our small needs.
 *
 *   cn('btn', isActive && 'btn-active', disabled ? 'opacity-50' : null)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
