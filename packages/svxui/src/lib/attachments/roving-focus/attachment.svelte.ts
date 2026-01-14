import { kbd } from '$lib/internals/kbd.js';
import { flushSync } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { buildConfig } from './internals/build-config.js';
import type { RovingFocusOptions } from './types.js';

/**
 * @description Manages keyboard focus within a group, allowing focus to move between items using arrow keys for accessible navigation.
 */
export function rovingFocus(options?: RovingFocusOptions): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        let config = buildConfig(options);
        let currentIndex = -1;
        let items: HTMLElement[] = [];

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

        function setTabIndexes(): void {
            items.forEach((item, i) => {
                item.tabIndex = i === currentIndex ? 0 : -1;
            });
        }

        function getInitialIndex(): number {
            if (items.length === 0) return -1;
            if (typeof config.initialIndex === 'number') {
                return Math.min(Math.max(0, config.initialIndex), items.length - 1);
            } else if (config.initialIndex === 'last') {
                return items.length - 1;
            }
            return 0; // 'first' or default
        }

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

        function onClick(event: MouseEvent): void {
            const target = (event.target as HTMLElement).closest(config.target) as HTMLElement;

            if (target && items.includes(target)) {
                const index = items.indexOf(target);
                currentIndex = index;
                setTabIndexes();
            }
        }

        function onMutate() {
            const oldLength = items.length;
            items = getItems();

            // Ajuster l'index si nécessaire
            if (currentIndex >= items.length) {
                currentIndex = Math.max(0, items.length - 1);
            }

            // Si les items ont changé, mettre à jour les tabindex
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
