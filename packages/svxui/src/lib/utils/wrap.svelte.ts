export type WrapValue<T> = { current: T };

/**
 * Wrap $state with getter & setter for manage $state/$props binding
 *
 * @param get
 * @param set
 * @returns
 */
export function wrap<T>(get: () => T, set?: (value: T) => void): WrapValue<T> {
    return {
        get current() {
            return get();
        },
        set current(newValue) {
            set?.(newValue);
        }
    };
}
