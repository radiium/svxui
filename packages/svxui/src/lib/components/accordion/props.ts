import { booleanOptions, orientationOptions, type PropsOptions } from '$lib/shared.options.js';
import type { AccordionProps } from './types.js';

/**
 * Accordion root
 */

export const defaultAccordionProps: AccordionProps<any, boolean> = {
    multiple: false,
    disabled: false,
    loop: false,
    orientation: 'vertical'
};
export const accordionOptions = {
    multiple: booleanOptions,
    disabled: booleanOptions,
    loop: booleanOptions,
    orientation: orientationOptions
} as const satisfies PropsOptions<AccordionProps<any, boolean>>;
