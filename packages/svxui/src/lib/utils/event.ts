/**
 * Event modifiers
 */

/**
 * Prevent default before run event callback
 * @param fn event callback
 * @returns
 */
export function preventDefault<T extends Event>(fn: (event: T) => void) {
    return function (event: T) {
        event.preventDefault();
        // @ts-expect-error: this not typed
        fn.call(this, event);
    };
}

/**
 * Run callback once
 * @param fn event callback
 * @returns
 */
export function once<T extends Event>(fn: ((event: T) => void) | null) {
    return function (event: T) {
        // @ts-expect-error: this not typed
        if (fn) fn.call(this, event);
        fn = null;
    };
}
