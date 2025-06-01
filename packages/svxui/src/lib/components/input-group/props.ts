import { colorOptions, type PropsOptions } from '$lib/shared.options.js';
import type { InputGroupItemProps, InputGroupProps } from './types.js';

export const defaultInputGroupItemProps: InputGroupItemProps = {
    color: undefined
};
export const inputGroupItemOptions = {
    color: colorOptions
} as const satisfies PropsOptions<InputGroupItemProps>;

export const defaultInputGroupProps: InputGroupProps = {};
export const inputGroupOptions = {} as const satisfies PropsOptions<InputGroupProps>;
