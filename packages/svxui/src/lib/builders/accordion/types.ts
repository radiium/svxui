import type { Orientation } from '$lib/shared.types.js';
import type { SelectionOptions } from '$lib/utilities/selection/index.js';

export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Accordion builder options
 */
export type AccordionBuilderOptions<Value, Multiple extends boolean> = SelectionOptions<Value, Multiple> & {
    /**
     * Callback called on value change
     * @param newValue
     * @returns
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Accordion orientation
     */
    orientation?: Orientation;
    /**
     * Accordion must be disabled or not
     */
    disabled?: boolean;
};

/**
 * Accordion item customization
 */
export type AccordionItemOptions = {
    /**
     * Custom accordion item id
     */
    id?: string;
    /**
     * Disable or not accordion item
     */
    disabled?: boolean;
    /**
     * Custom accordion item heading level
     */
    headingLevel?: AccordionHeadingLevel;
};

/**
 * Accordion item state
 */
export type AccordionItem = {
    /**
     * Accordion item is expanded
     */
    readonly expanded: boolean;
    /**
     * Accordion item is disabled
     */
    readonly disabled: boolean;
    /**
     * Accordion item wrapper attributes
     */
    readonly itemAttrs: AccordionItemAttributes;
    /**
     * Accordion item heading attributes
     */
    readonly headingAttrs: AccordionHeadingAttributes;
    /**
     * Accordion item trigger attributes
     */
    readonly triggerAttrs: AccordionTriggerAttributes;
    /**
     * Accordion item content attributes
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
