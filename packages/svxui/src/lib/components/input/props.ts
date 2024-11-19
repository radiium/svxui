import { AlignStart, ColorGray, Size2 } from '$lib/shared.types.js';
import type { InputProps } from './types.js';

export const defaultInputProps: InputProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size2,
    radius: undefined,
    value: '',
    type: 'text',
    align: AlignStart,
    fullWidth: false,
    inputSize: undefined
};
