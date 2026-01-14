/**
 * Round numeric value by device pixel ratio
 * @param value
 * @returns
 */
export function roundByDPR(value: number) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}
