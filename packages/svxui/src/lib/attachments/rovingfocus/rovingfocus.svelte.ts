import { kbd } from '$lib/internals/kbd.js';
import { flushSync } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { buildConfig } from './internals/build-config.ts';
import type { RovingfocusOptions } from './types.ts';

/**
 * Manages keyboard focus within a group, allowing focus to move between items using arrow keys for accessible navigation.
 */
export function rovingfocus(options?: RovingfocusOptions): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const config = buildConfig(options);
        let currentIndex = -1;
        let items: HTMLElement[] = [];

        /** Get navigable items within the group, excluding disabled and hidden elements. */
        function getItems(): HTMLElement[] {
            return Array.from(node.querySelectorAll<HTMLElement>(config.target)).filter((el) => {
                return (
                    !el.hasAttribute('disabled') && //
                    el.getAttribute('aria-disabled') !== 'true' &&
                    el.getAttribute('aria-disabled') !== '' &&
                    el.getAttribute('aria-hidden') !== 'true' &&
                    el.getAttribute('aria-hidden') !== '' &&
                    // Check that the item is visible
                    el.offsetParent !== null
                );
            });
        }

        /**
         * Update tabIndex on all items based on the current focus position.
         */
        function setTabIndexes(): void {
            items.forEach((item, i) => {
                item.tabIndex = i === currentIndex ? 0 : -1;
            });
        }

        /**
         * Resolve the initial focused item index from the config.
         */
        function getInitialIndex(): number {
            if (items.length === 0) return -1;
            if (typeof config.initialIndex === 'number') {
                return Math.min(Math.max(0, config.initialIndex), items.length - 1);
            } else if (config.initialIndex === 'last') {
                return items.length - 1;
            }
            return 0; // 'first' or default
        }

        /**
         * Move focus to item at the given index and optionally trigger a click.
         */
        function focusItem(index: number): void {
            if (index < 0 || index >= items.length) return;
            if (currentIndex === index) return;

            currentIndex = index;
            setTabIndexes();
            items[index].focus();

            if (config.activateOnFocus) {
                items[index].click();
            }
        }

        /**
         * Handle keydown navigation events within the group.
         */
        function onKeydown(event: KeyboardEvent): void {
            if (items.length === 0) return;
            if (!config.allowedKeys.includes(event.key)) return;

            let newIndex = currentIndex;

            switch (event.key) {
                case config.nextKey:
                    event.preventDefault();
                    newIndex = currentIndex + 1;
                    if (newIndex >= items.length) {
                        newIndex = config.loop ? 0 : items.length - 1;
                    }
                    break;

                case config.prevKey:
                    event.preventDefault();
                    newIndex = currentIndex - 1;
                    if (newIndex < 0) {
                        newIndex = config.loop ? items.length - 1 : 0;
                    }
                    break;

                case kbd.HOME:
                    event.preventDefault();
                    newIndex = 0;
                    break;

                case kbd.END:
                    event.preventDefault();
                    newIndex = items.length - 1;
                    break;
            }

            focusItem(newIndex);
        }

        /**
         * Update the current index when an item is clicked.
         */
        function onClick(event: MouseEvent): void {
            const target = (event.target as HTMLElement).closest(config.target) as HTMLElement;

            if (target && items.includes(target)) {
                const index = items.indexOf(target);
                currentIndex = index;
                setTabIndexes();
            }
        }

        /**
         * Handle DOM mutations to refresh the item list and adjust the current index.
         */
        function onMutate() {
            const oldLength = items.length;
            items = getItems();

            // Adjust index if necessary
            if (currentIndex >= items.length) {
                currentIndex = Math.max(0, items.length - 1);
            }

            // If items changed, update tabindex
            if (oldLength !== items.length) {
                setTabIndexes();
            }
        }

        // Initialisation
        flushSync();
        items = getItems();
        currentIndex = getInitialIndex();
        setTabIndexes();

        node.addEventListener('keydown', onKeydown);
        node.addEventListener('click', onClick);

        // Listen DOM changes
        const mutationObserver = new MutationObserver(onMutate);
        mutationObserver.observe(node, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['disabled', 'aria-disabled']
        });

        return () => {
            node.removeEventListener('keydown', onKeydown);
            node.removeEventListener('click', onClick);
            mutationObserver.disconnect();
        };
    };
}
