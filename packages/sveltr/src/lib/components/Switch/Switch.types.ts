import type { Colors, Radius, Sizes1To3 } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type SwitchProps = Omit<HTMLInputAttributes, 'size'> & {
    elementRef?: HTMLInputElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    radius?: (typeof Radius)[number];
    disabled?: boolean;
};
