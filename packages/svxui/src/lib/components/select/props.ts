import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { SelectProps, SelectSize } from './types.js';

export const defaultSelectProps: SelectProps = {
    elementRef: undefined,
    size: '2',
    color: 'neutral',
    radius: undefined,
    value: undefined,
    options: [],
    resolveValue: <T>(item: T) => item as string | number,
    resolveLabel: <T>(item: T) => item as string | number,
    fullWidth: false,
    multiple: false,
    disabled: false,
    selectSize: 4
};
export const selectOptions: PropsOptions<SelectProps> = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies SelectSize[],
    radius: radiusOptions,
    fullWidth: booleanOptions,
    multiple: booleanOptions,
    disabled: booleanOptions
} as const satisfies PropsOptions<SelectProps>;
