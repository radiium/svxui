import type { ActionReturn } from 'svelte/action';

/**
 * Supported modifier keys
 */
export type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';

export type ShortcutTrigger = {
    /**
     * Enable/disable hot key
     * @default true
     */
    enabled?: boolean;
    /**
     * Id to distinguish this trigger from others, recommended when using `onshortcut`
     */
    id?: string;
    /**
     * KeyboardEvent.key to listen
     */
    key: string;
    /**
     * Modifier key to listen to in conjunction of `key`
     */
    modifier?: ShortcutModifier | ShortcutModifier[] | ShortcutModifier[][];
    /**
     * callback for when the trigger is matched
     */
    callback?: (detail: ShortcutEventDetail) => void;
    /**
     * Call event.preventDefault() before firing callback
     * @default false
     */
    preventDefault?: boolean;
};

export type ShortcutEventDetail = {
    /**
     * Current node of svelte action
     */
    node: HTMLElement;
    /**
     * ShortcutTrigger config
     */
    trigger: ShortcutTrigger;
    /**
     * Original KeyboardEvent
     */
    originalEvent: KeyboardEvent;
};

export type HotkeyParameters = {
    /**
     * Enable/disable all triggers hot key
     * @default true
     */
    enabled?: boolean;
    /**
     * Hot keys config
     * @default 'keydown'
     */
    trigger: Array<ShortcutTrigger> | ShortcutTrigger;
    /**
     * Event type
     * @default 'keydown'
     */
    type?: 'keydown' | 'keyup';
};

export type HotkeyAttributes = {
    /**
     * Event fired when hotkey pressed
     */
    onhotkey?: (event: CustomEvent<ShortcutEventDetail>) => void;
};

export type HotkeyActionReturn = ActionReturn<HotkeyParameters, HotkeyAttributes>;
