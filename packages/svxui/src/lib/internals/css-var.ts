/**
 * Builds a CSS custom property declaration string, or undefined if the value is absent.
 *
 * @example
 * cssVar('--flex-gap', 'var(--space-3)') → '--flex-gap: var(--space-3)'
 * cssVar('--flex-gap', undefined)        → undefined
 */
export const cssVar = (name: string, value: string | undefined): string | undefined =>
    value !== undefined ? `${name}: ${value}` : undefined;
