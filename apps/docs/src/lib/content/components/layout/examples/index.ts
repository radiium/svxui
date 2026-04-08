import type { ExamplesConfig } from '$lib/types';
import App_shell, { source as App_shellSrc } from './App_shell.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'App shell',
            Component: App_shell,
            ...App_shellSrc
        }
    ]
};
