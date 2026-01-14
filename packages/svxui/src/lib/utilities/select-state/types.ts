import type { Orientation } from '$lib/shared.types.js';
import type { ListboxRootAttributes, ListboxStateOptions, SelectionOptions } from '$lib/utilities/index.js';

export type SelectStateOptions<Value, Multiple extends boolean> = ListboxStateOptions<Value, Multiple> & {};

export type ListboxGetItemOptions = {
    id?: string;
    disabled?: boolean;
};

export type ListboxGetItemReturn = {
    selected: boolean;
    disabled: boolean;
    attrs: ListboxItemAttributes;
};

export type SelectAttributes = ListboxRootAttributes & {};

export type ListboxItemAttributes = {
    readonly id: string;
    readonly 'data-selected'?: string;
    readonly 'data-disabled'?: string;
    readonly 'data-orientation': Orientation;
    readonly tabindex: number;
    readonly role: string;
    readonly 'aria-selected': boolean;
    readonly 'aria-disabled': boolean;
    readonly disabled: boolean;
    onclick: (event: MouseEvent) => void;
};
