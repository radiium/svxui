import type { AccordionGroupProps, AccordionProps } from './types.js';

/**
 * AccordionGroup
 */

export const defaultAccordionGroupProps: AccordionGroupProps = {
    multi: false,
    disabled: false,
    onValueChange: () => {}
};

/**
 * PropsAccordionItem
 */

export const defaultAccordionProps: Partial<AccordionProps> = {
    expanded: undefined,
    disabled: false
};
