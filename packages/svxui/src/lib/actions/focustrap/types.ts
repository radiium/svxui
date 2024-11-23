import type { ActionReturn } from 'svelte/action';

export type FocusTrapParameters = {
    /**
     * Enable/disable focus trap
     * @default true
     */
    enabled?: boolean;
};

export type FocusTrapActionReturn = ActionReturn<FocusTrapParameters>;

export type FocusindexElement = HTMLElement & { dataset: { focusindex: string } };
