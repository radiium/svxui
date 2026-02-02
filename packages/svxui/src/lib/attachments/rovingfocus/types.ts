import type { Orientation } from '$lib/shared.types.js';

export type RovingfocusOptions = {
    /**
     * Item selector
     * @default '[data-roving-item]'
     */
    target?: string;
    /**
     * Loop roving focus
     * @default false
     */
    loop?: boolean;
    /**
     * Orientation ("vertical" | "horizontal")
     * @default vertical
     */
    orientation?: Orientation;
    /**
     * Initial item focus when wrapper is focused
     * @default 'first'
     */
    initialIndex?: number | 'first' | 'last';
    /**
     * Activate item when focused
     * @default false
     */
    activateOnFocus?: boolean;
};

export type RovingfocusConfigInternal = {
    target: string;
    loop: boolean;
    orientation: Orientation;
    initialIndex: number | 'first' | 'last';
    activateOnFocus: boolean;
    prevKey: string;
    nextKey: string;
    allowedKeys: string[];
};
