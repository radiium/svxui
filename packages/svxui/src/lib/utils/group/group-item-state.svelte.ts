import { generateId } from '$lib/utils/id.js';
import { onDestroy } from 'svelte';
import type { GroupItemStateProps, ItemAttrs } from './types.js';

/**
 * Manage group item (accordions, tabs, etc...)
 */
export class GroupItemStateHelper {
    #id = generateId();
    #active = $state(false);
    #value: GroupItemStateProps['value'];
    #disabled: GroupItemStateProps['disabled'];
    #attributs = $state<Record<string, ItemAttrs>>({});

    constructor({ value, disabled, attributsBuilder }: GroupItemStateProps) {
        this.#value = value;
        this.#disabled = disabled;

        if (attributsBuilder) {
            const destroy = $effect.root(() => {
                $effect(() => {
                    this.#attributs = attributsBuilder({
                        id: this.id,
                        active: this.#active,
                        value: this.#value.current,
                        disabled: this.#disabled.current
                    });
                });
            });

            onDestroy(destroy);
        }
    }

    /**
     * Update active
     *
     * @param newActive
     */
    setActive(newActive: boolean) {
        if (!this.#disabled.current) {
            this.#active = newActive;
        }
    }

    get id() {
        return this.#id;
    }

    get active() {
        return this.#active;
    }

    get value() {
        return this.#value.current;
    }

    get disabled() {
        return this.#disabled.current;
    }

    get attributs() {
        return this.#attributs;
    }
}
