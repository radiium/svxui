import type { ListboxGetItemReturn, ListboxStateOptions, SelectionValue } from '$lib/index.js';
import type { Snippet } from 'svelte';

export type SelectFloatProps<V, M extends boolean> = ListboxStateOptions<V, M> & {
    options: V[];
    placeholder?: string;
    renderValue?: Snippet<[SelectionValue<V, M>]>;
    renderOption?: Snippet<[V, ListboxGetItemReturn]>;
    renderOptionLabel?: Snippet<[V]>;
};
