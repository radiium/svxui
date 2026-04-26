import { ThemeProvider, type ThemeRootContext } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';

/**
 * ThemeProvider cannot be tested with `renderWithWrapper` because the
 * TestWrapper already mounts a ThemeProvider — nesting a second one would
 * throw "ThemeProvider can only be used once at the root level."
 *
 * Instead we use `render` from vitest-browser-svelte directly.
 * Side effects on <html> are cleaned up in afterEach.
 */

const html = document.documentElement;

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    html.removeAttribute('data-theme-root');
    html.removeAttribute('data-theme');
    html.removeAttribute('data-color');
    html.removeAttribute('data-radius');
    html.classList.remove('light', 'dark');
    html.style.colorScheme = '';
});

describe('ThemeProvider component', () => {
    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders children', async () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const children = createRawSnippet<[ThemeRootContext]>((_getCtx) => ({
                render: () => `<div class="tp-child">content</div>`
            }));

            const { container } = render(ThemeProvider, { script: false, children });

            expect(container.querySelector('.tp-child')).not.toBeNull();
        });

        test('renders without children without error', async () => {
            expect(() => render(ThemeProvider, { script: false })).not.toThrow();
        });

        test('sets data-theme-root on <html>', async () => {
            render(ThemeProvider, { script: false, mode: 'light' });

            expect(html.hasAttribute('data-theme-root')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Mode → resolved theme                             */
    /* ------------------------------------------------- */

    describe('Mode resolution', () => {
        test("mode='light' sets data-theme='light' on <html>", async () => {
            render(ThemeProvider, { script: false, mode: 'light' });

            expect(html.getAttribute('data-theme')).toBe('light');
        });

        test("mode='dark' sets data-theme='dark' on <html>", async () => {
            render(ThemeProvider, { script: false, mode: 'dark' });

            expect(html.getAttribute('data-theme')).toBe('dark');
        });

        test("mode='light' adds 'light' class to <html>", async () => {
            render(ThemeProvider, { script: false, mode: 'light' });

            expect(html.classList.contains('light')).toBe(true);
            expect(html.classList.contains('dark')).toBe(false);
        });

        test("mode='dark' adds 'dark' class to <html>", async () => {
            render(ThemeProvider, { script: false, mode: 'dark' });

            expect(html.classList.contains('dark')).toBe(true);
            expect(html.classList.contains('light')).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Color                                             */
    /* ------------------------------------------------- */

    describe('Color', () => {
        test('sets data-color on <html>', async () => {
            render(ThemeProvider, { script: false, mode: 'light', color: 'blue' });

            expect(html.getAttribute('data-color')).toBe('blue');
        });

        test("defaults to 'neutral' when color is not provided", async () => {
            render(ThemeProvider, { script: false, mode: 'light' });

            expect(html.getAttribute('data-color')).toBe('neutral');
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test('sets data-radius on <html>', async () => {
            render(ThemeProvider, { script: false, mode: 'light', radius: 'large' });

            expect(html.getAttribute('data-radius')).toBe('large');
        });

        test("defaults to 'medium' when radius is not provided", async () => {
            render(ThemeProvider, { script: false, mode: 'light' });

            expect(html.getAttribute('data-radius')).toBe('medium');
        });
    });

    /* ------------------------------------------------- */
    /* ThemeRootContext passed to children               */
    /* ------------------------------------------------- */

    describe('Children context', () => {
        test('passes mode to children context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, mode: 'light', children });

            expect(capturedCtx?.mode).toBe('light');
        });

        test('passes resolved theme to children context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, mode: 'dark', children });

            expect(capturedCtx?.theme).toBe('dark');
        });

        test('passes color to children context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, mode: 'light', color: 'green', children });

            expect(capturedCtx?.color).toBe('green');
        });

        test('passes radius to children context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, mode: 'light', radius: 'small', children });

            expect(capturedCtx?.radius).toBe('small');
        });

        test('exposes setMode on context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, mode: 'light', children });

            expect(typeof capturedCtx?.setMode).toBe('function');
        });

        test('exposes setColor on context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, children });

            expect(typeof capturedCtx?.setColor).toBe('function');
        });

        test('exposes setRadius on context', async () => {
            let capturedCtx: ThemeRootContext | undefined;

            const children = createRawSnippet<[ThemeRootContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            render(ThemeProvider, { script: false, children });

            expect(typeof capturedCtx?.setRadius).toBe('function');
        });
    });

    /* ------------------------------------------------- */
    /* Custom storage keys                               */
    /* ------------------------------------------------- */

    describe('Custom storage keys', () => {
        test('uses custom mode storage key', async () => {
            const modeKey = 'test-mode-key';
            render(ThemeProvider, {
                script: false,
                mode: 'dark',
                storage: { modeKey }
            });

            expect(localStorage.getItem(modeKey)).toBe('dark');
        });

        test('uses custom color storage key', async () => {
            const colorKey = 'test-color-key';
            render(ThemeProvider, {
                script: false,
                color: 'red',
                storage: { colorKey }
            });

            expect(localStorage.getItem(colorKey)).toBe('red');
        });

        test('uses custom radius storage key', async () => {
            const radiusKey = 'test-radius-key';
            render(ThemeProvider, {
                script: false,
                radius: 'full',
                storage: { radiusKey }
            });

            expect(localStorage.getItem(radiusKey)).toBe('full');
        });
    });
});
