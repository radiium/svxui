import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Vertical_tabs, { source as Vertical_tabsSrc } from './Vertical_tabs.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Vertical tabs',
            Component: Vertical_tabs,
            ...Vertical_tabsSrc
        }
    ]
};
