import { InputGroup, InputGroupItem, type Color } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

/* ================================================== */
/* InputGroup                                         */
/* ================================================== */

describe('InputGroup component', () => {
    const label = 'group content';
    const children = createRawSnippet(() => ({
        render: () => `<span>${label}</span>`
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(InputGroup, { children });
            const group = container.querySelector('.input-group');

            expect(group).not.toBeNull();
            expect(group?.tagName).toBe('DIV');
            expect(group?.classList.contains('input-group')).toBe(true);
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(InputGroup, {});

            expect(container.querySelector('.input-group')).not.toBeNull();
        });

        test('renders children', async () => {
            const { container } = renderWithWrapper(InputGroup, { children });
            const group = container.querySelector('.input-group');

            expect(group?.textContent).toBe(label);
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(InputGroup, {
                children,
                id: 'my-group',
                'data-testid': 'input-group'
            });
            const group = container.querySelector('.input-group');

            expect(group?.getAttribute('id')).toBe('my-group');
            expect(group?.getAttribute('data-testid')).toBe('input-group');
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base class', async () => {
            const { container } = renderWithWrapper(InputGroup, { children, class: 'custom-class' });
            const group = container.querySelector('.input-group');

            expect(group?.classList.contains('input-group')).toBe(true);
            expect(group?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(InputGroup, {
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
            expect(current?.classList.contains('input-group')).toBe(true);
        });
    });
});

/* ================================================== */
/* InputGroupItem                                     */
/* ================================================== */

describe('InputGroupItem component', () => {
    const label = 'item content';
    const children = createRawSnippet(() => ({
        render: () => `<span>${label}</span>`
    }));

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('renders with default props', async () => {
            const { container } = renderWithWrapper(InputGroupItem, { children });
            const item = container.querySelector('.input-group-item');

            expect(item).not.toBeNull();
            expect(item?.tagName).toBe('DIV');
            expect(item?.classList.contains('input-group-item')).toBe(true);
            expect(item?.getAttribute('data-color')).toBeNull();
        });

        test('renders without children', async () => {
            const { container } = renderWithWrapper(InputGroupItem, {});

            expect(container.querySelector('.input-group-item')).not.toBeNull();
        });

        test('renders children', async () => {
            const { container } = renderWithWrapper(InputGroupItem, { children });
            const item = container.querySelector('.input-group-item');

            expect(item?.textContent).toBe(label);
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(InputGroupItem, {
                children,
                id: 'my-item',
                'data-testid': 'input-group-item'
            });
            const item = container.querySelector('.input-group-item');

            expect(item?.getAttribute('id')).toBe('my-item');
            expect(item?.getAttribute('data-testid')).toBe('input-group-item');
        });
    });

    /* ------------------------------------------------- */
    /* Colors                                            */
    /* ------------------------------------------------- */

    describe('Colors', () => {
        test.each(['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[])(
            'applies color %s',
            async (color) => {
                const { container } = renderWithWrapper(InputGroupItem, { children, color });
                const item = container.querySelector('.input-group-item');

                expect(item?.getAttribute('data-color')).toBe(color);
            }
        );

        test('does not set data-color when color is undefined', async () => {
            const { container } = renderWithWrapper(InputGroupItem, { children });
            const item = container.querySelector('.input-group-item');

            expect(item?.getAttribute('data-color')).toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base class', async () => {
            const { container } = renderWithWrapper(InputGroupItem, { children, class: 'custom-class' });
            const item = container.querySelector('.input-group-item');

            expect(item?.classList.contains('input-group-item')).toBe(true);
            expect(item?.classList.contains('custom-class')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLDivElement | undefined;

            renderWithWrapper(InputGroupItem, {
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
            expect(current?.classList.contains('input-group-item')).toBe(true);
        });
    });
});

/* ================================================== */
/* Composition                                        */
/* ================================================== */

describe('InputGroup + InputGroupItem composition', () => {
    test('renders InputGroupItem children inside InputGroup', async () => {
        const itemLabel = 'item';
        const groupChildren = createRawSnippet(() => ({
            render: () => `<div class="input-group-item">${itemLabel}</div>`
        }));

        const { container } = renderWithWrapper(InputGroup, { children: groupChildren });

        const group = container.querySelector('.input-group');
        const item = container.querySelector('.input-group-item');

        expect(group).not.toBeNull();
        expect(item).not.toBeNull();
        expect(group?.contains(item)).toBe(true);
    });

    test('InputGroup renders multiple children', async () => {
        const groupChildren = createRawSnippet(() => ({
            render: () => `<div><input class="input" /><button class="button">Go</button></div>`
        }));

        const { container } = renderWithWrapper(InputGroup, { children: groupChildren });
        const group = container.querySelector('.input-group');

        expect(group?.querySelector('.input')).not.toBeNull();
        expect(group?.querySelector('.button')).not.toBeNull();
    });
});
