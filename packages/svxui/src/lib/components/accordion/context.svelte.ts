import type { GroupStateHelper } from '$lib/utils/group/group-state.svelte.js';
import { getContext, setContext } from 'svelte';

const contextKeyAccordion = Symbol('svxui-context-accordion');

export function setAccordionContext(ctx: GroupStateHelper): void {
    setContext(contextKeyAccordion, ctx);
}

export function getAccordionContext(): GroupStateHelper {
    const ctx = getContext<GroupStateHelper | undefined>(contextKeyAccordion);
    if (!ctx) {
        throw new Error('`getAccordionContext` must be used within a `<AccordionGroup/>` component.');
    }
    return ctx;
}
