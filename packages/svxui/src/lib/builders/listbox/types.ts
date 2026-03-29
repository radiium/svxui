import type { Orientation } from '$lib/shared.types.js';
import type { SelectionStateOptions } from '$lib/utilities/selection-state/index.js';

/**
 * Listbox builder options
 */
export type ListboxBuilderOptions<Value, Multiple extends boolean> = SelectionStateOptions<
    Value,
    Multiple
> & {
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

/**
 * HTML data-attributes written to the root wrapper element
 */
export type ListboxRootAttributes = {
    readonly id: string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
    readonly tabindex: number;
    readonly role: string;
    readonly 'aria-multiselectable': boolean;
};

/**
 * HTML data-attributes written to the item element
 */
export type ListboxItemAttributes = {
    readonly id: string;
    readonly 'data-state': 'selected' | 'unselected';
    readonly 'data-disabled'?: string;
    readonly 'data-orientation': Orientation;
    readonly tabindex: number;
    readonly role: string;
    readonly 'aria-selected'?: boolean;
    readonly 'aria-disabled': boolean;
    readonly disabled: boolean;
    onclick: (event: MouseEvent) => void;
};
