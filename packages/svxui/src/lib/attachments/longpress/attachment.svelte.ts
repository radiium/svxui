import type { Attachment } from 'svelte/attachments';
import type { LongpressOptions } from './types.js';

/**
 * Detects when a pointer is held down for a specified duration and triggers a callback. Useful for contextual actions or alternative interactions.
 */
export function longpress(options: LongpressOptions = {}): Attachment<HTMLElement> {
    return (node) => {
        const { onLongpressStart, onLongpressEnd, enabled = true, delay = 500 } = options;

        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let activePointerId: number | null = null;
        let isActive = false;

        function clearTimer() {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }

        function onPointerdown(event: PointerEvent) {
            if (!enabled || event.button !== 0) return;
            if (activePointerId !== null) return;

            activePointerId = event.pointerId;

            timeoutId = setTimeout(() => {
                isActive = true;
                onLongpressStart?.(event);
            }, delay);
        }

        function onPointerup(event: PointerEvent) {
            if (event.pointerId !== activePointerId) return;

            if (isActive) {
                onLongpressEnd?.(event);
            }

            reset();
        }

        function onPointercancel(event: PointerEvent) {
            if (event.pointerId !== activePointerId) return;
            reset();
        }

        function reset() {
            clearTimer();
            activePointerId = null;
            isActive = false;
        }

        function onContextmenu(event: Event) {
            if (isActive) event.preventDefault();
        }

        node.addEventListener('pointerdown', onPointerdown);
        node.addEventListener('contextmenu', onContextmenu);
        window.addEventListener('pointerup', onPointerup);
        window.addEventListener('pointercancel', onPointercancel);

        return () => {
            clearTimer();
            node.removeEventListener('pointerdown', onPointerdown);
            node.removeEventListener('contextmenu', onContextmenu);
            window.removeEventListener('pointerup', onPointerup);
            window.removeEventListener('pointercancel', onPointercancel);
        };
    };
}
