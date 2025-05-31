import { booleanOptions, type PropsOptions } from '$lib/shared.options.js';
import type { AlignItem, Direction, Display, FlexboxProps, Gap, Justify, Wrap } from './types.js';

export const defaultFlexboxProps: FlexboxProps = {
    elementRef: undefined,
    as: 'div',
    display: 'flex',
    justify: 'start',
    direction: undefined,
    align: undefined,
    wrap: undefined,
    gap: undefined,
    fullWidth: undefined
};
export const flexboxOptions = {
    display: ['flex', 'none', 'inline-flex'] satisfies Display[],
    // prettier-ignore
    justify: ['start', 'center', 'end', 'around', 'between', 'evenly','baseline', 'stretch', 'normal'] satisfies Justify[],
    direction: ['row', 'column', 'row-reverse', 'column-reverse'] satisfies Direction[],
    align: ['start', 'center', 'end', 'normal', 'baseline', 'stretch'] satisfies AlignItem[],
    wrap: ['nowrap', 'wrap', 'wrap-reverse'] satisfies Wrap[],
    gap: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] satisfies Gap[],
    fullWidth: booleanOptions
} as const satisfies PropsOptions<FlexboxProps>;
