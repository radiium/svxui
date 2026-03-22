/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRawSnippet, mount, unmount, type Component } from 'svelte';
import { render } from 'vitest-browser-svelte';
import TestWrapper from './wrapper.svelte';

/**
 * Render a component inside the Wrapper component
 */
export function renderWithWrapper<Props extends Record<string, any>>(
    component: Component<Props>,
    props: Props = {} as Props
): ReturnType<typeof render> {
    const snippet = createRawSnippet(() => {
        return {
            render: () => `<div></div>`,
            setup: (target) => {
                const comp = mount(component, { target, props });
                return () => unmount(comp);
            }
        };
    });

    return render(TestWrapper, {
        children: snippet
    });
}
