import { type Color, type Radius, type SelectSize } from '$lib/index.js';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';
import SelectWithOptions from '../../../../tests/select-with-options.svelte';

/* ------------------------------------------------- */
/* Helpers                                           */
/* ------------------------------------------------- */

type StringOption = string;
type ObjectOption = { label: string; value: string; disabled?: boolean };

/**
 * Render a Select with inline SelectOption children.
 */
function renderSelect(props: Record<string, unknown>, options: StringOption[] | ObjectOption[] = []) {
    const normalizedOptions = options.map((opt) =>
        typeof opt === 'string' ? { label: opt, value: opt } : opt
    );

    (props as any).options = normalizedOptions;
    return renderWithWrapper(SelectWithOptions, props as any);
}

/* ------------------------------------------------- */
/* Test data                                         */
/* ------------------------------------------------- */

const stringOptions: StringOption[] = ['apple', 'banana', 'cherry'];

const objectOptions: ObjectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' }
];

/* ------------------------------------------------- */
/* Tests                                             */
/* ------------------------------------------------- */

describe('Select component', () => {
    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderSelect({}, stringOptions);
            const select = container.querySelector('select');

            expect(select).not.toBeNull();
            expect(select?.classList.contains('select')).toBe(true);
            expect(select?.classList.contains('select-size-2')).toBe(true);
            expect(select?.classList.contains('select-full-width')).toBe(false);
            expect(select?.getAttribute('data-color')).toBeNull();
            expect(select?.getAttribute('data-radius')).toBeNull();
            expect(select?.hasAttribute('multiple')).toBe(false);
            expect(select?.hasAttribute('disabled')).toBe(false);
        });

        test('renders as select element', async () => {
            const { container } = renderSelect({});

            expect(container.querySelector('select')?.tagName).toBe('SELECT');
        });

        test('renders empty select when no children provided', async () => {
            const { container } = renderSelect({});
            const select = container.querySelector('select');

            expect(select?.querySelectorAll('option').length).toBe(0);
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderSelect({ id: 'my-select', 'data-testid': 'select' }, stringOptions);
            const select = container.querySelector('select');

            expect(select?.getAttribute('id')).toBe('my-select');
            expect(select?.getAttribute('data-testid')).toBe('select');
        });
    });

    /* ------------------------------------------------- */
    /* Placeholder                                       */
    /* ------------------------------------------------- */

    describe('Placeholder', () => {
        test('renders placeholder option when value is nil', async () => {
            const { container } = renderSelect({ placeholder: 'Choose an option' }, objectOptions);
            const options = container.querySelectorAll('option');
            const placeholder = options[0];

            expect(placeholder.textContent?.trim()).toBe('--Choose an option--');
            expect(placeholder.hasAttribute('disabled')).toBe(true);
            expect(placeholder.getAttribute('value')).toBe('');
        });

        test('does not render placeholder when value is set', async () => {
            const { container } = renderSelect(
                { placeholder: 'Choose an option', value: 'apple' },
                objectOptions
            );
            const options = container.querySelectorAll('option');

            expect(options.length).toBe(objectOptions.length);
            expect(options[0].textContent?.trim()).not.toContain('--Choose an option--');
        });

        test('does not render placeholder when multiple is true', async () => {
            const { container } = renderSelect(
                { placeholder: 'Choose an option', multiple: true },
                objectOptions
            );
            const options = container.querySelectorAll('option');

            expect(options.length).toBe(objectOptions.length);
        });
    });

    /* ------------------------------------------------- */
    /* Sizes                                             */
    /* ------------------------------------------------- */

    describe('Sizes', () => {
        test.each(['1', '2', '3'] as SelectSize[])('applies size %s', async (size) => {
            const { container } = renderSelect({ size });
            const select = container.querySelector('select');

            expect(select?.classList.contains(`select-size-${size}`)).toBe(true);
        });

        test('applies selectSize as html size attribute when multiple is true', async () => {
            const { container } = renderSelect({ multiple: true, selectSize: 4 });
            const select = container.querySelector('select');

            expect(select?.getAttribute('size')).toBe('4');
        });

        test('does not apply selectSize when multiple is false', async () => {
            const { container } = renderSelect({ selectSize: 4 });
            const select = container.querySelector('select');

            expect(select?.getAttribute('size')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderSelect({ color });
                const select = container.querySelector('select');

                expect(select?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderSelect({});
            const select = container.querySelector('select');

            expect(select?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Radius                                            */
    /* ------------------------------------------------- */

    describe('Radius', () => {
        test.each(['none', 'small', 'medium', 'large', 'full'] as Radius[])(
            'applies radius %s',
            async (radius) => {
                const { container } = renderSelect({ radius });
                const select = container.querySelector('select');

                expect(select?.getAttribute('data-radius')).toBe(radius);
            }
        );

        test('does not set data-radius when radius is undefined', async () => {
            const { container } = renderSelect({});
            const select = container.querySelector('select');

            expect(select?.getAttribute('data-radius')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Layout                                            */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test('applies fullWidth', async () => {
            const { container } = renderSelect({ fullWidth: true });
            const select = container.querySelector('select');

            expect(select?.classList.contains('select-full-width')).toBe(true);
        });

        test('does not apply fullWidth by default', async () => {
            const { container } = renderSelect({});
            const select = container.querySelector('select');

            expect(select?.classList.contains('select-full-width')).toBe(false);
        });
    });

    /* ------------------------------------------------- */
    /* Multiple                                          */
    /* ------------------------------------------------- */

    describe('Multiple', () => {
        // test('applies multiple attribute when multiple is true', async () => {
        //     const { container } = renderSelect({ multiple: true });
        //     const select = container.querySelector('select');

        //     expect(select?.hasAttribute('multiple')).toBe(true);
        // });

        // test('does not apply multiple attribute by default', async () => {
        //     const { container } = renderSelect({});
        //     const select = container.querySelector('select');

        //     expect(select?.hasAttribute('multiple')).toBe(false);
        // });

        // test('normalizes value to array when multiple is true and value is undefined', async () => {
        //     const { container } = renderSelect({ multiple: true }, objectOptions);
        //     const select = container.querySelector('select') as HTMLSelectElement;

        //     expect(select.selectedOptions.length).toBe(0);
        // });

        test('normalizes value to scalar when multiple is false and value is array', async () => {
            const { container } = renderSelect(
                { multiple: false, value: ['apple', 'banana'] as any },
                objectOptions
            );
            const select = container.querySelector('select') as HTMLSelectElement;
            await vi.waitFor(() => expect(select.value).toBe('apple'));
        });
    });

    /* ------------------------------------------------- */
    /* Events                                            */
    /* ------------------------------------------------- */

    describe('Events', () => {
        test('calls onValueChange when selection changes', async () => {
            const onValueChange = vi.fn();
            const { container } = renderSelect({ onValueChange }, objectOptions);
            const select = container.querySelector('select') as HTMLSelectElement;

            await userEvent.selectOptions(select, 'apple');

            expect(onValueChange).toHaveBeenCalledOnce();
        });

        test('calls onchange when selection changes', async () => {
            const onchange = vi.fn();
            const { container } = renderSelect({ onchange }, objectOptions);
            const select = container.querySelector('select') as HTMLSelectElement;

            await userEvent.selectOptions(select, 'apple');

            expect(onchange).toHaveBeenCalledOnce();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderSelect({ class: 'custom-class' });
            const select = container.querySelector('select');

            expect(select?.classList.contains('select')).toBe(true);
            expect(select?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLSelectElement | undefined;

            renderSelect({
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            await vi.waitFor(() => expect(current).toBeInstanceOf(HTMLSelectElement));
        });
    });
});
