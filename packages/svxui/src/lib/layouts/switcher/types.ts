import type { LayoutSpacing, RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type SwitcherProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'children'
> & {
    /**
     * HTML element to render as.
     */
    as?: ElementTag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
    /**
     * Container width below which items switch from a row to a stacked column.
     */
    threshold?: string;
    /**
     * Gap between items.
     */
    gap?: LayoutSpacing;
    /**
     * Content to render inside the switcher.
     */
    children?: Snippet<[void]>;
};
