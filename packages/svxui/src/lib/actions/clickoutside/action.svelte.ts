import { on } from 'svelte/events';
import type { ClickOutsideActionReturn, ClickOutsideParameters } from './types.js';
import { tick } from 'svelte';

/**
 * Listen click outside a node
 */
export function clickOutsideAction(
    node: HTMLElement,
    initialParams: ClickOutsideParameters = { enabled: true, options: true }
): ClickOutsideActionReturn {
    let off: (() => void) | undefined;

    function handler(event: MouseEvent): void {
        if (event.target && !event.defaultPrevented) {
            if (node.contains(event.target as Node)) {
                node.dispatchEvent(new CustomEvent<MouseEvent>('clickinside', { detail: event }));
            } else {
                node.dispatchEvent(new CustomEvent<MouseEvent>('clickoutside', { detail: event }));
            }
        }
    }

    function update(params: ClickOutsideParameters = { enabled: true, options: true }): void {
        const enabled = params.enabled ?? true;
        const event = params.event ?? 'click';
        const options =
            typeof params.options === 'boolean' //
                ? { capture: params.options }
                : params.options;

        if (off) {
            off();
            off = undefined;
        }

        if (enabled) {
            // Use tick() because the event called at the same time any click who activate the directive
            tick().then(() => {
                off = on<typeof event>(document, event, handler, options);
            });
        }
    }

    update(initialParams);

    return {
        update,
        destroy() {
            off?.();
        }
    };
}
