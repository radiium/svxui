import { flushSync } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { FOCUSABLE_SELECTORS } from './internals/focusable-selectors.js';
import type { FocusTrapOptions } from './types.js';

/**
 * @description Traps keyboard focus within a DOM element, preventing focus from leaving it while active.
 */
export function focustrap(options: FocusTrapOptions = {}): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const { enabled = true, initialFocus, returnFocus = true } = options;

        let previouslyFocused: HTMLElement | null = null;
        let isActive = false;

        function getFocusableElements(): HTMLElement[] {
            return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter((el) => {
                const computedStyle = getComputedStyle(el);
                return (
                    el.offsetParent !== null && //
                    !el.hasAttribute('hidden') &&
                    computedStyle.visibility !== 'hidden' &&
                    computedStyle.display !== 'none'
                );
            });
        }

        function handleKeydown(e: KeyboardEvent) {
            if (e.key !== 'Tab') return;

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) {
                e.preventDefault();
                return;
            }

            // If there is only one element, prevent Tab but keep focus
            if (focusableElements.length === 1) {
                e.preventDefault();
                focusableElements[0].focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            // Tab sans Shift : from last to first
            if (!e.shiftKey && activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
                return;
            }

            // Shift+Tab : from the first to the last
            if (e.shiftKey && activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
                return;
            }
        }

        function activate() {
            if (isActive) return;
            isActive = true;

            previouslyFocused = document.activeElement as HTMLElement;

            flushSync();
            let elementToFocus: HTMLElement | null = null;

            if (initialFocus) {
                if (typeof initialFocus === 'string') {
                    elementToFocus = node.querySelector<HTMLElement>(initialFocus);
                } else {
                    elementToFocus = initialFocus;
                }
            }

            if (!elementToFocus) {
                const focusableElements = getFocusableElements();
                elementToFocus = focusableElements[0] || null;
            }

            elementToFocus?.focus({ preventScroll: true });

            document.addEventListener('keydown', handleKeydown);
        }

        function deactivate() {
            if (!isActive) return;
            isActive = false;

            document.removeEventListener('keydown', handleKeydown);

            if (returnFocus && previouslyFocused) {
                // Verify that the element is still in the DOM
                if (document.body.contains(previouslyFocused)) {
                    flushSync();
                    previouslyFocused.focus({ preventScroll: true });
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
