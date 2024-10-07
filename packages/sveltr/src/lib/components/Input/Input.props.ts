import { AlignStart, ColorGray, Size2 } from '$lib/shared.types.js';
import type { InputProps } from './Input.types.js';

export const defaultInputProps: InputProps = {
    elementRef: undefined,
    value: '',
    type: 'text',
    color: ColorGray,
    size: Size2,
    align: AlignStart,
    fullWidth: false
};
