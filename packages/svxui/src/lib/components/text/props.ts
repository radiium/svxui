import {
    alignOptions,
    booleanOptions,
    colorOptions,
    textTransformOptions,
    type PropsOptions
} from '$lib/shared.options.js';
import type { TextProps, TextSize, TextWeight, TextWrap } from './types.js';

export const defaultTextProps: TextProps = {
    elementRef: undefined,
    as: 'div',
    color: undefined,
    size: '3',
    weight: 'regular',
    transform: undefined,
    align: 'start',
    wrap: undefined,
    truncate: false,
    muted: false,
    disabled: false
};
export const textOptions = {
    as: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'a', 'div', 'span'] as const,
    size: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] satisfies TextSize[],
    weight: ['light', 'regular', 'medium', 'bold'] satisfies TextWeight[],
    transform: textTransformOptions,
    align: alignOptions,
    wrap: ['wrap', 'nowrap', 'pretty', 'balance'] satisfies TextWrap[],
    truncate: booleanOptions,
    color: colorOptions,
    muted: booleanOptions,
    disabled: booleanOptions
} as const satisfies PropsOptions<TextProps>;
