import type { Sizes0To5, VariantsCard } from '../../constants.js';
import type { HTMLAttributes } from 'svelte/elements';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    elementRef?: HTMLDivElement | HTMLButtonElement;
    size?: (typeof Sizes0To5)[number];
    variant?: (typeof VariantsCard)[number];
    asButton?: boolean;
}
