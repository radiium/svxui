import type { LayoutSpacing, RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type SidebarProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
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
     * Which side the sidebar is on.
     */
    side?: 'left' | 'right';
    /**
     * Width of the sidebar. The content area fills the remaining space.
     */
    sideWidth?: string;
    /**
     * Minimum width the content area must maintain before the layout wraps to a stacked column.
     */
    contentMin?: string;
    /**
     * Gap between the sidebar and the content area.
     */
    gap?: LayoutSpacing;
    /**
     * The fixed-width sidebar region.
     */
    sidebar?: Snippet;
    /**
     * The fluid content area.
     */
    children?: Snippet<[void]>;
};
