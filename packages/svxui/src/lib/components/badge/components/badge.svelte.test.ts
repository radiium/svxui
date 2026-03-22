import { Badge, type BadgeSize, type BadgeVariant, type Color, type Radius } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Badge component', () => {
    const label = 'badge';
    const children = createRawSnippet(() => ({
        render: () => label
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Badge, { children });
            const badge = screen.getByText(label);

            await expect.element(badge).toBeVisible();
            await expect.element(badge).toHaveClass('badge');
            await expect.element(badge).toHaveClass('badge-variant-solid');
            await expect.element(badge).toHaveClass('badge-size-2');
            await expect.element(badge).not.toHaveClass('badge-disabled');

            await expect.element(badge).not.toHaveAttribute('data-color');
            await expect.element(badge).not.toHaveAttribute('data-radius');
            await expect.element(badge).not.toHaveAttribute('aria-disabled');
        });

        test('renders as a span element', async () => {
            const screen = renderWithWrapper(Badge, { children });
            const badge = screen.getByText(label);

            expect(badge.element().tagName).toBe('SPAN');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Badge, {});

            expect(container.querySelector('span')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Badge, {
                children,
                id: 'my-badge',
                'data-testid': 'badge'
            });
            const badge = screen.getByText(label);

            await expect.element(badge).toHaveAttribute('id', 'my-badge');
            await expect.element(badge).toHaveAttribute('data-testid', 'badge');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as BadgeSize[])('applies size %s', async (size) => {
            const screen = renderWithWrapper(Badge, { children, size });
            const badge = screen.getByText(label);

            await expect.element(badge).toHaveClass(`badge-size-${size}`);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                             */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const screen = renderWithWrapper(Badge, { children, color });
                const badge = screen.getByText(label);

                await expect.element(badge).toHaveAttribute('data-color', color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const screen = renderWithWrapper(Badge, { children });
            const badge = screen.getByText(label);

            await expect.element(badge).not.toHaveAttribute('data-color');
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                             */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const screen = renderWithWrapper(Badge, { children, radius });
                const badge = screen.getByText(label);

                await expect.element(badge).toHaveAttribute('data-radius', radius);
            }
        );

        test('does not set data-radius when radius is undefined', async () => {
            const screen = renderWithWrapper(Badge, { children });
            const badge = screen.getByText(label);

            await expect.element(badge).not.toHaveAttribute('data-radius');
        });
    });

    /* ------------------------------------------------- */
    /* Variants                                          */
    /* ------------------------------------------------- */

    describe('Variants', () => {
        test.each(['solid', 'soft', 'outline'] as BadgeVariant[])('applies variant %s', async (variant) => {
            const screen = renderWithWrapper(Badge, { children, variant });
            const badge = screen.getByText(label);

            await expect.element(badge).toHaveClass(`badge-variant-${variant}`);
        });
    });

    /* ------------------------------------------------- */
    /* States                                            */
    /* ------------------------------------------------- */

    describe('States', () => {
        test('applies disabled state', async () => {
            const screen = renderWithWrapper(Badge, { children, disabled: true });
            const badge = screen.getByText(label);

            await expect.element(badge).toHaveClass('badge-disabled');
            await expect.element(badge).toHaveAttribute('aria-disabled', 'true');
        });

        test('does not apply disabled state by default', async () => {
            const screen = renderWithWrapper(Badge, { children });
            const badge = screen.getByText(label);

            await expect.element(badge).not.toHaveClass('badge-disabled');
            await expect.element(badge).not.toHaveAttribute('aria-disabled');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const screen = renderWithWrapper(Badge, { children, class: 'custom-class' });
            const badge = screen.getByText(label);

            await expect.element(badge).toHaveClass('badge');
            await expect.element(badge).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            const ref: { current?: HTMLSpanElement } = { current: undefined };

            renderWithWrapper(Badge, {
                children,
                get ref() {
                    return undefined;
                },
                set ref(r) {
                    ref.current = r;
                }
            });

            await Promise.resolve();

            expect(ref.current).toBeInstanceOf(HTMLSpanElement);
            expect(ref.current?.textContent).toBe(label);
        });
    });
});
