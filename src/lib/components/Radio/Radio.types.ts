import type { Sizes1To3, Colors } from '$lib/constants.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
    elementRef?: HTMLInputElement;
    group?: (string | number);
    value?: string | number;
    size?: (typeof Sizes1To3)[number];
    color?: (typeof Colors)[number];
}
