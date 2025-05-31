import type { Snippet } from 'svelte';
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

export type Display = 'none' | 'inline-flex' | 'flex';
export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
// prettier-ignore
export type Justify = 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly' | 'baseline' | 'stretch' | 'normal';
export type AlignItem = 'start' | 'center' | 'end' | 'baseline' | 'stretch' | 'normal';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type Gap = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type FlexboxProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLElement;
    /**
     * Render element as
     */
    as?: keyof SvelteHTMLElements;
    /**
     * Flex display variant
     */
    display?: Display;
    /**
     * Justify content
     */
    justify?: Justify;
    /**
     * Flex direction
     */
    direction?: Direction;
    /**
     * Align items
     */
    align?: AlignItem;
    /**
     * Flex wrap
     */
    wrap?: Wrap;
    /**
     * Flex gap
     */
    gap?: Gap;
    /**
     * Flexbox full width
     */
    fullWidth?: boolean;
    /**
     * Flexbox content to render
     */
    children?: Snippet<[void]>;
};
