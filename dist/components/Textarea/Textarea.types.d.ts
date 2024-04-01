import type { Sizes1To3 } from '../../constants.js';
import type { HTMLTextareaAttributes } from 'svelte/elements';
export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'size'> {
    elementRef?: HTMLTextAreaElement;
    value?: string;
    size?: (typeof Sizes1To3)[number];
    fullWidth?: boolean;
}
