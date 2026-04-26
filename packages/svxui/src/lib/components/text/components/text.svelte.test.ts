import {
    Text,
    type Align,
    type Color,
    type TextSize,
    type TextTransform,
    type TextWeight,
    type TextWrap
} from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Text component', () => {
    const label = 'text content';
    const children = createRawSnippet(() => ({
        render: () => label
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).toBeVisible();
            await expect.element(text).toHaveClass('text');
            await expect.element(text).toHaveClass('text-size-3');
            await expect.element(text).toHaveClass('text-weight-regular');
            await expect.element(text).toHaveClass('text-align-start');
            await expect.element(text).toHaveClass('text-underline-none');
            await expect.element(text).not.toHaveClass('text-truncate');
            await expect.element(text).not.toHaveClass('text-muted');
            await expect.element(text).not.toHaveClass('text-disabled');
            await expect.element(text).not.toHaveClass('text-link');
            await expect.element(text).not.toHaveClass('text-heading');

            await expect.element(text).not.toHaveAttribute('data-color');
            await expect.element(text).not.toHaveAttribute('aria-disabled');
        });

        test('renders as a span element by default', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            expect(text.element().tagName).toBe('SPAN');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Text, {});

            expect(container.querySelector('span')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Text, {
                children,
                id: 'my-text',
                'data-testid': 'text'
            });
            const text = screen.getByText(label);

            await expect.element(text).toHaveAttribute('id', 'my-text');
            await expect.element(text).toHaveAttribute('data-testid', 'text');
        });
    });

    /* ------------------------------------------------- */
    /* As prop                                           */
    /* ------------------------------------------------- */

    describe('As prop', () => {
        test.each(['span', 'p', 'div', 'label', 'em', 'strong'] as const)(
            'renders as %s element',
            async (tag) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const screen = renderWithWrapper<any>(Text, { children, as: tag });
                const text = screen.getByText(label);

                expect(text.element().tagName).toBe(tag.toUpperCase());
            }
        );

        test.each(['a'] as const)('adds text-link class when rendered as anchor', async (tag) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const screen = renderWithWrapper<any>(Text, { children, as: tag });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass('text-link');
        });

        test.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
            'adds text-heading class when rendered as %s',
            async (tag) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const screen = renderWithWrapper<any>(Text, { children, as: tag });
                const text = screen.getByText(label);

                await expect.element(text).toHaveClass('text-heading');
                expect(text.element().tagName).toBe(tag.toUpperCase());
            }
        );
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3', '4', '5', '6', '7', '8', '9'] as TextSize[])(
            'applies size %s',
            async (size) => {
                const screen = renderWithWrapper(Text, { children, size });
                const text = screen.getByText(label);

                await expect.element(text).toHaveClass(`text-size-${size}`);
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
                const screen = renderWithWrapper(Text, { children, color });
                const text = screen.getByText(label);

                await expect.element(text).toHaveAttribute('data-color', color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).not.toHaveAttribute('data-color');
        });
    });

    /* ------------------------------------------------- */
    /* Weight                                            */
    /* ------------------------------------------------- */

    describe('Weight', () => {
        test.each(['light', 'regular', 'medium', 'bold'] as TextWeight[])(
            'applies weight %s',
            async (weight) => {
                const screen = renderWithWrapper(Text, { children, weight });
                const text = screen.getByText(label);

                await expect.element(text).toHaveClass(`text-weight-${weight}`);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Transform                                         */
    /* ------------------------------------------------- */

    describe('Transform', () => {
        test.each(['lowercase', 'uppercase', 'capitalize'] as TextTransform[])(
            'applies transform %s',
            async (transform) => {
                const screen = renderWithWrapper(Text, { children, transform });
                const text = screen.getByText(label);

                await expect.element(text).toHaveClass(`text-transform-${transform}`);
            }
        );

        test('does not set transform class when transform is undefined', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).not.toHaveClass('text-transform-lowercase');
            await expect.element(text).not.toHaveClass('text-transform-uppercase');
            await expect.element(text).not.toHaveClass('text-transform-capitalize');
        });
    });

    /* ------------------------------------------------- */
    /* Alignment                                         */
    /* ------------------------------------------------- */

    describe('Alignment', () => {
        test.each(['start', 'center', 'end'] as Align[])('applies alignment %s', async (align) => {
            const screen = renderWithWrapper(Text, { children, align });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass(`text-align-${align}`);
        });
    });

    /* ------------------------------------------------- */
    /* Wrap                                              */
    /* ------------------------------------------------- */

    describe('Wrap', () => {
        test.each(['wrap', 'nowrap', 'pretty', 'balance'] as TextWrap[])('applies wrap %s', async (wrap) => {
            const screen = renderWithWrapper(Text, { children, wrap });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass(`text-wrap-${wrap}`);
        });

        test('does not set wrap class when wrap is undefined', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).not.toHaveClass('text-wrap-wrap');
            await expect.element(text).not.toHaveClass('text-wrap-nowrap');
        });
    });

    /* ------------------------------------------------- */
    /* Underline                                         */
    /* ------------------------------------------------- */

    describe('Underline', () => {
        test.each(['auto', 'always', 'hover', 'none'] as const)('applies underline %s', async (underline) => {
            const screen = renderWithWrapper(Text, { children, underline });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass(`text-underline-${underline}`);
        });
    });

    /* ------------------------------------------------- */
    /* States                                            */
    /* ------------------------------------------------- */

    describe('States', () => {
        test('applies truncate', async () => {
            const screen = renderWithWrapper(Text, { children, truncate: true });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass('text-truncate');
        });

        test('does not apply truncate by default', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).not.toHaveClass('text-truncate');
        });

        test('applies muted state', async () => {
            const screen = renderWithWrapper(Text, { children, muted: true });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass('text-muted');
        });

        test('does not apply muted state by default', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).not.toHaveClass('text-muted');
        });

        test('applies disabled state', async () => {
            const screen = renderWithWrapper(Text, { children, disabled: true });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass('text-disabled');
            await expect.element(text).toHaveAttribute('aria-disabled', 'true');
        });

        test('does not apply disabled state by default', async () => {
            const screen = renderWithWrapper(Text, { children });
            const text = screen.getByText(label);

            await expect.element(text).not.toHaveClass('text-disabled');
            await expect.element(text).not.toHaveAttribute('aria-disabled');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const screen = renderWithWrapper(Text, { children, class: 'custom-class' });
            const text = screen.getByText(label);

            await expect.element(text).toHaveClass('text');
            await expect.element(text).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLSpanElement | undefined;

            renderWithWrapper(Text, {
                children,
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLSpanElement);
            expect(current?.textContent).toBe(label);
        });
    });
});
