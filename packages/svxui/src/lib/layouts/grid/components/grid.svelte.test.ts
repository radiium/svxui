import { Grid, type GridAlign, type GridDisplay, type GridFlow } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Grid component', () => {
    const content = 'Grid content';
    const children = createRawSnippet(() => ({
        render: () => content
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Grid, { children });
            const grid = screen.getByText(content);

            await expect.element(grid).toBeVisible();
            await expect.element(grid).toHaveClass('grid');
            await expect.element(grid).not.toHaveClass('grid-display');
            await expect.element(grid).not.toHaveClass('grid-cols');
            await expect.element(grid).not.toHaveClass('grid-rows');
            await expect.element(grid).not.toHaveClass('grid-areas');
            await expect.element(grid).not.toHaveClass('grid-gap');
            await expect.element(grid).not.toHaveClass('grid-flow');
            await expect.element(grid).not.toHaveClass('grid-align');
        });

        test('renders as div by default', async () => {
            const screen = renderWithWrapper(Grid, { children });
            const grid = screen.getByText(content);

            expect(grid.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Grid, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Grid, {
                children,
                id: 'my-grid',
                'data-testid': 'grid'
            });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveAttribute('id', 'my-grid');
            await expect.element(grid).toHaveAttribute('data-testid', 'grid');
        });

        test('merges custom class', async () => {
            const screen = renderWithWrapper(Grid, { children, class: 'custom-class' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid');
            await expect.element(grid).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each(['div', 'section', 'article', 'ul'] as const)('renders as %s', async (tag) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const screen = renderWithWrapper<any>(Grid, { children, as: tag });
            const grid = screen.getByText(content);

            expect(grid.element().tagName).toBe(tag.toUpperCase());
        });
    });

    /* ------------------------------------------------- */
    /* Display                                           */
    /* ------------------------------------------------- */

    describe('Display', () => {
        test('does not add grid-display class when display=grid (default)', async () => {
            const screen = renderWithWrapper(Grid, { children, display: 'grid' });
            const grid = screen.getByText(content);

            await expect.element(grid).not.toHaveClass('grid-display');
        });

        test.each(['inline-grid', 'none'] as GridDisplay[])(
            'adds grid-display class and CSS var when display=%s',
            async (display) => {
                const screen = renderWithWrapper(Grid, { children, display });
                const grid = screen.getByText(content);

                await expect.element(grid).toHaveClass('grid-display');
                expect(grid.element().style.getPropertyValue('--grid-display')).toBe(display);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Columns                                           */
    /* ------------------------------------------------- */

    describe('Columns', () => {
        test('integer shorthand: cols=3 → repeat(3, 1fr)', async () => {
            const screen = renderWithWrapper(Grid, { children, cols: '3' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-cols');
            expect(grid.element().style.getPropertyValue('--grid-cols')).toBe('repeat(3, 1fr)');
        });

        test('arbitrary value passed through as-is', async () => {
            const screen = renderWithWrapper(Grid, { children, cols: '1fr 2fr 1fr' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-cols');
            expect(grid.element().style.getPropertyValue('--grid-cols')).toBe('1fr 2fr 1fr');
        });

        test('autoFill takes precedence over cols', async () => {
            const screen = renderWithWrapper(Grid, { children, cols: '3', autoFill: '200px' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-cols');
            expect(grid.element().style.getPropertyValue('--grid-cols')).toBe(
                'repeat(auto-fill, minmax(200px, 1fr))'
            );
        });

        test('autoFit generates repeat(auto-fit, minmax(...))', async () => {
            const screen = renderWithWrapper(Grid, { children, autoFit: '150px' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-cols');
            expect(grid.element().style.getPropertyValue('--grid-cols')).toBe(
                'repeat(auto-fit, minmax(150px, 1fr))'
            );
        });
    });

    /* ------------------------------------------------- */
    /* Rows                                              */
    /* ------------------------------------------------- */

    describe('Rows', () => {
        test('integer shorthand: rows=2 → repeat(2, 1fr)', async () => {
            const screen = renderWithWrapper(Grid, { children, rows: '2' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-rows');
            expect(grid.element().style.getPropertyValue('--grid-rows')).toBe('repeat(2, 1fr)');
        });

        test('arbitrary rows value passed through', async () => {
            const screen = renderWithWrapper(Grid, { children, rows: '100px auto 1fr' });
            const grid = screen.getByText(content);

            expect(grid.element().style.getPropertyValue('--grid-rows')).toBe('100px auto 1fr');
        });
    });

    /* ------------------------------------------------- */
    /* Gap                                               */
    /* ------------------------------------------------- */

    describe('Gap', () => {
        test.each(['1', '2', '3', '4'])('adds grid-gap class and CSS var when gap=%s', async (gap) => {
            const screen = renderWithWrapper(Grid, { children, gap });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-gap');
            expect(grid.element().style.getPropertyValue('--grid-gap')).toBe(`var(--space-${gap})`);
        });

        test('applies rowGap and colGap independently', async () => {
            const screen = renderWithWrapper(Grid, { children, rowGap: '2', colGap: '4' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-row-gap');
            await expect.element(grid).toHaveClass('grid-col-gap');
            expect(grid.element().style.getPropertyValue('--grid-row-gap')).toBe('var(--space-2)');
            expect(grid.element().style.getPropertyValue('--grid-col-gap')).toBe('var(--space-4)');
        });
    });

    /* ------------------------------------------------- */
    /* Flow                                              */
    /* ------------------------------------------------- */

    describe('Flow', () => {
        test.each([
            { flow: 'row', expected: 'row' },
            { flow: 'column', expected: 'column' },
            { flow: 'dense', expected: 'dense' },
            { flow: 'row-dense', expected: 'row dense' },
            { flow: 'column-dense', expected: 'column dense' }
        ] as { flow: GridFlow; expected: string }[])(
            'maps flow=$flow to $expected CSS value',
            async ({ flow, expected }) => {
                const screen = renderWithWrapper(Grid, { children, flow });
                const grid = screen.getByText(content);

                await expect.element(grid).toHaveClass('grid-flow');
                expect(grid.element().style.getPropertyValue('--grid-flow')).toBe(expected);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Align                                             */
    /* ------------------------------------------------- */

    describe('Align', () => {
        test.each(['start', 'center', 'end', 'stretch', 'baseline'] as GridAlign[])(
            'adds grid-align class and CSS var when align=%s',
            async (align) => {
                const screen = renderWithWrapper(Grid, { children, align });
                const grid = screen.getByText(content);

                await expect.element(grid).toHaveClass('grid-align');
                expect(grid.element().style.getPropertyValue('--grid-align')).toBe(align);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Areas                                             */
    /* ------------------------------------------------- */

    describe('Areas', () => {
        test('adds grid-areas class and CSS var when areas is set', async () => {
            const areas = '"header header" "sidebar content"';
            const screen = renderWithWrapper(Grid, { children, areas });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveClass('grid-areas');
            expect(grid.element().style.getPropertyValue('--grid-areas')).toBe(areas);
        });
    });

    /* ------------------------------------------------- */
    /* Spacing (BoxModelProps)                           */
    /* ------------------------------------------------- */

    describe('Spacing', () => {
        test('applies padding via inline style', async () => {
            const screen = renderWithWrapper(Grid, { children, p: '4' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveStyle({ padding: 'var(--space-4)' });
        });

        test('applies margin via inline style', async () => {
            const screen = renderWithWrapper(Grid, { children, m: '2' });
            const grid = screen.getByText(content);

            await expect.element(grid).toHaveStyle({ margin: 'var(--space-2)' });
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Grid, {
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
