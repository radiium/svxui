// File generated, do not modify
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Separate_panel, { source as Separate_panelSrc } from './Separate_panel.svelte?withSource';
import Separate_text, { source as Separate_textSrc } from './Separate_text.svelte?withSource';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Colors',
            Component: Colors,
            ...ColorsSrc
        },
        {
            title: 'Separate panel',
            Component: Separate_panel,
            ...Separate_panelSrc
        },
        {
            title: 'Separate text',
            Component: Separate_text,
            ...Separate_textSrc
        },
        {
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        }
    ]
};
