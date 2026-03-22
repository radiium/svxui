import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type SwitchSize = '1' | '2' | '3';

/**
 * Extends all the standard HTML attributes of the `<input type="checkbox">` element.
 */
export type SwitchProps = Omit<HTMLInputAttributes, 'color' | 'size' | 'type' | 'indeterminate'> & {
    /**
     * Callback when checked change
     */
    onCheckedChange?: (checked: boolean) => void;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLInputElement;
    /**
     * Switch color
     */
    color?: Color;
    /**
     * Switch size
     */
    size?: SwitchSize;
    /**
     * Switch radius
     */
    radius?: Radius;
};
