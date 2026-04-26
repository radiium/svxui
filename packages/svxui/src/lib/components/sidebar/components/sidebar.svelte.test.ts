import { Sidebar, type SidebarProps } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Sidebar component', () => {
    const content = 'Main content';
    const sideContent = 'Sidebar content';

    const children = createRawSnippet(() => ({
        render: () => content
    }));
    const sidebar = createRawSnippet(() => ({
        render: () => sideContent
    }));

    // Render with a data-testid on the root element so we can locate the wrapper
    // without resorting to .closest() + non-null assertions.
    function render(props: SidebarProps<'div'> = {}) {
        return renderWithWrapper(Sidebar, { 'data-testid': 'sidebar', ...props });
    }

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const screen = render({ children });
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).toBeVisible();
            await expect.element(wrapper).toHaveClass('sidebar-layout');
            await expect.element(wrapper).not.toHaveClass('sidebar-layout-right');
        });

        test('renders as div by default', async () => {
            const screen = render({ children });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().tagName).toBe('DIV');
        });

        test('renders without children', async () => {
            const screen = render();
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).toBeVisible();
        });

        test('forwards extra html attributes', async () => {
            const screen = render({ children, id: 'my-sidebar' });
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).toHaveAttribute('id', 'my-sidebar');
        });

        test('merges custom class', async () => {
            const screen = render({ children, class: 'custom-class' });
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).toHaveClass('sidebar-layout');
            await expect.element(wrapper).toHaveClass('custom-class');
        });
    });

    /* ------------------------------------------------- */
    /* Polymorphism                                      */
    /* ------------------------------------------------- */

    describe('Polymorphism', () => {
        test.each(['div', 'section', 'article'] as const)('renders as %s', async (tag) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const screen = renderWithWrapper<any>(Sidebar, { children, as: tag, 'data-testid': 'sidebar' });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().tagName).toBe(tag.toUpperCase());
        });
    });

    /* ------------------------------------------------- */
    /* Slots                                             */
    /* ------------------------------------------------- */

    describe('Slots', () => {
        test('renders main content in content region', async () => {
            const screen = render({ children });
            const main = screen.getByText(content);

            await expect.element(main).toBeVisible();
            expect(main.element().closest('.sidebar-layout-content')).not.toBeNull();
        });

        test('renders sidebar snippet in sidebar region', async () => {
            const screen = render({ children, sidebar });
            const side = screen.getByText(sideContent);

            await expect.element(side).toBeVisible();
            expect(side.element().closest('.sidebar-layout-side')).not.toBeNull();
        });

        test('does not render sidebar region when sidebar snippet is not provided', async () => {
            const { container } = render({ children });

            expect(container.querySelector('.sidebar-layout-side')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Side                                              */
    /* ------------------------------------------------- */

    describe('Side', () => {
        test('does not add sidebar-layout-right class when side=left (default)', async () => {
            const screen = render({ children, side: 'left' });
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).not.toHaveClass('sidebar-layout-right');
        });

        test('adds sidebar-layout-right class when side=right', async () => {
            const screen = render({ children, side: 'right' });
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).toHaveClass('sidebar-layout-right');
        });
    });

    /* ------------------------------------------------- */
    /* Side width                                        */
    /* ------------------------------------------------- */

    describe('Side width', () => {
        test('applies default sideWidth of 240px', async () => {
            const screen = render({ children });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--sidebar-width')).toBe('240px');
        });

        test('applies custom sideWidth and adds sidebar-layout-width class', async () => {
            const screen = render({ children, sideWidth: '320px' });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--sidebar-width')).toBe('320px');
            await expect.element(wrapper).toHaveClass('sidebar-layout-width');
        });
    });

    /* ------------------------------------------------- */
    /* Content min                                       */
    /* ------------------------------------------------- */

    describe('Content min', () => {
        test('applies default contentMin of 50%', async () => {
            const screen = render({ children });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--content-min')).toBe('50%');
        });

        test('applies custom contentMin and adds sidebar-layout-content-min class', async () => {
            const screen = render({ children, contentMin: '60%' });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--content-min')).toBe('60%');
            await expect.element(wrapper).toHaveClass('sidebar-layout-content-min');
        });
    });

    /* ------------------------------------------------- */
    /* Gap                                               */
    /* ------------------------------------------------- */

    describe('Gap', () => {
        test('applies default gap (token 4) as CSS var', async () => {
            const screen = render({ children });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--sidebar-gap')).toBe('var(--space-4)');
        });

        test.each(['1', '2', '3', '5'])('applies gap=%s as space token', async (gap) => {
            const screen = render({ children, gap });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--sidebar-gap')).toBe(
                `var(--space-${gap})`
            );
        });

        test('accepts arbitrary CSS value for gap', async () => {
            const screen = render({ children, gap: '2rem' });
            const wrapper = screen.getByTestId('sidebar');

            expect(wrapper.element().style.getPropertyValue('--sidebar-gap')).toBe('2rem');
        });
    });

    /* ------------------------------------------------- */
    /* Style forwarding                                  */
    /* ------------------------------------------------- */

    describe('Style forwarding', () => {
        test('merges caller style with component styles', async () => {
            const screen = render({ children, style: 'color: red;' });
            const wrapper = screen.getByTestId('sidebar');

            await expect.element(wrapper).toHaveStyle({ color: 'red' });
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref as HTMLDivElement by default', async () => {
            let current: HTMLDivElement | undefined;

            render({
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
