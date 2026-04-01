import { Switch, type Color, type Radius, type SwitchSize } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Switch component', () => {
    const selector = 'input[type="checkbox"]';
    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Switch, {});
            const switchEl = container.querySelector(selector);

            expect(switchEl).not.toBeNull();
            expect(switchEl?.classList.contains('switch')).toBe(true);
            expect(switchEl?.classList.contains('switch-size-2')).toBe(true);

            expect(switchEl?.getAttribute('data-color')).toBeNull();
            expect(switchEl?.getAttribute('data-radius')).toBeNull();
            expect(switchEl?.getAttribute('data-checked')).toBeNull();
            expect(switchEl?.getAttribute('data-indeterminate')).toBeNull();
            expect(switchEl?.hasAttribute('disabled')).toBe(false);
        });

        test(`renders as ${selector}`, async () => {
            const { container } = renderWithWrapper(Switch, {});
            const switchEl = container.querySelector(selector);

            expect(switchEl?.tagName).toBe('INPUT');
            expect(switchEl?.getAttribute('type')).toBe('checkbox');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Switch, {
                id: 'my-switch',
                'data-testid': 'switch'
            });
            const switchEl = container.querySelector(selector);

            expect(switchEl?.getAttribute('id')).toBe('my-switch');
            expect(switchEl?.getAttribute('data-testid')).toBe('switch');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as SwitchSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(Switch, { size });
            const switchEl = container.querySelector(selector);

            expect(switchEl?.classList.contains(`switch-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(Switch, { color });
                const switchEl = container.querySelector(selector);

                expect(switchEl?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(Switch, {});
            const switchEl = container.querySelector(selector);

            expect(switchEl?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const { container } = renderWithWrapper(Switch, { radius });
                const switchEl = container.querySelector(selector);

                expect(switchEl?.getAttribute('data-radius')).toBe(radius);
            }
        );

        test('does not set data-radius when radius is undefined', async () => {
            const { container } = renderWithWrapper(Switch, {});
            const switchEl = container.querySelector(selector);

            expect(switchEl?.getAttribute('data-radius')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Checked state                                     */
    /* ------------------------------------------------- */

    describe('Checked state', () => {
        test('applies data-state="checked" when checked is true', async () => {
            const { container } = renderWithWrapper(Switch, { checked: true });
            const switchEl = container.querySelector(selector);

            expect(switchEl?.getAttribute('data-state')).toBe('checked');
        });

        test('applies data-state="unchecked" when checked is false', async () => {
            const { container } = renderWithWrapper(Switch, { checked: false });
            const switchEl = container.querySelector(selector);

            expect(switchEl?.getAttribute('data-state')).toBe('unchecked');
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled attribute', async () => {
            const { container } = renderWithWrapper(Switch, { disabled: true });
            const switchEl = container.querySelector(selector);

            expect(switchEl?.hasAttribute('disabled')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Group binding                                     */
    /* ------------------------------------------------- */

    describe('Group binding', () => {
        test('checks switch when value is in group', async () => {
            const { container } = renderWithWrapper(Switch, {
                value: 'apple',
                group: ['apple', 'banana']
            });
            const switchEl = container.querySelector(selector) as HTMLInputElement;

            expect(switchEl?.checked).toBe(true);
        });

        test('unchecks switch when value is not in group', async () => {
            const { container } = renderWithWrapper(Switch, {
                value: 'cherry',
                group: ['apple', 'banana']
            });
            const switchEl = container.querySelector(selector) as HTMLInputElement;

            expect(switchEl?.checked).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Events                                            */
    /* ------------------------------------------------- */

    describe('Events', () => {
        test('calls onCheckedChange when switch is clicked', async () => {
            const onCheckedChange = vi.fn();
            const { container } = renderWithWrapper(Switch, { onCheckedChange });
            const switchEl = container.querySelector(selector) as HTMLInputElement;

            switchEl.click();

            expect(onCheckedChange).toHaveBeenCalledOnce();
            expect(onCheckedChange).toHaveBeenCalledWith(true);
        });

        test('calls onchange when switch changes', async () => {
            const onchange = vi.fn();
            const { container } = renderWithWrapper(Switch, { onchange });
            const switchEl = container.querySelector(selector) as HTMLInputElement;

            switchEl.click();

            expect(onchange).toHaveBeenCalledOnce();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Switch, { class: 'custom-class' });
            const switchEl = container.querySelector(selector);

            expect(switchEl?.classList.contains('switch')).toBe(true);
            expect(switchEl?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLInputElement | undefined;

            renderWithWrapper(Switch, {
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
