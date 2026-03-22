import type { Color } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type RadioSize = '1' | '2' | '3';

/**
 * Extends all the standard HTML attributes of the `<input type="radio">` element.
 */
export type RadioProps = Omit<HTMLInputAttributes, 'color' | 'size' | 'type'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLInputElement;
    /**
     * Radio color
     */
    color?: Color;
    /**
     * Radio size
     */
    size?: RadioSize;
};
