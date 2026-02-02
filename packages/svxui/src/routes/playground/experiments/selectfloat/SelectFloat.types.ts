import type { ListboxBuilderOptions, ListboxItem, SelectionStateValue } from '$lib/index.js';
import type { Snippet } from 'svelte';

export type SelectFloatProps<V, M extends boolean> = ListboxBuilderOptions<V, M> & {
    options: V[];
    placeholder?: string;
    renderValue?: Snippet<[SelectionStateValue<V, M>]>;
    renderOption?: Snippet<[V, ListboxItem]>;
    renderOptionLabel?: Snippet<[V]>;
};
