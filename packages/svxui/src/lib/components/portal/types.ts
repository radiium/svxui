import type { Snippet } from 'svelte';

export type PortalProps = {
    target?: HTMLElement | string;
    disabled?: boolean;
    children?: Snippet;
};
