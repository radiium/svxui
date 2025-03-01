export { default as AccordionItem } from './components/accordion-item.svelte';
export { default as AccordionRoot } from './components/accordion-root.svelte';

export { AccordionItemState } from './states/accordion-item-state.svelte.js';
export { AccordionRootState } from './states/accordion-root-state.svelte.js';

export { useAccordionItem, useAccordionRoot } from './context.svelte.js';

export { defaultAccordionItemProps, defaultAccordionRootProps } from './props.js';

export type {
    AccordionHeadingLevel,
    AccordionItemProps,
    AccordionRootProps,
    AccordionSelectionValue,
    AccordionValue
} from './types.js';
