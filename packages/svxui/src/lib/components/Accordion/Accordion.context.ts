import { getContext, setContext } from 'svelte';
import type { AccordionContext } from './Accordion.types.js';

const contextKeyAccordion = 'svxui-context-accordion';

export function setAccordionContext(ctx: AccordionContext): void {
    setContext(contextKeyAccordion, ctx);
}

export function getAccordionContext(): AccordionContext {
    const ctx = getContext<AccordionContext>(contextKeyAccordion);
    if (!ctx) {
        throw new Error('`getAccordionContext` must be used within a `<AccordionGroup/>` component.');
    }
    return ctx;
}
