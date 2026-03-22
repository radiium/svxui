import type { ExamplesConfig } from '$lib/types';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc,
        column: true
    },
    items: []
};
