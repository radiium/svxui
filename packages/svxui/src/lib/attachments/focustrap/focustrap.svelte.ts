import { getHtmlElement } from '$lib/internals/elements.js';
import { flushSync } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { FOCUSABLE_SELECTORS } from './internals/focusable-selectors.ts';
import type { FocustrapOptions } from './types.ts';

/**
 * Traps keyboard focus within a DOM element, preventing focus from leaving it while active.
 */
export function focustrap(options: FocustrapOptions = {}): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const { enabled = true, initialFocus } = options;

        let isActive = false;

        /**
         * Get focusable elements
         * @returns
         */
        function getFocusableElements(): HTMLElement[] {
            return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter((el) => {
                // Already in the selectors, but defensive
                const tabindex = el.getAttribute('tabindex');
                if (tabindex !== null && Number(tabindex) < 0) return false;

                // inert on the element or an ancestor
                if (el.closest('[inert]')) return false;

                // fieldset disabled (except for the first legend)
                const fieldset = el.closest('fieldset[disabled]');
                if (fieldset) {
                    const legend = fieldset.querySelector('legend:first-of-type');
                    if (!legend || !legend.contains(el)) return false;
                }

                // hidden attribute (and display:none implicit)
                if (el.hidden) return false;

                // Covers display:none (inherited or direct) AND visibility:hidden
                // Without using getComputedStyle
                if (el.getClientRects().length === 0) return false;

                return true;
            });
        }

        /**
         * Handle node keydown event
         */
        function handleKeydown(e: KeyboardEvent): void {
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

            // Safari fix: use e.target instead of document.activeElement
            // because activeElement can be outdated at the time of the keydown in Safari
            const activeElement = (e.target as HTMLElement) ?? document.activeElement;

            // Checks if the activeElement is in the trap
            // On Safari, if no element in the trap has focus, it is forced to have focus.
            const activeIndex = focusableElements.indexOf(activeElement as HTMLElement);
            if (activeIndex === -1) {
                e.preventDefault();
                if (e.shiftKey) {
                    lastElement.focus();
                } else {
                    firstElement.focus();
                }
                return;
            }

            // Tab without Shift : from last to first
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

        /**
         * Activate focustrap
         * @returns
         */
        function activate(): void {
            if (isActive) return;
            isActive = true;

            flushSync();

            let elementToFocus: HTMLElement | null = null;

            if (initialFocus) {
                elementToFocus = getHtmlElement(initialFocus, node) ?? null;
            }
            if (!elementToFocus) {
                const focusableElements = getFocusableElements();
                elementToFocus = focusableElements[0] ?? null;
            }

            requestAnimationFrame(() => {
                if (elementToFocus?.isConnected) {
                    elementToFocus?.focus({ preventScroll: true });
                }
            });

            node.addEventListener('keydown', handleKeydown);
        }

        /**
         * Deactivate focustrap
         */
        function deactivate(): void {
            if (!isActive) return;
            isActive = false;

            node.removeEventListener('keydown', handleKeydown);
        }

        if (enabled) {
            activate();
        }

        return () => {
            deactivate();
        };
    };
}
