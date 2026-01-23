import type { AccordionBuilder, AccordionBuilderOptions } from '$lib/builders/accordion/index.js';
import type { Snippet } from 'svelte';

export type AccordionProps<Value, Multiple extends boolean> = AccordionBuilderOptions<Value, Multiple> & {
    /**
     * Accordion Root content to render
     */
    children?: Snippet<[AccordionBuilder<Value, Multiple>]>;
};
