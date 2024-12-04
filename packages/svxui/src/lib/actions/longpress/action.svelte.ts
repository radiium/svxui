import { on } from 'svelte/events';
import type { LongPressActionReturn, LongPressParameters } from './types.js';

/**
 * Listen long press on node
 */
export function longPressAction(
    node: HTMLElement,
    initialParams: LongPressParameters = { enabled: true, duration: 800 }
): LongPressActionReturn {
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
            on(node, 'mousedown', handlePress, { passive: true }),
            on(node, 'mouseup', handleRelease, { passive: true }),
            on(node, 'touchstart', handlePress, { passive: true }),
            on(node, 'touchend', handleRelease, { passive: true })
        ];

        return () => {
            clearTimeout(timer);
            subscriptions.filter(Boolean).forEach((cb) => cb?.());
        };
    }

    function update(params: LongPressParameters = { enabled: true, duration: 800 }): void {
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
