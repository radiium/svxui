import { Separator, type SeparatorSize, type Color, type Orientation } from '$lib/index.js';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Separator component', () => {
    const selector = '[role="separator"]';

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Separator, {});
            const separator = container.querySelector(selector);

            expect(separator).not.toBeNull();
            expect(separator?.classList.contains('separator')).toBe(true);
            expect(separator?.classList.contains('separator-size-2')).toBe(true);
            expect(separator?.classList.contains('separator-orientation-horizontal')).toBe(true);

            expect(separator?.getAttribute('data-color')).toBeNull();
            expect(separator?.getAttribute('role')).toBe('separator');
            expect(separator?.getAttribute('aria-orientation')).toBe('horizontal');
        });

        test('renders as a div element', async () => {
            const { container } = renderWithWrapper(Separator, {});
            const separator = container.querySelector(selector);

            expect(separator?.tagName).toBe('DIV');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Separator, {
                id: 'my-separator',
                'data-testid': 'separator'
            });
            const separator = container.querySelector(selector);

            expect(separator?.getAttribute('id')).toBe('my-separator');
            expect(separator?.getAttribute('data-testid')).toBe('separator');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3', '4'] as SeparatorSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(Separator, { size });
            const separator = container.querySelector(selector);

            expect(separator?.classList.contains(`separator-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(Separator, { color });
                const separator = container.querySelector(selector);

                expect(separator?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(Separator, {});
            const separator = container.querySelector(selector);

            expect(separator?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Orientation                                       */
    /* ------------------------------------------------- */

    describe('Orientation', () => {
        test.each(['horizontal', 'vertical'] as Orientation[])(
            'applies orientation %s',
            async (orientation) => {
                const { container } = renderWithWrapper(Separator, { orientation });
                const separator = container.querySelector(selector);

                expect(separator?.classList.contains(`separator-orientation-${orientation}`)).toBe(true);
                expect(separator?.getAttribute('aria-orientation')).toBe(orientation);
            }
        );

        test('defaults to horizontal orientation', async () => {
            const { container } = renderWithWrapper(Separator, {});
            const separator = container.querySelector(selector);

            expect(separator?.classList.contains('separator-orientation-horizontal')).toBe(true);
            expect(separator?.getAttribute('aria-orientation')).toBe('horizontal');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Separator, { class: 'custom-class' });
            const separator = container.querySelector(selector);

            expect(separator?.classList.contains('separator')).toBe(true);
            expect(separator?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(Separator, {
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
