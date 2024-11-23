import type { ActionReturn } from 'svelte/action';

export type ClickOutsideParameters = {
    /**
     * Enable/disable click event
     * @default true
     */
    enabled?: boolean;
    /**
     * Type of event
     * @default 'click'
     */
    event?: 'click' | 'mousedown' | 'pointerdown';
    /**
     * Options of event listener or boolean for capture
     * @default true
     */
    options?: AddEventListenerOptions | boolean;
};

export type ClickOutsideAttributes = {
    /**
     * Event fired when click inside
     */
    onclickinside?: (e: CustomEvent<MouseEvent>) => void;
    /**
     * Event fired when click outside
     */
    onclickoutside?: (e: CustomEvent<MouseEvent>) => void;
};

export type ClickOutsideActionReturn = ActionReturn<ClickOutsideParameters, ClickOutsideAttributes>;
