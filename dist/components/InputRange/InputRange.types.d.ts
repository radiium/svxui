import type { Colors, Sizes1To3 } from '../../constants.js';
import type { HTMLInputAttributes } from 'svelte/elements';
export interface InputRangeProps extends Omit<HTMLInputAttributes, 'size'> {
    elementRef?: HTMLInputElement;
    value?: string | number;
    size?: (typeof Sizes1To3)[number];
    color?: (typeof Colors)[number];
    fullWidth?: boolean;
}
