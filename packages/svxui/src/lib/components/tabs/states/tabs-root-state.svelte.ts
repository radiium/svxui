import { useId } from '$lib/utils/use-id.js';
import { SvelteMap } from 'svelte/reactivity';
import type { TabsSelectionValue, TabsValue } from '../types.js';
import type { TabsRootStateProps } from './types.js';

/**
 * Tabs root
 */

export const TABS_ROOT_KEY = 'tabs-root' as const;

export class TabsRootState {
    #id!: string;
    #props!: TabsRootStateProps;
    #selection: TabsSelectionValue = $state(undefined);

    id = $derived(this.#id);
    valueToTriggerId = new SvelteMap<string | number, string>();
    valueToContentId = new SvelteMap<string | number, string>();

    orientation = $derived(this.#props.orientation?.() ?? 'vertical');
    disabled = $derived(this.#props.disabled?.() === true);
    loop = $derived(this.#props.loop?.() === true);
    selectWhenFocused = $derived(this.#props.selectWhenFocused?.() === true);

    constructor(props: TabsRootStateProps) {
        this.#id = useId();
        this.#props = props;

        $effect.root(() => {
            $effect(() => {
                const newValue = props.value?.();

                if (newValue !== this.value) {
                    this.#selection = newValue;
                }
            });
        });
    }

    #onChange(): void {
        this.#props.onValueChange?.(this.value);
    }

    get value(): TabsSelectionValue {
        return this.#selection;
    }
    set value(value: TabsSelectionValue) {
        this.#selection = value;
    }

    isActive(value: TabsValue): boolean {
        return this.#selection === value;
    }
    activate(value: TabsValue): void {
        if (this.disabled) return;
        this.#selection = value;
        this.#onChange();
    }
    registerTrigger(value: string | number, id: string): () => void {
        this.valueToTriggerId.set(value, id);
        return () => {
            this.valueToTriggerId.delete(value);
        };
    }
    registerContent(value: string | number, id: string): () => void {
        this.valueToContentId.set(value, id);
        return () => {
            this.valueToContentId.delete(value);
        };
    }

    /**
     * Tabs root attributs
     */
    get attrs() {
        return {
            id: `${TABS_ROOT_KEY}-${this.#id}`,
            // Data attributs
            [`data-${TABS_ROOT_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation
        } as const;
    }
}
