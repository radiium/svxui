export function parseBooleanOrObject<T>(value?: boolean | T): T | undefined {
    return typeof value === 'boolean' ? undefined : value;
}
