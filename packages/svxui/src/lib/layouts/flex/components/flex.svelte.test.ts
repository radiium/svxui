import {
    Flex,
    type FlexAlign,
    type FlexDirection,
    type FlexDisplay,
    type FlexJustify,
    type FlexWrap
} from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Flex component', () => {
    const content = 'Flex content';
    const children = createRawSnippet(() => ({
        render: () => content
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Flex, { children });
            const flex = screen.getByText(content);

            await expect.element(flex).toBeVisible();
            await expect.element(flex).toHaveClass('flex');
            await expect.element(flex).not.toHaveClass('flex-display');
            await expect.element(flex).not.toHaveClass('flex-direction');
            await expect.element(flex).not.toHaveClass('flex-justify');
            await expect.element(flex).not.toHaveClass('flex-align');
            await expect.element(flex).not.toHaveClass('flex-wrap');
            await expect.element(flex).not.toHaveClass('flex-gap');
        });

        test('renders as div by default', async () => {
            const screen = renderWithWrapper(Flex, { children });
            const flex = screen.getByText(content);

            expect(flex.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Flex, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Flex, {
                children,
                id: 'my-flex',
                'data-testid': 'flex'
            });
            const flex = screen.getByText(content);

            await expect.element(flex).toHaveAttribute('id', 'my-flex');
            await expect.element(flex).toHaveAttribute('data-testid', 'flex');
        });

        test('merges custom class', async () => {
            const screen = renderWithWrapper(Flex, { children, class: 'custom-class' });
            const flex = screen.getByText(content);

            await expect.element(flex).toHaveClass('flex');
            await expect.element(flex).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each(['div', 'section', 'article', 'nav', 'ul', 'li'] as const)('renders as %s', async (tag) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const screen = renderWithWrapper<any>(Flex, { children, as: tag });
            const flex = screen.getByText(content);

            expect(flex.element().tagName).toBe(tag.toUpperCase());
        });
    });

    /* ------------------------------------------------- */
    /* Display                                           */
    /* ------------------------------------------------- */

    describe('Display', () => {
        test('does not add flex-display class when display=flex (default)', async () => {
            const screen = renderWithWrapper(Flex, { children, display: 'flex' });
            const flex = screen.getByText(content);

            await expect.element(flex).not.toHaveClass('flex-display');
        });

        test.each(['inline-flex', 'none'] as FlexDisplay[])(
            'adds flex-display class and CSS var when display=%s',
            async (display) => {
                const screen = renderWithWrapper(Flex, { children, display });
                const flex = screen.getByText(content);

                await expect.element(flex).toHaveClass('flex-display');
                expect(flex.element().style.getPropertyValue('--flex-display')).toBe(display);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Direction                                         */
    /* ------------------------------------------------- */

    describe('Direction', () => {
        test.each(['row', 'column', 'row-reverse', 'column-reverse'] as FlexDirection[])(
            'adds flex-direction class and CSS var when direction=%s',
            async (direction) => {
                const screen = renderWithWrapper(Flex, { children, direction });
                const flex = screen.getByText(content);

                await expect.element(flex).toHaveClass('flex-direction');
                expect(flex.element().style.getPropertyValue('--flex-direction')).toBe(direction);
            }
        );

        test('does not add flex-direction class when direction is not set', async () => {
            const screen = renderWithWrapper(Flex, { children });
            const flex = screen.getByText(content);

            await expect.element(flex).not.toHaveClass('flex-direction');
        });
    });

    /* ------------------------------------------------- */
    /* Justify                                           */
    /* ------------------------------------------------- */

    describe('Justify', () => {
        test.each([
            { justify: 'start', expected: 'flex-start' },
            { justify: 'end', expected: 'flex-end' },
            { justify: 'center', expected: 'center' },
            { justify: 'between', expected: 'space-between' },
            { justify: 'around', expected: 'space-around' },
            { justify: 'evenly', expected: 'space-evenly' }
        ] as { justify: FlexJustify; expected: string }[])(
            'maps justify=$justify to $expected CSS value',
            async ({ justify, expected }) => {
                const screen = renderWithWrapper(Flex, { children, justify });
                const flex = screen.getByText(content);

                await expect.element(flex).toHaveClass('flex-justify');
                expect(flex.element().style.getPropertyValue('--flex-justify')).toBe(expected);
            }
        );

        test('does not add flex-justify class when justify is not set', async () => {
            const screen = renderWithWrapper(Flex, { children });
            const flex = screen.getByText(content);

            await expect.element(flex).not.toHaveClass('flex-justify');
        });
    });

    /* ------------------------------------------------- */
    /* Align                                             */
    /* ------------------------------------------------- */

    describe('Align', () => {
        test.each([
            { align: 'start', expected: 'flex-start' },
            { align: 'end', expected: 'flex-end' },
            { align: 'center', expected: 'center' },
            { align: 'stretch', expected: 'stretch' },
            { align: 'baseline', expected: 'baseline' }
        ] as { align: FlexAlign; expected: string }[])(
            'maps align=$align to $expected CSS value',
            async ({ align, expected }) => {
                const screen = renderWithWrapper(Flex, { children, align });
                const flex = screen.getByText(content);

                await expect.element(flex).toHaveClass('flex-align');
                expect(flex.element().style.getPropertyValue('--flex-align')).toBe(expected);
            }
        );

        test('does not add flex-align class when align is not set', async () => {
            const screen = renderWithWrapper(Flex, { children });
            const flex = screen.getByText(content);

            await expect.element(flex).not.toHaveClass('flex-align');
        });
    });

    /* ------------------------------------------------- */
    /* Wrap                                              */
    /* ------------------------------------------------- */

    describe('Wrap', () => {
        test.each(['wrap', 'nowrap', 'wrap-reverse'] as FlexWrap[])(
            'adds flex-wrap class and CSS var when wrap=%s',
            async (wrap) => {
                const screen = renderWithWrapper(Flex, { children, wrap });
                const flex = screen.getByText(content);

                await expect.element(flex).toHaveClass('flex-wrap');
                expect(flex.element().style.getPropertyValue('--flex-wrap')).toBe(wrap);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Gap                                               */
    /* ------------------------------------------------- */

    describe('Gap', () => {
        test.each(['1', '2', '3', '4'])('adds flex-gap class and CSS var when gap=%s', async (gap) => {
            const screen = renderWithWrapper(Flex, { children, gap });
            const flex = screen.getByText(content);

            await expect.element(flex).toHaveClass('flex-gap');
            expect(flex.element().style.getPropertyValue('--flex-gap')).toBe(`var(--space-${gap})`);
        });

        test('applies rowGap and colGap independently', async () => {
            const screen = renderWithWrapper(Flex, { children, rowGap: '2', colGap: '4' });
            const flex = screen.getByText(content);

            await expect.element(flex).toHaveClass('flex-row-gap');
            await expect.element(flex).toHaveClass('flex-col-gap');
            expect(flex.element().style.getPropertyValue('--flex-row-gap')).toBe('var(--space-2)');
            expect(flex.element().style.getPropertyValue('--flex-col-gap')).toBe('var(--space-4)');
        });
    });

    /* ------------------------------------------------- */
    /* Style forwarding                                  */
    /* ------------------------------------------------- */

    describe('Style forwarding', () => {
        test('merges caller style with component styles', async () => {
            const screen = renderWithWrapper(Flex, { children, direction: 'column', style: 'color: red;' });
            const flex = screen.getByText(content);

            await expect.element(flex).toHaveStyle({ color: 'red' });
            await expect.element(flex).toHaveClass('flex-direction');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Flex, {
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
    });
});
