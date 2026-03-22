import { type Component } from 'svelte';
import { render } from 'vitest-browser-svelte';
/**
 * Render a component inside the Wrapper component
 */
export declare function renderWithWrapper<Props extends Record<string, any>>(
    component: Component<Props>,
    props?: Props
): ReturnType<typeof render>;
