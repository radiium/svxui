import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { SelectOptionType, SelectProps, SelectSize } from './types.js';

export const defaultSelectProps: SelectProps<SelectOptionType> = {
    ref: undefined,
    size: '2',
    color: undefined,
    radius: undefined,
    value: undefined,
    options: [] as SelectOptionType[],
    optionLabel: 'label',
    optionValue: 'value',
    fullWidth: false,
    multiple: false,
    disabled: false,
    selectSize: 4
};
export const selectOptions: PropsOptions<SelectProps<SelectOptionType>> = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies SelectSize[],
    radius: radiusOptions,
    fullWidth: booleanOptions,
    multiple: booleanOptions,
    disabled: booleanOptions
} as const satisfies PropsOptions<SelectProps<SelectOptionType>>;
