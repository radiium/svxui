import { onDestroy } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { GroupItem } from './group-item.svelte.js';
import type { GroupProps } from './types.js';

/**
 * Manage group (accordions, tabs, etc...)
 */
export class Group {
    #items = new SvelteMap<string, GroupItem>();
    #value: GroupProps['value'];
    #disabled: GroupProps['disabled'];
    #multi: GroupProps['multi'];

    constructor({ value, disabled, multi }: GroupProps) {
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
    registerItem(item: GroupItem): void {
        if (!this.#items.has(item.value)) {
            this.#items.set(item.value, item);
        }
    }

    /**
     * Unregister item
     *
     * @param item
     */
    unregisterItem(item: GroupItem): void {
        if (this.#items.has(item.value)) {
            this.#items.delete(item.value);
        }
    }

    /**
     * Select active tab & deactivate other
     *
     * @param tabValue
     */
    selectItem(currentItem: GroupItem): void {
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
    toggleItem(currentItem: GroupItem): void {
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
    getItem(value: string): GroupItem | undefined {
        return this.#items.get(value);
    }
}
