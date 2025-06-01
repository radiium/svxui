import {
    alignOptions,
    booleanOptions,
    colorOptions,
    radiusOptions,
    textTransformOptions,
    type PropsOptions
} from '$lib/shared.options.js';
import type { ButtonProps, ButtonSize, ButtonVariant } from './types.js';

export const defaultButtonProps: ButtonProps = {
    color: undefined,
    size: '2',
    radius: undefined,
    variant: 'solid',
    transform: undefined,
    align: 'center',
    active: undefined,
    iconOnly: undefined,
    fullWidth: undefined
};
export const buttonOptions = {
    color: colorOptions,
    size: ['1', '2', '3', '4'] satisfies ButtonSize[],
    radius: radiusOptions,
    variant: ['solid', 'soft', 'outline'] satisfies ButtonVariant[],
    transform: textTransformOptions,
    align: alignOptions,
    disabled: booleanOptions,
    active: booleanOptions,
    iconOnly: booleanOptions,
    fullWidth: booleanOptions
} as const satisfies PropsOptions<ButtonProps>;
