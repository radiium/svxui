import { onDestroy } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { GroupItemStateHelper } from './group-item-state.svelte.js';
import type { GroupStateProps } from './types.js';

/**
 * Manage group (accordions, tabs, etc...)
 */
export class GroupStateHelper {
    #items = new SvelteMap<string, GroupItemStateHelper>();
    #value: GroupStateProps['value'];
    #disabled: GroupStateProps['disabled'];
    #multi: GroupStateProps['multi'];

    constructor({ value, disabled, multi }: GroupStateProps) {
        this.#value = value;
        this.#disabled = disabled;
        this.#multi = multi;

        onDestroy(this.#destroy);
    }

    #destroy = $effect.root(() => {
        /**
         * Update item's states when value change from outside (controlled)
         */
        $effect(() => {
            this.#items.forEach((item) => {
                const activeSingle = !this.#multi.current && item.value === this.#value.current;
                const activeMulti =
                    this.#multi.current &&
                    Array.isArray(this.#value.current) &&
                    this.#value.current.includes(item.value);

                if (activeSingle || activeMulti) {
                    item.setActive(true);
                } else {
                    // Item not selected at all
                    item.setActive(false);
                }
            });
        });

        /**
         * Update value when multi change from outside (controlled)
         */
        $effect(() => {
            if (this.#multi.current) {
                if (!Array.isArray(this.#value.current) && this.#value.current) {
                    this.#value.current = [this.#value.current];
                }
            } else {
                if (Array.isArray(this.#value.current)) {
                    this.#value.current = this.#value.current[0];
                }
            }
        });
    });

    /**
     * Resolve active items
     *
     * @returns
     */
    #getActiveItems(): string | string[] | undefined {
        const filteredItems = [...this.#items.values()] //
            .filter((item) => item.active)
            .map((item) => item.value);
        return this.#multi.current ? filteredItems : filteredItems[0];
    }

    /**
     * Register item
     *
     * @param item
     */
    registerItem(item: GroupItemStateHelper): void {
        if (!this.#items.has(item.value)) {
            this.#items.set(item.value, item);
        }
    }

    /**
     * Unregister item
     *
     * @param item
     */
    unregisterItem(item: GroupItemStateHelper): void {
        if (this.#items.has(item.value)) {
            this.#items.delete(item.value);
        }
    }

    /**
     * Select active tab & deactivate other
     *
     * @param tabValue
     */
    selectItem(currentItem: GroupItemStateHelper): void {
        if (this.#disabled.current || currentItem.disabled || !this.#items.has(currentItem.value)) {
            return;
        }

        this.#value.current = currentItem.value;

        this.#items.forEach((item) => {
            if (item === currentItem) {
                item.setActive(true);
            } else {
                item.setActive(false);
            }
        });
    }

    /**
     * Toggle item active state
     *
     * @param itemToggle
     * @returns
     */
    toggleItem(currentItem: GroupItemStateHelper): void {
        if (this.#disabled.current || currentItem.disabled || !this.#items.has(currentItem.value)) {
            return;
        }

        this.#items.forEach((item) => {
            if (item === currentItem) {
                item.setActive(!item.active);
            } else if (!this.#multi.current) {
                item.setActive(false);
            }
        });

        this.#value.current = this.#getActiveItems();
    }

    /**
     * Get item
     *
     * @param value
     * @returns
     */
    getItem(value: string): GroupItemStateHelper | undefined {
        return this.#items.get(value);
    }
}
