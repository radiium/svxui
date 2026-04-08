import type { RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

// ─── FLEX ────────────────────────────────────────────────────────

export type FlexDisplay = 'none' | 'inline-flex' | 'flex';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexJustify =
    | 'start'
    | 'center'
    | 'end'
    | 'around'
    | 'between'
    | 'evenly'
    | 'baseline'
    | 'stretch'
    | 'normal';
export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch' | 'normal';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type FlexProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'display' | 'justify' | 'direction' | 'align' | 'children'
> & {
    /**
     * HTML element to render as.
     */
    as?: ElementTag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
    /**
     * CSS `display` value.
     */
    display?: FlexDisplay;
    /**
     * CSS `flex-direction` value.
     */
    direction?: FlexDirection;
    /**
     * CSS `justify-content` value.
     */
    justify?: FlexJustify;
    /**
     * CSS `align-items` value.
     */
    align?: FlexAlign;
    /**
     * CSS `align-content` value. Only effective when `wrap` is active and items span multiple lines.
     */
    alignContent?: FlexAlign;
    /**
     * CSS `flex-wrap` value.
     */
    wrap?: FlexWrap;
    /**
     * Gap between items on both axes.
     */
    gap?: FlexSpacing;
    /**
     * Gap between rows.
     */
    rowGap?: FlexSpacing;
    /**
     * Gap between columns.
     */
    colGap?: FlexSpacing;
    /**
     * Makes the container fill its parent's width.
     */
    fullWidth?: boolean;
    /**
     * Makes the container fill its parent's height.
     */
    fullHeight?: boolean;
    /**
     * Content to render inside the flex container.
     */
    children?: Snippet<[void]>;
};
