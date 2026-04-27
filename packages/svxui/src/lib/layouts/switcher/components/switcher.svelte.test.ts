import { Switcher } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Switcher component', () => {
    const content = 'Switcher content';
    const children = createRawSnippet(() => ({
        render: () => content
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Switcher, { children });
            const switcher = screen.getByText(content);

            await expect.element(switcher).toBeVisible();
            await expect.element(switcher).toHaveClass('switcher');
            // threshold and gap have defaults, so these classes are always present
            await expect.element(switcher).toHaveClass('switcher-threshold');
            await expect.element(switcher).toHaveClass('switcher-gap');
        });

        test('renders as div by default', async () => {
            const screen = renderWithWrapper(Switcher, { children });
            const switcher = screen.getByText(content);

            expect(switcher.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Switcher, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Switcher, {
                children,
                id: 'my-switcher',
                'data-testid': 'switcher'
            });
            const switcher = screen.getByText(content);

            await expect.element(switcher).toHaveAttribute('id', 'my-switcher');
            await expect.element(switcher).toHaveAttribute('data-testid', 'switcher');
        });

        test('merges custom class', async () => {
            const screen = renderWithWrapper(Switcher, { children, class: 'custom-class' });
            const switcher = screen.getByText(content);

            await expect.element(switcher).toHaveClass('switcher');
            await expect.element(switcher).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each(['div', 'section', 'ul'] as const)('renders as %s', async (tag) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const screen = renderWithWrapper<any>(Switcher, { children, as: tag });
            const switcher = screen.getByText(content);

            expect(switcher.element().tagName).toBe(tag.toUpperCase());
        });
    });

    /* ------------------------------------------------- */
    /* Threshold                                         */
    /* ------------------------------------------------- */

    describe('Threshold', () => {
        test('applies default threshold of 600px', async () => {
            const screen = renderWithWrapper(Switcher, { children });
            const switcher = screen.getByText(content);

            expect(switcher.element().style.getPropertyValue('--switcher-threshold')).toBe('600px');
        });

        test('applies custom threshold', async () => {
            const screen = renderWithWrapper(Switcher, { children, threshold: '800px' });
            const switcher = screen.getByText(content);

            expect(switcher.element().style.getPropertyValue('--switcher-threshold')).toBe('800px');
        });
    });

    /* ------------------------------------------------- */
    /* Gap                                               */
    /* ------------------------------------------------- */

    describe('Gap', () => {
        test('applies default gap as space token', async () => {
            const screen = renderWithWrapper(Switcher, { children });
            const switcher = screen.getByText(content);

            // default gap='4'
            expect(switcher.element().style.getPropertyValue('--switcher-gap')).toBe('var(--space-4)');
        });

        test.each(['1', '2', '3', '5'])('applies gap=%s as space token', async (gap) => {
            const screen = renderWithWrapper(Switcher, { children, gap });
            const switcher = screen.getByText(content);

            expect(switcher.element().style.getPropertyValue('--switcher-gap')).toBe(`var(--space-${gap})`);
        });

        test('accepts arbitrary CSS value for gap', async () => {
            const screen = renderWithWrapper(Switcher, { children, gap: '1.5rem' });
            const switcher = screen.getByText(content);

            expect(switcher.element().style.getPropertyValue('--switcher-gap')).toBe('1.5rem');
        });
    });

    /* ------------------------------------------------- */
    /* Style forwarding                                  */
    /* ------------------------------------------------- */

    describe('Style forwarding', () => {
        test('merges caller style with component styles', async () => {
            const screen = renderWithWrapper(Switcher, { children, style: 'color: red;' });
            const switcher = screen.getByText(content);

            await expect.element(switcher).toHaveStyle({ color: 'red' });
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Switcher, {
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
