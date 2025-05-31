import type { Align, Color, Radius, TextTransform } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonSize = '1' | '2' | '3' | '4';
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'clear';

export type ButtonProps = HTMLButtonAttributes & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLButtonElement;
    /**
     * Button color
     */
    color?: Color;
    /**
     * Button size
     */
    size?: ButtonSize;
    /**
     * Button variant
     */
    variant?: ButtonVariant;
    /**
     * Button radius
     */
    radius?: Radius;
    /**
     * Text transform
     */
    transform?: TextTransform;
    /**
     * Text Align
     */
    align?: Align;
    /**
     * Button active state
     */
    active?: boolean;
    /**
     * Button icon only
     */
    iconOnly?: boolean;
    /**
     * Button full width
     */
    fullWidth?: boolean;
    /**
     * Button content to render
     */
    children?: Snippet<[void]>;
};
