import { AlignEnd, ColorGray, Size2, VariantClear } from '$lib/shared.types.js';
import type { InputNumberProps } from './InputNumber.types.js';

export const defaultInputNumberProps: InputNumberProps = {
    elementRef: undefined,
    value: undefined,
    step: 1,
    min: undefined,
    max: undefined,
    size: Size2,
    color: ColorGray,
    variant: VariantClear,
    align: AlignEnd,
    fullWidth: false,
    disabled: false,
    required: false,
    readonly: undefined
};
