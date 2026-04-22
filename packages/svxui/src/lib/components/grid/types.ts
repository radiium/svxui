import type { RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { LayoutSpacing } from '../layout/types.js';

// ─── GRID ────────────────────────────────────────────────────────

export type GridDisplay = 'grid' | 'inline-grid' | 'none';
export type GridFlow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type GridProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'display' | 'children'
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
    display?: GridDisplay;
    /**
     * Number of columns as an integer shorthand (`"3"` → `repeat(3, 1fr)`) or a full `grid-template-columns` string.
     */
    cols?: string;
    /**
     * Number of rows as an integer shorthand (`"2"` → `repeat(2, 1fr)`) or a full `grid-template-rows` string.
     */
    rows?: string;
    /**
     * CSS `grid-template-areas` string.
     */
    areas?: string;
    /**
     * Gap between items on both axes.
     */
    gap?: LayoutSpacing;
    /**
     * Gap between rows.
     */
    rowGap?: LayoutSpacing;
    /**
     * Gap between columns.
     */
    colGap?: LayoutSpacing;
    /**
     * Generates `repeat(auto-fill, minmax(value, 1fr))`. Takes precedence over `cols`.
     */
    autoFill?: string;
    /**
     * Generates `repeat(auto-fit, minmax(value, 1fr))`. Empty tracks collapse to zero. Takes precedence over `cols`.
     */
    autoFit?: string;
    /**
     * CSS `grid-auto-rows` value.
     */
    autoRows?: string;
    /**
     * CSS `grid-auto-flow` value.
     */
    flow?: GridFlow;
    /**
     * CSS `align-items` value.
     */
    align?: GridAlign;
    /**
     * Makes the container fill its parent's width.
     */
    fullWidth?: boolean;
    /**
     * Makes the container fill its parent's height.
     */
    fullHeight?: boolean;
    /**
     * Content to render inside the grid container.
     */
    children?: Snippet<[void]>;
};
