// File generated, do not modify
import Alignments, { source as AlignmentsSrc } from './Alignments.svelte?withSource';
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Fullwidth, { source as FullwidthSrc } from './Fullwidth.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';
import Types, { source as TypesSrc } from './Types.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Alignments',
            Component: Alignments,
            ...AlignmentsSrc
        },
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
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        },
        {
            title: 'Types',
            Component: Types,
            ...TypesSrc
        }
    ]
};
