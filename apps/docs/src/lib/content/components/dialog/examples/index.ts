import type { ExamplesConfig } from '$lib/types';
import KeepMounted, { source as KeepMountedSrc } from './KeepMounted.svelte?withSource';
import LayoutFixed, { source as LayoutFixedSrc } from './LayoutFixed.svelte?withSource';
import LayoutFullscreen, { source as LayoutFullscreenSrc } from './LayoutFullscreen.svelte?withSource';
import LayoutScroll, { source as LayoutScrollSrc } from './LayoutScroll.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import AlertDialog, { source as AlertDialogSrc } from './AlertDialog.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Layout fixed (default)',
            description: 'Centered content in viewport, overflow hidden',
            Component: LayoutFixed,
            ...LayoutFixedSrc
        },
        {
            title: 'Layout scroll',
            description: 'Scrollable vertically, useful for tall content',
            Component: LayoutScroll,
            ...LayoutScrollSrc
        },
        {
            title: 'Layout fullscreen',
            description: 'Fills the entire viewport (100vw × 100vh)',
            Component: LayoutFullscreen,
            ...LayoutFullscreenSrc
        },
        {
            title: 'Keep mounted',
            description: 'Keep dialog in the DOM when closed instead of unmounting it',
            Component: KeepMounted,
            ...KeepMountedSrc
        },
        {
            title: 'Alert dialog',
            Component: AlertDialog,
            ...AlertDialogSrc
        }
    ]
};
