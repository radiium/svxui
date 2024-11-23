import { on } from 'svelte/events';
import type { HotkeyActionReturn, HotkeyParameters, ShortcutEventDetail, ShortcutModifier } from './types.js';

/**
 * Listen hot key shortcut
 * Credits: https://github.com/vnphanquang/svelte-put
 */
export function hotkeyAction(node: HTMLElement, params: HotkeyParameters): HotkeyActionReturn {
    let { enabled = true, trigger, type = 'keydown' } = params;

    function handler(event: KeyboardEvent) {
        console.log(event.key, event.keyCode);
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
                    if (preventDefault) {
                        event.preventDefault();
                    }

                    const detail: ShortcutEventDetail = {
                        node,
                        trigger: mergedTrigger,
                        originalEvent: event
                    };
                    node.dispatchEvent(new CustomEvent('onhotkey', { detail }));
                    callback?.(detail);
                }
            }
        }
    }

    let off: (() => void) | undefined;
    if (enabled) {
        off = on(node, type, handler);
    }

    return {
        update: (update: HotkeyParameters) => {
            const { enabled: newEnabled = true, type: newType = 'keydown' } = update;
            if (enabled && (!newEnabled || type !== newType)) {
                off?.();
            } else if (!enabled && newEnabled) {
                off = on(node, newType, handler);
            }

            enabled = newEnabled;
            type = newType;
            trigger = update.trigger;
        },
        destroy: () => {
            off?.();
        }
    };
}
