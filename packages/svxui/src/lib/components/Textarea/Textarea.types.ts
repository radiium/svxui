import type { Colors, Radius, Sizes1To3 } from '$lib/shared.types.js';
import type { HTMLTextareaAttributes } from 'svelte/elements';

export type TextareaProps = Omit<HTMLTextareaAttributes, 'size'> & {
    elementRef?: HTMLTextAreaElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    radius?: (typeof Radius)[number];
    value?: string;
    fullWidth?: boolean;
    disabled?: boolean;
};
