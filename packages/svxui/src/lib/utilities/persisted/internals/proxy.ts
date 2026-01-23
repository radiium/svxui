/**
 * Proxify value
 * @param value
 * @param root
 * @param proxies
 * @param subscribe
 * @param update
 * @param serialize
 * @returns
 */
export function proxy<T>(
    value: unknown,
    root: T | undefined,
    proxies: WeakMap<WeakKey, unknown>,
    subscribe: VoidFunction | undefined,
    update: VoidFunction | undefined,
    serialize: (root?: T | undefined) => void
): T {
    if (value === null || typeof value !== 'object') {
        return value as T;
    }
    const proto = Object.getPrototypeOf(value);
    if (proto !== null && proto !== Object.prototype && !Array.isArray(value)) {
        return value as T;
    }
    let p = proxies.get(value);
    if (!p) {
        p = new Proxy(value, {
            get: (target, property) => {
                subscribe?.();
                return proxy(Reflect.get(target, property), root, proxies, subscribe, update, serialize);
            },
            set: (target, property, value) => {
                update?.();
                Reflect.set(target, property, value);
                serialize(root);
                return true;
            }
        });
        proxies.set(value, p);
    }
    return p as T;
}
