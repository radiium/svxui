import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { MODIFIERS_KEYS } from './internals/modifiers-keys.js';
import type { HotkeysBinding } from './types.js';

/**
 * Tracks active keyboard keys and handles hotkey combinations with callback bindings.
 */
export class Hotkeys {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    readonly #pressedKeys = new Set<string>();
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    readonly #bindings = new Set<HotkeysBinding>();
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
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

    /**
     * Keydown event listener
     * @param update
     * @param event
     * @returns
     */
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
                binding.combo.every((comboKey) => this.#pressedKeys.has(comboKey))
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

    /**
     * Keyup event listener
     * @param update
     * @param event
     */
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

    /**
     * Blur event listener
     * @param update
     */
    #onBlur = (update: () => void) => {
        this.#pressedKeys.clear();
        this.#activeBindings.clear();
        update();
    };

    /**
     * Visibilitychange event listener
     * @param update
     */
    #onVisibilitychange = (update: () => void) => {
        if (document.visibilityState === 'hidden') {
            this.#pressedKeys.clear();
        }
        this.#activeBindings.clear();
        update();
    };

    /**
     * Normalize key(s) bindings
     * @param keys
     * @returns
     */
    #normalize = (keys: string | string[]) => {
        const combo = Array.isArray(keys) ? keys : keys.split('+');
        return combo.map((key) => {
            const k = key.toLowerCase();
            if (k === ' ' || k.trim() === 'space') return ' ';
            return k.trim();
        });
    };

    /**
     * All active keys
     */
    get all() {
        this.#subscribe?.();
        return [...this.#pressedKeys];
    }

    /**
     * Check if a key combinaison is active or not
     * @param keys
     * @returns
     */
    has = (keys: string | string[]) => {
        this.#subscribe?.();
        const combo = this.#normalize(keys);
        return (
            combo.length === this.#pressedKeys.size && //
            combo.every((key) => this.#pressedKeys.has(key))
        );
    };

    /**
     * Listen key combinaison
     * @param keys
     * @param callback
     * @returns
     */
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
