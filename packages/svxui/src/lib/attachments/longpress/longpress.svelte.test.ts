import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { longpress } from './longpress.svelte.ts';

describe('longpress attachment', () => {
    let element: HTMLElement;
    let detach: void | (() => void) | undefined;

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
        vi.useFakeTimers();
    });

    afterEach(() => {
        detach?.();
        document.body.removeChild(element);
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('should attach to element without options', () => {
        const attachment = longpress();
        detach = attachment(element);

        expect(detach).toBeTypeOf('function');
    });

    it('should trigger onLongpressStart after delay', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, delay: 500 });
        detach = attachment(element);

        const pointerDownEvent = new PointerEvent('pointerdown', {
            button: 0,
            pointerId: 1,
            bubbles: true
        });

        element.dispatchEvent(pointerDownEvent);
        expect(onLongpressStart).not.toHaveBeenCalled();

        vi.advanceTimersByTime(500);
        expect(onLongpressStart).toHaveBeenCalledTimes(1);
        expect(onLongpressStart).toHaveBeenCalledWith(pointerDownEvent);
    });

    it('should trigger onLongpressEnd when pointer is released after longpress', () => {
        const onLongpressStart = vi.fn();
        const onLongpressEnd = vi.fn();
        const attachment = longpress({ onLongpressStart, onLongpressEnd, delay: 500 });
        detach = attachment(element);

        const pointerDownEvent = new PointerEvent('pointerdown', {
            button: 0,
            pointerId: 1,
            bubbles: true
        });
        element.dispatchEvent(pointerDownEvent);

        vi.advanceTimersByTime(500);
        expect(onLongpressStart).toHaveBeenCalledTimes(1);

        const pointerUpEvent = new PointerEvent('pointerup', {
            pointerId: 1,
            bubbles: true
        });
        window.dispatchEvent(pointerUpEvent);

        expect(onLongpressEnd).toHaveBeenCalledTimes(1);
        expect(onLongpressEnd).toHaveBeenCalledWith(pointerUpEvent);
    });

    it('should not trigger callbacks if pointer released before delay', () => {
        const onLongpressStart = vi.fn();
        const onLongpressEnd = vi.fn();
        const attachment = longpress({ onLongpressStart, onLongpressEnd, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(300);

        window.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(200);

        expect(onLongpressStart).not.toHaveBeenCalled();
        expect(onLongpressEnd).not.toHaveBeenCalled();
    });

    it('should not trigger when enabled is false', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, enabled: false, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);

        expect(onLongpressStart).not.toHaveBeenCalled();
    });

    it('should not trigger for non-left button clicks', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, delay: 500 });
        detach = attachment(element);

        // Right click (button: 2)
        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 2,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);

        expect(onLongpressStart).not.toHaveBeenCalled();
    });

    it('should use default delay of 800ms when not specified', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(799);
        expect(onLongpressStart).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(onLongpressStart).toHaveBeenCalledTimes(1);
    });

    it('should respect custom delay', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, delay: 1000 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(999);
        expect(onLongpressStart).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(onLongpressStart).toHaveBeenCalledTimes(1);
    });

    it('should handle pointercancel event', () => {
        const onLongpressStart = vi.fn();
        const onLongpressEnd = vi.fn();
        const attachment = longpress({ onLongpressStart, onLongpressEnd, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(300);

        window.dispatchEvent(
            new PointerEvent('pointercancel', {
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(200);

        expect(onLongpressStart).not.toHaveBeenCalled();
        expect(onLongpressEnd).not.toHaveBeenCalled();
    });

    it('should prevent contextmenu when longpress is active', () => {
        const attachment = longpress({ delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);

        const contextMenuEvent = new Event('contextmenu', {
            bubbles: true,
            cancelable: true
        });
        const preventDefaultSpy = vi.spyOn(contextMenuEvent, 'preventDefault');

        element.dispatchEvent(contextMenuEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent contextmenu when longpress is not active', () => {
        const attachment = longpress({ delay: 500 });
        detach = attachment(element);

        const contextMenuEvent = new Event('contextmenu', {
            bubbles: true,
            cancelable: true
        });
        const preventDefaultSpy = vi.spyOn(contextMenuEvent, 'preventDefault');

        element.dispatchEvent(contextMenuEvent);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should ignore pointerup from different pointer', () => {
        const onLongpressStart = vi.fn();
        const onLongpressEnd = vi.fn();
        const attachment = longpress({ onLongpressStart, onLongpressEnd, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);
        expect(onLongpressStart).toHaveBeenCalledTimes(1);

        // Different pointer
        window.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 2,
                bubbles: true
            })
        );

        expect(onLongpressEnd).not.toHaveBeenCalled();
    });

    it('should ignore pointercancel from different pointer', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(300);

        // Different pointer
        window.dispatchEvent(
            new PointerEvent('pointercancel', {
                pointerId: 2,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(200);

        expect(onLongpressStart).toHaveBeenCalledTimes(1);
    });

    it('should ignore pointerdown when another pointer is already active', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        // Second pointer down
        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 2,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);

        // Should only be called once for the first pointer
        expect(onLongpressStart).toHaveBeenCalledTimes(1);
    });

    it('should cleanup event listeners on detach', () => {
        const removeEventListenerSpy = vi.spyOn(element, 'removeEventListener');
        const windowRemoveEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const attachment = longpress();
        detach = attachment(element);

        detach?.();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('contextmenu', expect.any(Function));
        expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));
        expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('pointercancel', expect.any(Function));
    });

    it('should clear timeout on detach', () => {
        const onLongpressStart = vi.fn();
        const attachment = longpress({ onLongpressStart, delay: 500 });
        detach = attachment(element);

        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(300);

        detach?.();

        vi.advanceTimersByTime(200);

        expect(onLongpressStart).not.toHaveBeenCalled();
    });

    it('should reset state after complete longpress cycle', () => {
        const onLongpressStart = vi.fn();
        const onLongpressEnd = vi.fn();
        const attachment = longpress({ onLongpressStart, onLongpressEnd, delay: 500 });
        detach = attachment(element);

        // First cycle
        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);
        window.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                bubbles: true
            })
        );

        expect(onLongpressStart).toHaveBeenCalledTimes(1);
        expect(onLongpressEnd).toHaveBeenCalledTimes(1);

        // Second cycle
        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 2,
                bubbles: true
            })
        );

        vi.advanceTimersByTime(500);
        window.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 2,
                bubbles: true
            })
        );

        expect(onLongpressStart).toHaveBeenCalledTimes(2);
        expect(onLongpressEnd).toHaveBeenCalledTimes(2);
    });
});
