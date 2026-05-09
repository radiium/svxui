import type { Color, Radius } from '$lib/shared.types.js';
import type { HTMLTextareaAttributes } from 'svelte/elements';

export type TextareaSize = '1' | '2' | '3';

/**
 * Extends all the standard HTML attributes of the `<textarea>` element.
 */
export type TextareaProps = Omit<HTMLTextareaAttributes, 'color' | 'children'> & {
    /**
     * Callback called on value change
     */
    onValueChange?: (newValue: HTMLTextareaAttributes['value']) => void;
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLTextAreaElement;
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
