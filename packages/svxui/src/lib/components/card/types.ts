import type { Colors, Radius, Sizes0To5, VariantsCard } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
    elementRef?: HTMLDivElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes0To5)[number];
    radius?: (typeof Radius)[number];
    variant?: (typeof VariantsCard)[number];
    translucent?: boolean;
    fullWidth?: boolean;
    children?: Snippet;
};
