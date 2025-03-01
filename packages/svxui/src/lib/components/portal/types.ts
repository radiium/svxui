import type { Snippet } from 'svelte';

export type PortalProps = {
    /**
     * Target identifier or any HTMLElement
     */
    target?: HTMLElement | string;
    /**
     * Disable portal
     */
    disabled?: boolean;
    /**
     * Portal content to render
     */
    children?: Snippet<[void]>;
};
