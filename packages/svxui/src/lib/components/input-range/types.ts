import type { Color, Orientation, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type InputRangeSize = '1' | '2' | '3';

/**
 * Extends all the standard HTML attributes of the `<input type="range">` element.
 */
export type InputRangeProps = Omit<HTMLInputAttributes, 'color' | 'size' | 'type'> & {
    /**
     * Callback called on value change
     */
    onValueChange?: (newValue: number | undefined | null) => void;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLInputElement;
    /**
     * InputRange color
     */
    color?: Color;
    /**
     * InputRange size
     */
    size?: InputRangeSize;
    /**
     * InputRange radius
     */
    radius?: Radius;
    /**
     * InputRange full width (only when orientation is "horizontal")
     */
    fullWidth?: boolean;
    /**
     * InputRange full height  (only when orientation is "vertical")
     */
    fullHeight?: boolean;
    /**
     * InputRange orientation
     */
    orientation?: Orientation;
};
