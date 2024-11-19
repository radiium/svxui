import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { InputRangeProps } from './types.js';

export const defaultInputRangeProps: InputRangeProps = {
    elementRef: undefined,
    size: Size2,
    color: ColorGray,
    radius: undefined,
    value: undefined,
    fullWidth: false
};
