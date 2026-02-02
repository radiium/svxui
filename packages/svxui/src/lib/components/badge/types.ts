import type { Color, Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type BadgeSize = '1' | '2' | '3';
export type BadgeVariant = 'solid' | 'soft' | 'outline';

/**
 * Extends all the standard HTML attributes of the `<span>` element.
 */
export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLSpanElement;
    /**
     * Color of badge
     */
    color?: Color;
    /**
     * Size of badge
     */
    size?: BadgeSize;
    /**
     * Radius of badge
     */
    radius?: Radius;
    /**
     * Variant of badge
     */
    variant?: BadgeVariant;
    /**
     * Disable badge
     */
    disabled?: boolean;
    /**
     * Badge content to render
     */
    children?: Snippet<[void]>;
};
