import type { Color, Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

export type PanelSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type PanelVariant = 'solid' | 'soft' | 'outline';

export type PanelProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLElement;
    /**
     * Render element as
     */
    as?: keyof SvelteHTMLElements;
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
     * Panel full with
     */
    fullWidth?: boolean;
    /**
     * Panel content to render
     */
    children?: Snippet<[void]>;
};
