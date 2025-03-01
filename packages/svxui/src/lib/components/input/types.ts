import type { Align, Color, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type InputSize = '1' | '2' | '3';
export type InputType =
    | 'text'
    | 'number'
    | 'search'
    | 'password'
    | 'email'
    | 'tel'
    | 'url'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week';

export type InputProps = Omit<HTMLInputAttributes, 'size' | 'color' | 'type'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLInputElement;
    /**
     * Input color
     */
    color?: Color;
    /**
     * Input color
     */
    size?: InputSize;
    /**
     * Input color
     */
    radius?: Radius;
    /**
     * Allowed input type
     */
    type?: InputType;
    /**
     * Text align
     */
    align?: Align;
    /**
     * Input full width
     */
    fullWidth?: boolean;
    /**
     * Native html input size
     */
    inputSize?: number;
};
