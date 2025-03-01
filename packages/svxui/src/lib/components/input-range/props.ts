import {
    booleanOptions,
    colorOptions,
    orientationOptions,
    radiusOptions,
    type PropsOptions
} from '$lib/shared.options.js';
import type { InputRangeProps, InputRangeSize } from './types.js';

export const defaultInputRangeProps: InputRangeProps = {
    elementRef: undefined,
    size: '2',
    color: 'neutral',
    radius: undefined,
    value: undefined,
    fullWidth: false,
    orientation: 'horizontal'
};
export const inputRangeOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies InputRangeSize[],
    radius: radiusOptions,
    fullWidth: booleanOptions,
    disabled: booleanOptions,
    orientation: orientationOptions
} as const satisfies PropsOptions<InputRangeProps>;
