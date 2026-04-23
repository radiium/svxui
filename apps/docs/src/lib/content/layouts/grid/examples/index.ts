import type { ExamplesConfig } from '$lib/types';
import Asymmetric_columns, { source as Asymmetric_columnsSrc } from './Asymmetric_columns.svelte?withSource';
import Dense_flow, { source as Dense_flowSrc } from './Dense_flow.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import Responsive_grid, { source as Responsive_gridSrc } from './Responsive_grid.svelte?withSource';
import Template_areas, { source as Template_areasSrc } from './Template_areas.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Responsive grid',
            description: 'autoFill creates as many columns as possible without any media query.',
            Component: Responsive_grid,
            ...Responsive_gridSrc
        },
        {
            title: 'Template areas',
            description: 'Name zones with areas to compose a layout (header, sidebar, main, footer).',
            Component: Template_areas,
            ...Template_areasSrc
        },
        {
            title: 'Asymmetric columns',
            description: 'Pass a custom CSS template to cols for columns of different widths.',
            Component: Asymmetric_columns,
            ...Asymmetric_columnsSrc
        },
        {
            title: 'Dense flow',
            description: 'flow="row-dense" fills gaps left by items spanning multiple columns.',
            Component: Dense_flow,
            ...Dense_flowSrc
        }
    ]
};
