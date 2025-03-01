import { booleanOptions, orientationOptions, type PropsOptions } from '$lib/shared.options.js';
import type { AccordionHeadingLevel, AccordionItemProps, AccordionRootProps } from './types.js';

/**
 * Accordion root
 */

export const defaultAccordionRootProps: AccordionRootProps = {
    onValueChange: () => {},
    multiple: false,
    disabled: false,
    loop: false,
    orientation: 'vertical'
};
export const accordionRootOptions = {
    multiple: booleanOptions,
    disabled: booleanOptions,
    loop: booleanOptions,
    orientation: orientationOptions
} as const satisfies PropsOptions<AccordionRootProps>;

/**
 * PropsAccordion item
 */

export const defaultAccordionItemProps: Partial<AccordionItemProps> = {
    disabled: false,
    headingLevel: 2
};
export const accordionItemOptions = {
    disabled: booleanOptions,
    headingLevel: [1, 2, 3, 4, 5, 6] satisfies AccordionHeadingLevel[]
} as const satisfies PropsOptions<AccordionItemProps>;
