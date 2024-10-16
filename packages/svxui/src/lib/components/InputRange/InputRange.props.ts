import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { InputRangeProps } from './InputRange.types.js';

export const defaultInputRangeProps: InputRangeProps = {
    elementRef: undefined,
    value: undefined,
    size: Size2,
    color: ColorGray,
    fullWidth: false
};
