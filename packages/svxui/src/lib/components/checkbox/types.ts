import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type CheckboxSize = '1' | '2' | '3';

export type CheckboxProps = Omit<HTMLInputAttributes, 'size' | 'color' | 'type'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLInputElement;
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
