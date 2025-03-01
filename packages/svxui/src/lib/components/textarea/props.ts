import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { TextareaProps, TextareaSize } from './types.js';

export const defaultTextareaProps: TextareaProps = {
    elementRef: undefined,
    color: 'neutral',
    size: '2',
    radius: undefined,
    value: undefined,
    fullWidth: false,
    disabled: false,
    resizable: false
};
export const textareaOptions = {
    size: ['1', '2', '3'] satisfies TextareaSize[],
    color: colorOptions,
    radius: radiusOptions,
    disabled: booleanOptions,
    resizable: booleanOptions
} as const satisfies PropsOptions<TextareaProps>;
