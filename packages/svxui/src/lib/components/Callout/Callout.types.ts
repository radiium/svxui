import type { Colors, Radius, Sizes1To3, VariantsCallout } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type CalloutProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLDivElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    radius?: (typeof Radius)[number];
    variant?: (typeof VariantsCallout)[number];
    fullWidth?: boolean;
};
