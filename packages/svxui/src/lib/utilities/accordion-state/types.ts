import type { Orientation } from '$lib/shared.types.js';
import type { SelectionOptions } from '../selection-state/types.js';

export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type AccordionStateOptions<Value, Multiple extends boolean> = SelectionOptions<Value, Multiple> & {
    onValueChange?: (newValue: Value) => void;
    orientation?: Orientation;
    disabled?: boolean;
};

export type AccordionGetItemOptions = {
    id?: string;
    disabled?: boolean;
    headingLevel?: AccordionHeadingLevel;
};

export type AccordionGetItemReturn = {
    expanded: boolean;
    disabled: boolean;
    itemAttrs: AccordionItemAttributes;
    headingAttrs: AccordionHeadingAttributes;
    triggerAttrs: AccordionTriggerAttributes;
    contentAttrs: AccordionContentAttributes;
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
