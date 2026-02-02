// File generated, do not modify
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Advanced, { source as AdvancedSrc } from './Advanced.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Advanced',
            description: 'Toggle portal and change target',
            Component: Advanced,
            ...AdvancedSrc
        }
    ]
};
