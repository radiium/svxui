/**
 * Resolve value if value is not a boolean
 * @param value Boolean flag or typed options object
 * @returns The typed options object, or `undefined` if value is a boolean
 */
export function parseBooleanOrObject<T>(value?: boolean | T): T | undefined {
    return typeof value === 'boolean' ? undefined : value;
}
