import type { Sizes1To3, Colors, Variants, Aligns } from '$lib/constants.js';

export interface InputNumberProps {
    elementRef?: HTMLInputElement;
    value?: number;
    step?: number;
    min?: number;
    max?: number;
    size?: (typeof Sizes1To3)[number];
    color?: (typeof Colors)[number];
    variant?: (typeof Variants)[number];
    align?: (typeof Aligns)[number];
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
}
