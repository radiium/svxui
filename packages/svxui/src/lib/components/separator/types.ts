import type { Color, Orientation } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type SeparatorSize = '1' | '2' | '3' | '4';

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type SeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLDivElement;
    /**
     * Separator color
     */
    color?: Color;
    /**
     * Separator size
     */
    size?: SeparatorSize;
    /**
     * Separator orientation
     */
    orientation?: Orientation;
};
