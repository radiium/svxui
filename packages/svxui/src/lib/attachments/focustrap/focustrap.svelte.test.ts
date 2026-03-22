import { beforeEach, describe, expect, it, vi } from 'vitest';
import { focustrap } from './focustrap.svelte.ts';

function createFocusable(id: string) {
    const el = document.createElement('button');
    el.id = id;
    el.textContent = id;
    document.body.appendChild(el);
    return el;
}

function pressTab(target: HTMLElement, options: { shift?: boolean } = {}) {
    const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: options.shift ?? false,
        bubbles: true
    });
    target.dispatchEvent(event);
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

    it('activates and focuses the first focusable element by default', async () => {
        const first = document.createElement('button');
        const second = document.createElement('button');

        container.append(first, second);

        const attachment = focustrap();
        const cleanup = attachment(container);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        expect(document.activeElement).toStrictEqual(first);

        cleanup?.();
    });

    it('uses initialFocus selector when provided', async () => {
        const first = document.createElement('button');
        const second = document.createElement('button');
        second.className = 'target';

        container.append(first, second);

        const attachment = focustrap({ initialFocus: '.target' });
        const cleanup = attachment(container);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        expect(document.activeElement).toStrictEqual(second);

        cleanup?.();
    });

    it('uses initialFocus element when provided', async () => {
        const first = document.createElement('button');
        const second = document.createElement('button');

        container.append(first, second);

        const attachment = focustrap({ initialFocus: second });
        const cleanup = attachment(container);

        await new Promise((resolve) => requestAnimationFrame(resolve));

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
        pressTab(last);

        expect(document.activeElement).toStrictEqual(first);

        cleanup?.();
    });

    it('cycles focus backward with Shift+Tab', () => {
        const first = document.createElement('button');
        const last = document.createElement('button');

        container.append(first, last);
        const attachment = focustrap();
        const cleanup = attachment(container);

        first.focus();
        pressTab(first, { shift: true });

        expect(document.activeElement).toStrictEqual(last);

        cleanup?.();
    });

    it('prevents focus from leaving when only one focusable element exists', () => {
        const only = document.createElement('button');
        container.appendChild(only);

        const attachment = focustrap();
        const cleanup = attachment(container);

        only.focus();
        pressTab(only);

        expect(document.activeElement).toStrictEqual(only);

        cleanup?.();
    });

    it('prevents Tab when no focusable elements exist', () => {
        const preventDefault = vi.fn();

        const attachment = focustrap();
        const cleanup = attachment(container);

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
        Object.defineProperty(event, 'preventDefault', { value: preventDefault });

        container.dispatchEvent(event);

        expect(preventDefault).toHaveBeenCalled();

        cleanup?.();
    });

    it('does not activate when enabled is false', async () => {
        const button = document.createElement('button');
        container.appendChild(button);

        const attachment = focustrap({ enabled: false });
        const cleanup = attachment(container);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        expect(document.activeElement).toStrictEqual(outsideButton);

        cleanup?.();
    });
});
