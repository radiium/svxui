import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import Responsive_grid, { source as Responsive_gridSrc } from './Responsive_grid.svelte?withSource';
import Template_areas, { source as Template_areasSrc } from './Template_areas.svelte?withSource';
import Asymmetric_columns, { source as Asymmetric_columnsSrc } from './Asymmetric_columns.svelte?withSource';
import Dense_flow, { source as Dense_flowSrc } from './Dense_flow.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Responsive grid',
            description: 'autoFill crée automatiquement autant de colonnes que possible sans media query.',
            Component: Responsive_grid,
            ...Responsive_gridSrc
        },
        {
            title: 'Template areas',
            description: 'Nommer les zones avec areas pour composer un layout (header, sidebar, main, footer).',
            Component: Template_areas,
            ...Template_areasSrc
        },
        {
            title: 'Asymmetric columns',
            description: 'Passer un template CSS personnalisé à cols pour des colonnes de largeurs différentes.',
            Component: Asymmetric_columns,
            ...Asymmetric_columnsSrc
        },
        {
            title: 'Dense flow',
            description: 'flow="row-dense" remplit les trous laissés par les items qui s\'étendent sur plusieurs colonnes.',
            Component: Dense_flow,
            ...Dense_flowSrc
        }
    ]
};
