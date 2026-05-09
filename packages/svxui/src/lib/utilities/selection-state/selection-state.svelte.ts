import type { SelectionStateOptions, SelectionStateValue } from './types.js';

/**
 * A utility class that manages single or multiple selection state with methods to query and update the current selection.
 * Supporting both controlled and uncontrolled modes.
 */
export class SelectionState<Value, Multiple extends boolean> {
    #internalValue = $state<SelectionStateValue<Value, Multiple>>();
    #options: SelectionStateOptions<Value, Multiple>;

    constructor(options: SelectionStateOptions<Value, Multiple>) {
        this.#options = options;
    }

    /**
     * Current selection value. Reads from external value when controlled.
     */
    get value(): SelectionStateValue<Value, Multiple> {
        // When `multiple` changes, coerce the current value to the correct type:
        // array for multiple mode, undefined for single mode.
        const raw = 'value' in this.#options ? this.#options.value : this.#internalValue;
        if (this.#options.multiple && !Array.isArray(raw)) {
            return [] as SelectionStateValue<Value, Multiple>;
        }
        if (!this.#options.multiple && Array.isArray(raw)) {
            return undefined as SelectionStateValue<Value, Multiple>;
        }
        return raw;
    }

    set value(val: SelectionStateValue<Value, Multiple>) {
        this.#setValue(val);
        this.#options.onValueChange?.(val);
    }

    #setValue(val: SelectionStateValue<Value, Multiple>) {
        if ('value' in this.#options) {
            this.#options.value = val;
        } else {
            this.#internalValue = val;
        }
    }

    /**
     * Whether multiple items can be selected simultaneously
     */
    get multiple() {
        return this.#options.multiple ?? false;
    }

    /**
     * Number of currently selected items.
     */
    get count(): number {
        if (this.multiple && Array.isArray(this.value)) {
            return this.value.length;
        }
        return this.value === null || this.value === undefined ? 0 : 1;
    }

    /**
     * Returns `true` if the given item is currently selected.
     * @param item - The value to check.
     */
    has(item: Value): boolean {
        return this.multiple && Array.isArray(this.value)
            ? this.value.some((v) => this.#isEqual(v, item))
            : this.#isEqual(this.value as Value, item);
    }

    /**
     * Selects the given item. In multiple mode, appends it if not already selected.
     * @param item - The value to select.
     */
    select(item: Value): void {
        if (this.multiple && Array.isArray(this.value)) {
            if (!this.has(item)) {
                this.value = [...this.value, item] as SelectionStateValue<Value, Multiple>;
            }
        } else {
            this.value = item as SelectionStateValue<Value, Multiple>;
        }
    }

    /**
     * Deselects the given item. In single mode, clears the selection if it matches.
     * @param item - The value to deselect.
     */
    deselect(item: Value): void {
        if (this.multiple && Array.isArray(this.value)) {
            this.value = this.value.filter((o) => !this.#isEqual(o, item)) as SelectionStateValue<
                Value,
                Multiple
            >;
        } else {
            this.value = this.#isEqual(this.value as Value, item) ? undefined : this.value;
        }
    }

    /**
     * Toggles the selection state of the given item.
     * @param item - The value to toggle.
     */
    toggle(item: Value): void {
        if (this.has(item)) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    /**
     * Resets the selection to empty (undefined in single mode, [] in multiple mode).
     */
    clear(): void {
        if (this.multiple && Array.isArray(this.value)) {
            this.value = [] as SelectionStateValue<Value, Multiple>;
        } else {
            this.value = undefined;
        }
    }

    get #isEqual() {
        return this.#options.compare ?? ((a: Value, b: Value) => a === b);
    }
}
