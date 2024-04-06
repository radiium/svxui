import type { Orientations, Sizes1To4 } from '../../constants.js';
import type { HTMLAttributes } from 'svelte/elements';
export interface SeparatorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    elementRef?: HTMLDivElement;
    size?: (typeof Sizes1To4)[number];
    orientation?: (typeof Orientations)[number];
}
