import { AlignEnd, ColorGray, Size2, VariantClear } from '$lib/shared.types.js';
import type { InputNumberProps } from './types.js';

export const defaultInputNumberProps: InputNumberProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size2,
    radius: undefined,
    variant: VariantClear,
    align: AlignEnd,
    value: undefined,
    step: 1,
    min: undefined,
    max: undefined,
    fullWidth: false,
    disabled: false,
    required: false,
    readonly: undefined
};
