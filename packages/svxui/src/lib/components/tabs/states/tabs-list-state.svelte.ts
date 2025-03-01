import { useId } from '$lib/utils/use-id.js';
import type { TabsRootState } from './tabs-root-state.svelte.js';
import type { TabsListAttributs } from './types.js';

/**
 * Tabs list
 */

export const TABS_LIST_KEY = 'tabs-list' as const;

export class TabsListState {
    #id!: string;
    #rootState!: TabsRootState;

    id = $derived(this.#id);
    disabled = $derived(this.#rootState.disabled);
    orientation = $derived(this.#rootState.orientation);

    constructor(rootState: TabsRootState) {
        this.#id = useId();
        this.#rootState = rootState;
    }

    /**
     * Tabs list attributs
     */
    get attrs(): TabsListAttributs {
        return {
            id: `${TABS_LIST_KEY}-${this.#id}`,
            // Data attributs
            [`data-${TABS_LIST_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation,
            // ARIA attributs
            role: 'tablist'
        } as const;
    }
}
