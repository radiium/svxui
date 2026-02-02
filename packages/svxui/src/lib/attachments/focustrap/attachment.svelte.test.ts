import { beforeEach, describe, expect, it, vi } from 'vitest';
import { focustrap } from './attachment.svelte.js';

function createFocusable(id: string) {
    const el = document.createElement('button');
    el.id = id;
    el.textContent = id;
    document.body.appendChild(el);
    return el;
}

function pressTab(options: { shift?: boolean } = {}) {
    const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: options.shift ?? false,
        bubbles: true
    });
    document.dispatchEvent(event);
}

describe('focustrap attachment', () => {
    let container: HTMLElement;
    let outsideButton: HTMLButtonElement;

    beforeEach(() => {
        document.body.innerHTML = '';

        outsideButton = createFocusable('outside');
        outsideButton.focus();

        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it('activates and focuses the first focusable element by default', () => {
        const first = document.createElement('button');
        const second = document.createElement('button');

        container.append(first, second);

        const attachment = focustrap();
        const cleanup = attachment(container);

        expect(document.activeElement).toBe(first);

        cleanup?.();
    });

    it('uses initialFocus selector when provided', () => {
        const first = document.createElement('button');
        const second = document.createElement('button');
        second.className = 'target';

        container.append(first, second);

        const attachment = focustrap({ initialFocus: '.target' });
        const cleanup = attachment(container);

        expect(document.activeElement).toBe(second);

        cleanup?.();
    });

    it('uses initialFocus element when provided', () => {
        const first = document.createElement('button');
        const second = document.createElement('button');

        container.append(first, second);

        const attachment = focustrap({ initialFocus: second });
        const cleanup = attachment(container);

        expect(document.activeElement).toBe(second);

        cleanup?.();
    });

    it('cycles focus forward with Tab', () => {
        const first = document.createElement('button');
        const last = document.createElement('button');

        container.append(first, last);
        const attachment = focustrap();
        const cleanup = attachment(container);

        last.focus();
        pressTab();

        expect(document.activeElement).toBe(first);

        cleanup?.();
    });

    it('cycles focus backward with Shift+Tab', () => {
        const first = document.createElement('button');
        const last = document.createElement('button');

        container.append(first, last);
        const attachment = focustrap();
        const cleanup = attachment(container);

        first.focus();
        pressTab({ shift: true });

        expect(document.activeElement).toBe(last);

        cleanup?.();
    });

    it('prevents focus from leaving when only one focusable element exists', () => {
        const only = document.createElement('button');
        container.appendChild(only);

        const attachment = focustrap();
        const cleanup = attachment(container);

        only.focus();
        pressTab();

        expect(document.activeElement).toBe(only);

        cleanup?.();
    });

    it('prevents Tab when no focusable elements exist', () => {
        const preventDefault = vi.fn();

        const attachment = focustrap();
        const cleanup = attachment(container);

        const event = new KeyboardEvent('keydown', { key: 'Tab' });
        Object.defineProperty(event, 'preventDefault', { value: preventDefault });

        document.dispatchEvent(event);

        expect(preventDefault).toHaveBeenCalled();

        cleanup?.();
    });

    it('restores focus on deactivate when returnFocus is true', () => {
        const button = document.createElement('button');
        container.appendChild(button);

        const attachment = focustrap();
        const cleanup = attachment(container);

        expect(document.activeElement).toBe(button);

        cleanup?.();

        expect(document.activeElement).toBe(outsideButton);
    });

    it('does not activate when enabled is false', () => {
        const button = document.createElement('button');
        container.appendChild(button);

        const attachment = focustrap({ enabled: false });
        const cleanup = attachment(container);

        expect(document.activeElement).toBe(outsideButton);

        cleanup?.();
    });
});
