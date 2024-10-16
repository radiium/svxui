import type { BlockDisplays } from '$lib/shared.types.js';
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

export type BoxProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLElement;
    as?: keyof SvelteHTMLElements;
    display?: (typeof BlockDisplays)[number];
};
