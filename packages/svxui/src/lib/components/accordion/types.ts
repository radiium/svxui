import type { AccordionBuilder, AccordionBuilderOptions } from '$lib/builders/accordion/index.js';
import type { Snippet } from 'svelte';

/**
 * This type extends all properties from `AccordionBuilderOptions`.
 */
export type AccordionProps<Value, Multiple extends boolean> = AccordionBuilderOptions<Value, Multiple> & {
    /**
     * Accordion content to render.
     * The snippet receives the AccordionBuilder instance as parameter.
     */
    children?: Snippet<[AccordionBuilder<Value, Multiple>]>;
};
