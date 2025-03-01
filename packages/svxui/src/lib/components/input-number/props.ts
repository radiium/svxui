import { type PropsOptions, booleanOptions, colorOptions, radiusOptions } from '$lib/shared.options.js';
import type { Align } from '$lib/shared.types.js';
import type { InputNumberProps, InputNumberSize, InputNumberVariant } from './types.js';

export const defaultInputNumberProps: InputNumberProps = {
    elementRef: undefined,
    color: 'neutral',
    size: '2',
    radius: undefined,
    variant: 'clear',
    align: 'end',
    value: undefined,
    step: 1,
    min: undefined,
    max: undefined,
    fullWidth: false,
    disabled: false,
    required: false,
    readonly: undefined
};
export const inputNumberOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies InputNumberSize[],
    variant: ['clear', 'solid', 'soft', 'outline'] satisfies InputNumberVariant[],
    align: ['start', 'center', 'end'] satisfies Align[],
    radius: radiusOptions,
    fullWidth: booleanOptions,
    disabled: booleanOptions,
    required: booleanOptions,
    readonly: booleanOptions
} as const satisfies PropsOptions<InputNumberProps>;
