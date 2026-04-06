/**
 * Converts a space scale token (`'0'`–`'9'`, `'-1'`–`'-9'`) to the
 * corresponding CSS custom property, or passes arbitrary strings through.
 *
 * @example
 * resolveSpace('4')  → 'var(--space-4)'
 * resolveSpace('0')  → '0px'
 * resolveSpace('-2') → 'calc(var(--space-2) * -1)'
 * resolveSpace('1rem') → '1rem'
 */
export function resolveSpace(v: string | undefined): string | undefined {
    if (v === undefined) return undefined;
    if (/^[0-9]$/.test(v)) return v === '0' ? '0px' : `var(--space-${v})`;
    if (/^-[1-9]$/.test(v)) return `calc(var(--space-${v.slice(1)}) * -1)`;
    return v;
}
