import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clickoutside } from './attachment.svelte.js';
import type { ClickoutsideOptions } from './types.js';

describe('clickoutside attachment', () => {
    let element: HTMLElement;
    let detach: void | (() => void) | undefined;

    beforeEach(() => {
        element = document.createElement('div');
        element.id = 'main-element';
        document.body.appendChild(element);
    });

    afterEach(() => {
        detach?.();
        if (element.parentNode) {
            document.body.removeChild(element);
        }
        vi.restoreAllMocks();
    });

    it('should throw error if onClickOutside callback is not provided', () => {
        expect(() => {
            const attachment = clickoutside({} as ClickoutsideOptions);
            attachment(element);
        }).toThrow('clickoutside: onClickOutside callback is required');
    });

    it('should attach to element with required callback', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        expect(detach).toBeTypeOf('function');
    });

    it('should trigger callback when clicking outside the element', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        outsideElement.dispatchEvent(event);

        expect(onClickOutside).toHaveBeenCalledTimes(1);
        expect(onClickOutside).toHaveBeenCalledWith(event);

        document.body.removeChild(outsideElement);
    });

    it('should not trigger callback when clicking inside the element', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        element.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();
    });

    it('should not trigger callback when clicking on child elements', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        const childElement = document.createElement('button');
        element.appendChild(childElement);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        childElement.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();
    });

    it('should not trigger callback when enabled is false', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside, enabled: false });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        outsideElement.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();

        document.body.removeChild(outsideElement);
    });

    it('should ignore clicks on ignored elements', () => {
        const ignoredElement = document.createElement('div');
        ignoredElement.id = 'ignored';
        document.body.appendChild(ignoredElement);

        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            ignoreElements: [ignoredElement]
        });
        detach = attachment(element);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        ignoredElement.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();

        document.body.removeChild(ignoredElement);
    });

    it('should ignore clicks on children of ignored elements', () => {
        const ignoredElement = document.createElement('div');
        const childOfIgnored = document.createElement('button');
        ignoredElement.appendChild(childOfIgnored);
        document.body.appendChild(ignoredElement);

        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            ignoreElements: [ignoredElement]
        });
        detach = attachment(element);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        childOfIgnored.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();

        document.body.removeChild(ignoredElement);
    });

    it('should handle multiple ignored elements', () => {
        const ignored1 = document.createElement('div');
        const ignored2 = document.createElement('div');
        const notIgnored = document.createElement('div');

        document.body.appendChild(ignored1);
        document.body.appendChild(ignored2);
        document.body.appendChild(notIgnored);

        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            ignoreElements: [ignored1, ignored2]
        });
        detach = attachment(element);

        const event1 = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        ignored1.dispatchEvent(event1);
        expect(onClickOutside).not.toHaveBeenCalled();

        ignored2.dispatchEvent(event1);
        expect(onClickOutside).not.toHaveBeenCalled();

        notIgnored.dispatchEvent(event1);
        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(ignored1);
        document.body.removeChild(ignored2);
        document.body.removeChild(notIgnored);
    });

    it('should handle null elements in ignoreElements array', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            ignoreElements: [null as any, undefined as any]
        });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        outsideElement.dispatchEvent(event);

        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(outsideElement);
    });

    it('should respect custom eventType (click)', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            eventType: 'click'
        });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        // pointerdown should not trigger
        outsideElement.dispatchEvent(
            new PointerEvent('pointerdown', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(onClickOutside).not.toHaveBeenCalled();

        // click should trigger
        outsideElement.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(outsideElement);
    });

    it('should respect custom eventType (mousedown)', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            eventType: 'mousedown'
        });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true
        });

        outsideElement.dispatchEvent(event);

        expect(onClickOutside).toHaveBeenCalledTimes(1);
        expect(onClickOutside).toHaveBeenCalledWith(event);

        document.body.removeChild(outsideElement);
    });

    it('should use custom eventTarget', () => {
        const customTarget = document.createElement('div');
        document.body.appendChild(customTarget);

        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            eventTarget: customTarget
        });
        detach = attachment(element);

        // Click outside but on custom target
        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        customTarget.dispatchEvent(event);

        expect(onClickOutside).toHaveBeenCalledTimes(1);

        // Click on document should not trigger (not listening there)
        document.body.dispatchEvent(event);

        // Still just 1 call
        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(customTarget);
    });

    it('should use capture phase for event listening', () => {
        const onClickOutside = vi.fn();
        const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        expect(addEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
    });

    it('should cleanup event listener on detach', () => {
        const onClickOutside = vi.fn();
        const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        detach?.();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
    });

    it('should not trigger after detach', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        detach?.();

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        outsideElement.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();

        document.body.removeChild(outsideElement);
    });

    it('should handle event with null target gracefully', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        // Créer un événement avec un target qui n'est ni l'élément ni ses enfants
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const event = new Event('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        // Dispatch sur un élément extérieur
        outsideElement.dispatchEvent(event);

        // Devrait appeler le callback car c'est en dehors de l'élément
        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(outsideElement);
    });

    it('should work with deeply nested element structures', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        const level1 = document.createElement('div');
        const level2 = document.createElement('div');
        const level3 = document.createElement('button');

        element.appendChild(level1);
        level1.appendChild(level2);
        level2.appendChild(level3);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        level3.dispatchEvent(event);

        expect(onClickOutside).not.toHaveBeenCalled();
    });

    it('should work with window as eventTarget', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            eventTarget: window
        });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const event = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true
        });

        outsideElement.dispatchEvent(event);

        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(outsideElement);
    });

    it('should handle rapid consecutive clicks correctly', () => {
        const onClickOutside = vi.fn();
        const attachment = clickoutside({ onClickOutside });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        for (let i = 0; i < 5; i++) {
            outsideElement.dispatchEvent(
                new PointerEvent('pointerdown', {
                    bubbles: true,
                    cancelable: true
                })
            );
        }

        expect(onClickOutside).toHaveBeenCalledTimes(5);

        document.body.removeChild(outsideElement);
    });

    it('should differentiate between element and ignored element clicks', () => {
        const ignoredElement = document.createElement('div');
        document.body.appendChild(ignoredElement);

        const onClickOutside = vi.fn();
        const attachment = clickoutside({
            onClickOutside,
            ignoreElements: [ignoredElement]
        });
        detach = attachment(element);

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        // Click on main element - should not trigger
        element.dispatchEvent(
            new PointerEvent('pointerdown', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(onClickOutside).not.toHaveBeenCalled();

        // Click on ignored element - should not trigger
        ignoredElement.dispatchEvent(
            new PointerEvent('pointerdown', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(onClickOutside).not.toHaveBeenCalled();

        // Click outside - should trigger
        outsideElement.dispatchEvent(
            new PointerEvent('pointerdown', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(onClickOutside).toHaveBeenCalledTimes(1);

        document.body.removeChild(ignoredElement);
        document.body.removeChild(outsideElement);
    });
});
