import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { Align } from '$lib/shared.types.js';
import type { InputProps, InputSize, InputType } from './types.js';

export const defaultInputProps: InputProps = {
    elementRef: undefined,
    color: 'neutral',
    size: '2',
    radius: undefined,
    value: '',
    type: 'text',
    align: 'start',
    fullWidth: false,
    inputSize: undefined
};
export const inputOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies InputSize[],
    type: [
        'number',
        'text',
        'search',
        'password',
        'email',
        'tel',
        'url',
        'date',
        'time',
        'datetime-local',
        'month',
        'week'
    ] satisfies InputType[],
    align: ['start', 'center', 'end'] satisfies Align[],
    radius: radiusOptions,
    fullWidth: booleanOptions,
    disabled: booleanOptions
} as const satisfies PropsOptions<InputProps>;
