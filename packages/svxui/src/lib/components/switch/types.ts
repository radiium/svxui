import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type SwitchSize = '1' | '2' | '3';

export type SwitchProps = Omit<HTMLInputAttributes, 'size' | 'color' | 'type'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLInputElement;
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
