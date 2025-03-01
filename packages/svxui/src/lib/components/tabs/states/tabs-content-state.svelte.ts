import { useId } from '$lib/utils/use-id.js';
import { onDestroy, untrack } from 'svelte';
import type { TabsRootState } from './tabs-root-state.svelte.js';
import type { TabsContentAttributs, TabsContentStateProps } from './types.js';

/**
 * Tabs content
 */

export const TABS_CONTENT_KEY = 'tabs-content' as const;

export class TabsContentState {
    #id!: string;
    #props!: TabsContentStateProps;
    #rootState!: TabsRootState;
    #ariaControls = $derived.by(() => this.#rootState.valueToTriggerId.get(this.value));

    id = $derived(`${TABS_CONTENT_KEY}-${this.#id}`);
    value = $derived(this.#props.value());
    active = $derived(this.#rootState.isActive(this.value));
    disabled = $derived(this.#rootState.disabled);
    orientation = $derived(this.#rootState.orientation);
    activate = () => this.#rootState.activate(this.value);

    constructor(rootState: TabsRootState, props: TabsContentStateProps) {
        this.#id = useId();
        this.#rootState = rootState;
        this.#props = props;

        const destroyEffectRoot = $effect.root(() => {
            $effect(() => {
                const newValue = this.#props.value?.();
                return untrack(() => rootState.registerContent(newValue, this.id));
            });
        });
        onDestroy(destroyEffectRoot);
    }

    /**
     * Tabs list attributs
     */
    get attrs(): TabsContentAttributs {
        return {
            id: this.id,
            disabled: this.disabled,
            tabindex: 0,
            hidden: !this.active ? true : undefined,
            // Data attributs
            [`data-${TABS_CONTENT_KEY}`]: '',
            'data-state': this.active ? 'active' : 'inactive',
            'data-value': this.value,
            'data-orientation': this.orientation,
            'data-disabled': this.disabled ? '' : undefined,
            // ARIA attributs
            role: 'tabpanel',
            'aria-selected': this.active ? 'true' : 'false',
            'aria-labelledby': this.#ariaControls
        } as const;
    }
}
