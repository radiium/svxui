import type { Color, PolymorphicProps, Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type PanelSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type PanelVariant = 'solid' | 'soft' | 'clear';

/**
 * Panel-specific props (design-system props)
 */
export type PanelOwnProps = {
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
     * Panel content to render
     */
    children?: Snippet<[void]>;
};

/**
 * Polymorphic Panel props
 */
export type PanelProps<E extends keyof SvelteHTMLElements = 'div'> = PolymorphicProps<E, PanelOwnProps>;
