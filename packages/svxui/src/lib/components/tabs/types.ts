import type { TabsBuilder, TabsBuilderOptions } from '$lib/builders/tabs/index.js';
import type { Snippet } from 'svelte';

/**
 * This type extends all properties from `TabsBuilderOptions`.
 */
export type TabsProps<Value> = TabsBuilderOptions<Value> & {
    /**
     * Tab content to render
     * The snippet receives the TabsBuilder instance as parameter.
     */
    children?: Snippet<[TabsBuilder<Value>]>;
};
