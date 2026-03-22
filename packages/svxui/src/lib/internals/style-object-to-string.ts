/**
 * Convert a style object to an inline style string.
 * @param styleObj Record of CSS property/value pairs
 * @returns Semicolon-separated inline style string, or an empty string if no valid entries
 */
export function styleObjectToString(styleObj: Record<string, unknown>): string {
    const style = [...Object.entries(styleObj)] //
        .filter(([, value]) => typeof value === 'string' && value.length > 0)
        .map(([key, value]) => `${key}: ${value}`)
        .join(';');

    return style ? style + ';' : style;
}
