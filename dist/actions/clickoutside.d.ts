import type { ActionReturn } from 'svelte/action';
type Parameters = void;
type Attributes = {
    'on:clickoutside': (e: CustomEvent<HTMLElement>) => void;
};
/**
 * Listen click outside a node
 *
 * @param node
 * @returns
 */
export declare function clickoutside(node: HTMLElement): ActionReturn<Parameters, Attributes>;
export {};
