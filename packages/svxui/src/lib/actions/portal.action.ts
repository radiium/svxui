import { tick } from 'svelte';
import type { ActionReturn } from 'svelte/action';
import type { HTMLAttributes } from 'svelte/elements';

export type PortalParameters = HTMLElement | string;
export type PortalAttributes = HTMLAttributes<HTMLElement>;

/**
 * Simple portal action
 *
 * @param {HTMLElement} node
 * @param {PortalParameters} target
 * @returns
 */
export function portalAction(
    node: HTMLElement,
    target: PortalParameters = 'body'
): ActionReturn<PortalParameters, PortalAttributes> {
    let targetEl: HTMLElement | null;

    async function update(newTarget: HTMLElement | string): Promise<void> {
        target = newTarget;
        if (typeof target === 'string') {
            targetEl = document.querySelector(target);
            if (targetEl === null) {
                await tick();
                targetEl = document.querySelector(target);
            }
            if (targetEl === null) {
                throw new Error(`No element found matching css selector: "${target}"`);
            }
        } else if (target instanceof HTMLElement) {
            targetEl = target;
        } else {
            throw new TypeError(
                `Unknown portal target type: ${
                    target === null ? 'null' : typeof target
                }. Allowed types: string (CSS selector) or HTMLElement.`
            );
        }

        targetEl.appendChild(node);
        node.hidden = false;
    }

    function destroy(): void {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }

    update(target);

    return {
        update,
        destroy
    };
}
