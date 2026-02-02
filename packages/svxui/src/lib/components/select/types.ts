import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLSelectAttributes } from 'svelte/elements';

export type SelectSize = '1' | '2' | '3';
export type SelectOptionType = string | number | Record<string, any> | undefined;
export type SelectValueChange<T> = (newValue: T) => void;

/**
 * Extends all the standard HTML attributes of the `<select>` element.
 */
export type SelectProps<T extends SelectOptionType> = Omit<HTMLSelectAttributes, 'size' | 'color'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLSelectElement;
    /**
     * Callback when value change
     */
    onValueChange?: SelectValueChange<T>;
    /**
     * Select size
     */
    size?: SelectSize;
    /**
     * Select color
     */
    color?: Color;
    /**
     * Select radius
     */
    radius?: Radius;
    /**
     * Select options
     */
    options: T[];
    /**
     * Resolve value of option
     */
    optionLabel?: string | ((item: T) => string | number);
    /**
     * Resolve label fron SelectOption object
     */
    optionValue?: string | ((item: T) => string | number);
    /**
     * Select full size
     */
    fullWidth?: boolean;
    /**
     * Native html size
     */
    selectSize?: HTMLSelectAttributes['size'];
};
