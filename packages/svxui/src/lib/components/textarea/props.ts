import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { TextareaProps } from './types.js';

export const defaultTextareaProps: TextareaProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size2,
    radius: undefined,
    value: undefined,
    fullWidth: false,
    disabled: false
};
