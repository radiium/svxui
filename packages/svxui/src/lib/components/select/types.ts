import type { Color, Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLOptgroupAttributes, HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements';

export type SelectSize = '1' | '2' | '3';
export type SelectValue<Value extends string | number = string | number, Multiple extends boolean = false> =
    | (Multiple extends true ? Value[] : Value)
    | null
    | undefined;

/**
 * Extends all the standard HTML attributes of the `<select>` element.
 */
export type SelectProps<Value extends string | number, Multiple extends boolean> = Omit<
    HTMLSelectAttributes,
    'value' | 'multiple' | 'color' | 'size' | 'children'
> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLSelectElement;
    /**
     * Current selected value(s).
     * If `multiple` is true, this will be an array of values.
     */
    value?: SelectValue<Value, Multiple>;
    /**
     * Callback when value change
     */
    onValueChange?: (newValue: SelectValue<Value, Multiple>) => void;
    /**
     * Whether multiple values can be selected.
     */
    multiple?: Multiple;
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
     * Select full size
     */
    fullWidth?: boolean;
    /**
     * The native `size` property of HTMLSelectElement. Used only if `multiple` is true.
     */
    selectSize?: HTMLSelectAttributes['size'];
    /**
     * Select content to render
     */
    children?: Snippet<[void]>;
};

/**
 * Extends all the standard HTML attributes of the `<optgroup>` element.
 */
export type SelectOptgroupProps = Omit<HTMLOptgroupAttributes, 'children'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLOptGroupElement;
    /**
     * The label of optgroup
     */
    label: string | number;
    /**
     * Optgroup content to render
     */
    children?: Snippet<[void]>;
};

/**
 * Extends all the standard HTML attributes of the `<option>` element.
 */
export type SelectOptionProps = Omit<HTMLOptionAttributes, 'children'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLOptionElement;
    /**
     * The value of option
     */
    value: string | number;
    /**
     * Option content to render
     */
    children?: Snippet<[void]>;
};
