type EventHandlersMap = GlobalEventHandlersEventMap & {
    [key: string]: CustomEvent;
};

/**
 * addEventListener to a node and return removeEventListener callback
 *
 * @param node
 * @param event
 * @param handler
 * @param options
 * @returns
 */
export function listen<K extends keyof EventHandlersMap>(
    node: EventTarget,
    type: K,
    callback: (this: EventSource, ev: EventHandlersMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): () => void {
    (node as any).addEventListener(type, callback, options);
    return () => (node as any).removeEventListener(type, callback, options);
}
