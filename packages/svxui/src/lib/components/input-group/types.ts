import type { Color } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type InputGroupItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLDivElement;
    /**
     * InputGroupItem color
     */
    color?: Color;
    /**
     * InputGroupItem content to render
     */
    children?: Snippet<[void]>;
};

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type InputGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLDivElement;
    /**
     * InputGroup content to render
     */
    children?: Snippet<[void]>;
};
