import type { Align, Color, RefFromHTMLAttributes, TextTransform } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type TextSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type TextWeight = 'light' | 'regular' | 'medium' | 'bold';
export type TextWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';
export type TextUnderline = 'auto' | 'always' | 'hover' | 'none';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type TextProps<ElementTag extends keyof SvelteHTMLElements = 'span'> = Omit<
    SvelteHTMLElements[ElementTag],
    'color' | 'size' | 'weight' | 'transform' | 'align' | 'disabled'
> & {
    /**
     * HTML element to render as.
     */
    as?: ElementTag;
    /**
     * Reference to the rendered DOM element.
     * The element type is inferred from `as`.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
    /**
     * Text color
     */
    color?: Color;
    /**
     * Font size
     */
    size?: TextSize;
    /**
     * Font weight
     */
    weight?: TextWeight;
    /**
     * Text transform
     */
    transform?: TextTransform;
    /**
     * Text alignment
     */
    align?: Align;
    /**
     * Wrap text mode
     */
    wrap?: TextWrap;
    /**
     * Text decoration underline
     */
    underline?: TextUnderline;
    /**
     * Truncate text with ellipsis
     */
    truncate?: boolean;
    /**
     * Mute text (like disabled without aria-disabled)
     */
    muted?: boolean;
    /**
     * Disable text
     */
    disabled?: boolean;
    /**
     * Text content to render
     */
    children?: Snippet<[void]>;
};
