import type { Attachment } from 'svelte/attachments';
import type { PortalOptions } from './types.js';

/**
 * Moves an element to a different part of the DOM (e.g., document.body). Useful for modals, tooltips, or overlays.
 */
export function portal(options: PortalOptions = {}): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const { enabled = true, target = 'body' } = options;

        const originalParent = node.parentNode;
        const originalNextSibling = node.nextSibling;
        const originalnextElementSibling = node.nextElementSibling;

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
        }

        function deactivate() {
            // Restore the element to its original parent and sibling position
            // if it is currently attached to a different DOM node
            if (originalParent && node.parentNode && originalParent !== node.parentNode) {
                try {
                    // Checking the validity of the following node
                    // because the Svelte hot update removes some comment nodes
                    // and causes an error here.
                    const nextNode = originalParent.contains(originalNextSibling)
                        ? originalNextSibling
                        : originalnextElementSibling;
                    originalParent.insertBefore(node, nextNode);
                } catch (error) {
                    console.warn(error);
                }
            }
        }

        if (enabled) {
            activate();
        }

        return () => {
            deactivate();
        };
    };
}
