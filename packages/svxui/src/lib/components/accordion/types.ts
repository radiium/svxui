import type { AccordionState, AccordionStateOptions } from '$lib/utilities/index.js';
import type { Snippet } from 'svelte';

export type AccordionProps<Value, Multiple extends boolean> = AccordionStateOptions<Value, Multiple> & {
    /**
     * Callback when value change
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Accordion Root content to render
     */
    children?: Snippet<[AccordionState<Value, Multiple>]>;
};
