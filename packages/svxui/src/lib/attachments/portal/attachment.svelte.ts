import type { Attachment } from 'svelte/attachments';
import type { PortalOptions } from './types.js';

/**
 * @description Moves an element to a different part of the DOM (e.g., document.body). Useful for modals, tooltips, or overlays.
 * Credits: {@link https://github.com/romkor/svelte-portal}
 */
export function portal(options: PortalOptions = {}): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const { enabled = true, target = 'body' } = options;
        const originalParent = node.parentNode;
        const originalNextSibling = node.nextSibling;

        function getTargetEl(target?: PortalOptions['target']): HTMLElement {
            let targetEl: HTMLElement | null;

            if (target instanceof HTMLElement) {
                targetEl = target;
            } else if (typeof target === 'string') {
                targetEl = document.querySelector(target);
                if (targetEl === null) {
                    throw new Error(`No element found matching css selector: "${target}"`);
                }
            } else {
                throw new TypeError(
                    `Unknown portal target type: ${
                        target === null ? 'null' : typeof target
                    }. Allowed types: string (CSS selector) or HTMLElement.`
                );
            }

            return targetEl;
        }

        function activate() {
            const targetEl = getTargetEl(target);
            targetEl.appendChild(node);
            node.hidden = false;
        }
        function deactivate() {
            if (!originalParent) return;

            node.remove();
            originalParent.insertBefore(node, originalNextSibling);
        }

        if (enabled) {
            activate();
        } else {
            deactivate();
        }

        return () => {
            deactivate();
        };
    };
}
