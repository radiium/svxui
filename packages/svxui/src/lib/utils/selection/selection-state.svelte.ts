import { onDestroy, untrack } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { SelectionStateProps, SelectionStateValue } from './types.js';

/**
 * Manage single/multiple selection state
 * Inspired by: https://github.com/melt-ui/next-gen
 */
export class SelectionState<T, Multiple extends boolean = false> {
    #props!: SelectionStateProps<T, Multiple>;
    #selectionMultiple = new SvelteSet<T>();
    #selectionSingle = $state<T | null | undefined>();
    #multiple = $derived(this.#props.multiple?.() ?? false);

    constructor(props: SelectionStateProps<T, Multiple>) {
        this.#props = props;

        let prevMultiple = this.#props.multiple?.();

        const destroyEffectRoot = $effect.root(() => {
            $effect(() => {
                const newValue = props.value?.();
                return untrack(() => {
                    this.current = newValue as SelectionStateValue<T, Multiple>;
                });
            });

            $effect(() => {
                const multiple = this.#props.multiple?.();
                return untrack(() => {
                    if (multiple !== prevMultiple) {
                        if (multiple) {
                            this.current = (
                                this.#selectionSingle ? [this.#selectionSingle] : []
                            ) as SelectionStateValue<T, Multiple>;
                            this.#selectionSingle = undefined;
                        } else {
                            this.current = Array.from(this.#selectionMultiple).at(-1) as SelectionStateValue<
                                T,
                                Multiple
                            >;
                            this.#selectionMultiple.clear();
                        }
                        this.#onChange();
                        prevMultiple = multiple;
                    }
                });
            });
        });
        onDestroy(destroyEffectRoot);
    }

    get current(): SelectionStateValue<T, Multiple> {
        return (
            this.#multiple
                ? Array.from(this.#selectionMultiple) //
                : this.#selectionSingle
        ) as SelectionStateValue<T, Multiple>;
    }
    set current(ids: SelectionStateValue<T, Multiple>) {
        if (this.#multiple && Array.isArray(ids)) {
            this.#selectionMultiple.clear();
            ids.forEach((id) => {
                this.#selectionMultiple.add(id);
            });
        } else {
            if (Array.isArray(ids)) {
                this.#selectionSingle = ids.length ? ids.at(-1) : undefined;
            } else {
                this.#selectionSingle = ids as T;
            }
        }
    }

    #onChange(): void {
        this.#props.onValueChange?.(this.current);
    }

    add(id: T): void {
        if (this.#multiple) {
            this.#selectionMultiple.add(id);
        } else {
            this.#selectionSingle = id;
        }
        this.#onChange();
    }
    remove(id: T): void {
        if (this.#multiple) {
            this.#selectionMultiple.delete(id);
        } else {
            this.#selectionSingle = undefined;
        }
        this.#onChange();
    }
    toggle(id: T): void {
        if (this.#multiple) {
            if (this.#selectionMultiple.has(id)) {
                this.#selectionMultiple.delete(id);
            } else {
                this.#selectionMultiple.add(id);
            }
        } else {
            if (this.#selectionSingle === id) {
                this.#selectionSingle = undefined;
            } else {
                this.#selectionSingle = id;
            }
        }
        this.#onChange();
    }

    clear(): void {
        if (this.#multiple) {
            this.#selectionMultiple.clear();
        } else {
            this.#selectionSingle = undefined;
        }

        this.#onChange();
    }

    has(id: T): boolean {
        return this.#multiple
            ? this.#selectionMultiple.has(id) //
            : this.#selectionSingle === id;
    }
}
