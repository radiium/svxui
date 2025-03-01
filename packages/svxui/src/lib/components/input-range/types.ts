import type { Color, Orientation, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type InputRangeSize = '1' | '2' | '3';

export type InputRangeProps = Omit<HTMLInputAttributes, 'size' | 'color' | 'type'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLInputElement;
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
     * InputRange full width
     */
    fullWidth?: boolean;
    /**
     * InputRange orientation
     */
    orientation?: Orientation;
};
