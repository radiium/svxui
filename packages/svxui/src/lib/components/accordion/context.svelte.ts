import type { Group } from '$lib/hooks/group/group.svelte.js';
import { getContext, setContext } from 'svelte';

const contextKeyAccordion = Symbol('svxui-context-accordion');

export function setAccordionContext(ctx: Group): void {
    setContext(contextKeyAccordion, ctx);
}

export function getAccordionContext(): Group {
    const ctx = getContext<Group | undefined>(contextKeyAccordion);
    if (!ctx) {
        throw new Error('`getAccordionContext` must be used within a `<AccordionGroup/>` component.');
    }
    return ctx;
}
