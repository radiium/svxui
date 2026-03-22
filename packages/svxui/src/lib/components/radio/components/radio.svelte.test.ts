import { Radio, type Color, type RadioSize } from '$lib/index.js';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Radio component', () => {
    const selector = 'input[type="radio"]';
    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Radio, {});
            const radio = container.querySelector(selector) as HTMLInputElement;

            expect(radio).not.toBeNull();
            expect(radio?.classList.contains('radio')).toBe(true);
            expect(radio?.classList.contains('radio-size-2')).toBe(true);
            expect(radio?.classList.contains('radio-disabled')).toBe(false);

            expect(radio?.getAttribute('type')).toBe('radio');
            expect(radio?.getAttribute('data-color')).toBeNull();
            expect(radio?.getAttribute('data-state')).toBe('checked');
            expect(radio?.checked).toBe(true);
        });

        test('renders as input[type="radio"]', async () => {
            const { container } = renderWithWrapper(Radio, {});
            const radio = container.querySelector('input');

            expect(radio?.tagName).toBe('INPUT');
            expect(radio?.getAttribute('type')).toBe('radio');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Radio, {
                id: 'my-radio',
                'data-testid': 'radio',
                name: 'my-group',
                value: 'option-a'
            });
            const radio = container.querySelector(selector);

            expect(radio?.getAttribute('id')).toBe('my-radio');
            expect(radio?.getAttribute('data-testid')).toBe('radio');
            expect(radio?.getAttribute('name')).toBe('my-group');
            expect(radio?.getAttribute('value')).toBe('option-a');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as RadioSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(Radio, { size });
            const radio = container.querySelector(selector);

            expect(radio?.classList.contains(`radio-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(Radio, { color });
                const radio = container.querySelector(selector);

                expect(radio?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(Radio, {});
            const radio = container.querySelector(selector);

            expect(radio?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Group binding                                     */
    /* ------------------------------------------------- */

    describe('Group binding', () => {
        test('sets data-state="checked" when group matches value', async () => {
            const { container } = renderWithWrapper(Radio, {
                value: 'apple',
                group: 'apple'
            });
            const radio = container.querySelector(selector) as HTMLInputElement;

            expect(radio?.getAttribute('data-state')).toBe('checked');
            expect(radio?.checked).toBe(true);
        });

        test('sets data-state="unchecked" when group matches value', async () => {
            const { container } = renderWithWrapper(Radio, {
                value: 'apple',
                group: 'banana'
            });
            const radio = container.querySelector(selector) as HTMLInputElement;

            expect(radio?.getAttribute('data-state')).toBe('unchecked');
            expect(radio?.checked).toBe(false);
        });

        test('sets data-state="unchecked" when group is undefined', async () => {
            const { container } = renderWithWrapper(Radio, { value: 'apple' });
            const radio = container.querySelector(selector) as HTMLInputElement;

            expect(radio?.getAttribute('data-state')).toBe('unchecked');
            expect(radio?.checked).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled attribute', async () => {
            const { container } = renderWithWrapper(Radio, { disabled: true });
            const radio = container.querySelector(selector);

            expect(radio?.hasAttribute('disabled')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Radio, { class: 'custom-class' });
            const radio = container.querySelector(selector);

            expect(radio?.classList.contains('radio')).toBe(true);
            expect(radio?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLInputElement | undefined;

            renderWithWrapper(Radio, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLInputElement);
            expect(current?.type).toBe('radio');
        });
    });
});
