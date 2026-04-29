import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';
import States, { source as StatesSrc } from './States.svelte?withSource';
import Text_align, { source as Text_alignSrc } from './Text_align.svelte?withSource';
import Text_transform, { source as Text_transformSrc } from './Text_transform.svelte?withSource';
import Truncate, { source as TruncateSrc } from './Truncate.svelte?withSource';
import Weights, { source as WeightsSrc } from './Weights.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc,
        column: true
    },
    items: [
        {
            title: 'Colors',
            Component: Colors,
            ...ColorsSrc,
            column: true
        },
        {
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc,
            column: true
        },
        {
            title: 'States',
            Component: States,
            ...StatesSrc,
            column: true
        },
        {
            title: 'Text align',
            Component: Text_align,
            ...Text_alignSrc,
            column: true
        },
        {
            title: 'Text transform',
            Component: Text_transform,
            ...Text_transformSrc,
            column: true
        },
        {
            title: 'Truncate',
            Component: Truncate,
            ...TruncateSrc,
            column: true
        },
        {
            title: 'Weights',
            Component: Weights,
            ...WeightsSrc,
            column: true
        }
    ]
};
