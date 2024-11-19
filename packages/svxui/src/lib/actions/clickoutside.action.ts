import type { ActionReturn } from 'svelte/action';
import { on } from 'svelte/events';

export type ClickoutsideParameters = undefined;
export type ClickoutsideAttributes = {
    onclickoutside: (e: CustomEvent<MouseEvent>) => void;
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
    const handler = (event: MouseEvent) => {
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent<MouseEvent>('clickoutside', { detail: event }));
        }
    };

    const off = on<'click'>(document, 'click', handler, { capture: true });

    return {
        destroy() {
            off();
        }
    };
}
