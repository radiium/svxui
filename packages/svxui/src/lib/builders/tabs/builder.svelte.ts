import { rovingfocus } from '$lib/attachments/rovingfocus/index.js';
import { SelectionState } from '$lib/utilities/selection/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { createAttachmentKey } from 'svelte/attachments';
import type {
    TabsBuilderOptions,
    TabsContent,
    TabsContentOptions,
    TabsRootAttributes,
    TabsTrigger,
    TabsTriggerListAttributes,
    TabsTriggerOptions
} from './types.js';

export const TABS_ROOT_KEY = 'tabs-root' as const;
export const TABS_LIST_KEY = 'tabs-list' as const;
export const TABS_CONTENT_KEY = 'tabs-content' as const;
export const TABS_TRIGGER_KEY = 'tabs-trigger' as const;

/**
 * @description Manage tabs state
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
     * @returns
     */
    isActive(value: Value): boolean {
        return this.#selection.has(value);
    }

    /**
     * Activate an tab item
     * @param value
     * @returns
     */
    activate(value: Value): void {
        if (this.disabled) return;
        this.#selection.select(value);
    }

    /**
     * Register a tab item trigger part
     * @param value
     * @param id
     * @returns
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
     * @returns
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
    get triggerListAttrs(): TabsTriggerListAttributes {
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
                target: `[data-${TABS_TRIGGER_KEY}]`
            })
        } as const;
    }

    /**
     * Build a tab item trigger part
     * @param value
     * @param triggerOptions
     * @returns
     */
    getTrigger(value: Value, triggerOptions?: TabsTriggerOptions): TabsTrigger {
        const id = triggerOptions?.id ?? useId();
        const triggerId = `${TABS_TRIGGER_KEY}-${id}`;
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
                [`data-${TABS_TRIGGER_KEY}`]: '',
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
     * @returns
     */
    getContent(value: Value, contentOptions?: TabsContentOptions): TabsContent {
        const id = contentOptions?.id ?? useId();
        const contentId = `${TABS_CONTENT_KEY}-${id}`;
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
                [`data-${TABS_CONTENT_KEY}`]: '',
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
