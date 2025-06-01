import { booleanOptions, colorOptions, type PropsOptions } from '$lib/shared.options.js';
import type { RadioProps, RadioSize } from './types.js';

export const defaultRadioProps: RadioProps = {
    elementRef: undefined,
    color: undefined,
    size: '2',
    group: undefined,
    disabled: false
};
export const radioOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies RadioSize[],
    disabled: booleanOptions
} as const satisfies PropsOptions<RadioProps>;
