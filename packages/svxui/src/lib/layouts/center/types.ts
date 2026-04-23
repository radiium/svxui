import type { LayoutSpacing, RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type CenterProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
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
     * Maximum width of the centered content.
     */
    maxWidth?: string;
    /**
     * Horizontal padding on both sides. Accepts a space scale token or an arbitrary CSS value.
     */
    gutters?: LayoutSpacing;
    /**
     * Centers content intrinsically using `fit-content` instead of a hard max-width.
     */
    intrinsic?: boolean;
    /**
     * Content to render inside the center container.
     */
    children?: Snippet<[void]>;
};
