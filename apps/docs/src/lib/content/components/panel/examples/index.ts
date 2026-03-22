import Card, { source as CardSrc } from './Card.svelte?withSource';
import Checkbox_list, { source as Checkbox_listSrc } from './Checkbox_list.svelte?withSource';
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import FullSize, { source as FullSizeSrc } from './FullSize.svelte?withSource';
import Interactive, { source as InteractiveSrc } from './Interactive.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';
import Variants, { source as VariantsSrc } from './Variants.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Card',
            Component: Card,
            ...CardSrc
        },
        {
            title: 'Checkbox list',
            Component: Checkbox_list,
            ...Checkbox_listSrc
        },
        {
            title: 'Colors',
            Component: Colors,
            ...ColorsSrc
        },
        {
            title: 'Fullwidth/Fullheight',
            Component: FullSize,
            ...FullSizeSrc
        },
        {
            title: 'Interactive',
            Component: Interactive,
            ...InteractiveSrc
        },
        {
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        },
        {
            title: 'Variants',
            Component: Variants,
            ...VariantsSrc
        }
    ]
};
