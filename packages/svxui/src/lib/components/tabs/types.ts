import type { TabsBuilder, TabsBuilderOptions } from '$lib/builders/tabs/index.js';
import type { Snippet } from 'svelte';

export type TabsProps<Value> = TabsBuilderOptions<Value> & {
    /**
     * Tab Root content to render
     */
    children?: Snippet<[TabsBuilder<Value>]>;
};
