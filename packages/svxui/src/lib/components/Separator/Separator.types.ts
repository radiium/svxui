import type { Colors, Orientations, Sizes1To4 } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type SeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLDivElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To4)[number];
    orientation?: (typeof Orientations)[number];
};
