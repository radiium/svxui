import type { Orientation } from '$lib/shared.types.js';
import type { AccordionHeadingLevel, AccordionSelectionValue, AccordionValue } from '../types.js';

/**
 * Accordion root
 */

export type AccordionRootStateProps = {
    value?: () => AccordionSelectionValue;
    onValueChange?: (newValue: AccordionSelectionValue) => void;
    multiple?: () => boolean;
    orientation?: () => Orientation;
    disabled?: () => boolean;
    loop?: () => boolean;
};

export type AccordionRootAttributs = {
    readonly id: string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
};

/**
 * Accordion item
 */

export type AccordionItemStateProps = {
    value: () => AccordionValue;
    disabled?: () => boolean;
    headingLevel?: () => AccordionHeadingLevel;
};

export type AccordionItemAttributs = {
    readonly id: string;
    readonly 'data-state': string;
    readonly 'data-disabled'?: string;
    readonly 'data-orientation': Orientation;
    readonly 'data-value': AccordionValue;
};

export type AccordionHeadingAttributs = {
    readonly id: string;
    readonly 'data-state': string;
    readonly 'data-disabled'?: string;
    readonly 'data-orientation': Orientation;
    readonly 'data-value': AccordionValue;
    readonly 'data-heading-level'?: AccordionHeadingLevel;
    readonly 'aria-level'?: AccordionHeadingLevel;
    readonly role: string;
};

export type AccordionTriggerAttributs = {
    readonly id: string;
    readonly tabindex: number;
    readonly disabled: boolean;
    readonly 'data-state': string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
    readonly 'data-value': AccordionValue;
    readonly 'aria-disabled': boolean;
    readonly 'aria-expanded': boolean;
    readonly 'aria-controls': string;
    readonly onclick: (e: MouseEvent) => void;
    readonly onkeydown: (e: KeyboardEvent) => void;
};

export type AccordionContentAttributs = {
    readonly id: string;
    readonly role: string;
    readonly 'data-state': string;
    readonly 'data-disabled': string | undefined;
    readonly 'data-orientation': Orientation;
    readonly 'data-value': AccordionValue;
    readonly 'aria-labelledby': string;
};
