/**
 * Convert style object to style string
 * @param styleObj
 * @returns
 */
export function styleObjectToString(styleObj: Record<string, string | undefined>): string {
    return [...Object.entries(styleObj)] //
        .map(([key, value]) => `${key}: ${value}`)
        .join(';');
}
