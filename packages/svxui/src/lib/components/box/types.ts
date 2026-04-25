import type { BoxModelProps, RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type BoxDisplay = 'none' | 'block' | 'inline' | 'inline-block' | 'contents';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type BoxProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'display' | 'width' | 'height' | 'overflow' | 'children'
> &
    BoxModelProps & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Reference to the rendered DOM element.
         */
        ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
        /**
         * CSS `display` value.
         */
        display?: BoxDisplay;
        /**
         * Content to render inside the box.
         */
        children?: Snippet<[void]>;
    };
