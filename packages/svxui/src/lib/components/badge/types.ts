import type { Color, Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type BadgeSize = '1' | '2' | '3';
export type BadgeVariant = 'solid' | 'soft' | 'outline';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLSpanElement;
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
    disabled?: boolean | undefined;
    /**
     * Badge content to render
     */
    children?: Snippet<[void]>;
};
