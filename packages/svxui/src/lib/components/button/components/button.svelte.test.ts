import {
    Button,
    type Align,
    type ButtonSize,
    type ButtonVariant,
    type Color,
    type Radius,
    type TextTransform
} from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Button component', () => {
    const label = 'button';
    const children = createRawSnippet(() => ({
        render: () => label
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders default button', async () => {
            const screen = renderWithWrapper(Button, { children });
            const button = screen.getByText(label);

            await expect.element(button).toBeVisible();
            await expect.element(button).toHaveClass('button');
            await expect.element(button).toHaveClass('button-size-2');
            await expect.element(button).toHaveClass('button-variant-solid');
            await expect.element(button).toHaveClass('button-align-center');
            await expect.element(button).not.toHaveClass('button-disabled');
            await expect.element(button).not.toHaveClass('button-full-width');
            await expect.element(button).not.toHaveClass('button-active');
            await expect.element(button).not.toHaveClass('button-link');
            await expect.element(button).not.toHaveClass('button-icon-only');

            await expect.element(button).not.toHaveAttribute('data-color');
            await expect.element(button).not.toHaveAttribute('data-radius');
            await expect.element(button).not.toHaveAttribute('aria-pressed');
            await expect.element(button).not.toHaveAttribute('aria-disabled');
        });

        test('renders as anchor when a is "a" is provided', async () => {
            const screen = renderWithWrapper(Button, {
                children,
                as: 'a',
                href: '/test'
            });

            const link = screen.getByText(label);

            expect(link.element().tagName).toBe('A');
            await expect.element(link).toHaveClass('button-link');
            await expect.element(link).toHaveAttribute('role', 'link');
            await expect.element(link).toHaveAttribute('tabindex', '0');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Button, {});

            expect(container.querySelector('button')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Button, {
                children,
                id: 'my-button',
                'data-testid': 'button'
            });
            const button = screen.getByText(label);

            await expect.element(button).toHaveAttribute('id', 'my-button');
            await expect.element(button).toHaveAttribute('data-testid', 'button');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3', '4'] as ButtonSize[])('applies size %s', async (size) => {
            const screen = renderWithWrapper(Button, { children, size });
            const button = screen.getByText(label);

            await expect.element(button).toHaveClass(`button-size-${size}`);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                             */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const screen = renderWithWrapper(Button, { children, color });
                const button = screen.getByText(label);

                await expect.element(button).toHaveAttribute('data-color', color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const screen = renderWithWrapper(Button, { children });
            const button = screen.getByText(label);

            await expect.element(button).not.toHaveAttribute('data-color');
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                             */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const screen = renderWithWrapper(Button, { children, radius });
                const button = screen.getByText(label);

                await expect.element(button).toHaveAttribute('data-radius', radius);
            }
        );

        test('does not set data-radius when radius is undefined', async () => {
            const screen = renderWithWrapper(Button, { children });
            const button = screen.getByText(label);

            await expect.element(button).not.toHaveAttribute('data-radius');
        });
    });

    /* ------------------------------------------------- */
    /* Variants                                          */
    /* ------------------------------------------------- */

    describe('Variants', () => {
        test.each(['solid', 'soft', 'outline', 'clear'] as ButtonVariant[])(
            'applies variant %s',
            async (variant) => {
                const screen = renderWithWrapper(Button, { children, variant });
                const button = screen.getByText(label);

                await expect.element(button).toHaveClass(`button-variant-${variant}`);
            }
        );
    });

    /* ------------------------------------------------- */
    /* States                                            */
    /* ------------------------------------------------- */

    describe('States', () => {
        test('applies active state', async () => {
            const screen = renderWithWrapper(Button, { children, active: true });
            const button = screen.getByText(label);

            await expect.element(button).toHaveClass('button-active');
            await expect.element(button).toHaveAttribute('aria-pressed', 'true');
        });

        test('applies disabled state', async () => {
            const screen = renderWithWrapper(Button, { children, disabled: true });
            const button = screen.getByText(label);

            await expect.element(button).toHaveClass('button-disabled');
            await expect.element(button).toHaveAttribute('aria-disabled', 'true');
        });
    });

    /* ------------------------------------------------- */
    /* Layout & behavior                                 */
    /* ------------------------------------------------- */

    describe('Layout modifiers', () => {
        test('applies iconOnly', async () => {
            const screen = renderWithWrapper(Button, { children, iconOnly: true });
            const button = screen.getByText(label);

            await expect.element(button).toHaveClass('button-icon-only');
        });

        test('applies fullWidth', async () => {
            const screen = renderWithWrapper(Button, { children, fullWidth: true });
            const button = screen.getByText(label);

            await expect.element(button).toHaveClass('button-full-width');
        });

        test.each(['start', 'center', 'end'] as Align[])('applies alignment %s', async (align) => {
            const screen = renderWithWrapper(Button, { children, align });
            const button = screen.getByText(label);

            await expect.element(button).toHaveClass(`button-align-${align}`);
        });
    });

    /* ------------------------------------------------- */
    /* Transform                                         */
    /* ------------------------------------------------- */

    describe('Text transform', () => {
        test.each(['lowercase', 'uppercase', 'capitalize'] as TextTransform[])(
            'applies transform %s',
            async (transform) => {
                const screen = renderWithWrapper(Button, { children, transform });
                const button = screen.getByText(label);

                await expect.element(button).toHaveClass(`button-transform-${transform}`);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class', async () => {
            const screen = renderWithWrapper(Button, {
                children,
                class: 'custom-class'
            });

            const button = screen.getByText(label);

            await expect.element(button).toHaveClass('button');
            await expect.element(button).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding.                                      */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref asHTMLButtonElement correctly', async () => {
            let current: HTMLButtonElement | undefined;

            renderWithWrapper(Button, {
                children,
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLButtonElement);
            expect(current?.textContent).toBe(label);
        });

        test('binds ref as HTMLAnchorElement correctly', async () => {
            let current: HTMLAnchorElement | undefined;

            renderWithWrapper(Button, {
                children,
                as: 'a',
                href: '#',
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLAnchorElement);
            expect(current?.textContent).toBe(label);
        });
    });
});
