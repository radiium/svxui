import type { Group } from '$lib/hooks/group/index.js';
import { getContext, setContext } from 'svelte';

const contextKeyTab = Symbol('svxui-context-tab');

export function setTabContext(ctx: Group): void {
    setContext(contextKeyTab, ctx);
}

export function getTabContext(): Group {
    const ctx = getContext<Group>(contextKeyTab);
    if (!ctx) {
        throw new Error('`getTabContext` must be used within a `<TabGroup/>` component.');
    }
    return ctx;
}
