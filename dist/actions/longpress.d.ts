import type { ActionReturn } from 'svelte/action';
type Parameters = {
    duration: number;
};
type Attributes = {
    'on:startlongpress': (e: CustomEvent<void>) => void;
    'on:endlongpress': (e: CustomEvent<void>) => void;
};
/**
 * Listen long press on node
 *
 * @param node
 * @param params
 * @returns
 */
export declare function longpress(node: HTMLElement, params: Parameters): ActionReturn<Parameters, Attributes>;
export {};
