import type { GroupStateHelper } from '$lib/utils/group/group-state.svelte.js';
import { getContext, setContext } from 'svelte';

const contextKeyTab = Symbol('svxui-context-tab');

export function setTabContext(ctx: GroupStateHelper): void {
    setContext(contextKeyTab, ctx);
}

export function getTabContext(): GroupStateHelper {
    const ctx = getContext<GroupStateHelper>(contextKeyTab);
    if (!ctx) {
        throw new Error('`getTabContext` must be used within a `<TabGroup/>` component.');
    }
    return ctx;
}
