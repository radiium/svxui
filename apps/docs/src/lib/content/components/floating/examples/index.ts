import Arrow, { source as ArrowSrc } from './Arrow.svelte?withSource';
import Close_from_inside, { source as Close_from_insideSrc } from './Close_from_inside.svelte?withSource';
import Floating_ui_middlewares, {
    source as Floating_ui_middlewaresSrc
} from './Floating_ui_middlewares.svelte?withSource';
import Open_on_hover, { source as Open_on_hoverSrc } from './Open_on_hover.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Variants, { source as VariantsSrc } from './Variants.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Arrow',
            Component: Arrow,
            ...ArrowSrc
        },
        {
            title: 'Close from inside',
            Component: Close_from_inside,
            ...Close_from_insideSrc
        },
        {
            title: 'Floating ui middlewares',
            Component: Floating_ui_middlewares,
            ...Floating_ui_middlewaresSrc
        },
        {
            title: 'Open on hover',
            Component: Open_on_hover,
            ...Open_on_hoverSrc
        },
        {
            title: 'Variants',
            Component: Variants,
            ...VariantsSrc,
            column: true
        }
    ]
};
