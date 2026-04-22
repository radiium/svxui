/** Shared types used across the library. */

import type { HTMLAttributes } from 'svelte/elements';

/**
 * Theme & theme mode.
 */
export type Mode = 'dark' | 'light' | 'system';
export type Theme = 'dark' | 'light';

/**
 * Available color palettes. Extend via `Svxui.ColorMap`.
 */
export type Color = keyof Svxui.ColorMap extends never
    ? 'neutral' | 'blue' | 'green' | 'yellow' | 'orange' | 'red' // Default color palettes
    : keyof Svxui.ColorMap; // Custom color palettes

/**
 * Border radius scale tokens.
 */
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';

/**
 * Spacing scale tokens. Accepts a numeric scale token (`'0'`–`'9'`) or an arbitrary CSS value.
 */
export type LayoutSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | (string & {});

/**
 * CSS `overflow` values.
 */
export type BoxOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';

/**
 * CSS flex child values (`flex-grow`, `flex-shrink`, `flex-basis`).
 */
export type BoxFlexValue = '0' | '1' | (string & {});

/**
 * Box model props shared across layout container components (Box, Flex, Grid).
 * Covers spacing, sizing, flex-child behaviour, and overflow.
 */
export interface BoxModelProps {
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
}

/**
 * Horizontal/vertical alignment values.
 */
export type Align = 'start' | 'center' | 'end';

/**
 * Component layout orientation.
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * CSS text-transform values.
 */
export type TextTransform = 'lowercase' | 'uppercase' | 'capitalize';

/**
 * Floating element placement relative to its reference.
 */
export type FloatingPlacement =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end';

/**
 * Extracts the HTMLElement type from an `HTMLAttributes` declaration.
 */
export type RefFromHTMLAttributes<T> = T extends HTMLAttributes<infer E> ? E : never;

/**
 * Omits properties from `T` whose key contains the substring `K`.
 *
 * Used to work around the TypeScript error:
 * `Expression produces a union type that is too complex to represent`
 *
 * Solution found here:
 * => https://github.com/sveltejs/svelte/issues/16046#issuecomment-2945158062
 */
export type OmitByWord<T, K extends string> = {
    [P in keyof T as P extends `${string}${K}${string}` ? never : P]: T[P];
};
