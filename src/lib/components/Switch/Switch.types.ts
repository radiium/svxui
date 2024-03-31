import type { Sizes1To3, Colors } from '$lib/constants.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export interface SwitchProps extends Omit<HTMLInputAttributes, 'size'> {
    elementRef?: HTMLInputElement;
    size?: (typeof Sizes1To3)[number];
    color?: (typeof Colors)[number];
}
