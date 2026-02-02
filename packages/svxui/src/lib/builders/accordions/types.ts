import type { Orientation } from '$lib/shared.types.js';
import type { SelectionStateOptions } from '$lib/utilities/selection-state/index.js';

export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Accordions builder options
 *
 * @template Value - Value of single or multiple selection.
 * @template Multiple - Boolean indicating if multiple selection is enabled.
 */
export type AccordionsBuilderOptions<Value, Multiple extends boolean> = SelectionStateOptions<
    Value,
    Multiple
> & {
    /**
     * Callback called on value change
     * @param newValue
     * @returns
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Accordions orientation
     */
    orientation?: Orientation;
    /**
     * Accordions must be disabled or not
     */
    disabled?: boolean;
};

/**
 * Accordions item customization
 */
export type AccordionItemOptions = {
    /**
     * Custom accordions item id
     */
    id?: string;
    /**
     * Disable or not accordions item
     */
    disabled?: boolean;
    /**
     * Custom accordions item heading level
     */
    headingLevel?: AccordionHeadingLevel;
};

/**
 * Accordions item state
 */
export type AccordionItem = {
    /**
     * Accordions item is expanded
     */
    readonly expanded: boolean;
    /**
     * Accordions item is disabled
     */
    readonly disabled: boolean;
    /**
     * Accordions item wrapper attributes
     */
    readonly itemAttrs: AccordionItemAttributes;
    /**
     * Accordions item heading attributes
     */
    readonly headingAttrs: AccordionHeadingAttributes;
    /**
     * Accordions item trigger attributes
     */
    readonly triggerAttrs: AccordionTriggerAttributes;
    /**
     * Accordions item content attributes
     */
    readonly contentAttrs: AccordionContentAttributes;
};

export type AccordionRootAttributes = {
    readonly id: string;
    readonly tabindex: number;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
};

export type AccordionItemAttributes = {
    readonly id: string;
    readonly 'data-state': string;
    readonly 'data-disabled'?: string;
    readonly 'data-orientation': Orientation;
};

export type AccordionHeadingAttributes = {
    readonly id: string;
    readonly 'data-state': string;
    readonly 'data-disabled'?: string;
    readonly 'data-orientation': Orientation;
    readonly 'data-heading-level'?: AccordionHeadingLevel;
    readonly 'aria-level'?: AccordionHeadingLevel;
    readonly role: string;
};

export type AccordionTriggerAttributes = {
    readonly id: string;
    readonly tabindex: number;
    readonly disabled: boolean;
    readonly 'data-state': string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
    readonly 'aria-disabled': boolean | 'true' | 'false' | undefined;
    readonly 'aria-expanded': boolean;
    readonly 'aria-controls': string;
    readonly onclick: (e: MouseEvent) => void;
};

export type AccordionContentAttributes = {
    readonly id: string;
    readonly role: string;
    readonly 'data-state': string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
    readonly 'aria-labelledby': string;
};
