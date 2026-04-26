import { Center } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Center component', () => {
    const content = 'Center content';
    const children = createRawSnippet(() => ({
        render: () => content
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = renderWithWrapper(Center, { children });
            const center = screen.getByText(content);

            await expect.element(center).toBeVisible();
            await expect.element(center).toHaveClass('center');
            await expect.element(center).not.toHaveClass('center-gutters');
            await expect.element(center).not.toHaveClass('center-intrinsic');
        });

        test('renders as div by default', async () => {
            const screen = renderWithWrapper(Center, { children });
            const center = screen.getByText(content);

            expect(center.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(Center, {});

            expect(container.querySelector('div')).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const screen = renderWithWrapper(Center, {
                children,
                id: 'my-center',
                'data-testid': 'center'
            });
            const center = screen.getByText(content);

            await expect.element(center).toHaveAttribute('id', 'my-center');
            await expect.element(center).toHaveAttribute('data-testid', 'center');
        });

        test('merges custom class', async () => {
            const screen = renderWithWrapper(Center, { children, class: 'custom-class' });
            const center = screen.getByText(content);

            await expect.element(center).toHaveClass('center');
            await expect.element(center).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each(['div', 'section', 'article', 'main'] as const)('renders as %s', async (tag) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const screen = renderWithWrapper<any>(Center, { children, as: tag });
            const center = screen.getByText(content);

            expect(center.element().tagName).toBe(tag.toUpperCase());
        });
    });

    /* ------------------------------------------------- */
    /* Max width                                         */
    /* ------------------------------------------------- */

    describe('Max width', () => {
        test('applies default maxWidth of 65ch', async () => {
            const screen = renderWithWrapper(Center, { children });
            const center = screen.getByText(content);

            expect(center.element().style.getPropertyValue('--center-max-width')).toBe('65ch');
        });

        test('applies custom maxWidth', async () => {
            const screen = renderWithWrapper(Center, { children, maxWidth: '800px' });
            const center = screen.getByText(content);

            expect(center.element().style.getPropertyValue('--center-max-width')).toBe('800px');
        });
    });

    /* ------------------------------------------------- */
    /* Gutters                                           */
    /* ------------------------------------------------- */

    describe('Gutters', () => {
        test('adds center-gutters class and CSS var when gutters is set', async () => {
            const screen = renderWithWrapper(Center, { children, gutters: '4' });
            const center = screen.getByText(content);

            await expect.element(center).toHaveClass('center-gutters');
            expect(center.element().style.getPropertyValue('--center-gutters')).toBe('var(--space-4)');
        });

        test('accepts arbitrary CSS value for gutters', async () => {
            const screen = renderWithWrapper(Center, { children, gutters: '2rem' });
            const center = screen.getByText(content);

            await expect.element(center).toHaveClass('center-gutters');
            expect(center.element().style.getPropertyValue('--center-gutters')).toBe('2rem');
        });

        test('does not add center-gutters class when gutters is not set', async () => {
            const screen = renderWithWrapper(Center, { children });
            const center = screen.getByText(content);

            await expect.element(center).not.toHaveClass('center-gutters');
        });
    });

    /* ------------------------------------------------- */
    /* Intrinsic                                         */
    /* ------------------------------------------------- */

    describe('Intrinsic', () => {
        test('adds center-intrinsic class when intrinsic=true', async () => {
            const screen = renderWithWrapper(Center, { children, intrinsic: true });
            const center = screen.getByText(content);

            await expect.element(center).toHaveClass('center-intrinsic');
        });

        test('does not add center-intrinsic class by default', async () => {
            const screen = renderWithWrapper(Center, { children });
            const center = screen.getByText(content);

            await expect.element(center).not.toHaveClass('center-intrinsic');
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Center, {
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
