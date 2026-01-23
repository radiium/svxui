import type { ListboxBuilder, ListboxBuilderOptions } from '$lib/builders/listbox/index.js';
import type { Snippet } from 'svelte';

export type ListboxRootSnippetProps = {
    readonly rootAttrs: Record<string, unknown>;
};

export type ListboxProps<Value, Multiple extends boolean> = ListboxBuilderOptions<Value, Multiple> & {
    /**
     * Listbox Root content to render
     */
    children?: Snippet<[ListboxBuilder<Value, Multiple>]>;
};
