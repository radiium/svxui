import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import Responsive_grid, { source as Responsive_gridSrc } from './Responsive_grid.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Responsive grid',
            Component: Responsive_grid,
            ...Responsive_gridSrc
        }
    ]
};
