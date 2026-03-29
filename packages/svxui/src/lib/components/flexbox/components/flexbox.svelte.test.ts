import {
    Flexbox,
    type Align,
    type Direction,
    type Display,
    type Gap,
    type Justify,
    type Wrap
} from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Flexbox component', () => {
    const label = 'flexbox';
    const children = createRawSnippet(() => ({
        render: () => label
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toBeVisible();
            await expect.element(flexbox).toHaveClass('flex');
            await expect.element(flexbox).toHaveClass('flexbox-justify-start');
            await expect.element(flexbox).not.toHaveClass('flexbox-full-width');
            await expect.element(flexbox).not.toHaveClass('flexbox-full-height');
        });

        test('renders as a div element by default', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            expect(flexbox.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Flexbox, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Flexbox, {
                children,
                id: 'my-flexbox',
                'data-testid': 'flexbox'
            });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveAttribute('id', 'my-flexbox');
            await expect.element(flexbox).toHaveAttribute('data-testid', 'flexbox');
        });
    });

    /* ------------------------------------------------- */
    /* As prop                                           */
    /* ------------------------------------------------- */

    describe('As prop', () => {
        test.each(['div', 'section', 'article', 'main', 'nav', 'aside', 'header', 'footer'] as const)(
            'renders as %s element',
            async (tag) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const screen = renderWithWrapper<any>(Flexbox, { children, as: tag });
                const flexbox = screen.getByText(label);

                expect(flexbox.element().tagName).toBe(tag.toUpperCase());
            }
        );
    });

    /* ------------------------------------------------- */
    /* Display                                           */
    /* ------------------------------------------------- */

    describe('Display', () => {
        test.each(['flex', 'inline-flex'] as Display[])('applies display %s', async (display) => {
            const screen = renderWithWrapper(Flexbox, { children, display });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass(display);
        });
    });

    /* ------------------------------------------------- */
    /* Direction                                         */
    /* ------------------------------------------------- */

    describe('Direction', () => {
        test.each(['row', 'row-reverse', 'column', 'column-reverse'] as Direction[])(
            'applies direction %s',
            async (direction) => {
                const screen = renderWithWrapper(Flexbox, { children, direction });
                const flexbox = screen.getByText(label);

                await expect.element(flexbox).toHaveClass(`flexbox-${direction}`);
            }
        );

        test('does not set direction class when direction is undefined', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).not.toHaveClass('flexbox-row');
            await expect.element(flexbox).not.toHaveClass('flexbox-column');
        });
    });

    /* ------------------------------------------------- */
    /* Justify                                           */
    /* ------------------------------------------------- */

    describe('Justify', () => {
        test.each([
            'start',
            'center',
            'end',
            'around',
            'between',
            'evenly',
            'baseline',
            'stretch',
            'normal'
        ] as Justify[])('applies justify %s', async (justify) => {
            const screen = renderWithWrapper(Flexbox, { children, justify });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass(`flexbox-justify-${justify}`);
        });
    });

    /* ------------------------------------------------- */
    /* Align                                             */
    /* ------------------------------------------------- */

    describe('Align', () => {
        test.each(['start', 'center', 'end', 'baseline', 'stretch', 'normal'] as Align[])(
            'applies align %s',
            async (align) => {
                const screen = renderWithWrapper(Flexbox, { children, align });
                const flexbox = screen.getByText(label);

                await expect.element(flexbox).toHaveClass(`flexbox-items-${align}`);
            }
        );

        test('does not set align class when align is undefined', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).not.toHaveClass('flexbox-items-start');
        });
    });

    /* ------------------------------------------------- */
    /* Wrap                                              */
    /* ------------------------------------------------- */

    describe('Wrap', () => {
        test.each(['wrap', 'nowrap', 'wrap-reverse'] as Wrap[])('applies wrap %s', async (wrap) => {
            const screen = renderWithWrapper(Flexbox, { children, wrap });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass(`flexbox-${wrap}`);
        });

        test('does not set wrap class when wrap is undefined', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).not.toHaveClass('flexbox-wrap');
            await expect.element(flexbox).not.toHaveClass('flexbox-nowrap');
        });
    });

    /* ------------------------------------------------- */
    /* Gap                                               */
    /* ------------------------------------------------- */

    describe('Gap', () => {
        test.each(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as Gap[])(
            'applies gap %s',
            async (gap) => {
                const screen = renderWithWrapper(Flexbox, { children, gap });
                const flexbox = screen.getByText(label);

                await expect.element(flexbox).toHaveClass(`flexbox-gap-${gap}`);
            }
        );

        test('does not set gap class when gap is undefined', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            for (let i = 0; i <= 9; i++) {
                await expect.element(flexbox).not.toHaveClass(`flexbox-gap-${i}`);
            }
        });
    });

    /* ------------------------------------------------- */
    /* fullWidth / fullHeight                            */
    /* ------------------------------------------------- */

    describe('Full dimensions', () => {
        test('applies fullWidth class', async () => {
            const screen = renderWithWrapper(Flexbox, { children, fullWidth: true });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass('flexbox-full-width');
        });

        test('does not apply fullWidth class by default', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).not.toHaveClass('flexbox-full-width');
        });

        test('applies fullHeight class', async () => {
            const screen = renderWithWrapper(Flexbox, { children, fullHeight: true });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass('flexbox-full-height');
        });

        test('does not apply fullHeight class by default', async () => {
            const screen = renderWithWrapper(Flexbox, { children });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).not.toHaveClass('flexbox-full-height');
        });

        test('applies both fullWidth and fullHeight', async () => {
            const screen = renderWithWrapper(Flexbox, { children, fullWidth: true, fullHeight: true });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass('flexbox-full-width');
            await expect.element(flexbox).toHaveClass('flexbox-full-height');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const screen = renderWithWrapper(Flexbox, { children, class: 'custom-class' });
            const flexbox = screen.getByText(label);

            await expect.element(flexbox).toHaveClass('flex');
            await expect.element(flexbox).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            const ref: { current?: HTMLDivElement } = { current: undefined };

            renderWithWrapper(Flexbox, {
                children,
                get ref() {
                    return undefined;
                },
                set ref(r) {
                    ref.current = r;
                }
            });

            await Promise.resolve();

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current?.textContent).toBe(label);
        });
    });
});
