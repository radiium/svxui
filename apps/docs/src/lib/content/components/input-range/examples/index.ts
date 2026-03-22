import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Fullwidth, { source as FullwidthSrc } from './Fullwidth.svelte?withSource';
import Orientation, { source as OrientationSrc } from './Orientation.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
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
            title: 'Fullwidth',
            Component: Fullwidth,
            ...FullwidthSrc
        },
        {
            title: 'Orientation',
            Component: Orientation,
            ...OrientationSrc
        },
        {
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        }
    ]
};
