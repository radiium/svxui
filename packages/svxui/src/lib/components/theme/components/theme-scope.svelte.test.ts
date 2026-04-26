import { ThemeScope, type ThemeContext } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

/**
 * ThemeScope must be a descendant of ThemeProvider.
 * `renderWithWrapper` uses TestWrapper (wrapper.svelte) which already mounts
 * a ThemeProvider with defaults: mode='system', color='neutral', radius='medium'.
 * ThemeScope inherits from it when no props are explicitly provided.
 */

describe('ThemeScope component', () => {
    const selector = '[data-theme-scope]';

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders as a div element', async () => {
            const { container } = renderWithWrapper(ThemeScope, {});
            const scope = container.querySelector(selector);

            expect(scope).not.toBeNull();
            expect(scope?.tagName).toBe('DIV');
        });

        test('has data-theme-scope attribute', async () => {
            const { container } = renderWithWrapper(ThemeScope, {});
            const scope = container.querySelector(selector);

            expect(scope?.hasAttribute('data-theme-scope')).toBe(true);
        });

        test('has data-theme attribute (light or dark)', async () => {
            const { container } = renderWithWrapper(ThemeScope, {});
            const scope = container.querySelector(selector);
            const theme = scope?.getAttribute('data-theme');

            expect(['light', 'dark']).toContain(theme);
        });

        test('inherits data-color from parent ThemeProvider', async () => {
            const { container } = renderWithWrapper(ThemeScope, {});
            const scope = container.querySelector(selector);

            // wrapper.svelte's ThemeProvider defaults to color='neutral'
            expect(scope?.getAttribute('data-color')).toBe('neutral');
        });

        test('inherits data-radius from parent ThemeProvider', async () => {
            const { container } = renderWithWrapper(ThemeScope, {});
            const scope = container.querySelector(selector);

            // wrapper.svelte's ThemeProvider defaults to radius='medium'
            expect(scope?.getAttribute('data-radius')).toBe('medium');
        });

        test('has data-has-background by default', async () => {
            const { container } = renderWithWrapper(ThemeScope, {});
            const scope = container.querySelector(selector);

            expect(scope?.hasAttribute('data-has-background')).toBe(true);
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(ThemeScope, {
                id: 'my-scope',
                'data-testid': 'theme-scope'
            });
            const scope = container.querySelector(selector);

            expect(scope?.getAttribute('id')).toBe('my-scope');
            expect(scope?.getAttribute('data-testid')).toBe('theme-scope');
        });

        test('renders children', async () => {
            const label = 'scope content';
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const children = createRawSnippet<[ThemeContext]>((_getCtx) => ({
                render: () => `<span>${label}</span>`
            }));

            const { container } = renderWithWrapper(ThemeScope, { children });
            const scope = container.querySelector(selector);

            expect(scope?.textContent).toBe(label);
        });
    });

    /* ------------------------------------------------- */
    /* Mode override                                     */
    /* ------------------------------------------------- */

    describe('Mode override', () => {
        test("mode='light' resolves to data-theme='light'", async () => {
            const { container } = renderWithWrapper(ThemeScope, { mode: 'light' });
            const scope = container.querySelector(selector);

            expect(scope?.getAttribute('data-theme')).toBe('light');
        });

        test("mode='dark' resolves to data-theme='dark'", async () => {
            const { container } = renderWithWrapper(ThemeScope, { mode: 'dark' });
            const scope = container.querySelector(selector);

            expect(scope?.getAttribute('data-theme')).toBe('dark');
        });
    });

    /* ------------------------------------------------- */
    /* Color override                                    */
    /* ------------------------------------------------- */

    describe('Color override', () => {
        test.each(['blue', 'green', 'red', 'orange', 'yellow'] as const)(
            'color=%s overrides parent color',
            async (color) => {
                const { container } = renderWithWrapper(ThemeScope, { color });
                const scope = container.querySelector(selector);

                expect(scope?.getAttribute('data-color')).toBe(color);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Radius override                                   */
    /* ------------------------------------------------- */

    describe('Radius override', () => {
        test.each(['none', 'small', 'large', 'full'] as const)(
            'radius=%s overrides parent radius',
            async (radius) => {
                const { container } = renderWithWrapper(ThemeScope, { radius });
                const scope = container.querySelector(selector);

                expect(scope?.getAttribute('data-radius')).toBe(radius);
            }
        );
    });

    /* ------------------------------------------------- */
    /* hasBackground                                     */
    /* ------------------------------------------------- */

    describe('hasBackground', () => {
        test('removes data-has-background when hasBackground=false', async () => {
            const { container } = renderWithWrapper(ThemeScope, { hasBackground: false });
            const scope = container.querySelector(selector);

            expect(scope?.hasAttribute('data-has-background')).toBe(false);
        });

        test('keeps data-has-background when hasBackground=true', async () => {
            const { container } = renderWithWrapper(ThemeScope, { hasBackground: true });
            const scope = container.querySelector(selector);

            expect(scope?.hasAttribute('data-has-background')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Children context                                  */
    /* ------------------------------------------------- */

    describe('Children context', () => {
        test('passes mode to children context', async () => {
            let capturedCtx: ThemeContext | undefined;

            const children = createRawSnippet<[ThemeContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            renderWithWrapper(ThemeScope, { mode: 'dark', children });

            expect(capturedCtx?.mode).toBe('dark');
        });

        test('passes resolved theme to children context', async () => {
            let capturedCtx: ThemeContext | undefined;

            const children = createRawSnippet<[ThemeContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            renderWithWrapper(ThemeScope, { mode: 'light', children });

            expect(capturedCtx?.theme).toBe('light');
        });

        test('passes overridden color to children context', async () => {
            let capturedCtx: ThemeContext | undefined;

            const children = createRawSnippet<[ThemeContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            renderWithWrapper(ThemeScope, { color: 'violet', children });

            expect(capturedCtx?.color).toBe('violet');
        });

        test('passes overridden radius to children context', async () => {
            let capturedCtx: ThemeContext | undefined;

            const children = createRawSnippet<[ThemeContext]>((getCtx) => {
                capturedCtx = getCtx();
                return { render: () => `<div>content</div>` };
            });

            renderWithWrapper(ThemeScope, { radius: 'full', children });

            expect(capturedCtx?.radius).toBe('full');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with theme class', async () => {
            const { container } = renderWithWrapper(ThemeScope, { class: 'custom-class' });
            const scope = container.querySelector(selector);

            expect(scope?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(ThemeScope, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLDivElement);
            expect(current?.hasAttribute('data-theme-scope')).toBe(true);
        });
    });
});
