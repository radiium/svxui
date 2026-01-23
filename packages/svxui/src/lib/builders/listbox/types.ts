import type { Orientation } from '$lib/shared.types.js';
import type { SelectionOptions } from '$lib/utilities/selection/index.js';

/**
 * Listbox builder options
 */
export type ListboxBuilderOptions<Value, Multiple extends boolean> = SelectionOptions<Value, Multiple> & {
    /**
     * Callback called on value change
     * @param newValue
     * @returns
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Listbox orientation
     */
    orientation?: Orientation;
    /**
     * Listbox must be disabled or not
     */
    disabled?: boolean;
    /**
     * Loop focus on keyboard navigation
     */
    loop?: boolean;
    /**
     * Activate item on focus
     */
    activateOnFocus?: boolean;
};

/**
 * Listbox item customization
 */
export type ListboxItemOptions = {
    /**
     * Custom listbox item id
     */
    id?: string;
    /**
     * Disable or not listbox item
     */
    disabled?: boolean;
};

/**
 * Listbox item state
 */
export type ListboxItem = {
    /**
     * Listbox item is expanded
     */
    readonly selected: boolean;
    /**
     * Listbox item is disabled
     */
    readonly disabled: boolean;
    /**
     * Listbox item attributes
     */
    readonly attrs: ListboxItemAttributes;
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
