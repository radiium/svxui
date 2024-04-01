import type { Aligns, InputTypes, Sizes1To3 } from '../../constants.js';
import type { HTMLInputAttributes } from 'svelte/elements';
export interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'align'> {
    elementRef?: HTMLInputElement;
    value?: string | number;
    type?: (typeof InputTypes)[number];
    size?: (typeof Sizes1To3)[number];
    align?: (typeof Aligns)[number];
    fullWidth?: boolean;
}
