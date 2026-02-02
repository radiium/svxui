// File generated, do not modify
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Custom_options, { source as Custom_optionsSrc } from './Custom_options.svelte?withSource';
import Fullwidth, { source as FullwidthSrc } from './Fullwidth.svelte?withSource';
import Fullwidth_plus_multiple, {
    source as Fullwidth_plus_multipleSrc
} from './Fullwidth_plus_multiple.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Size_plus_multiple, { source as Size_plus_multipleSrc } from './Size_plus_multiple.svelte?withSource';
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
            title: 'Custom options',
            Component: Custom_options,
            ...Custom_optionsSrc
        },
        {
            title: 'Fullwidth',
            Component: Fullwidth,
            ...FullwidthSrc
        },
        {
            title: 'Fullwidth + multiple',
            Component: Fullwidth_plus_multiple,
            ...Fullwidth_plus_multipleSrc
        },
        {
            title: 'Size + multiple',
            Component: Size_plus_multiple,
            ...Size_plus_multipleSrc
        },
        {
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        }
    ]
};
