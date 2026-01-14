import type { Orientation } from '$lib/shared.types.js';
import type { SelectionOptions } from '$lib/utilities/index.js';

export type ListboxStateOptions<Value, Multiple extends boolean> = SelectionOptions<Value, Multiple> & {
    onValueChange?: (newValue: Value) => void;
    orientation?: Orientation;
    disabled?: boolean;
    loop?: boolean;
    activateOnFocus?: boolean;
};

export type ListboxGetItemOptions = {
    id?: string;
    disabled?: boolean;
};

export type ListboxGetItemReturn = {
    selected: boolean;
    disabled: boolean;
    attrs: ListboxItemAttributes;
};

export type ListboxRootAttributes = {
    readonly id: string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
    readonly tabindex: number;
    readonly role: string;
    readonly 'aria-multiselectable': boolean;
};

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
