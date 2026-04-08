import type { RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { LayoutSpacing } from '../layout/types.js';

// ─── BOX ────────────────────────────────────────────────────────

export type BoxDisplay = 'none' | 'block' | 'inline' | 'inline-block' | 'contents';
export type BoxOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
export type BoxFlexValue = '0' | '1' | (string & {});

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type BoxProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'display' | 'width' | 'height' | 'overflow' | 'children'
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
    display?: BoxDisplay;
    /**
     * Padding on all sides.
     */
    p?: LayoutSpacing;
    /**
     * Padding on the left and right sides.
     */
    px?: LayoutSpacing;
    /**
     * Padding on the top and bottom sides.
     */
    py?: LayoutSpacing;
    /**
     * Padding on the top side.
     */
    pt?: LayoutSpacing;
    /**
     * Padding on the right side.
     */
    pr?: LayoutSpacing;
    /**
     * Padding on the bottom side.
     */
    pb?: LayoutSpacing;
    /**
     * Padding on the left side.
     */
    pl?: LayoutSpacing;
    /**
     * Margin on all sides.
     */
    m?: LayoutSpacing;
    /**
     * Margin on the left and right sides.
     */
    mx?: LayoutSpacing;
    /**
     * Margin on the top and bottom sides.
     */
    my?: LayoutSpacing;
    /**
     * Margin on the top side.
     */
    mt?: LayoutSpacing;
    /**
     * Margin on the right side.
     */
    mr?: LayoutSpacing;
    /**
     * Margin on the bottom side.
     */
    mb?: LayoutSpacing;
    /**
     * Margin on the left side.
     */
    ml?: LayoutSpacing;
    /**
     * CSS `width` value.
     */
    width?: string;
    /**
     * CSS `max-width` value.
     */
    maxWidth?: string;
    /**
     * CSS `min-width` value.
     */
    minWidth?: string;
    /**
     * CSS `height` value.
     */
    height?: string;
    /**
     * CSS `max-height` value.
     */
    maxHeight?: string;
    /**
     * CSS `min-height` value.
     */
    minHeight?: string;
    /**
     * CSS `flex-basis` value.
     */
    flexBasis?: BoxFlexValue;
    /**
     * CSS `flex-grow` value.
     */
    flexGrow?: BoxFlexValue;
    /**
     * CSS `flex-shrink` value.
     */
    flexShrink?: BoxFlexValue;
    /**
     * CSS `overflow` value applied to both axes.
     */
    overflow?: BoxOverflow;
    /**
     * CSS `overflow-x` value.
     */
    overflowX?: BoxOverflow;
    /**
     * CSS `overflow-y` value.
     */
    overflowY?: BoxOverflow;
    /**
     * Content to render inside the box.
     */
    children?: Snippet<[void]>;
};
