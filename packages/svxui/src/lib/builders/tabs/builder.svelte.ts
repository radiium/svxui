import { rovingfocus } from '$lib/attachments/rovingfocus/index.js';
import { SelectionState } from '$lib/utilities/selection-state/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { createAttachmentKey } from 'svelte/attachments';
import {
    TABS_ITEM_CONTENT_KEY,
    TABS_ITEM_TRIGGER_KEY,
    TABS_LIST_KEY,
    TABS_ROOT_KEY
} from './internals/keys.js';
import type {
    TabsBuilderOptions,
    TabsItemContent,
    TabsItemContentOptions,
    TabsItemTrigger,
    TabsItemTriggerListAttributes,
    TabsItemTriggerOptions,
    TabsRootAttributes
} from './types.js';

/**
 * Builder class for creating accessible Tabs components. Handles focus management, keyboard interactions, and ARIA attributes.
 */
export class TabsBuilder<Value> {
    #id!: string;
    #options!: TabsBuilderOptions<Value>;
    #selection!: SelectionState<Value, false>;
    #attachmentKey = createAttachmentKey();

    #valueToTriggerId = new Map<Value, string>();
    #valueToContentId = new Map<Value, string>();

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
            multiple: false
        });
    }

    /**
     * Tabs instance id
     */
    get id() {
        return this.#id;
    }

    /**
     * Tabs orientation
     */
    get orientation() {
        return this.#options.orientation ?? 'vertical';
    }

    /**
     * Tabs is globaly disabled
     */
    get disabled() {
        return this.#options.disabled ?? false;
    }

    /**
     * Loop or not keyboard navigation
     */
    get loop() {
        return this.#options.loop ?? false;
    }

    /**
     * Enable or not tab activation on focus
     */
    get activateOnFocus() {
        return this.#options.activateOnFocus ?? false;
    }

    /**
     * Check if an tab item is active
     * @param value
     */
    isActive = (value: Value): boolean => {
        return this.#selection.has(value);
    };

    /**
     * Activate an tab item
     * @param value
     */
    activate = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.select(value);
    };

    /**
     * Register a tab item trigger part
     * @param value
     * @param id
     */
    #registerTrigger(value: Value, id: string): () => void {
        this.#valueToTriggerId.set(value, id);
        return () => {
            this.#valueToTriggerId.delete(value);
        };
    }

    /**
     * Register a tab item content part
     * @param value
     * @param id
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
     * @param value
     * @param triggerOptions
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
                'data-disabled': this.disabled ? '' : undefined,
                // ARIA attributes
                role: 'tab',
                'aria-selected': active ? 'true' : 'false',
                'aria-controls': this.#valueToContentId.get(value),
                // Events
                onfocus: () => {
                    if (!this.activateOnFocus || disabled) return;
                    this.activate(value);
                },
                onclick: (e: MouseEvent) => {
                    if (disabled) return;
                    if (e.button !== 0) return e.preventDefault();
                    this.activate(value);
                }
            }
        };
    }

    /**
     * Build a tab item content part
     * @param value
     * @param contentOptions
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
                id: id,
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
                'aria-selected': active ? 'true' : 'false',
                'aria-labelledby': this.#valueToTriggerId.get(value)
            } as const
        };
    }
}
