import { listen } from '$lib/utils/listen.js';
import type { ActionReturn } from 'svelte/action';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * Internal types
 */
export type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';
export interface ShortcutTrigger {
    enabled?: boolean;
    id?: string;
    key: string;
    modifier?: ShortcutModifier | ShortcutModifier[] | ShortcutModifier[][];
    callback?: (detail: ShortcutEventDetail) => void;
    preventDefault?: boolean;
}
export interface ShortcutEventDetail {
    node: HTMLElement;
    trigger: ShortcutTrigger;
    originalEvent: KeyboardEvent;
}

/**
 * Public types
 */

export type HotkeyParameters = {
    enabled?: boolean;
    trigger: Array<ShortcutTrigger> | ShortcutTrigger;
    type?: 'keydown' | 'keyup';
};
export type HotkeyAttributes = {
    'on:hotkey'?: (event: CustomEvent<ShortcutEventDetail>) => void;
};

/**
 * Listen click outside a node
 * Credits: https://github.com/vnphanquang/svelte-put/blob/main/packages/shortcut/src/shortcut.js
 *
 * @param {HTMLElement} node
 * @returns
 */
export function hotkeyAction(
    node: HTMLElement,
    params: HotkeyParameters
): ActionReturn<HotkeyParameters, HotkeyAttributes> {
    let { enabled = true, trigger, type = 'keydown' } = params;

    function handler(event: KeyboardEvent) {
        const normalizedTriggers = Array.isArray(trigger) ? trigger : [trigger];
        const modifiedMap: Record<ShortcutModifier, boolean> = {
            alt: event.altKey,
            ctrl: event.ctrlKey,
            shift: event.shiftKey,
            meta: event.metaKey
        };
        for (const trigger of normalizedTriggers) {
            const mergedTrigger = {
                modifier: [],
                preventDefault: false,
                enabled: true,
                ...trigger
            };
            const { modifier, key, callback, preventDefault, enabled: triggerEnabled } = mergedTrigger;
            if (triggerEnabled) {
                if (modifier.length) {
                    const modifierDefs = (Array.isArray(modifier) ? modifier : [modifier]).map((def) =>
                        typeof def === 'string' ? [def] : def
                    );
                    const modified = modifierDefs.some((def) =>
                        def.every((modifier) => modifiedMap[modifier])
                    );
                    if (!modified) continue;
                }
                if (event.key === key) {
                    if (preventDefault) event.preventDefault();
                    const detail: ShortcutEventDetail = {
                        node,
                        trigger: mergedTrigger,
                        originalEvent: event
                    };
                    node.dispatchEvent(new CustomEvent('shortcut', { detail }));
                    callback?.(detail);
                }
            }
        }
    }

    if (enabled) node.addEventListener(type, handler);

    return {
        update: (update) => {
            const { enabled: newEnabled = true, type: newType = 'keydown' } = update;

            if (enabled && (!newEnabled || type !== newType)) {
                node.removeEventListener(type, handler);
            } else if (!enabled && newEnabled) {
                node.addEventListener(newType, handler);
            }

            enabled = newEnabled;
            type = newType;
            trigger = update.trigger;
        },
        destroy: () => {
            node.removeEventListener(type, handler);
        }
    };
}
