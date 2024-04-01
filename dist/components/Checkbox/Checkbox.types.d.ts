import { Colors, Sizes1To3 } from '../../constants.js';
import type { HTMLInputAttributes } from 'svelte/elements';
export interface CheckboxProps extends Omit<HTMLInputAttributes, 'size' | 'checked' | 'indeterminate'> {
    elementRef?: HTMLInputElement;
    group?: (string | number)[];
    value?: string | number;
    checked?: boolean;
    indeterminate?: boolean;
    size?: (typeof Sizes1To3)[number];
    color?: (typeof Colors)[number];
}
