import { on } from 'svelte/events';
import type { LongpressActionReturn, LongpressParameters } from './types.js';

/**
 * Listen long press on node
 */
export function longpressAction(
    node: HTMLElement,
    initialParams: LongpressParameters = { enabled: true, duration: 800 }
): LongpressActionReturn {
    let enabled = initialParams.enabled ?? true;
    let duration = initialParams.duration ?? 800;
    let timer: ReturnType<typeof setTimeout>;

    function handlePress(): void {
        timer = setTimeout(() => {
            node.dispatchEvent(new CustomEvent('startlongpress'));
        }, duration);
    }

    function handleRelease(): void {
        clearTimeout(timer);
        node.dispatchEvent(new CustomEvent('endlongpress'));
    }

    let unsubscribe = () => {};
    function subscribe(): () => void {
        const subscriptions = [
            on(node, 'mousedown', handlePress),
            on(node, 'mouseup', handleRelease),
            on(node, 'touchstart', handlePress),
            on(node, 'touchend', handleRelease)
        ];

        return () => {
            clearTimeout(timer);
            subscriptions.filter(Boolean).forEach((cb) => cb?.());
        };
    }

    function update(params: LongpressParameters = { enabled: true, duration: 800 }): void {
        enabled = params.enabled ?? true;
        duration = params.duration ?? 800;

        unsubscribe?.();
        if (enabled) {
            unsubscribe = subscribe();
        }
    }

    update(initialParams);

    return {
        update,
        destroy(): void {
            unsubscribe?.();
        }
    };
}
