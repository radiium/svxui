/**
 * Resolve value if value is not a boolean
 * @param value
 * @returns
 */
export function parseBooleanOrObject<T>(value?: boolean | T): T | undefined {
    return typeof value === 'boolean' ? undefined : value;
}
