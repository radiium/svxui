/**
 * Convert style object to style string
 * @param styleObj
 * @returns
 */
export function styleObjectToString(styleObj: Record<string, unknown>): string {
    const style = [...Object.entries(styleObj)] //
        .filter(([, value]) => typeof value === 'string' && value.length > 0)
        .map(([key, value]) => `${key}: ${value}`)
        .join(';');

    return style ? style + ';' : style;
}
