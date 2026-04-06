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

export type BoxProps<Tag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[Tag],
    'display' | 'width' | 'height' | 'overflow' | 'children'
> & {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: Tag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[Tag]>;
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

export type FlexDisplay = 'flex' | 'inline-flex' | 'none';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type FlexProps<Tag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[Tag],
    'display' | 'children'
> & {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: Tag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[Tag]>;
    /**
     * CSS `display` value.
     * @default 'flex'
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
     * CSS `flex-wrap` value.
     */
    wrap?: FlexWrap;
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
     * Content to render inside the flex container.
     */
    children?: Snippet<[void]>;
};

// ─── GRID ────────────────────────────────────────────────────────

export type GridDisplay = 'grid' | 'inline-grid' | 'none';

export type GridProps<Tag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[Tag],
    'display' | 'children'
> & {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: Tag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[Tag]>;
    /**
     * CSS `display` value.
     * @default 'grid'
     */
    display?: GridDisplay;
    /**
     * Number of columns (generates `repeat(N, 1fr)`) or a full CSS
     * `grid-template-columns` string.
     * @example cols="3"          → repeat(3, 1fr)
     * @example cols="200px 1fr"  → 200px 1fr
     */
    cols?: string;
    /**
     * Number of rows or a full `grid-template-rows` string.
     * @example rows="2"        → repeat(2, 1fr)
     * @example rows="auto 1fr" → auto 1fr
     */
    rows?: string;
    /**
     * Named template areas string (`grid-template-areas`).
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
     * When set, generates `repeat(auto-fill, minmax(value, 1fr))`.
     * Creates a responsive grid without media queries.
     * @example autoFill="200px"
     */
    autoFill?: string;
    /**
     * Same as `autoFill` but uses `auto-fit` — empty tracks collapse to zero.
     * @example autoFit="200px"
     */
    autoFit?: string;
    /**
     * Content to render inside the grid container.
     */
    children?: Snippet<[void]>;
};

// ─── CENTER ────────────────────────────────────────────────────────

export type CenterProps<Tag extends keyof SvelteHTMLElements = 'div'> = {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: Tag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[Tag]>;
    /**
     * Maximum width of the centered content.
     * @default '65ch'
     */
    maxWidth?: string;
    /**
     * Horizontal padding on both sides. Accepts a space scale token or an
     * arbitrary CSS value.
     */
    gutters?: LayoutSpacing;
    /**
     * When true, centers content intrinsically using `fit-content`
     * instead of a hard max-width.
     * @default false
     */
    intrinsic?: boolean;
    /**
     * Content to render inside the center container.
     */
    children?: Snippet<[void]>;
    [key: string]: unknown;
};

// ─── SIDEBAR ────────────────────────────────────────────────────────

export type SidebarProps<Tag extends keyof SvelteHTMLElements = 'div'> = {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: Tag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[Tag]>;
    /**
     * Which side the sidebar is on.
     * @default 'left'
     */
    side?: 'left' | 'right';
    /**
     * Width of the sidebar. The content area fills the remaining space.
     * @default '240px'
     */
    sideWidth?: string;
    /**
     * Minimum width the content area must maintain before the layout wraps
     * to a stacked column. No media query needed.
     * @default '50%'
     */
    contentMin?: string;
    /**
     * Gap between the sidebar and the content area.
     * @default '4'
     */
    gap?: LayoutSpacing;
    /**
     * Named region: the fixed-width sidebar.
     */
    sidebar?: Snippet;
    /**
     * Named region: the fluid content area.
     */
    content?: Snippet;
    /**
     * Fallback content — rendered in the content area when the `content`
     * snippet is not provided.
     */
    children?: Snippet<[void]>;
    [key: string]: unknown;
};

// ─── SWITCHER ────────────────────────────────────────────────────────

export type SwitcherProps<Tag extends keyof SvelteHTMLElements = 'div'> = {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: Tag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[Tag]>;
    /**
     * Container width below which items switch from a row to a stacked
     * column layout. No media query needed.
     * @default '600px'
     */
    threshold?: string;
    /**
     * Gap between items.
     * @default '4'
     */
    gap?: LayoutSpacing;
    /**
     * Content to render inside the switcher.
     */
    children?: Snippet<[void]>;
    [key: string]: unknown;
};

// ─── CLUSTER ────────────────────────────────────────────────────────

export type ClusterProps = {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: string;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLElement;
    /**
     * Gap between items.
     * @default '2'
     */
    gap?: LayoutSpacing;
    /**
     * CSS `justify-content` value.
     * @default 'start'
     */
    justify?: 'start' | 'center' | 'end';
    /**
     * CSS `align-items` value.
     * @default 'center'
     */
    align?: 'start' | 'center' | 'end' | 'baseline';
    /**
     * Content to render inside the cluster.
     */
    children?: Snippet<[void]>;
};

// ─── STACK ────────────────────────────────────────────────────────

export type StackProps = {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: string;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLElement;
    /**
     * Gap between stacked items.
     * @default '4'
     */
    gap?: LayoutSpacing;
    /**
     * CSS `align-items` value.
     */
    align?: FlexAlign;
    /**
     * Content to render inside the stack.
     */
    children?: Snippet<[void]>;
    [key: string]: unknown;
};
