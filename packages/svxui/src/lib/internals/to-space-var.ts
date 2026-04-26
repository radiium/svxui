/**
 * Converts a space scale token (`'0'`–`'9'`, `'-1'`–`'-9'`) to the
 * corresponding CSS custom property, or passes arbitrary strings through.
 *
 * @example
 * toSpaceVar('4')   → 'var(--space-4)'
 * toSpaceVar('0')   → '0px'
 * toSpaceVar('-2')  → 'calc(var(--space-2) * -1)'
 * toSpaceVar('1rem') → '1rem'
 */
export function toSpaceVar(v: string | undefined): string | undefined {
    if (v === undefined) return undefined;
    if (/^[0-9]$/.test(v)) return v === '0' ? '0px' : `var(--space-${v})`;
    if (/^-[1-9]$/.test(v)) return `calc(var(--space-${v.slice(1)}) * -1)`;
    return v;
}
