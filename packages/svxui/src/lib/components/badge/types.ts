import type { Colors, Radius, Sizes1To3, VariantsBadge } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    elementRef?: HTMLSpanElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To3)[number];
    radius?: (typeof Radius)[number];
    variant?: (typeof VariantsBadge)[number];
    disabled?: boolean;
    children?: Snippet;
};
