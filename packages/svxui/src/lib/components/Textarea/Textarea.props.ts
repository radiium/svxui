import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { TextareaProps } from './Textarea.types.js';

export const defaultTextareaProps: TextareaProps = {
    elementRef: undefined,
    value: undefined,
    color: ColorGray,
    size: Size2,
    fullWidth: false
};
