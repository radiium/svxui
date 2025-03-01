import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { CheckboxProps, CheckboxSize } from './types.js';

export const defaultCheckboxProps: CheckboxProps = {
    elementRef: undefined,
    color: 'neutral',
    size: '2',
    radius: undefined,
    group: undefined,
    value: undefined,
    checked: false,
    indeterminate: false
};
export const checkboxOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies CheckboxSize[],
    radius: radiusOptions,
    disabled: booleanOptions,
    checked: booleanOptions,
    indeterminate: booleanOptions
} as const satisfies PropsOptions<CheckboxProps>;
