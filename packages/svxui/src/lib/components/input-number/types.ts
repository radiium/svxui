import type { Aligns, Colors, Radius, Sizes1To3, Variants } from '$lib/shared.types.js';
import type { InputGroupProps } from '../input-group/types.js';

export type InputNumberProps = InputGroupProps & {
    elementRef?: HTMLInputElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    radius?: (typeof Radius)[number];
    variant?: (typeof Variants)[number];
    align?: (typeof Aligns)[number];
    value?: number;
    step?: number;
    min?: number;
    max?: number;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
};
