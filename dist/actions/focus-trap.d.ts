import type { ActionReturn } from 'svelte/action';
type Parameters = boolean;
type Attributes = {
    active: boolean;
};
/**
 * Traps focus within a wrapper element
 *
 * @param wrap
 * @param active
 * @returns
 */
declare function focusTrap(wrap: HTMLElement, active?: boolean): ActionReturn<Parameters, Attributes>;
export { focusTrap };
