import type { Color } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type InputGroupItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLDivElement;
    /**
     * InputGroupItem color
     */
    color?: Color;
    /**
     * InputGroupItem content to render
     */
    children?: Snippet<[void]>;
};

export type InputGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLDivElement;
    /**
     * InputGroup content to render
     */
    children?: Snippet<[void]>;
};
