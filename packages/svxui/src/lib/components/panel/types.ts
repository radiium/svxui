import type { Color, Radius, RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type PanelSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type PanelVariant = 'solid' | 'soft' | 'surface' | 'clear';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type PanelProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'color' | 'size' | 'children'
> & {
    /**
     * HTML element to render as.
     */
    as?: ElementTag;
    /**
     * Reference to the rendered DOM element.
     * The element type is inferred from `as`.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
    /**
     * Panel color
     */
    color?: Color;
    /**
     * Panel size
     */
    size?: PanelSize;
    /**
     * Panel radius
     */
    radius?: Radius;
    /**
     * Panel variant
     */
    variant?: PanelVariant;
    /**
     * Panel outline
     */
    outline?: boolean;
    /**
     * Panel full width
     */
    fullWidth?: boolean;
    /**
     * Panel full height
     */
    fullHeight?: boolean;
    /**
     * Panel content to render
     */
    children?: Snippet<[void]>;
};
