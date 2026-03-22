import type { RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type Display = 'none' | 'inline-flex' | 'flex';
export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
// prettier-ignore
export type Justify = 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly' | 'baseline' | 'stretch' | 'normal';
export type AlignItem = 'start' | 'center' | 'end' | 'baseline' | 'stretch' | 'normal';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type Gap = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type FlexboxProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'display' | 'justify' | 'direction' | 'align' | 'children'
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
     * Flex display variant
     */
    display?: Display;
    /**
     * Justify content
     */
    justify?: Justify;
    /**
     * Flex direction
     */
    direction?: Direction;
    /**
     * Align items
     */
    align?: AlignItem;
    /**
     * Flex wrap
     */
    wrap?: Wrap;
    /**
     * Flex gap
     */
    gap?: Gap;
    /**
     * Flexbox full width
     */
    fullWidth?: boolean;
    /**
     * Flexbox full height
     */
    fullHeight?: boolean;
    /**
     * Flexbox content to render
     */
    children?: Snippet<[void]>;
};
