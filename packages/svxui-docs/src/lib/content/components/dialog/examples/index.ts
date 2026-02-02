// File generated, do not modify
import Advanced_layout, { source as Advanced_layoutSrc } from './Advanced_layout.svelte?withSource';
import Fullscreen, { source as FullscreenSrc } from './Fullscreen.svelte?withSource';
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
            title: 'Advanced layout',
            Component: Advanced_layout,
            ...Advanced_layoutSrc
        },
        {
            title: 'Fullscreen',
            Component: Fullscreen,
            ...FullscreenSrc
        },
        {
            title: 'Sizes',
            Component: Sizes,
            ...SizesSrc
        }
    ]
};
