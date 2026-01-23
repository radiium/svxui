import type { Orientation } from '$lib/shared.types.js';

export type RovingfocusOptions = {
    /**
     * Item selector
     */
    target?: string;
    /**
     * Loop roving focus
     */
    loop?: boolean;
    /**
     * Orientation ("horizontal" | "vertical")
     */
    orientation?: Orientation;
    /**
     * Initial item focus when wrapper is focused
     */
    initialIndex?: number | 'first' | 'last';
    /**
     * Activate item when focused
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
