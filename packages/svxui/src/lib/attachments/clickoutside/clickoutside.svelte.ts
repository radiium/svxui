import type { Attachment } from 'svelte/attachments';
import type { ClickoutsideOptions } from './types.ts';
import { getHtmlElement, toHTMLElement } from '$lib/internals/elements.js';

/**
 * Detects clicks outside a bound element and triggers a callback. Typically used to close dropdowns, modals, or popovers.
 */
export function clickoutside(options?: ClickoutsideOptions): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const {
            onClickOutside,
            enabled = true,
            ignoreElements = [],
            eventType = 'pointerdown',
            eventTarget = document
        } = options ?? {};

        const resolvedEventTarget =
            typeof eventTarget === 'string'
                ? getHtmlElement(eventTarget, document)
                : toHTMLElement(eventTarget);

        if (!resolvedEventTarget) {
            throw new Error(`Invalid eventTarget`);
        }

        function onClick(event: Event) {
            if (!enabled) return;

            const target = event.target as Node | null;
            if (!target) return;

            // Ignore clicks inside the main node
            if (node.contains(target)) return;

            // Ignore clicks inside any ignored elements
            for (const el of ignoreElements) {
                if (el) {
                    const resolvedEl = getHtmlElement(el, resolvedEventTarget);
                    if (resolvedEl && resolvedEl.contains(target)) return;
                }
            }

            onClickOutside?.(event as MouseEvent | PointerEvent);
        }

        // Use capture phase to detect events early
        resolvedEventTarget.addEventListener(eventType, onClick, true);

        return () => {
            resolvedEventTarget.removeEventListener(eventType, onClick, true);
        };
    };
}
