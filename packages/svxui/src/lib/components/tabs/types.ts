import type { TabsState, TabsStateOptions } from '$lib/utilities/index.js';
import type { Snippet } from 'svelte';

export type TabsProps<Value> = TabsStateOptions<Value> & {
    /**
     * Callback when value change
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Tab Root content to render
     */
    children?: Snippet<[TabsState<Value>]>;
};
