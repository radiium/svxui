import type { Colors } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type InputGroupItemProps = HTMLAttributes<HTMLDivElement> & {
    elementRef?: HTMLDivElement;
    color?: (typeof Colors)[number];
    children?: Snippet<[void]>;
};

export type InputGroupProps = HTMLAttributes<HTMLDivElement> & {
    elementRef?: HTMLDivElement;
    children?: Snippet<[void]>;
};
