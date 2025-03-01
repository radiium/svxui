import { Context } from '$lib/utils/context.svelte.js';
import { AccordionItemState } from './states/accordion-item-state.svelte.js';
import { AccordionRootState } from './states/accordion-root-state.svelte.js';
import type { AccordionItemStateProps, AccordionRootStateProps } from './states/types.js';

const AccordionRootContext = new Context<AccordionRootState>('AccordionRoot');
const AccordionItemContext = new Context<AccordionItemState>('AccordionItem');

export function useAccordionRoot(props: AccordionRootStateProps): AccordionRootState {
    const rootState = new AccordionRootState(props);
    return AccordionRootContext.set(rootState);
}

export function useAccordionItem(props: AccordionItemStateProps): AccordionItemState {
    const rootState = AccordionRootContext.get();
    const itemState = new AccordionItemState(rootState, props);
    return AccordionItemContext.set(itemState);
}
