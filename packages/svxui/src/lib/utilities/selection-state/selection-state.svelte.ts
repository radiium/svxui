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

        $inspect(options.multiple).with((_, val) => console.log('[SelectionState] multiple', val));

        $effect.root(() => {
            $effect(() => {
                console.log('[SelectionState] multiple change');

                if (options.multiple !== prevMultiple) {
                    untrack(() => {
                        if (options.multiple && !Array.isArray(options.value)) {
                            options.value = [] as SelectionValue<V, M>;
                            console.log('[SelectionState] change value to array');
                        } else if (!options.multiple && Array.isArray(options.value)) {
                            options.value = undefined;
                            console.log('[SelectionState] change value to undefined');
                        }
                        prevMultiple = options.multiple;
                    });
                }
            });
        });
    }

    get multiple() {
        return this.#options.multiple ?? false;
    }

    get count(): number {
        if (this.multiple && Array.isArray(this.#options.value)) {
            return this.#options.value.length;
        }
        return this.#options.value === null || this.#options.value === undefined ? 0 : 1;
    }

    has(item: V): boolean {
        return this.multiple && Array.isArray(this.#options.value)
            ? this.#options.value.includes(item)
            : this.#options.value === item;
    }

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

    deselect(item: V): void {
        if (this.multiple && Array.isArray(this.#options.value)) {
            this.#options.value = this.#options.value.filter((o) => o !== item) as SelectionValue<V, M>;
        } else {
            this.#options.value = this.#options.value === item ? null : this.#options.value;
        }
    }

    toggle(item: V): void {
        if (this.has(item)) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    clear(): void {
        if (this.multiple && Array.isArray(this.#options.value)) {
            this.#options.value = [] as SelectionValue<V, M>;
        } else {
            this.#options.value = null;
        }
    }
}
