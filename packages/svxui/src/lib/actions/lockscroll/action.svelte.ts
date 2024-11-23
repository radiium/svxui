import type { LockScrollActionReturn, LockScrollParameters } from './types.js';

/**
 * Block scroll within the given node
 */
export function lockScrollAction(
    node: HTMLElement,
    initialState: LockScrollParameters = {}
): LockScrollActionReturn {
    let currentState = false;
    let prevOverflow = '';
    let prevPaddingRight = '';

    if (node.isSameNode(document)) {
        node = document.documentElement;
    }

    prevOverflow = node.style.overflow;
    prevPaddingRight = node.style.paddingRight;

    function block(): void {
        const scrollBarWidth = window.innerWidth - document.body.clientWidth;
        node.style.overflow = 'hidden';
        node.style.paddingRight = `${scrollBarWidth}px`;
    }

    function unblock(): void {
        node.style.overflow = prevOverflow;
        node.style.paddingRight = prevPaddingRight;
    }

    function update(params: LockScrollParameters = { enabled: true }): void {
        const enabled = params.enabled ?? true;

        if (currentState !== enabled) {
            currentState = enabled;
            if (currentState) {
                block();
            } else {
                unblock();
            }

            node.dispatchEvent(new CustomEvent('lockscrollchange', { detail: currentState }));
        }
    }

    update(initialState);

    return {
        update
    };
}
