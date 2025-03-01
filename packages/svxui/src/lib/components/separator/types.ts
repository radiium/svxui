import type { Color, Orientation } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type SeparatorSize = '1' | '2' | '3' | '4';

export type SeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLDivElement;
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
