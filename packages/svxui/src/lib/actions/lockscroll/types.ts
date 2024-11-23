import type { ActionReturn } from 'svelte/action';

export type LockScrollParameters = {
    /**
     * Enable/disable lock scroll
     * @default true
     */
    enabled?: boolean;
};

export type LockScrollAttributes = {
    /**
     * Event fired when lock scroll enabled/disabled change
     */
    onlockscrollchange?: (e: CustomEvent<boolean>) => void;
};

export type LockScrollActionReturn = ActionReturn<LockScrollParameters, LockScrollAttributes>;
