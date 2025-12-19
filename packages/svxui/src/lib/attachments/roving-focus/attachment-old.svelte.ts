import { kbd } from '$lib/index.js';
import { on } from 'svelte/events';
import type { RovingFocusConfigInternal, RovingFocusProps } from './types.js';

export function rovingFocusAlt(props?: RovingFocusProps) {
    let config: RovingFocusConfigInternal = $derived.by(() => {
        const target = props?.target ?? '[data-roving-item]';
        const loop = props?.loop ?? false;
        const orientation = props?.orientation ?? 'vertical';

        const prevKey = orientation === 'vertical' ? kbd.ARROW_UP : kbd.ARROW_LEFT;
        const nextKey = orientation === 'vertical' ? kbd.ARROW_DOWN : kbd.ARROW_RIGHT;
        const allowedKeys =
            orientation === 'vertical'
                ? [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END]
                : [kbd.ARROW_LEFT, kbd.ARROW_RIGHT, kbd.HOME, kbd.END];

        return {
            target,
            loop,
            orientation,
            prevKey,
            nextKey,
            allowedKeys,
            initialIndex: 0,
            activateOnFocus: false
        };
    });

    return (node: HTMLElement) => {
        let currentIndex = $state(0);
        let elements: HTMLElement[] = $state([]);

        // Function to retrieve all focusable elements
        function getElements(): HTMLElement[] {
            const items = Array.from(node.querySelectorAll<HTMLElement>(config.target)).filter((el) => {
                // Filters disabled or hidden items
                const isDisabled =
                    el.hasAttribute('disabled') ||
                    ('disabled' in el && (el as HTMLButtonElement | HTMLInputElement).disabled);
                const isHidden = el.offsetParent === null;

                return !isDisabled && !isHidden;
            });
            return items;
        }

        // Updates the list of items
        function updateElements() {
            elements = getElements();

            // Initialize tabindex on all elements
            elements.forEach((el, index) => {
                el.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
            });
        }

        // Focus on a specific element
        function focusElement(index: number) {
            if (elements.length === 0) return;

            // Removes the tabindex from the current element
            if (elements[currentIndex]) {
                elements[currentIndex].setAttribute('tabindex', '-1');
            }

            currentIndex = index;

            // Add the tabindex and focus the new element
            if (elements[currentIndex]) {
                elements[currentIndex].setAttribute('tabindex', '0');
                elements[currentIndex].focus();

                // Calls the onFocus callback if defined
                props?.onFocus?.(elements[currentIndex], currentIndex);
            }
        }

        // Navigation management
        function navigate(direction: 'next' | 'prev' | 'first' | 'last') {
            if (elements.length === 0) return;

            let newIndex = currentIndex;

            switch (direction) {
                case 'next':
                    newIndex = currentIndex + 1;
                    if (newIndex >= elements.length) {
                        newIndex = config.loop ? 0 : elements.length - 1;
                    }
                    break;
                case 'prev':
                    newIndex = currentIndex - 1;
                    if (newIndex < 0) {
                        newIndex = config.loop ? elements.length - 1 : 0;
                    }
                    break;
                case 'first':
                    newIndex = 0;
                    break;
                case 'last':
                    newIndex = elements.length - 1;
                    break;
            }

            if (newIndex !== currentIndex) {
                focusElement(newIndex);
            }
        }

        // Keydown handler
        function handleKeydown(e: KeyboardEvent) {
            // Check if the key is allowed
            if (!config.allowedKeys.includes(e.key)) return;

            // Checks if the event originates from a managed child element
            const target = e.target as HTMLElement;
            if (!elements.includes(target)) return;

            e.preventDefault();
            e.stopPropagation();

            // Navigation via the key
            if (e.key === config.nextKey) {
                navigate('next');
            } else if (e.key === config.prevKey) {
                navigate('prev');
            } else if (e.key === kbd.HOME) {
                navigate('first');
            } else if (e.key === kbd.END) {
                navigate('last');
            }
        }

        // Focus handler
        function handleFocus(e: FocusEvent) {
            const target = e.target as HTMLElement;
            const index = elements.indexOf(target);

            if (index !== -1 && index !== currentIndex) {
                focusElement(index);
            }
        }

        // Initialization
        updateElements();

        // Observe the changes in the DOM to update the elements
        const observer = new MutationObserver(updateElements);
        observer.observe(node, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['disabled', 'hidden']
        });

        // Attach the event listeners with svelte/events
        const cleanupKeydown = on(node, 'keydown', handleKeydown);
        const cleanupFocus = on(node, 'focusin', handleFocus, { capture: true });

        // Cleanup
        return () => {
            observer.disconnect();
            cleanupKeydown();
            cleanupFocus();
        };
    };
}
