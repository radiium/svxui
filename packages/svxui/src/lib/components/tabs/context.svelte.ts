import { Context } from '$lib/utils/context.svelte.js';
import { TabsContentState, TabsListState, TabsRootState, TabsTriggerState } from './index.js';
import type { TabsContentStateProps, TabsRootStateProps, TabsTriggerStateProps } from './states/types.js';

const TabsRootContext = new Context<TabsRootState>('TabsRoot');

export function useTabsRoot(props: TabsRootStateProps): TabsRootState {
    const rootState = new TabsRootState(props);
    return TabsRootContext.set(rootState);
}

export function useTabsList(): TabsListState {
    return new TabsListState(TabsRootContext.get());
}

export function useTabsTrigger(props: TabsTriggerStateProps): TabsTriggerState {
    return new TabsTriggerState(TabsRootContext.get(), props);
}

export function useTabsContent(props: TabsContentStateProps): TabsContentState {
    return new TabsContentState(TabsRootContext.get(), props);
}
