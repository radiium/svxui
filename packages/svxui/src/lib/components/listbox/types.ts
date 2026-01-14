import type { ListboxState } from '$lib/utilities/listbox-state/listbox-state.svelte.js';
import type { ListboxStateOptions } from '$lib/utilities/listbox-state/types.js';
import type { Snippet } from 'svelte';

export type ListboxRootSnippetProps = {
    readonly rootAttrs: Record<string, unknown>;
};

export type ListboxProps<Value, Multiple extends boolean> = ListboxStateOptions<Value, Multiple> & {
    /**
     * Callback when value change
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Listbox Root content to render
     */
    children?: Snippet<[ListboxState<Value, Multiple>]>;
};
