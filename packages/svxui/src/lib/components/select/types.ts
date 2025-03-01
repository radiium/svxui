import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLSelectAttributes } from 'svelte/elements';

export type SelectSize = '1' | '2' | '3';
export type SelectOption = {
    label: string | number;
    value: string | number;
    disabled?: boolean | undefined;
};
export type SelectOptionResolver = <T>(item: T) => string | number;

export type SelectProps = Omit<HTMLSelectAttributes, 'size' | 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLSelectElement;
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
    options: SelectOption[] | string[] | number[];
    /**
     * Resolve value of option
     */
    resolveValue?: SelectOptionResolver;
    /**
     * Resolve label fron SelectOption object
     */
    resolveLabel?: SelectOptionResolver;
    /**
     * Select full size
     */
    fullWidth?: boolean;
    /**
     * Native html size
     */
    selectSize?: HTMLSelectAttributes['size'];
};
