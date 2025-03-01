import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { SwitchProps, SwitchSize } from './types.js';

export const defaultSwitchProps: SwitchProps = {
    elementRef: undefined,
    size: '2',
    color: 'neutral',
    radius: undefined,
    disabled: false
};
export const switchOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies SwitchSize[],
    radius: radiusOptions,
    disabled: booleanOptions
} as const satisfies PropsOptions<SwitchProps>;
