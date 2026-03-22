import type { ExamplesConfig } from '$lib/types';
import Horizontal, { source as HorizontalSrc } from './Horizontal.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Horizontal',
            Component: Horizontal,
            ...HorizontalSrc
        }
    ]
};
