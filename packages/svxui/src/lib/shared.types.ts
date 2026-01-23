/**
 *
 * Shared types in the library
 *
 */

import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * Base props for polymorphic components
 */
export type PolymorphicProps<E extends keyof SvelteHTMLElements, Props = {}> = Props & {
    /**
     * Render element as
     */
    as?: E;
    /**
     * DOM element ref
     */
    ref?: PolymorphicRef<E>;
} & Omit<SvelteHTMLElements[E], keyof Props | 'as'>;

/**
 * Helper to infer the DOM element type for refs
 */
export type PolymorphicRef<E extends keyof SvelteHTMLElements> = SvelteHTMLElements[E] extends {
    ref?: infer R;
}
    ? R
    : HTMLElement;

/**
 * Colors
 */
export type Color = keyof Svxui.ColorMap;

/**
 * Radius
 */
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';

/**
 * Align
 */
export type Align = 'start' | 'center' | 'end';

/**
 * Orientation
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Transform
 */
export type TextTransform = 'lowercase' | 'uppercase' | 'capitalize';

/**
 * Placement
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
