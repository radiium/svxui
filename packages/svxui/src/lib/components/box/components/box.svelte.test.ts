import { Box, type BoxDisplay } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Box component', () => {
    const content = 'Box content';
    const children = createRawSnippet(() => ({
        render: () => content
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders as div by default', async () => {
            const screen = renderWithWrapper(Box, { children });
            const box = screen.getByText(content);

            await expect.element(box).toBeVisible();
            expect(box.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Box, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Box, {
                children,
                id: 'my-box',
                'data-testid': 'box'
            });
            const box = screen.getByText(content);

            await expect.element(box).toHaveAttribute('id', 'my-box');
            await expect.element(box).toHaveAttribute('data-testid', 'box');
        });

        test('merges custom class with existing classes', async () => {
            const screen = renderWithWrapper(Box, { children, class: 'custom-class' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each(['div', 'section', 'article', 'main', 'aside', 'nav'] as const)(
            'renders as %s',
            async (tag) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const screen = renderWithWrapper<any>(Box, { children, as: tag });
                const box = screen.getByText(content);

                expect(box.element().tagName).toBe(tag.toUpperCase());
            }
        );
    });

    /* ------------------------------------------------- */
    /* Display                                           */
    /* ------------------------------------------------- */

    describe('Display', () => {
        test.each(['block', 'inline', 'inline-block', 'contents', 'none'] as BoxDisplay[])(
            'applies display=%s via inline style',
            async (display) => {
                const screen = renderWithWrapper(Box, { children, display });
                const box = screen.getByText(content);

                expect(box.element().style.display).toBe(display);
            }
        );

        test('does not set display when not provided', async () => {
            const screen = renderWithWrapper(Box, { children });
            const box = screen.getByText(content);

            expect(box.element().style.display).toBe('');
        });
    });

    /* ------------------------------------------------- */
    /* Spacing                                           */
    /* ------------------------------------------------- */

    describe('Spacing', () => {
        test.each(['1', '2', '3', '4', '5'])('applies padding p=%s via inline style', async (p) => {
            const screen = renderWithWrapper(Box, { children, p });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ padding: `var(--space-${p})` });
        });

        test('applies individual padding sides', async () => {
            const screen = renderWithWrapper(Box, { children, pt: '2', pb: '4', pl: '1', pr: '3' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({
                paddingTop: 'var(--space-2)',
                paddingBottom: 'var(--space-4)',
                paddingLeft: 'var(--space-1)',
                paddingRight: 'var(--space-3)'
            });
        });

        test('applies margin m=%s via inline style', async () => {
            const screen = renderWithWrapper(Box, { children, m: '3' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ margin: `var(--space-3)` });
        });

        test('applies px and py shorthand correctly', async () => {
            const screen = renderWithWrapper(Box, { children, px: '2', py: '4' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({
                paddingLeft: 'var(--space-2)',
                paddingRight: 'var(--space-2)',
                paddingTop: 'var(--space-4)',
                paddingBottom: 'var(--space-4)'
            });
        });

        test('p=0 resolves to 0px', async () => {
            const screen = renderWithWrapper(Box, { children, p: '0' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ padding: '0px' });
        });
    });

    /* ------------------------------------------------- */
    /* Size props                                        */
    /* ------------------------------------------------- */

    describe('Size props', () => {
        test('applies width via inline style', async () => {
            const screen = renderWithWrapper(Box, { children, width: '200px' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ width: '200px' });
        });

        test('applies height via inline style', async () => {
            const screen = renderWithWrapper(Box, { children, height: '100px' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ height: '100px' });
        });

        test('applies maxWidth and minWidth', async () => {
            const screen = renderWithWrapper(Box, { children, maxWidth: '500px', minWidth: '100px' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ maxWidth: '500px', minWidth: '100px' });
        });
    });

    /* ------------------------------------------------- */
    /* Overflow                                          */
    /* ------------------------------------------------- */

    describe('Overflow', () => {
        test.each(['hidden', 'scroll', 'auto', 'clip'] as const)(
            'applies overflow=%s via inline style',
            async (overflow) => {
                const screen = renderWithWrapper(Box, { children, overflow });
                const box = screen.getByText(content);

                await expect.element(box).toHaveStyle({
                    overflowX: overflow,
                    overflowY: overflow
                });
            }
        );

        test('applies overflowX and overflowY independently', async () => {
            const screen = renderWithWrapper(Box, { children, overflowX: 'hidden', overflowY: 'auto' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ overflowX: 'hidden', overflowY: 'auto' });
        });
    });

    /* ------------------------------------------------- */
    /* Flex child props                                  */
    /* ------------------------------------------------- */

    describe('Flex child props', () => {
        test('applies flexGrow via inline style', async () => {
            const screen = renderWithWrapper(Box, { children, flexGrow: '1' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ flexGrow: '1' });
        });

        test('applies flexShrink via inline style', async () => {
            const screen = renderWithWrapper(Box, { children, flexShrink: '0' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ flexShrink: '0' });
        });

        test('applies flexBasis via inline style', async () => {
            const screen = renderWithWrapper(Box, { children, flexBasis: '50%' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ flexBasis: '50%' });
        });
    });

    /* ------------------------------------------------- */
    /* Style forwarding                                  */
    /* ------------------------------------------------- */

    describe('Style forwarding', () => {
        test('merges inline style with caller style', async () => {
            const screen = renderWithWrapper(Box, { children, p: '2', style: 'color: red;' });
            const box = screen.getByText(content);

            await expect.element(box).toHaveStyle({ color: 'red', padding: 'var(--space-2)' });
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Box, {
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
