import type { AccordionsBuilder, AccordionsBuilderOptions } from '$lib/builders/accordions/index.js';
import type { Snippet } from 'svelte';

/**
 * This type extends all properties from `AccordionsBuilderOptions`.
 */
export type AccordionsProps<Value, Multiple extends boolean> = AccordionsBuilderOptions<Value, Multiple> & {
    /**
     * Accordions content to render.
     * The snippet receives the AccordionsBuilder instance as parameter.
     */
    children?: Snippet<[AccordionsBuilder<Value, Multiple>]>;
};
