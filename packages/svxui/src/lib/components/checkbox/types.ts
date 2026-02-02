import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type CheckboxSize = '1' | '2' | '3';

/**
 * Extends all the standard HTML attributes of the `<input type="checkbox">` element.
 */
export type CheckboxProps = Omit<HTMLInputAttributes, 'size' | 'color' | 'type'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLInputElement;
    /**
     * Checkbox color
     */
    color?: Color;
    /**
     * Checkbox size
     */
    size?: CheckboxSize;
    /**
     * Checkbox radius
     */
    radius?: Radius;
};
