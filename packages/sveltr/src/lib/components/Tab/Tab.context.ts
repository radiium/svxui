import { getContext, setContext } from 'svelte';
import type { TabContext, TabGroupProps, TabPanelProps, TabTriggerProps } from './Tab.types.js';

const contextKeyTab = 'sveltr-context-tab';

export function setTabContext(ctx: TabContext): void {
    setContext(contextKeyTab, ctx);
}

export function getTabContext(): TabContext {
    const ctx = getContext<TabContext>(contextKeyTab);
    if (!ctx) {
        throw new Error('`getTabContext` must be used within a `<TabGroup/>` component.');
    }
    return ctx;
}
