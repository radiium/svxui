import type { BlockDisplays } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
    elementRef?: HTMLElement;
    as?: keyof SvelteHTMLElements;
    display?: (typeof BlockDisplays)[number];
    children?: Snippet;
};
