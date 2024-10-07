import { listen } from '$lib/utils/listen.js';
import type { ActionReturn } from 'svelte/action';

export type LongpressParameters = number;
export type LongpressAttributes = {
    'on:startlongpress': (e: CustomEvent<void>) => void;
    'on:endlongpress': (e: CustomEvent<void>) => void;
};

/**
 * Listen long press on node
 *
 * @param {HTMLElement} node
 * @param {LongpressParameters} duration
 * @returns
 */
export function longpressAction(
    node: HTMLElement,
    duration: LongpressParameters = 800
): ActionReturn<LongpressParameters, LongpressAttributes> {
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

    const mousedownListener = listen(node, 'mousedown', handlePress);
    const mouseupListener = listen(node, 'mouseup', handleRelease);
    const touchstartListener = listen(node, 'touchstart', handlePress);
    const touchendListener = listen(node, 'touchend', handleRelease);

    return {
        update(newDuration: LongpressParameters): void {
            handleRelease();
            duration = newDuration;
        },
        destroy(): void {
            handleRelease();
            mousedownListener();
            mouseupListener();
            touchstartListener();
            touchendListener();
        }
    };
}
