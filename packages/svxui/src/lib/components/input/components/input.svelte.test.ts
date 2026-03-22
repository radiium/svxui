import { Input, type Align, type Color, type InputSize, type InputType, type Radius } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Input component', () => {
    const selector = 'input';
    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Input, {});
            const input = container.querySelector(selector);

            expect(input).not.toBeNull();
            expect(input?.classList.contains('input')).toBe(true);
            expect(input?.classList.contains('input-size-2')).toBe(true);
            expect(input?.classList.contains('input-type-text')).toBe(true);
            expect(input?.classList.contains('input-align-start')).toBe(true);
            expect(input?.classList.contains('input-full-width')).toBe(false);

            expect(input?.getAttribute('data-color')).toBeNull();
            expect(input?.getAttribute('data-radius')).toBeNull();
            expect(input?.getAttribute('type')).toBe('text');
            expect(input?.getAttribute('spellcheck')).toBe('false');
            expect(input?.getAttribute('autocomplete')).toBe('off');
            expect(input?.hasAttribute('disabled')).toBe(false);
        });

        test('renders as input element', async () => {
            const { container } = renderWithWrapper(Input, {});
            const input = container.querySelector(selector);

            expect(input?.tagName).toBe('INPUT');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Input, {
                id: 'my-input',
                'data-testid': 'input',
                placeholder: 'Enter text'
            });
            const input = container.querySelector(selector);

            expect(input?.getAttribute('id')).toBe('my-input');
            expect(input?.getAttribute('data-testid')).toBe('input');
            expect(input?.getAttribute('placeholder')).toBe('Enter text');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as InputSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(Input, { size });
            const input = container.querySelector(selector);

            expect(input?.classList.contains(`input-size-${size}`)).toBe(true);
        });

        test('applies inputSize as html size attribute', async () => {
            const { container } = renderWithWrapper(Input, { inputSize: 10 });
            const input = container.querySelector(selector);

            expect(input?.getAttribute('size')).toBe('10');
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(Input, { color });
                const input = container.querySelector(selector);

                expect(input?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(Input, {});
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
                const { container } = renderWithWrapper(Input, { radius });
                const input = container.querySelector(selector);

                expect(input?.getAttribute('data-radius')).toBe(radius);
            }
        );

        test('does not set data-radius when color is undefined', async () => {
            const { container } = renderWithWrapper(Input, {});
            const input = container.querySelector(selector);

            expect(input?.getAttribute('data-radius')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Types                                             */
    /* ------------------------------------------------- */

    describe('Types', () => {
        test.each(['text', 'email', 'password', 'number', 'search', 'tel', 'url'] as InputType[])(
            'applies type %s',
            async (type) => {
                const { container } = renderWithWrapper(Input, { type });
                const input = container.querySelector(selector);

                expect(input?.type).toBe(type);
                expect(input?.classList.contains(`input-type-${type}`)).toBe(true);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Alignment                                         */
    /* ------------------------------------------------- */

    describe('Alignment', () => {
        test.each(['start', 'center', 'end'] as Align[])('applies alignment %s', async (align) => {
            const { container } = renderWithWrapper(Input, { align });
            const input = container.querySelector(selector);

            expect(input?.classList.contains(`input-align-${align}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Layout                                            */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test('applies fullWidth', async () => {
            const { container } = renderWithWrapper(Input, { fullWidth: true });
            const input = container.querySelector(selector);

            expect(input?.classList.contains('input-full-width')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled attribute', async () => {
            const { container } = renderWithWrapper(Input, { disabled: true });
            const input = container.querySelector(selector);

            expect(input?.hasAttribute('disabled')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Events                                            */
    /* ------------------------------------------------- */

    describe('Events', () => {
        test('calls onValueChange when input changes', async () => {
            const onValueChange = vi.fn();
            const { container } = renderWithWrapper(Input, { onValueChange });
            const input = container.querySelector(selector) as HTMLInputElement;

            await userEvent.fill(input, 'hello');
            await userEvent.tab(); // trigger change when leave the field

            expect(onValueChange).toHaveBeenCalledOnce();
        });

        test('calls onchange when input changes', async () => {
            const onchange = vi.fn();
            const { container } = renderWithWrapper(Input, { onchange });
            const input = container.querySelector(selector) as HTMLInputElement;

            await userEvent.fill(input, 'hello');
            await userEvent.tab();

            expect(onchange).toHaveBeenCalledOnce();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Input, { class: 'custom-class' });
            const input = container.querySelector(selector);

            expect(input?.classList.contains('input')).toBe(true);
            expect(input?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLInputElement | undefined;

            renderWithWrapper(Input, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLInputElement);
            expect(current?.type).toBe('text');
        });
    });
});
