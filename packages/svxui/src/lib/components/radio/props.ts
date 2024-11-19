import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { RadioProps } from './types.js';

export const defaultRadioProps: RadioProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size2,
    group: undefined,
    value: undefined,
    disabled: false
};
