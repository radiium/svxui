import type { Orientation } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';

/**
 * Common
 */

export type AccordionValue = string | number | null | undefined;
export type AccordionSelectionValue = string[] | number[] | string | number | null | undefined;
export type AccordionSelectionValueChange = (newValue: AccordionSelectionValue) => void;
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Props AccordionRoot
 */

export type AccordionRootSnippetProps = {
    readonly attrs: Record<string, unknown>;
};

export type AccordionRootProps = {
    /**
     * Current accordion selection. Single value when multiple is false and Array is multiple is true,
     */
    value?: AccordionSelectionValue;
    /**
     * Callback when value change
     */
    onValueChange?: AccordionSelectionValueChange;
    /**
     * Can toggle single or multiple Accordion Item
     */
    multiple?: boolean;
    /**
     * Disable all Accordion Item
     */
    disabled?: boolean;
    /**
     * Loop when navigating with the keyboard
     */
    loop?: boolean;
    /**
     * Accordion orientation
     */
    orientation?: Orientation;
    /**
     * Accordion Root content to render
     */
    children?: Snippet<[AccordionRootSnippetProps]>;
};

/**
 * Props AccordionItem
 */

export type AccordionItemSnippetProps = {
    readonly expanded: boolean;
    readonly disabled: boolean;
    readonly itemAttrs: Record<string, unknown>;
    readonly headingAttrs: Record<string, unknown>;
    readonly triggerAttrs: Record<string, unknown>;
    readonly contentAttrs: Record<string, unknown>;
};

export type AccordionItemProps = {
    /**
     * Unique Accordion Item identifier
     */
    value: AccordionValue;
    /**
     * Disable Accordion Item
     */
    disabled?: boolean;
    /**
     * Heading level for aria-level attribut
     */
    headingLevel?: AccordionHeadingLevel;
    /**
     * Accordion Item content to render
     */
    children?: Snippet<[AccordionItemSnippetProps]>;
};
