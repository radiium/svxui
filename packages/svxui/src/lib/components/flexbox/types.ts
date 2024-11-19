import type {
    AlignItems,
    Directions,
    FlexDisplays,
    Gaps,
    Grows,
    Justifys,
    Shrinks,
    Wraps
} from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

export type FlexboxProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLElement;
    as?: keyof SvelteHTMLElements;
    display?: (typeof FlexDisplays)[number];
    justify?: (typeof Justifys)[number];
    direction?: (typeof Directions)[number];
    align?: (typeof AlignItems)[number];
    wrap?: (typeof Wraps)[number];
    gap?: (typeof Gaps)[number];
    grow?: (typeof Grows)[number];
    shrink?: (typeof Shrinks)[number];
    children?: Snippet;
};
