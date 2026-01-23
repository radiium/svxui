import { beforeEach, describe, expect, it } from 'vitest';
import { scrolllock } from './attachment.svelte.js';

describe('scrolllock attachment', () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);

        // reset styles
        element.style.overflow = '';
        element.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
    });

    it('locks scroll on an HTMLElement by default', () => {
        const cleanup = scrolllock()(element);

        expect(element.style.overflow).toBe('hidden');
        expect(element.style.paddingRight).not.toBe('');

        cleanup?.();

        expect(element.style.overflow).toBe('');
        expect(element.style.paddingRight).toBe('');
    });

    it('does not lock scroll when enabled is false', () => {
        const cleanup = scrolllock({ enabled: false })(element);

        expect(element.style.overflow).toBe('');
        expect(element.style.paddingRight).toBe('');

        cleanup?.();
    });

    it('restores original styles on cleanup', () => {
        element.style.overflow = 'auto';
        element.style.paddingRight = '10px';

        const cleanup = scrolllock()(element);

        expect(element.style.overflow).toBe('hidden');

        cleanup?.();

        expect(element.style.overflow).toBe('auto');
        expect(element.style.paddingRight).toBe('10px');
    });

    it('locks scroll on document by targeting documentElement', () => {
        const cleanup = scrolllock()(document);

        const html = document.documentElement;

        expect(html.style.overflow).toBe('hidden');
        expect(html.style.paddingRight).not.toBe('');

        cleanup?.();

        expect(html.style.overflow).toBe('');
        expect(html.style.paddingRight).toBe('');
    });

    it('is idempotent when cleanup is called once', () => {
        const cleanup = scrolllock()(element);

        cleanup?.();
        cleanup?.(); // ne doit pas throw

        expect(element.style.overflow).toBe('');
        expect(element.style.paddingRight).toBe('');
    });
});
