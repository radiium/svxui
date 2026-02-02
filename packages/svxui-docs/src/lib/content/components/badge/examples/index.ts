// File generated, do not modify
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';
import States, { source as StatesSrc } from './States.svelte?withSource';
import Variants, { source as VariantsSrc } from './Variants.svelte?withSource';

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
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        },
        {
            title: 'States',
            Component: States,
            ...StatesSrc
        },
        {
            title: 'Variants',
            Component: Variants,
            ...VariantsSrc
        }
    ]
};
