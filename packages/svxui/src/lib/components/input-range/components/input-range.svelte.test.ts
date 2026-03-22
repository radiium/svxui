import { InputRange, type Color, type InputRangeSize, type Orientation, type Radius } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('InputRange component', () => {
    const selector = 'input[type="range"]';

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(InputRange, {});
            const input = container.querySelector(selector);

            expect(input).not.toBeNull();
            expect(input?.classList.contains('input-range')).toBe(true);
            expect(input?.classList.contains('input-range-size-2')).toBe(true);
            expect(input?.classList.contains('input-range-orientation-horizontal')).toBe(true);
            expect(input?.classList.contains('input-range-full-width')).toBe(false);

            expect(input?.getAttribute('type')).toBe('range');
            expect(input?.getAttribute('data-color')).toBeNull();
            expect(input?.getAttribute('data-radius')).toBeNull();
            expect(input?.hasAttribute('disabled')).toBe(false);
        });

        test(`renders as ${selector}`, async () => {
            const { container } = renderWithWrapper(InputRange, {});
            const input = container.querySelector('input');

            expect(input?.tagName).toBe('INPUT');
            expect(input?.getAttribute('type')).toBe('range');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(InputRange, {
                id: 'my-range',
                'data-testid': 'range',
                min: '0',
                max: '100',
                step: '5'
            });
            const input = container.querySelector(selector);

            expect(input?.getAttribute('id')).toBe('my-range');
            expect(input?.getAttribute('data-testid')).toBe('range');
            expect(input?.getAttribute('min')).toBe('0');
            expect(input?.getAttribute('max')).toBe('100');
            expect(input?.getAttribute('step')).toBe('5');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as InputRangeSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(InputRange, { size });
            const input = container.querySelector(selector);

            expect(input?.classList.contains(`input-range-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(InputRange, { color });
                const input = container.querySelector(selector);

                expect(input?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(InputRange, {});
            const input = container.querySelector(selector);

            expect(input?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const { container } = renderWithWrapper(InputRange, { radius });
                const input = container.querySelector(selector);

                expect(input?.getAttribute('data-radius')).toBe(radius);
            }
        );

        test('does not set data-radius when color is undefined', async () => {
            const { container } = renderWithWrapper(InputRange, {});
            const input = container.querySelector(selector);

            expect(input?.getAttribute('data-radius')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Orientation                                       */
    /* ------------------------------------------------- */

    describe('Orientation', () => {
        test.each(['horizontal', 'vertical'] as Orientation[])(
            'applies orientation %s',
            async (orientation) => {
                const { container } = renderWithWrapper(InputRange, { orientation });
                const input = container.querySelector(selector);

                expect(input?.classList.contains(`input-range-orientation-${orientation}`)).toBe(true);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Layout                                            */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test('applies fullWidth', async () => {
            const { container } = renderWithWrapper(InputRange, { fullWidth: true });
            const input = container.querySelector(selector);

            expect(input?.classList.contains('input-range-full-width')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled attribute', async () => {
            const { container } = renderWithWrapper(InputRange, { disabled: true });
            const input = container.querySelector(selector);

            expect(input?.hasAttribute('disabled')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Events                                            */
    /* ------------------------------------------------- */

    describe('Events', () => {
        test('calls onValueChange when range changes', async () => {
            const onValueChange = vi.fn();
            const { container } = renderWithWrapper(InputRange, { onValueChange, value: '50' });
            const input = container.querySelector(selector) as HTMLInputElement;

            await userEvent.fill(input, '75');

            expect(onValueChange).toHaveBeenCalledOnce();
        });

        test('calls onchange when range changes', async () => {
            const onchange = vi.fn();
            const { container } = renderWithWrapper(InputRange, { onchange, value: '50' });
            const input = container.querySelector(selector) as HTMLInputElement;

            await userEvent.fill(input, '75');

            expect(onchange).toHaveBeenCalledOnce();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(InputRange, { class: 'custom-class' });
            const input = container.querySelector(selector);

            expect(input?.classList.contains('input-range')).toBe(true);
            expect(input?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLInputElement | undefined;

            renderWithWrapper(InputRange, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLInputElement);
            expect(current?.type).toBe('range');
        });
    });
});
