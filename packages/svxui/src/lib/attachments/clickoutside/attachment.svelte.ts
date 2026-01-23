import type { Attachment } from 'svelte/attachments';
import type { ClickoutsideOptions } from './types.js';

/**
 * @description Detects clicks outside a bound element and triggers a callback. Typically used to close dropdowns, modals, or popovers.
 */
export function clickoutside(options: ClickoutsideOptions): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const {
            onClickOutside,
            enabled = true,
            ignoreElements = [],
            eventType = 'pointerdown',
            eventTarget = document
        } = options;

        if (!onClickOutside) {
            throw new Error('clickoutside: onClickOutside callback is required');
        }

        function onClick(event: Event) {
            if (!enabled) return;

            const target = event.target as Node | null;
            if (!target) return;

            // Ignore clicks inside the main node
            if (node.contains(target)) return;

            // Ignore clicks inside any ignored elements
            for (const el of ignoreElements) {
                if (el && el.contains(target)) return;
            }

            onClickOutside(event as MouseEvent | PointerEvent);
        }

        // Use capture phase to detect events early
        eventTarget.addEventListener(eventType, onClick, true);

        return () => {
            eventTarget.removeEventListener(eventType, onClick, true);
        };
    };
}
