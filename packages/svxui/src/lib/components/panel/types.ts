import type { Colors, Radius, Sizes0To9, VariantsCard } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type PanelProps = HTMLAttributes<HTMLDivElement> & {
    elementRef?: HTMLDivElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes0To9)[number];
    radius?: (typeof Radius)[number];
    variant?: (typeof VariantsCard)[number];
    translucent?: boolean;
    fullWidth?: boolean;
    children?: Snippet;
};
