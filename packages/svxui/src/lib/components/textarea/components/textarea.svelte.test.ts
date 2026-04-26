import { Textarea, type Color, type Radius, type TextareaSize } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Textarea component', () => {
    const selector = 'textarea';

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea).not.toBeNull();
            expect(textarea?.classList.contains('textarea')).toBe(true);
            expect(textarea?.classList.contains('textarea-size-2')).toBe(true);
            expect(textarea?.classList.contains('textarea-full-width')).toBe(false);
            expect(textarea?.classList.contains('textarea-resizable')).toBe(false);

            expect(textarea?.getAttribute('data-color')).toBeNull();
            expect(textarea?.getAttribute('data-radius')).toBeNull();
            expect(textarea?.getAttribute('rows')).toBe('3');
            expect(textarea?.getAttribute('spellcheck')).toBe('false');
            expect(textarea?.hasAttribute('disabled')).toBe(false);
        });

        test('renders as a textarea element', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea?.tagName).toBe('TEXTAREA');
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Textarea, {
                id: 'my-textarea',
                'data-testid': 'textarea',
                placeholder: 'Enter text'
            });
            const textarea = container.querySelector(selector);

            expect(textarea?.getAttribute('id')).toBe('my-textarea');
            expect(textarea?.getAttribute('data-testid')).toBe('textarea');
            expect(textarea?.getAttribute('placeholder')).toBe('Enter text');
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as TextareaSize[])('applies size %s', async (size) => {
            const { container } = renderWithWrapper(Textarea, { size });
            const textarea = container.querySelector(selector);

            expect(textarea?.classList.contains(`textarea-size-${size}`)).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(Textarea, { color });
                const textarea = container.querySelector(selector);

                expect(textarea?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const { container } = renderWithWrapper(Textarea, { radius });
                const textarea = container.querySelector(selector);

                expect(textarea?.getAttribute('data-radius')).toBe(radius);
            }
        );

        test('does not set data-radius when radius is undefined', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea?.getAttribute('data-radius')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Layout                                            */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test('applies fullWidth', async () => {
            const { container } = renderWithWrapper(Textarea, { fullWidth: true });
            const textarea = container.querySelector(selector);

            expect(textarea?.classList.contains('textarea-full-width')).toBe(true);
        });

        test('does not apply fullWidth by default', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea?.classList.contains('textarea-full-width')).toBe(false);
        });

        test('applies resizable', async () => {
            const { container } = renderWithWrapper(Textarea, { resizable: true });
            const textarea = container.querySelector(selector);

            expect(textarea?.classList.contains('textarea-resizable')).toBe(true);
        });

        test('does not apply resizable by default', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea?.classList.contains('textarea-resizable')).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Disabled state                                    */
    /* ------------------------------------------------- */

    describe('Disabled state', () => {
        test('applies disabled attribute', async () => {
            const { container } = renderWithWrapper(Textarea, { disabled: true });
            const textarea = container.querySelector(selector);

            expect(textarea?.hasAttribute('disabled')).toBe(true);
        });

        test('does not apply disabled attribute by default', async () => {
            const { container } = renderWithWrapper(Textarea, {});
            const textarea = container.querySelector(selector);

            expect(textarea?.hasAttribute('disabled')).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Events                                            */
    /* ------------------------------------------------- */

    describe('Events', () => {
        test('calls oninput when user types', async () => {
            const oninput = vi.fn();
            const { container } = renderWithWrapper(Textarea, { oninput });
            const textarea = container.querySelector(selector) as HTMLTextAreaElement;

            await userEvent.click(textarea);
            await userEvent.type(textarea, 'hello');

            expect(oninput).toHaveBeenCalled();
        });

        test('calls onchange when textarea loses focus after typing', async () => {
            const onchange = vi.fn();
            const { container } = renderWithWrapper(Textarea, { onchange });
            const textarea = container.querySelector(selector) as HTMLTextAreaElement;

            await userEvent.click(textarea);
            await userEvent.type(textarea, 'hello');
            await userEvent.tab();

            expect(onchange).toHaveBeenCalledOnce();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Textarea, { class: 'custom-class' });
            const textarea = container.querySelector(selector);

            expect(textarea?.classList.contains('textarea')).toBe(true);
            expect(textarea?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLTextAreaElement | undefined;

            renderWithWrapper(Textarea, {
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLTextAreaElement);
        });
    });
});
