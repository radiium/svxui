import { useId } from '$lib/utils/use-id.js';
import { onDestroy, untrack } from 'svelte';
import { TABS_LIST_KEY } from './tabs-list-state.svelte.js';
import type { TabsRootState } from './tabs-root-state.svelte.js';
import type { TabsTriggerAttributs, TabsTriggerStateProps } from './types.js';

/**
 * Tabs trigger
 */

export const TABS_TRIGGER_KEY = 'tabs-trigger' as const;

export class TabsTriggerState {
    #id!: string;
    #props!: TabsTriggerStateProps;
    #rootState!: TabsRootState;
    #ariaControls = $derived.by(() => this.#rootState.valueToContentId.get(this.value));

    id = $derived(`${TABS_TRIGGER_KEY}-${this.#id}`);
    value = $derived(this.#props.value());
    active = $derived(this.#rootState.isActive(this.value));
    disabled = $derived(this.#rootState.disabled || this.#props.disabled?.() === true || false);
    orientation = $derived(this.#rootState.orientation);
    activate = () => this.#rootState.activate(this.value);

    constructor(rootState: TabsRootState, props: TabsTriggerStateProps) {
        this.#id = useId();
        this.#rootState = rootState;
        this.#props = props;

        const destroyEffectRoot = $effect.root(() => {
            $effect(() => {
                const newValue = this.#props.value?.();
                return untrack(() => rootState.registerTrigger(newValue, this.id));
            });
        });
        onDestroy(destroyEffectRoot);
    }

    /**
     * Tabs list attributs
     */
    get attrs(): TabsTriggerAttributs {
        return {
            id: this.id,
            tabindex: this.disabled ? -1 : 0,
            disabled: this.disabled,
            // Data attributs
            [`data-${TABS_TRIGGER_KEY}`]: '',
            'data-state': this.active ? 'active' : 'inactive',
            'data-value': this.value,
            'data-orientation': this.orientation,
            'data-disabled': this.disabled ? '' : undefined,
            // ARIA attributs
            role: 'tab',
            'aria-selected': this.active ? 'true' : 'false',
            'aria-controls': this.#ariaControls,
            // Events
            onfocus: () => {
                if (!this.#rootState.selectWhenFocused || this.disabled) return;
                this.activate();
            },
            onclick: (e: MouseEvent) => {
                if (this.disabled) return;
                if (e.button !== 0) return e.preventDefault();
                this.activate();
            },
            onkeydown: (e: KeyboardEvent) => {
                const TRIGGER_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

                const el = e.target;
                if (!TRIGGER_KEYS.includes(e.key) || !(el instanceof HTMLElement)) {
                    return;
                }

                e.preventDefault();
                const triggerList = el.closest(`[data-${TABS_LIST_KEY}]`);
                if (!triggerList) return;

                const triggers = [
                    ...triggerList.querySelectorAll(`[data-${TABS_TRIGGER_KEY}]:not(:disabled)`)
                ];

                const currIndex = triggers.indexOf(el);
                let next = el as Element | undefined;

                const prevKey = this.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
                const nextKey = this.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
                switch (e.key) {
                    case prevKey: {
                        next = this.#rootState.loop
                            ? triggers.at(currIndex - 1)
                            : triggers.at(Math.max(currIndex - 1, 0));
                        break;
                    }
                    case nextKey: {
                        next = this.#rootState.loop
                            ? triggers.at((currIndex + 1) % triggers.length)
                            : triggers.at(currIndex + 1);
                        break;
                    }
                    case 'Home': {
                        next = triggers[0];
                        break;
                    }
                    case 'End': {
                        next = triggers.at(-1);
                        break;
                    }
                }

                if (!(next instanceof HTMLElement)) return;
                next.focus();
            }
        } as const;
    }
}
