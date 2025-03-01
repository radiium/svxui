import type { Align, Color, FloatingPlacement, Orientation, Radius, TextTransform } from './shared.types.js';

// Colors
export const defaultAliasColorOptions = ['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as const;
// export const radixColorAccentOptions = [
//     'gold',
//     'bronze',
//     'brown',
//     'yellow',
//     'amber',
//     'orange',
//     'tomato',
//     'red',
//     'ruby',
//     'crimson',
//     'pink',
//     'plum',
//     'purple',
//     'violet',
//     'iris',
//     'indigo',
//     'blue',
//     'cyan',
//     'teal',
//     'jade',
//     'green',
//     'grass',
//     'lime',
//     'mint',
//     'sky'
// ] as const;
// export const radixColorGrayOptions = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const;
export const colorOptions = [
    ...defaultAliasColorOptions
    // ...radixColorAccentOptions,
    // ...radixColorGrayOptions
] as const satisfies Color[];
// Radius
export const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const satisfies Radius[];
// Align
export const alignOptions = ['start', 'center', 'end'] as const satisfies Align[];
// Orientation
export const orientationOptions = ['horizontal', 'vertical'] as const satisfies Orientation[];
// Transform
export const textTransformOptions = [
    'lowercase',
    'uppercase',
    'capitalize'
] as const satisfies TextTransform[];
// Placement
export const placementOptions = [
    'top',
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

export const booleanOptions = [true, false] as const satisfies boolean[];

export type PropsOptions<Props> = Partial<{
    [K in keyof Props]: Array<Exclude<Props[K], undefined>>;
}>;
