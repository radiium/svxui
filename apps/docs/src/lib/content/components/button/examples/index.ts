import type { ExamplesConfig } from '$lib/types';
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import FullWidthAlign, { source as FullWidthAlignSrc } from './FullWidthAlign.svelte?withSource';
import Icon, { source as IconSrc } from './Icon.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';
import States, { source as StatesSrc } from './States.svelte?withSource';
import TextTransform, { source as TextTransformSrc } from './TextTransform.svelte?withSource';
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
            title: 'Variants',
            Component: Variants,
            ...VariantsSrc
        },
        {
            title: 'Icon Only',
            Component: Icon,
            ...IconSrc
        },
        {
            title: 'States',
            Component: States,
            ...StatesSrc
        },
        {
            title: 'Full Width + Alignment',
            Component: FullWidthAlign,
            ...FullWidthAlignSrc
        },
        {
            title: 'Text Transform',
            Component: TextTransform,
            ...TextTransformSrc
        }
    ]
};
