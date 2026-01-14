import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * Base props for polymorphic components
 */
export type PolymorphicProps<E extends keyof SvelteHTMLElements, Props = {}> = Props & {
    /**
     * Render element as
     */
    as?: E;
    /**
     * DOM ref
     */
    ref?: PolymorphicRef<E>;
} & Omit<SvelteHTMLElements[E], keyof Props | 'as'>;

/**
 * Helper to infer the DOM element type for refs
 */
export type PolymorphicRef<E extends keyof SvelteHTMLElements> = SvelteHTMLElements[E] extends {
    ref?: infer R;
}
    ? R
    : HTMLElement;
