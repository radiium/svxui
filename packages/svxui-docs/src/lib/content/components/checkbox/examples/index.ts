// File generated, do not modify
import Colors, { source as ColorsSrc } from './Colors.svelte?withSource';
import Group, { source as GroupSrc } from './Group.svelte?withSource';
import Label, { source as LabelSrc } from './Label.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
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
            title: 'Group',
            Component: Group,
            ...GroupSrc
        },
        {
            title: 'Label',
            Component: Label,
            ...LabelSrc
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
        }
    ]
};
