import { listen } from '$lib/utils/listen.js';
import type { ActionReturn } from 'svelte/action';

export type ClickoutsideParameters = void;
export type ClickoutsideAttributes = {
    'on:clickoutside': (e: CustomEvent<MouseEvent>) => void;
};

/**
 * Listen click outside a node
 *
 * @param {HTMLElement} node
 * @returns
 */
export function clickoutsideAction(
    node: HTMLElement
): ActionReturn<ClickoutsideParameters, ClickoutsideAttributes> {
    function handleClick(event: MouseEvent) {
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent<MouseEvent>('clickoutside', event as any));
        }
    }

    const clickListener = listen(document, 'click', handleClick, true);

    return {
        destroy() {
            clickListener();
        }
    };
}
