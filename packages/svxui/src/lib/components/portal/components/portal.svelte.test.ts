import { Portal } from '$lib/index.js';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import { renderWithWrapper } from '../../../../tests/render-with-wrapper.svelte.ts';

describe('Portal component', () => {
    const label = 'portal content';
    const children = createRawSnippet(() => ({
        render: () => `<span class="portal-child">${label}</span>`
    }));

    /* ------------------------------------------------- */
    /* Enabled (default)                                 */
    /* ------------------------------------------------- */

    describe('Enabled (default behavior)', () => {
        test('renders children when enabled', async () => {
            renderWithWrapper(Portal, { children });

            const el = document.querySelector('.portal-child');
            expect(el).not.toBeNull();
            expect(el?.textContent).toBe(label);
        });

        test('moves content to document.body by default', async () => {
            const { container } = renderWithWrapper(Portal, { children });

            // The portal wraps children in a div and moves it to body
            // So the child is NOT inside the original container
            const inContainer = container.querySelector('.portal-child');
            const inBody = document.body.querySelector('.portal-child');

            expect(inContainer).toBeNull();
            expect(inBody).not.toBeNull();
        });

        test('portal content is a direct child of body', async () => {
            renderWithWrapper(Portal, { children });

            const el = document.body.querySelector('.portal-child');
            // Should be inside a wrapper div that is a direct child of body
            expect(el?.parentElement?.parentElement).toBe(document.body);
        });
    });

    /* ------------------------------------------------- */
    /* Disabled                                          */
    /* ------------------------------------------------- */

    describe('Disabled (enabled=false)', () => {
        test('renders children in place when disabled', async () => {
            const { container } = renderWithWrapper(Portal, { children, enabled: false });

            const inContainer = container.querySelector('.portal-child');
            expect(inContainer).not.toBeNull();
            expect(inContainer?.textContent).toBe(label);
        });

        test('does not move content to body when disabled', async () => {
            const { container } = renderWithWrapper(Portal, { children, enabled: false });

            // Content stays in the container, body only has the container itself
            const inContainer = container.querySelector('.portal-child');
            expect(inContainer).not.toBeNull();
        });
    });

    /* ------------------------------------------------- */
    /* Custom target                                     */
    /* ------------------------------------------------- */

    describe('Custom target', () => {
        test('portals to a custom CSS selector target', async () => {
            const targetId = 'portal-target-selector';
            const targetEl = document.createElement('div');
            targetEl.id = targetId;
            document.body.appendChild(targetEl);

            try {
                const customChildren = createRawSnippet(() => ({
                    render: () => `<span class="custom-target-child">content</span>`
                }));

                renderWithWrapper(Portal, { children: customChildren, target: `#${targetId}` });

                const el = targetEl.querySelector('.custom-target-child');
                expect(el).not.toBeNull();
            } finally {
                targetEl.remove();
            }
        });

        test('portals to a custom HTMLElement target', async () => {
            const targetEl = document.createElement('div');
            document.body.appendChild(targetEl);

            try {
                const customChildren = createRawSnippet(() => ({
                    render: () => `<span class="htmlelement-target-child">content</span>`
                }));

                renderWithWrapper(Portal, { children: customChildren, target: targetEl });

                const el = targetEl.querySelector('.htmlelement-target-child');
                expect(el).not.toBeNull();
            } finally {
                targetEl.remove();
            }
        });
    });

    /* ------------------------------------------------- */
    /* Without children                                  */
    /* ------------------------------------------------- */

    describe('Without children', () => {
        test('renders without children without error', async () => {
            expect(() => renderWithWrapper(Portal, {})).not.toThrow();
        });
    });
});
