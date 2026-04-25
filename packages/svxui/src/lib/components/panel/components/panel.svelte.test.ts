import { Panel, type Color, type LayoutSpacing, type PanelVariant, type Radius } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Panel component', () => {
    const content = 'Panel content';
    const children = createRawSnippet(() => ({
        render: () => content
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Panel, { children });
            const panel = screen.getByText(content);

            await expect.element(panel).toBeVisible();
            await expect.element(panel).toHaveClass('panel');
            await expect.element(panel).toHaveClass('panel-variant-solid');
            await expect.element(panel).not.toHaveClass('panel-outline');
            await expect.element(panel).not.toHaveClass('panel-full-width');
            await expect.element(panel).not.toHaveClass('panel-button');
            await expect.element(panel).not.toHaveClass('panel-link');
            await expect.element(panel).not.toHaveClass('panel-label');

            await expect.element(panel).not.toHaveAttribute('data-color');
            await expect.element(panel).not.toHaveAttribute('data-radius');
            await expect.element(panel).not.toHaveAttribute('disabled');
            await expect.element(panel).not.toHaveAttribute('aria-disabled');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Panel, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Panel, {
                children,
                id: 'my-panel',
                'data-testid': 'panel'
            });
            const panel = screen.getByText(content);

            await expect.element(panel).toHaveAttribute('id', 'my-panel');
            await expect.element(panel).toHaveAttribute('data-testid', 'panel');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each([
            { as: 'div', expectedClass: null },
            { as: 'section', expectedClass: null },
            { as: 'article', expectedClass: null },
            { as: 'button', expectedClass: 'panel-button' },
            { as: 'a', expectedClass: 'panel-link' },
            { as: 'label', expectedClass: 'panel-label' }
        ] as const)('renders as $as', async ({ as, expectedClass }) => {
            // @ts-expect-error prevent too complex union error
            const screen = renderWithWrapper(Panel, { children, as });
            const panel = screen.getByText(content);

            expect(panel.element().tagName).toBe(as.toUpperCase());

            if (expectedClass) {
                await expect.element(panel).toHaveClass(expectedClass);
            }
        });

        test('renders button and applies disabled attribute', async () => {
            const screen = renderWithWrapper(Panel, { as: 'button', disabled: true, children });
            const panel = screen.getByText(content);

            await expect.element(panel).toHaveAttribute('disabled');
            await expect.element(panel).toHaveAttribute('aria-disabled', 'true');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Spacing', () => {
        test.each(['1', '2', '3', '4', '5'] as LayoutSpacing[])(
            'applies padding p=%s via inline style',
            async (p) => {
                const screen = renderWithWrapper(Panel, { children, p });
                const panel = screen.getByText(content);

                await expect.element(panel).toHaveStyle({ padding: `var(--space-${p})` });
            }
        );
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const screen = renderWithWrapper(Panel, { children, color });
                const panel = screen.getByText(content);

                await expect.element(panel).toHaveAttribute('data-color', color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const screen = renderWithWrapper(Panel, { children });
            const panel = screen.getByText(content);

            await expect.element(panel).not.toHaveAttribute('data-color');
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const screen = renderWithWrapper(Panel, { children, radius });
                const panel = screen.getByText(content);

                await expect.element(panel).toHaveAttribute('data-radius', radius);
            }
        );

        test('does not set data-radius when color is undefined', async () => {
            const screen = renderWithWrapper(Panel, { children });
            const panel = screen.getByText(content);

            await expect.element(panel).not.toHaveAttribute('data-radius');
        });
    });

    /* ------------------------------------------------- */
    /* Variants                                          */
    /* ------------------------------------------------- */

    describe('Variants', () => {
        test.each(['solid', 'soft', 'ghost'] as PanelVariant[])('applies variant %s', async (variant) => {
            const screen = renderWithWrapper(Panel, { children, variant });
            const panel = screen.getByText(content);

            await expect.element(panel).toHaveClass(`panel-variant-${variant}`);
        });
    });

    /* ------------------------------------------------- */
    /* Layout                                            */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test('applies fullWidth', async () => {
            const screen = renderWithWrapper(Panel, { children, fullWidth: true });
            const panel = screen.getByText(content);

            await expect.element(panel).toHaveClass('panel-full-width');
        });
    });

    /* ------------------------------------------------- */
    /* Outline                                           */
    /* ------------------------------------------------- */

    describe('Outline', () => {
        test('applies outline', async () => {
            const screen = renderWithWrapper(Panel, { children, outline: true });
            const panel = screen.getByText(content);

            await expect.element(panel).toHaveClass('panel-outline');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const screen = renderWithWrapper(Panel, { children, class: 'custom-class' });
            const panel = screen.getByText(content);

            await expect.element(panel).toHaveClass('panel');
            await expect.element(panel).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Panel, {
                children,
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLDivElement);
        });

        test('binds ref as HTMLButtonElement when as="button"', async () => {
            let current: HTMLButtonElement | undefined;

            renderWithWrapper(Panel, {
                children,
                as: 'button',
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLButtonElement);
        });
    });
});
