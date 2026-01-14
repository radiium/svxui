import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { MODIFIERS_KEYS } from './internals/modifiers-keys.js';
import type { HotkeysBinding } from './types.js';

/**
 * @description Tracks which keys are currently pressed
 * Credit {@link https://github.com/svecosystem/runed/blob/main/packages/runed/src/lib/utilities/pressed-keys/}
 */
export class HotkeysState {
    readonly #pressedKeys = new Set<string>();
    readonly #bindings = new Set<HotkeysBinding>();
    readonly #activeBindings = new Set<HotkeysBinding>();

    readonly #subscribe?: () => void;

    constructor() {
        if (typeof window === 'undefined') return;

        this.#subscribe = createSubscriber((update) => {
            const offKeydown = on(window, 'keydown', (event) => {
                this.#onKeydown(update, event);
            });
            const offKeyup = on(window, 'keyup', (event) => {
                this.#onKeyup(update, event);
            });
            const offBlur = on(window, 'blur', () => {
                this.#onBlur(update);
            });
            const offVisibilitychange = on(document, 'visibilitychange', () => {
                this.#onVisibilitychange(update);
            });

            return () => {
                offKeydown();
                offKeyup();
                offBlur();
                offVisibilitychange();
            };
        });
    }

    #onKeydown = (update: () => void, event: KeyboardEvent) => {
        if (event.repeat) return;

        let changed = false;
        const key = event.key.toLowerCase();
        const isModifier = MODIFIERS_KEYS.includes(key);

        // Pressing a regular key retains only that key plus any modifiers.
        // Any modifier change disables regular key presses.
        // Normal key → only one active at a time
        if (!isModifier) {
            for (const item of [...this.#pressedKeys]) {
                if (!MODIFIERS_KEYS.includes(item)) {
                    this.#pressedKeys.delete(item);
                    changed = true;
                }
            }
        }

        if (!this.#pressedKeys.has(key)) {
            this.#pressedKeys.add(key);
            changed = true;
        }

        for (const binding of this.#bindings) {
            if (
                binding.combo.length === this.#pressedKeys.size &&
                binding.combo.every((k) => this.#pressedKeys.has(k))
            ) {
                if (!this.#activeBindings.has(binding)) {
                    this.#activeBindings.add(binding);
                    binding.callback(event);
                }
            }
        }

        if (changed) {
            update();
        }
    };

    #onKeyup = (update: () => void, event: KeyboardEvent) => {
        let changed = false;
        const key = event.key.toLowerCase();
        const isModifier = MODIFIERS_KEYS.includes(key);

        if (isModifier) {
            for (const item of [...this.#pressedKeys]) {
                if (!MODIFIERS_KEYS.includes(item)) {
                    this.#pressedKeys.delete(item);
                    changed = true;
                }
            }
        }

        // Regular key removal
        if (this.#pressedKeys.has(key)) {
            this.#pressedKeys.delete(key);
            changed = true;
        }

        for (const binding of this.#activeBindings) {
            if (!binding.combo.every((k) => this.#pressedKeys.has(k))) {
                this.#activeBindings.delete(binding);
            }
        }

        if (changed) {
            update();
        }
    };

    #onBlur = (update: () => void) => {
        this.#pressedKeys.clear();
        this.#activeBindings.clear();
        update();
    };

    #onVisibilitychange = (update: () => void) => {
        if (document.visibilityState === 'hidden') {
            this.#pressedKeys.clear();
        }
        this.#activeBindings.clear();
        update();
    };

    #normalize = (keys: string | string[]) => {
        const combo = Array.isArray(keys) ? keys : keys.split('+');
        return combo.map((key) => {
            const k = key.toLowerCase();
            if (k === ' ' || k.trim() === 'space') return ' ';
            return k.trim();
        });
    };

    get all() {
        this.#subscribe?.();
        return [...this.#pressedKeys];
    }

    has = (keys: string | string[]) => {
        this.#subscribe?.();
        const combo = this.#normalize(keys);
        return (
            combo.length === this.#pressedKeys.size && //
            combo.every((key) => this.#pressedKeys.has(key))
        );
    };

    on = (keys: string | string[], callback: (event: KeyboardEvent) => void) => {
        this.#subscribe?.();

        const binding = {
            combo: this.#normalize(keys),
            callback
        };

        this.#bindings.add(binding);

        return () => {
            this.#bindings.delete(binding);
        };
    };
}
