import { Dialog, type DialogProps } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Dialog component', () => {
    const selector = '[role="dialog"]';

    /* ------------------------------------------------- */
    /* Basic rendering                                   */
    /* ------------------------------------------------- */

    describe('Basic Rendering', () => {
        test('does not render when open is false', async () => {
            const { container } = renderWithWrapper(Dialog, { open: false });
            const dialog = container.querySelector(selector);

            expect(dialog).toBeNull();
        });

        test('renders when open is true', async () => {
            const { container } = renderWithWrapper(Dialog, { open: true });
            const dialog = container.querySelector(selector);

            expect(dialog).not.toBeNull();
        });

        test('renders with default props', async () => {
            const { container } = renderWithWrapper(Dialog, { open: true });
            const dialog = container.querySelector(selector);

            expect(dialog?.classList.contains('dialog-content')).toBe(true);
            expect(dialog?.classList.contains('dialog-fixed')).toBe(true);
        });

        test('renders children content', async () => {
            const children = createRawSnippet(() => ({
                render: () => '<p data-testid="content">Hello</p>'
            }));

            const { container } = renderWithWrapper(Dialog, {
                open: true,
                children
            });

            const content = container.querySelector('[data-testid="content"]');
            expect(content).not.toBeNull();
        });

        test('forwards extra html attributes', async () => {
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                id: 'my-dialog',
                'data-testid': 'dialog'
            });
            const dialog = container.querySelector(selector);

            expect(dialog?.getAttribute('id')).toBe('my-dialog');
            expect(dialog?.getAttribute('data-testid')).toBe('dialog');
        });
    });

    /* ------------------------------------------------- */
    /* Layout                                            */
    /* ------------------------------------------------- */

    describe('Layout', () => {
        test.each(['fixed', 'scroll', 'fullscreen'] as DialogProps['layout'][])(
            'applies layout %s',
            async (layout: DialogProps['layout']) => {
                const { container } = renderWithWrapper(Dialog, { open: true, layout });
                const dialog = container.querySelector(selector);
                const backdrop = container.querySelector('.dialog-backdrop');

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                expect(dialog?.classList.contains('dialog-' + layout!)).toBe(true);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                expect(backdrop?.classList.contains('dialog-' + layout!)).toBe(true);
            }
        );
    });

    /* ------------------------------------------------- */
    /* Backdrop                                          */
    /* ------------------------------------------------- */

    describe('Backdrop', () => {
        test('renders backdrop when open', async () => {
            const { container } = renderWithWrapper(Dialog, { open: true });
            const backdrop = container.querySelector('.dialog-backdrop');

            expect(backdrop).not.toBeNull();
        });

        test('applies blurBackdrop class', async () => {
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                blurBackdrop: true
            });
            const backdrop = container.querySelector('.dialog-backdrop');

            expect(backdrop?.classList.contains('dialog-blurbackdrop')).toBe(true);
        });

        test('does not apply blurBackdrop in fullscreen layout', async () => {
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                blurBackdrop: true,
                layout: 'fullscreen'
            });
            const backdrop = container.querySelector('.dialog-backdrop');

            expect(backdrop?.classList.contains('dialog-blurbackdrop')).toBe(false);
        });

        test('closes dialog on backdrop click when closeOnBackdropClick is true', async () => {
            const onClose = vi.fn();
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                closeOnBackdropClick: true,
                onClose
            });
            const backdrop = container.querySelector('.dialog-backdrop') as HTMLElement;

            await userEvent.click(backdrop);

            expect(onClose).toHaveBeenCalledOnce();
        });

        test('does not close dialog on backdrop click when closeOnBackdropClick is false', async () => {
            const onClose = vi.fn();
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                closeOnBackdropClick: false,
                onClose
            });
            const backdrop = container.querySelector('.dialog-backdrop') as HTMLElement;

            await userEvent.click(backdrop);

            expect(onClose).not.toHaveBeenCalled();
        });
    });

    /* ------------------------------------------------- */
    /* Keyboard interactions                             */
    /* ------------------------------------------------- */

    describe('Keyboard interactions', () => {
        test('closes dialog on Escape key when closeOnEscape is true', async () => {
            const onClose = vi.fn();
            renderWithWrapper(Dialog, {
                open: true,
                closeOnEscape: true,
                onClose
            });

            await userEvent.keyboard('{Escape}');

            expect(onClose).toHaveBeenCalledOnce();
        });

        test('does not close dialog on Escape key when closeOnEscape is false', async () => {
            const onClose = vi.fn();
            renderWithWrapper(Dialog, {
                open: true,
                closeOnEscape: false,
                onClose
            });

            await userEvent.keyboard('{Escape}');

            expect(onClose).not.toHaveBeenCalled();
        });
    });

    /* ------------------------------------------------- */
    /* keepMounted                                       */
    /* ------------------------------------------------- */

    describe('keepMounted', () => {
        test('renders dialog in DOM when keepMounted is true and open is false', async () => {
            const { container } = renderWithWrapper(Dialog, {
                open: false,
                keepMounted: true
            });
            const dialog = container.querySelector(selector);

            expect(dialog).not.toBeNull();
        });

        test('applies keepmounted class on backdrop and dialog', async () => {
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                keepMounted: true
            });
            const backdrop = container.querySelector('.dialog-backdrop');
            const dialog = container.querySelector(selector);

            expect(backdrop?.classList.contains('dialog-keepmounted')).toBe(true);
            expect(dialog?.classList.contains('dialog-keepmounted')).toBe(true);
        });
    });

    /* ------------------------------------------------- */
    /* Ref binding                                       */
    /* ------------------------------------------------- */

    describe('Ref binding', () => {
        test('binds ref correctly', async () => {
            let current: HTMLDivElement | undefined = undefined;

            renderWithWrapper(Dialog, {
                open: true,
                get ref() {
                    return current;
                },
                set ref(value) {
                    current = value;
                }
            });

            await Promise.resolve();

            expect(current).toBeInstanceOf(HTMLElement);
        });
    });

    /* ------------------------------------------------- */
    /* Custom class merging                              */
    /* ------------------------------------------------- */

    describe('Custom class', () => {
        test('merges custom class with base classes', async () => {
            const { container } = renderWithWrapper(Dialog, {
                open: true,
                class: 'custom-class'
            });
            const dialog = container.querySelector(selector);

            expect(dialog?.classList.contains('dialog-content')).toBe(true);
            expect(dialog?.classList.contains('custom-class')).toBe(true);
        });
    });
});
