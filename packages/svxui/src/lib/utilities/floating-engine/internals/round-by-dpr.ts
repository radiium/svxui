import { isBrowser } from '$lib/internals/is.js';

/**
 * Round numeric value by device pixel ratio
 * @param value
 * @returns
 */
export function roundByDPR(value: number) {
    const dpr = isBrowser() ? window.devicePixelRatio || 1 : 1;
    return Math.round(value * dpr) / dpr;
}
