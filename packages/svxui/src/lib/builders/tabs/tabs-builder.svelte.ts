import { rovingfocus } from '$lib/attachments/rovingfocus/index.js';
import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection-state/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { createAttachmentKey } from 'svelte/attachments';
import {
    TABS_ITEM_CONTENT_KEY,
    TABS_ITEM_TRIGGER_KEY,
    TABS_LIST_KEY,
    TABS_ROOT_KEY
} from './internals/keys.ts';
import type {
    TabsBuilderOptions,
    TabsItemContent,
    TabsItemContentOptions,
    TabsItemTrigger,
    TabsItemTriggerListAttributes,
    TabsItemTriggerOptions,
    TabsRootAttributes
} from './types.ts';

/**
 * Builder class for creating accessible Tabs components. Handles focus management, keyboard interactions, and ARIA attributes.
 */
export class TabsBuilder<Value> {
    #id!: string;
    #options!: TabsBuilderOptions<Value>;
    #selection!: SelectionState<Value, false>;
    #attachmentKey = createAttachmentKey();

    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    #valueToTriggerId = new Map<Value, string>();
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    #valueToContentId = new Map<Value, string>();

    /**
     * @param options - Tabs configuration options.
     *
     * **Lifecycle note:** `TabsBuilder` internally uses `SelectionState` which holds a reactive
     * `$effect.root()`. Call `destroy()` when the builder is instantiated outside a Svelte component
     * to avoid memory leaks.
     */
    constructor(options: TabsBuilderOptions<Value>) {
        this.#id = useId();
        this.#options = options;

        this.#selection = new SelectionState<Value, false>({
            get value() {
                return options.value;
            },
            set value(newValue) {
                options.value = newValue;
            },
            get onValueChange() {
                return options.onValueChange;
            },
            multiple: false
        });
    }

    /**
     * Tabs instance id
     */
    get id(): string {
        return this.#id;
    }

    /**
     * Tabs orientation
     */
    get orientation(): Orientation {
        return this.#options.orientation ?? 'vertical';
    }

    /**
     * Tabs is globally disabled
     */
    get disabled(): boolean {
        return this.#options.disabled === true;
    }

    /**
     * Loop or not keyboard navigation
     */
    get loop(): boolean {
        return this.#options.loop === true;
    }

    /**
     * Enable or not tab activation on focus
     */
    get activateOnFocus(): boolean {
        return this.#options.activateOnFocus === true;
    }

    /**
     * Check if an tab item is active
     * @param value The tab item value to check
     */
    isActive = (value: Value): boolean => {
        return this.#selection.has(value);
    };

    /**
     * Activate a tab item
     * @param value The tab item value to activate
     */
    activate = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.select(value);
    };

    /**
     * Destroy internal reactive effects. Call this when the builder is instantiated
     * outside a Svelte component to avoid memory leaks.
     */
    destroy = (): void => {
        this.#selection.destroy();
    };

    /**
     * Register a tab item trigger part
     * @param value The tab item value
     * @param id The trigger element id
     */
    #registerTrigger(value: Value, id: string): () => void {
        this.#valueToTriggerId.set(value, id);
        return () => {
            this.#valueToTriggerId.delete(value);
        };
    }

    /**
     * Register a tab item content part
     * @param value The tab item value
     * @param id The content element id
     */
    #registerContent(value: Value, id: string): () => void {
        this.#valueToContentId.set(value, id);
        return () => {
            this.#valueToContentId.delete(value);
        };
    }

    /**
     * Tabs root attributes
     */
    get rootAttrs(): TabsRootAttributes {
        return {
            id: `${TABS_ROOT_KEY}-${this.#id}`,
            // Data attributes
            [`data-${TABS_ROOT_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation
        } as const;
    }

    /**
     * Tabs triggers list attributes
     */
    get triggerListAttrs(): TabsItemTriggerListAttributes {
        return {
            id: `${TABS_LIST_KEY}-${this.#id}`,
            // Data attributes
            [`data-${TABS_LIST_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation,
            // ARIA attributes
            role: 'tablist',
            // Attachments
            [this.#attachmentKey]: rovingfocus({
                loop: this.loop,
                orientation: this.orientation,
                activateOnFocus: this.activateOnFocus,
                target: `[data-${TABS_ITEM_TRIGGER_KEY}]`
            })
        } as const;
    }

    /**
     * Build a tab item trigger part
     * @param value The tab item value
     * @param triggerOptions Optional per-trigger configuration overrides
     * @returns The tabs item trigger instance
     */
    getTrigger(value: Value, triggerOptions?: TabsItemTriggerOptions): TabsItemTrigger {
        const id = triggerOptions?.id ?? useId();
        const triggerId = `${TABS_ITEM_TRIGGER_KEY}-${id}`;
        this.#registerTrigger(value, triggerId);

        const active = this.isActive(value);
        const disabled = this.disabled || triggerOptions?.disabled === true;

        return {
            get active() {
                return active;
            },
            get disabled() {
                return disabled;
            },
            attrs: {
                id: triggerId,
                tabindex: disabled ? -1 : 0,
                disabled: disabled,
                // Data attributes
                [`data-${TABS_ITEM_TRIGGER_KEY}`]: '',
                'data-state': active ? 'active' : 'inactive',
                'data-orientation': this.orientation,
                'data-disabled': disabled ? '' : undefined,
                // ARIA attributes
                role: 'tab',
                'aria-selected': disabled ? undefined : active,
                'aria-controls': this.#valueToContentId.get(value),
                // Events
                onfocus: () => {
                    if (!this.activateOnFocus || disabled) return;
                    this.activate(value);
                },
                onclick: (e: MouseEvent) => {
                    if (disabled) return;
                    if (e.button !== 0) {
                        e.preventDefault();
                        return;
                    }
                    this.activate(value);
                }
            }
        } as const;
    }

    /**
     * Build a tab item content part
     * @param value The tab item value
     * @param contentOptions Optional per-content configuration overrides
     * @returns The tabs item content instance
     */
    getContent(value: Value, contentOptions?: TabsItemContentOptions): TabsItemContent {
        const id = contentOptions?.id ?? useId();
        const contentId = `${TABS_ITEM_CONTENT_KEY}-${id}`;
        this.#registerContent(value, contentId);

        const active = this.isActive(value);
        const disabled = this.disabled || contentOptions?.disabled === true;

        return {
            get active() {
                return active;
            },
            get disabled() {
                return disabled;
            },
            attrs: {
                id: contentId,
                disabled: disabled,
                tabindex: 0,
                hidden: !active ? true : undefined,
                // Data attributes
                [`data-${TABS_ITEM_CONTENT_KEY}`]: '',
                'data-state': active ? 'active' : 'inactive',
                'data-orientation': this.orientation,
                'data-disabled': disabled ? '' : undefined,
                // ARIA attributes
                role: 'tabpanel',
                'aria-labelledby': this.#valueToTriggerId.get(value)
            } as const
        };
    }
}
