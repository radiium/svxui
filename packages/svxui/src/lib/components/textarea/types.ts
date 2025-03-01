import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLTextareaAttributes } from 'svelte/elements';

export type TextareaSize = '1' | '2' | '3';

export type TextareaProps = Omit<HTMLTextareaAttributes, 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLTextAreaElement;
    /**
     * Textarea color
     */
    color?: Color;
    /**
     * Textarea size
     */
    size?: TextareaSize;
    /**
     * Textarea radius
     */
    radius?: Radius;
    /**
     * Textarea full width
     */
    fullWidth?: boolean;
    /**
     * Textarea resizable
     */
    resizable?: boolean;
};
