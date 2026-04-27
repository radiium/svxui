import type { Color, Radius, RefFromHTMLAttributes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type PanelVariant = 'solid' | 'soft' | 'surface' | 'clear';
export type PanelPadding = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type PanelProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    SvelteHTMLElements[ElementTag],
    'color' | 'children'
> & {
    /**
     * HTML element to render as.
     */
    as?: ElementTag;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: RefFromHTMLAttributes<SvelteHTMLElements[ElementTag]>;
    color?: Color;
    radius?: Radius;
    variant?: PanelVariant;
    outline?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    /** Padding on all sides. */
    p?: PanelPadding;
    /** Padding on the left and right sides. */
    px?: PanelPadding;
    /** Padding on the top and bottom sides. */
    py?: PanelPadding;
    /** Padding on the top side. */
    pt?: PanelPadding;
    /** Padding on the right side. */
    pr?: PanelPadding;
    /** Padding on the bottom side. */
    pb?: PanelPadding;
    /** Padding on the left side. */
    pl?: PanelPadding;
    children?: Snippet<[void]>;
};
