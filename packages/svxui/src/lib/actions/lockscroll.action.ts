import type { ActionReturn } from 'svelte/action';

export type LockscrollParameters = boolean;
export type LockscrollAttributes = {
    'on:lockscrollchange'?: (e: CustomEvent<HTMLElement>) => void;
};

/**
 * Block scroll within the given node
 *
 * @param {HTMLElement} node
 * @param {LockscrollParameters} initialState
 * @returns
 */
export function lockscrollAction(
    node: HTMLElement,
    initialState: LockscrollParameters
): ActionReturn<LockscrollParameters, LockscrollAttributes> {
    let currentState = false;
    let prevOverflow = '';
    if (node.isSameNode(document)) {
        node = document.documentElement;
    }

    function block(): void {
        const scrollBarWidth = window.innerWidth - document.body.clientWidth;
        node.style.paddingRight = `${scrollBarWidth}px`;
        prevOverflow = node.style.overflow;
        node.style.overflow = 'hidden';
    }

    function unblock(): void {
        node.style.overflow = prevOverflow;
        node.style.paddingRight = '';
    }

    function update(state: boolean): void {
        if (currentState !== state) {
            currentState = state;
            if (currentState) {
                block();
            } else {
                unblock();
            }
            node.dispatchEvent(new CustomEvent('lockscrollchange', { detail: { blocked: currentState } }));
        }
    }

    update(initialState);

    return {
        update
    };
}
