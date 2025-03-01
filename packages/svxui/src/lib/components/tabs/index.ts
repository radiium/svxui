import TabContent from './components/tab-content.svelte';
import TabList from './components/tab-list.svelte';
import TabRoot from './components/tab-root.svelte';
import TabTrigger from './components/tab-trigger.svelte';

export { TabsContentState } from './states/tabs-content-state.svelte.js';
export { TabsListState } from './states/tabs-list-state.svelte.js';
export { TabsRootState } from './states/tabs-root-state.svelte.js';
export { TabsTriggerState } from './states/tabs-trigger-state.svelte.js';

export { useTabsContent, useTabsList, useTabsRoot, useTabsTrigger } from './context.svelte.js';

export { defaultTabContentProps, defaultTabRootProps, defaultTabTriggerProps } from './props.js';

export const Tabs = {
    Root: TabRoot,
    List: TabList,
    Trigger: TabTrigger,
    Content: TabContent
};

export type {
    TabContentProps,
    TabListProps,
    TabRootProps,
    TabsSelectionValue,
    TabsValue,
    TabTriggerProps
} from './types.js';
