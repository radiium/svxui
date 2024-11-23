import type { ActionReturn } from 'svelte/action';

export type LongpressParameters = {
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

export type LongpressAttributes = {
    /**
     * Event fired when longpress start
     */
    onstartlongpress?: (e: CustomEvent<void>) => void;
    /**
     * Event fired when longpress end
     */
    onendlongpress?: (e: CustomEvent<void>) => void;
};

export type LongpressActionReturn = ActionReturn<LongpressParameters, LongpressAttributes>;
