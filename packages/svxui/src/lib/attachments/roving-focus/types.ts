import type { Orientation } from '$lib/shared.types.js';

export type RovingFocusProps = {
    target?: string;
    loop?: boolean;
    orientation?: Orientation;
    initialIndex?: number | 'first' | 'last';
    activateOnFocus?: boolean;
    onFocus?: (node: HTMLElement, index: number) => void;
    onActivate?: (node: HTMLElement, index: number) => void;
};

export type RovingFocusConfigInternal = {
    target: string;
    loop: boolean;
    orientation: Orientation;
    initialIndex: number | 'first' | 'last';
    activateOnFocus: boolean;
    prevKey: string;
    nextKey: string;
    allowedKeys: string[];
};
