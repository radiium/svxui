import { isBrowser } from '$lib/index.js';
import { listen } from '$lib/utils/listen.js';
import type { ActionReturn } from 'svelte/action';

type Parameters = {
    duration: number;
};
type Attributes = {
    'on:startlongpress': (e: CustomEvent<void>) => void;
    'on:endlongpress': (e: CustomEvent<void>) => void;
};

/**
 * Listen long press on node
 *
 * @param node
 * @param params
 * @returns
 */
export function longpress(node: HTMLElement, params: Parameters): ActionReturn<Parameters, Attributes> {
    let timer: ReturnType<typeof setTimeout>;

    function handlePress(): void {
        timer = setTimeout(() => {
            node.dispatchEvent(new CustomEvent('startlongpress'));
        }, params.duration);
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
        update(newParams: Parameters): void {
            handleRelease();
            params = newParams;
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
