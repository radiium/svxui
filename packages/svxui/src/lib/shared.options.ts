/**
 *
 * Shared options for component props.
 * (Used to generate documentation)
 *
 */

import type { Align, Color, FloatingPlacement, Orientation, Radius, TextTransform } from './shared.types.js';

// Colors
export const defaultAliasColorOptions = [
    'neutral', //
    'blue',
    'green',
    'yellow',
    'orange',
    'red'
] as const;

/**
 * All radix accent colors
 */
export const radixColorAccentOptions = [
    'gold', //
    'bronze',
    'brown',
    'yellow',
    'amber',
    'orange',
    'tomato',
    'red',
    'ruby',
    'crimson',
    'pink',
    'plum',
    'purple',
    'violet',
    'iris',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'jade',
    'green',
    'grass',
    'lime',
    'mint',
    'sky'
] as const;

/**
 * All radix gray colors
 */
export const radixColorGrayOptions = [
    'gray', //
    'mauve',
    'slate',
    'sage',
    'olive',
    'sand'
] as const;

export const colorOptions = [
    ...defaultAliasColorOptions
    // ...radixColorAccentOptions,
    // ...radixColorGrayOptions
] as const satisfies Color[];

/**
 * All radius options
 */
export const radiusOptions = [
    'none', //
    'small',
    'medium',
    'large',
    'full'
] as const satisfies Radius[];

/**
 * All align options
 */
export const alignOptions = [
    'start', //
    'center',
    'end'
] as const satisfies Align[];

/**
 * All orientation
 */
export const orientationOptions = [
    'horizontal', //
    'vertical'
] as const satisfies Orientation[];

/**
 * All text transform options
 */
export const textTransformOptions = [
    'lowercase', //
    'uppercase',
    'capitalize'
] as const satisfies TextTransform[];

/**
 * All floating placement options
 */
export const placementOptions = [
    'top', //
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end'
] as const satisfies FloatingPlacement[];

/**
 * Boollean options
 */
export const booleanOptions = [
    true, //
    false
] as const satisfies boolean[];

/**
 * Utility types for configuring component options
 */
export type PropsOptions<Props> = Partial<{
    [K in keyof Props]: Array<Exclude<Props[K], undefined>>;
}>;
