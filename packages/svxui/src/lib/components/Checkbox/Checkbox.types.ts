import { Colors, Radius, Sizes1To3 } from '$lib/shared.types.js';
import type { HTMLInputAttributes } from 'svelte/elements';

export type CheckboxProps = Omit<HTMLInputAttributes, 'size' | 'checked' | 'indeterminate'> & {
    elementRef?: HTMLInputElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    radius?: (typeof Radius)[number];
    group?: (string | number)[];
    value?: string | number;
    checked?: boolean;
    indeterminate?: boolean;
};
