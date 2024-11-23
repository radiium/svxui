import type { ActionReturn } from 'svelte/action';

export type PortalParameters = {
    /**
     * Enable/disable portal
     * @default true
     */
    enabled?: boolean;
    /**
     * Portal target
     * @default 'body'
     */
    target?: HTMLElement | string | undefined;
};

export type PortalActionReturn = ActionReturn<PortalParameters>;
