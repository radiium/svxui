import type { ListboxBuilder, ListboxBuilderOptions } from '$lib/builders/listbox/index.js';
import type { Snippet } from 'svelte';

export type ListboxRootSnippetProps = {
    readonly rootAttrs: Record<string, unknown>;
};

/**
 * This type extends all properties from `ListboxBuilderOptions`.
 */
export type ListboxProps<Value, Multiple extends boolean> = ListboxBuilderOptions<Value, Multiple> & {
    /**
     * Listbox content to render
     * The snippet receives the ListboxBuilder instance as parameter.
     */
    children?: Snippet<[ListboxBuilder<Value, Multiple>]>;
};
