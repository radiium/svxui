import type { Color } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type RadioSize = '1' | '2' | '3';

export type RadioProps = Omit<HTMLInputAttributes, 'size' | 'color' | 'type'> & {
    /**
     * Rendered DOM element
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
