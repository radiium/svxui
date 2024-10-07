import type { Colors, Sizes1To3 } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type RadioProps = Omit<HTMLInputAttributes, 'size'> & {
    elementRef?: HTMLInputElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    group?: string | number;
    value?: string | number;
    disabled?: boolean;
};
