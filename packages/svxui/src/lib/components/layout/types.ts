import type { RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

// ─── COMMMON ────────────────────────────────────────────────────────

export type LayoutSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | (string & {});

// ─── BOX ────────────────────────────────────────────────────────

export type BoxDisplay = 'none' | 'block' | 'inline' | 'inline-block' | 'contents';
export type BoxOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
export type BoxFlexValue = '0' | '1' | (string & {});
export type BoxPositionScale =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '-1'
    | '-2'
    | '-3'
    | '-4'
    | '-5'
    | '-6'
    | '-7'
    | '-8'
    | '-9'
    | (string & {});

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
     * Inset on all sides (`top`, `right`, `bottom`, `left`).
     */
    inset?: BoxPositionScale;
    /**
     * CSS `top` value.
     */
    top?: BoxPositionScale;
    /**
     * CSS `right` value.
     */
    right?: BoxPositionScale;
    /**
     * CSS `bottom` value.
     */
    bottom?: BoxPositionScale;
    /**
     * CSS `left` value.
     */
    left?: BoxPositionScale;
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
     * Content to render inside the grid container.
     */
    children?: Snippet<[void]>;
};

// ─── CENTER ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type CenterProps<ElementTag extends keyof SvelteHTMLElements = 'div'> =
    SvelteHTMLElements[ElementTag] & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Reference to the rendered DOM element.
         */
        ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
        /**
         * Maximum width of the centered content.
         */
        maxWidth?: string;
        /**
         * Horizontal padding on both sides. Accepts a space scale token or an arbitrary CSS value.
         */
        gutters?: LayoutSpacing;
        /**
         * Centers content intrinsically using `fit-content` instead of a hard max-width.
         */
        intrinsic?: boolean;
        /**
         * Content to render inside the center container.
         */
        children?: Snippet<[void]>;
    };

// ─── SIDEBAR ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type SidebarProps<ElementTag extends keyof SvelteHTMLElements = 'div'> =
    SvelteHTMLElements[ElementTag] & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Reference to the rendered DOM element.
         */
        ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
        /**
         * Which side the sidebar is on.
         */
        side?: 'left' | 'right';
        /**
         * Width of the sidebar. The content area fills the remaining space.
         */
        sideWidth?: string;
        /**
         * Minimum width the content area must maintain before the layout wraps to a stacked column.
         */
        contentMin?: string;
        /**
         * Gap between the sidebar and the content area.
         */
        gap?: LayoutSpacing;
        /**
         * The fixed-width sidebar region.
         */
        sidebar?: Snippet;
        /**
         * The fluid content area.
         */
        children?: Snippet<[void]>;
    };

// ─── SWITCHER ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type SwitcherProps<ElementTag extends keyof SvelteHTMLElements = 'div'> =
    SvelteHTMLElements[ElementTag] & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Reference to the rendered DOM element.
         */
        ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
        /**
         * Container width below which items switch from a row to a stacked column.
         */
        threshold?: string;
        /**
         * Gap between items.
         */
        gap?: LayoutSpacing;
        /**
         * Content to render inside the switcher.
         */
        children?: Snippet<[void]>;
        [key: string]: unknown;
    };

// ─── CLUSTER ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type ClusterProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    FlexProps<ElementTag>,
    'wrap' | 'direction'
>;

// ─── STACK ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type StackProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    FlexProps<ElementTag>,
    'direction'
>;
