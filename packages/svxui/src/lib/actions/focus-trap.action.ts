import type { ActionReturn } from 'svelte/action';
import type { HTMLAttributes } from 'svelte/elements';
import { on } from 'svelte/events';

export type FocusTrapParameters = boolean;
export type FocusTrapAttributes = HTMLAttributes<HTMLElement>;

let stack: HTMLElement[] = [];

/**
 * Traps focus within a wrapper element
 * credit: https://github.com/henrygd/trap-focus-svelte
 *
 * @param {HTMLElement} node
 * @param {FocusTrapParameters} active
 * @returns
 */
export function focusTrapAction(
    node: HTMLElement,
    active: FocusTrapParameters = true
): ActionReturn<FocusTrapParameters, FocusTrapAttributes> {
    // return  the first and last focusable children
    function getFirstAndLastFocusable(): HTMLElement[] {
        const els = [...node.querySelectorAll<HTMLElement>('*')].filter(
            (element: HTMLElement) => element.tabIndex >= 0
        );
        return [els.at(0) ?? node, els.at(-1) ?? node] as HTMLElement[];
    }

    // store document.activeElement to restore focus when untrapped
    let lastActiveElement: HTMLElement;

    /** activates trap (adds to stack) and focuses inside */
    function addToStack(): void {
        stack.push(node);
        lastActiveElement = document.activeElement as HTMLElement;
        getFirstAndLastFocusable().at(0)?.focus();
    }

    /** deactivates trap (removes from stack) and restores focus to lastActiveElement */
    function removeFromStack(): void {
        stack = stack.filter((el) => el != node);
        lastActiveElement?.focus();
    }

    // add to stack if active
    if (active) {
        addToStack();
    }

    /** true if element is in the trap most recently added to stack */
    function inCurrentTrap(el: HTMLElement) {
        return stack.at(-1)?.contains(el);
    }

    /** moves focus back to wrap if something outside the wrap is focused */
    const focusListener = on<'focusin'>(document, 'focusin', (e: FocusEvent) => {
        // return if ths trap is not active
        // return if focus is inside the trap
        if (!inCurrentTrap(node) || inCurrentTrap(e.target as HTMLElement)) {
            return;
        }

        const [firstFocusable, lastFocusable] = getFirstAndLastFocusable();
        const previousFocusable = e.relatedTarget as HTMLElement;

        // if no previousFocusable, focus first focusable
        // if previousFocusable is not in the trap, focus first focusable
        // if last element, focus first focusable
        if (!previousFocusable || !inCurrentTrap(previousFocusable) || previousFocusable === lastFocusable) {
            firstFocusable.focus();
            return;
        }

        // if first element and shift tab within time, focus last element
        if (previousFocusable === firstFocusable || previousFocusable === node) {
            lastFocusable.focus();
            return;
        }
        // fall back to focus on previousFocusable (we made sure it was in current trap above)
        previousFocusable.focus();
    });

    return {
        update(newActive: FocusTrapParameters) {
            if (newActive) {
                addToStack();
            } else {
                removeFromStack();
            }
        },
        destroy() {
            focusListener();
            removeFromStack();
        }
    };
}
