import type { ExamplesConfig } from '$lib/types';
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Custom_options, { source as Custom_optionsSrc } from './Custom_options.svelte?withSource';
import Fullwidth, { source as FullwidthSrc } from './Fullwidth.svelte?withSource';
import Group, { source as GroupSrc } from './Group.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import Sizes, { source as SizesSrc } from './Sizes.svelte?withSource';
import States, { source as StatesSrc } from './States.svelte?withSource';

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
            title: 'Fullwidth',
            Component: Fullwidth,
            ...FullwidthSrc,
            column: true
        },
        {
            title: 'Group',
            Component: Group,
            ...GroupSrc,
            column: true
        },
        {
            title: 'Custom options',
            Component: Custom_options,
            ...Custom_optionsSrc
        }
    ]
};
