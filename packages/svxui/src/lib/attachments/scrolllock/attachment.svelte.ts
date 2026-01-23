import { toHTMLElement } from '$lib/internals/elements.js';
import type { Attachment } from 'svelte/attachments';
import type { ScrolllockOptions } from './types.js';

/**
 * @description Prevents page scrolling while an element is active by locking the document’s scroll. Commonly used for modals and overlays.
 */
export function scrolllock(options: ScrolllockOptions = {}): Attachment<HTMLElement | Document> {
    return (node: HTMLElement | Document) => {
        let enabled = options.enabled ?? true;
        const target = toHTMLElement(node);

        let overflow;
        let paddingRight;

        let originalStyle:
            | {
                  overflow: string;
                  paddingRight: string;
              }
            | undefined = undefined;

        function lock() {
            originalStyle = {
                overflow: target.style.overflow,
                paddingRight: target.style.paddingRight
            };

            overflow = target.style.overflow;
            paddingRight = target.style.paddingRight;

            const offsetWidth = target === document.body ? window.innerWidth : target.offsetWidth;
            const currentPaddingRight = parseInt(window.getComputedStyle(target).paddingRight, 10) || 0;
            const scrollbarWidth = offsetWidth - target.scrollWidth;
            target.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`;
            target.style.overflow = 'hidden';
        }

        function unlock() {
            if (target && originalStyle) {
                target.style.overflow = originalStyle.overflow;
                target.style.paddingRight = originalStyle.paddingRight;
            }
        }

        if (enabled) {
            lock();
        }

        // Cleanup function
        return () => {
            unlock();
        };
    };
}
