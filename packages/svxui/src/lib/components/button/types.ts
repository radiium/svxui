import type {
    Align,
    Color,
    OmitByWord,
    Radius,
    RefFromHTMLAttributes,
    TextTransform
} from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type ButtonSize = '1' | '2' | '3' | '4';
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'clear';
export type ButtonHTMLElements = Pick<SvelteHTMLElements, 'button' | 'a'>;

/**
 * Extends all the standard HTML attributes of the `<button>` or `<a>` elements.
 */
export type ButtonProps<ElementTag extends keyof ButtonHTMLElements = 'button'> = OmitByWord<
    ButtonHTMLElements[ElementTag],
    'on:' | 'color' | 'disabled' | 'children'
> & {
    /**
     * HTML element to render as.
     */
    as?: ElementTag;
    /**
     * Reference to the rendered DOM element.
     * The element type is inferred from `as`.
     */
    ref?: RefFromHTMLAttributes<ButtonHTMLElements[ElementTag]>;
    /**
     * Button color
     */
    color?: Color;
    /**
     * Button size
     */
    size?: ButtonSize;
    /**
     * Button variant
     */
    variant?: ButtonVariant;
    /**
     * Button radius
     */
    radius?: Radius;
    /**
     * Text transform
     */
    transform?: TextTransform;
    /**
     * Text Align
     */
    align?: Align;
    /**
     * Button active state
     */
    active?: boolean;
    /**
     * Button disabled state
     */
    disabled?: boolean;
    /**
     * Button icon only
     */
    iconOnly?: boolean;
    /**
     * Button full width
     */
    fullWidth?: boolean;
    /**
     * Button content to render
     */
    children?: Snippet<[void]>;
};
