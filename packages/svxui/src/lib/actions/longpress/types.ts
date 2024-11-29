import type { ActionReturn } from 'svelte/action';

export type LongPressParameters = {
    /**
     * Enable/disable lock scroll
     * @default true
     */
    enabled?: boolean;
    /**
     * Time in milliseconds before start longpress
     * @default 800
     */
    duration?: number;
};

export type LongPressAttributes = {
    /**
     * Event fired when longpress start
     */
    onstartlongpress?: (e: CustomEvent<void>) => void;
    /**
     * Event fired when longpress end
     */
    onendlongpress?: (e: CustomEvent<void>) => void;
};

export type LongPressActionReturn = ActionReturn<LongPressParameters, LongPressAttributes>;
