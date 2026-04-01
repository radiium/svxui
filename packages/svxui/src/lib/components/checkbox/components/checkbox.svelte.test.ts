import { Checkbox, type CheckboxSize, type Color, type Radius } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Checkbox component', () => {
    const selector = 'input[type="checkbox"]';
    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Checkbox, {});
            const checkbox = container.querySelector(selector);

            expect(checkbox).not.toBeNull();
            expect(checkbox?.classList.contains('checkbox')).toBe(true);
            expect(checkbox?.classList.contains('checkbox-size-2')).toBe(true);

            expect(checkbox?.getAttribute('data-color')).toBeNull();
            expect(checkbox?.getAttribute('data-radius')).toBeNull();
            expect(checkbox?.getAttribute('data-checked')).toBeNull();
            expect(checkbox?.getAttribute('data-indeterminate')).toBeNull();
            expect(checkbox?.hasAttribute('disabled')).toBe(false);
        });

        test('renders as input[type="checkbox"]', async () => {
            const { container } = renderWithWrapper(Checkbox, {});
            const checkbox = container.querySelector(selector);

            expect(checkbox?.tagName).toBe('INPUT');
            expect(checkbox?.getAttribute('type')).toBe('checkbox');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Checkbox, {
                id: 'my-checkbox',
                'data-testid': 'checkbox'
            });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('id')).toBe('my-checkbox');
            expect(checkbox?.getAttribute('data-testid')).toBe('checkbox');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as CheckboxSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(Checkbox, { size });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.classList.contains(`checkbox-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(Checkbox, { color });
                const checkbox = container.querySelector(selector);

                expect(checkbox?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(Checkbox, {});
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const { container } = renderWithWrapper(Checkbox, { radius });
                const checkbox = container.querySelector(selector);

                expect(checkbox?.getAttribute('data-radius')).toBe(radius);
            }
        );

        test('does not set data-radius when radius is undefined', async () => {
            const { container } = renderWithWrapper(Checkbox, {});
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('data-radius')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Checked state                                     */
    /* ------------------------------------------------- */

    describe('Checked state', () => {
        test('applies data-state="checked" when checked is true', async () => {
            const { container } = renderWithWrapper(Checkbox, { checked: true });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('data-state')).toBe('checked');
        });

        test('applies data-state="unchecked" when checked is false', async () => {
            const { container } = renderWithWrapper(Checkbox, { checked: false });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('data-state')).toBe('unchecked');
        });

        test('applies data-state="indeterminate" when indeterminate is true and checked is true', async () => {
            const { container } = renderWithWrapper(Checkbox, { indeterminate: true, checked: true });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('data-state')).toBe('indeterminate');
        });

        test('applies data-state="indeterminate" when indeterminate is true and checked is false', async () => {
            const { container } = renderWithWrapper(Checkbox, { indeterminate: true, checked: false });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.getAttribute('data-state')).toBe('indeterminate');
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled attribute', async () => {
            const { container } = renderWithWrapper(Checkbox, { disabled: true });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.hasAttribute('disabled')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Group binding                                     */
    /* ------------------------------------------------- */

    describe('Group binding', () => {
        test('checks checkbox when value is in group', async () => {
            const { container } = renderWithWrapper(Checkbox, {
                value: 'apple',
                group: ['apple', 'banana']
            });
            const checkbox = container.querySelector(selector) as HTMLInputElement;

            expect(checkbox?.checked).toBe(true);
        });

        test('unchecks checkbox when value is not in group', async () => {
            const { container } = renderWithWrapper(Checkbox, {
                value: 'cherry',
                group: ['apple', 'banana']
            });
            const checkbox = container.querySelector(selector) as HTMLInputElement;

            expect(checkbox?.checked).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Events                                            */
    /* ------------------------------------------------- */

    describe('Events', () => {
        test('calls onCheckedChange when checkbox is clicked', async () => {
            const onCheckedChange = vi.fn();
            const { container } = renderWithWrapper(Checkbox, { onCheckedChange });
            const checkbox = container.querySelector(selector) as HTMLInputElement;

            checkbox.click();

            expect(onCheckedChange).toHaveBeenCalledOnce();
            expect(onCheckedChange).toHaveBeenCalledWith(true);
        });

        test('calls onchange when checkbox changes', async () => {
            const onchange = vi.fn();
            const { container } = renderWithWrapper(Checkbox, { onchange });
            const checkbox = container.querySelector(selector) as HTMLInputElement;

            checkbox.click();

            expect(onchange).toHaveBeenCalledOnce();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Checkbox, { class: 'custom-class' });
            const checkbox = container.querySelector(selector);

            expect(checkbox?.classList.contains('checkbox')).toBe(true);
            expect(checkbox?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLInputElement | undefined;

            renderWithWrapper(Checkbox, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLInputElement);
            expect(current?.type).toBe('checkbox');
        });
    });
});
