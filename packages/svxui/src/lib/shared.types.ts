/** Shared types used across the library. */

import type { HTMLAttributes } from 'svelte/elements';

/**
 * Available color palettes. Extend via `Svxui.ColorMap`.
 */
export type Color = keyof Svxui.ColorMap;

/**
 * Border radius scale tokens.
 */
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';

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
