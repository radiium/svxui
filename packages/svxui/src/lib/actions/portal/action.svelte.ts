import { tick } from 'svelte';
import type { PortalActionReturn, PortalParameters } from './types.js';

async function getTargetEl(target?: PortalParameters['target']): Promise<HTMLElement> {
    let targetEl: HTMLElement | null;

    if (target instanceof HTMLElement) {
        targetEl = target;
    } else if (typeof target === 'string') {
        targetEl = document.querySelector(target);
        if (targetEl === null) {
            await tick();
            targetEl = document.querySelector(target);
        }
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

function moveNode(
    enabled: boolean,
    node: HTMLElement,
    targetEl: HTMLElement,
    originalParentEl: HTMLElement | null
): void {
    if (enabled) {
        targetEl.appendChild(node);
        node.hidden = false;
    } else if (originalParentEl) {
        if (originalParentEl !== node.parentElement) {
            originalParentEl?.appendChild(node);
        }
    }
}
/**
 * Simple portal action
 * Credits: https://github.com/techniq/svelte-ux/
 */
export function portalAction(node: HTMLElement, initialParams: PortalParameters = {}): PortalActionReturn {
    let targetEl: HTMLElement | null;
    const originalParentEl = node.parentElement;

    async function update(params: PortalParameters = { enabled: true, target: 'body' }): Promise<void> {
        const enabled = params.enabled ?? true;
        const target = params.target ?? 'body';

        targetEl = await getTargetEl(target);
        moveNode(enabled, node, targetEl, originalParentEl);
    }

    function destroy(): void {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }

    update(initialParams);

    return {
        update,
        destroy
    };
}
