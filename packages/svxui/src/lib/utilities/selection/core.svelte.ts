import { untrack } from 'svelte';
import type { SelectionOptions, SelectionValue } from './types.js';

/**
 * @description A utility class that manages single or multiple external selection state with methods to query and update the current selection.
 * @param options Configuration options including the value state to manage and multiple or single selection.
 */
export class SelectionState<V, M extends boolean> {
    #options: SelectionOptions<V, M>;

    constructor(options: SelectionOptions<V, M>) {
        this.#options = options;
        let prevMultiple: boolean | undefined; //= options.multiple;

        // Handle multiple change
        // And update value type if needed
        $effect.root(() => {
            $effect(() => {
                if (options.multiple !== prevMultiple) {
                    untrack(() => {
                        if (options.multiple && !Array.isArray(options.value)) {
                            options.value = [] as SelectionValue<V, M>;
                        } else if (!options.multiple && Array.isArray(options.value)) {
                            options.value = undefined;
                        }
                        prevMultiple = options.multiple;
                    });
                }
            });
        });
    }

    /**
     * Can select single or multiple item at time
     */
    get multiple() {
        return this.#options.multiple ?? false;
    }

    /**
     * Selected items count
     */
    get count(): number {
        if (this.multiple && Array.isArray(this.#options.value)) {
            return this.#options.value.length;
        }
        return this.#options.value === null || this.#options.value === undefined ? 0 : 1;
    }

    /**
     * Check if item is selected or not
     * @param item
     * @returns
     */
    has(item: V): boolean {
        return this.multiple && Array.isArray(this.#options.value)
            ? this.#options.value.includes(item)
            : this.#options.value === item;
    }

    /**
     * Select item
     * @param item
     */
    select(item: V): void {
        if (this.multiple && Array.isArray(this.#options.value)) {
            const value = Array.isArray(this.#options.value)
                ? this.#options.value
                : this.#options.value
                  ? [this.#options.value]
                  : [];
            this.#options.value = [...new Set([...this.#options.value, item])] as SelectionValue<V, M>;
        } else {
            this.#options.value = item as SelectionValue<V, M>;
        }
    }

    /**
     * Deselect item
     * @param item
     */
    deselect(item: V): void {
        if (this.multiple && Array.isArray(this.#options.value)) {
            this.#options.value = this.#options.value.filter((o) => o !== item) as SelectionValue<V, M>;
        } else {
            this.#options.value = this.#options.value === item ? null : this.#options.value;
        }
    }

    /**
     * Toggle select item
     * @param item
     */
    toggle(item: V): void {
        if (this.has(item)) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    /**
     * Clear selection
     */
    clear(): void {
        if (this.multiple && Array.isArray(this.#options.value)) {
            this.#options.value = [] as SelectionValue<V, M>;
        } else {
            this.#options.value = null;
        }
    }
}
