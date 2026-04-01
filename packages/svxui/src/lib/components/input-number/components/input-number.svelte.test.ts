import { InputNumber, type InputNumberSize, type InputNumberVariant, type Color, type Radius } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('InputNumber component', () => {
    const rootSelector = '.input-number';
    const inputSelector = 'input[type="number"]';
    const decrementSelector = '[aria-label="Decrement"]';
    const incrementSelector = '[aria-label="Increment"]';

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(InputNumber, {});
            const root = container.querySelector(rootSelector);
            const input = container.querySelector(inputSelector);
            const decrement = container.querySelector(decrementSelector);
            const increment = container.querySelector(incrementSelector);

            expect(root).not.toBeNull();
            expect(root?.tagName).toBe('DIV');
            expect(root?.classList.contains('input-number')).toBe(true);
            expect(root?.classList.contains('input-number-size-2')).toBe(true);
            expect(root?.classList.contains('input-disabled')).toBe(false);

            expect(input).not.toBeNull();
            expect(decrement).not.toBeNull();
            expect(increment).not.toBeNull();
        });

        test('renders decrement and increment buttons', async () => {
            const { container } = renderWithWrapper(InputNumber, {});

            const decrement = container.querySelector(decrementSelector);
            const increment = container.querySelector(incrementSelector);

            expect(decrement?.tagName).toBe('BUTTON');
            expect(increment?.tagName).toBe('BUTTON');
            expect(decrement?.textContent?.trim()).toBe('-');
            expect(increment?.textContent?.trim()).toBe('+');
        });

        test('renders input with type=number and inputmode=numeric', async () => {
            const { container } = renderWithWrapper(InputNumber, {});
            const input = container.querySelector(inputSelector) as HTMLInputElement;

            expect(input?.getAttribute('type')).toBe('number');
            expect(input?.getAttribute('inputmode')).toBe('numeric');
        });

        test('forwards extra html attributes to root', async () => {
            const { container } = renderWithWrapper(InputNumber, {
                id: 'my-input-number',
                'data-testid': 'input-number'
            });
            const root = container.querySelector(rootSelector);

            expect(root?.getAttribute('id')).toBe('my-input-number');
            expect(root?.getAttribute('data-testid')).toBe('input-number');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as InputNumberSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(InputNumber, { size });
            const root = container.querySelector(rootSelector);

            expect(root?.classList.contains(`input-number-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'propagates color %s to input',
            async (color) => {
                const { container } = renderWithWrapper(InputNumber, { color });
                const input = container.querySelector(inputSelector);

                expect(input?.getAttribute('data-color')).toBe(color);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'propagates radius %s to input',
            async (radius) => {
                const { container } = renderWithWrapper(InputNumber, { radius });
                const input = container.querySelector(inputSelector);

                expect(input?.getAttribute('data-radius')).toBe(radius);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Value                                             */
    /* ------------------------------------------------- */

    describe('Value', () => {
        test('renders with initial value', async () => {
            const { container } = renderWithWrapper(InputNumber, { value: 42 });
            const input = container.querySelector(inputSelector) as HTMLInputElement;

            expect(input?.value).toBe('42');
        });

        test('renders empty when value is undefined', async () => {
            const { container } = renderWithWrapper(InputNumber, {});
            const input = container.querySelector(inputSelector) as HTMLInputElement;

            expect(input?.value).toBe('');
        });
    });

    /* ------------------------------------------------- */
    /* Min / Max                                         */
    /* ------------------------------------------------- */

    describe('Min / Max', () => {
        test('sets min attribute on input', async () => {
            const { container } = renderWithWrapper(InputNumber, { min: 0 });
            const input = container.querySelector(inputSelector);

            expect(input?.getAttribute('min')).toBe('0');
        });

        test('sets max attribute on input', async () => {
            const { container } = renderWithWrapper(InputNumber, { max: 100 });
            const input = container.querySelector(inputSelector);

            expect(input?.getAttribute('max')).toBe('100');
        });

        test('does not change value when decrement clicked at min', async () => {
            const onValueChange = vi.fn();

            const { container } = renderWithWrapper(InputNumber, {
                value: 0,
                min: 0,
                onValueChange
            });
            const decrement = container.querySelector(decrementSelector) as HTMLButtonElement;

            await userEvent.click(decrement);

            expect(onValueChange).not.toHaveBeenCalled();
        });

        test('does not change value when increment clicked at max', async () => {
            const onValueChange = vi.fn();

            const { container } = renderWithWrapper(InputNumber, {
                value: 10,
                max: 10,
                onValueChange
            });
            const increment = container.querySelector(incrementSelector) as HTMLButtonElement;

            await userEvent.click(increment);

            expect(onValueChange).not.toHaveBeenCalled();
        });
    });

    /* ------------------------------------------------- */
    /* Step                                              */
    /* ------------------------------------------------- */

    describe('Step', () => {
        test('sets step attribute on input', async () => {
            const { container } = renderWithWrapper(InputNumber, { step: 5 });
            const input = container.querySelector(inputSelector);

            expect(input?.getAttribute('step')).toBe('5');
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled class to root', async () => {
            const { container } = renderWithWrapper(InputNumber, { disabled: true });
            const root = container.querySelector(rootSelector);

            expect(root?.classList.contains('input-disabled')).toBe(true);
        });

        test('applies aria-disabled to root', async () => {
            const { container } = renderWithWrapper(InputNumber, { disabled: true });
            const root = container.querySelector(rootSelector);

            expect(root?.getAttribute('aria-disabled')).toBe('true');
        });

        test('applies disabled class to decrement button when disabled', async () => {
            const { container } = renderWithWrapper(InputNumber, { disabled: true });
            const decrement = container.querySelector(decrementSelector);

            expect(decrement?.classList.contains('button-disabled')).toBe(true);
        });

        test('applies disabled class to increment button when disabled', async () => {
            const { container } = renderWithWrapper(InputNumber, { disabled: true });
            const increment = container.querySelector(incrementSelector);

            expect(increment?.classList.contains('button-disabled')).toBe(true);
        });

        test('disables input when disabled', async () => {
            const { container } = renderWithWrapper(InputNumber, { disabled: true });
            const input = container.querySelector(inputSelector);

            expect(input?.hasAttribute('disabled')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Interactions                                      */
    /* ------------------------------------------------- */

    describe('Interactions', () => {
        test('increments value when increment button is clicked', async () => {
            let value: number | undefined = 5;
            const onValueChange = vi.fn((v) => {
                value = v;
            });

            const { container } = renderWithWrapper(InputNumber, { value, onValueChange, step: 1 });
            const increment = container.querySelector(incrementSelector) as HTMLButtonElement;

            await userEvent.click(increment);

            expect(onValueChange).toHaveBeenCalledWith(6);
        });

        test('decrements value when decrement button is clicked', async () => {
            let value: number | undefined = 5;
            const onValueChange = vi.fn((v) => {
                value = v;
            });

            const { container } = renderWithWrapper(InputNumber, { value, onValueChange, step: 1 });
            const decrement = container.querySelector(decrementSelector) as HTMLButtonElement;

            await userEvent.click(decrement);

            expect(onValueChange).toHaveBeenCalledWith(4);
        });

        test('calls onValueChange when typing in the input', async () => {
            const onValueChange = vi.fn();

            const { container } = renderWithWrapper(InputNumber, { onValueChange });
            const input = container.querySelector(inputSelector) as HTMLInputElement;

            await userEvent.click(input);
            await userEvent.type(input, '7');

            expect(onValueChange).toHaveBeenCalled();
        });
    });

    /* ------------------------------------------------- */
    /* fullWidth                                         */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test('applies fullWidth to inner input', async () => {
            const { container } = renderWithWrapper(InputNumber, { fullWidth: true });
            const input = container.querySelector(inputSelector);

            expect(input?.classList.contains('input-full-width')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(InputNumber, { class: 'custom-class' });
            const root = container.querySelector(rootSelector);

            expect(root?.classList.contains('input-number')).toBe(true);
            expect(root?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLInputElement | undefined;

            renderWithWrapper(InputNumber, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLDivElement);
            expect(current?.classList.contains('input-number')).toBe(true);
        });
    });
});
