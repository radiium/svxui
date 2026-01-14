/**
 * Check if code running in browser or nodeJs
 * @returns true if run in browser else false
 */
export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

/**
 * Check if value is an object
 * @param value value to check
 * @returns true if value is an plain object else false
 */
export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
    return value !== null && typeof value === 'object';
}
