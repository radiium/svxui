import { rovingFocus } from '$lib/attachments/index.js';
import { useId } from '$lib/utilities/use-id.js';
import { createAttachmentKey } from 'svelte/attachments';
import { SelectionState } from '../selection-state/selection-state.svelte.js';
import type {
    TabsAttributes,
    TabsContentOptions,
    TabsContentReturn,
    TabsStateOptions,
    TabsTriggerListAttributes,
    TabsTriggerOptions,
    TabsTriggerReturn
} from './types.js';

export const TABS_ROOT_KEY = 'tabs-root' as const;
export const TABS_LIST_KEY = 'tabs-list' as const;
export const TABS_CONTENT_KEY = 'tabs-content' as const;
export const TABS_TRIGGER_KEY = 'tabs-trigger' as const;

/**
 * @description Manage tabs state
 */
export class TabsState<Value> {
    #id!: string;
    #options!: TabsStateOptions<Value>;
    #selection!: SelectionState<Value, false>;
    #attachmentKey = createAttachmentKey();

    #valueToTriggerId = new Map<Value, string>();
    #valueToContentId = new Map<Value, string>();

    constructor(options: TabsStateOptions<Value>) {
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

    get orientation() {
        return this.#options.orientation ?? 'vertical';
    }
    get disabled() {
        return this.#options.disabled ?? false;
    }

    get loop() {
        return this.#options.loop ?? false;
    }

    get activateOnFocus() {
        return this.#options.activateOnFocus ?? false;
    }

    isActive(value: Value): boolean {
        return this.#selection.has(value);
    }

    activate(value: Value): void {
        if (this.disabled) return;
        this.#selection.select(value);
    }

    #registerTrigger(value: Value, id: string): () => void {
        this.#valueToTriggerId.set(value, id);
        return () => {
            this.#valueToTriggerId.delete(value);
        };
    }
    #registerContent(value: Value, id: string): () => void {
        this.#valueToContentId.set(value, id);
        return () => {
            this.#valueToContentId.delete(value);
        };
    }

    /**
     * Tabs root attributs
     */
    get attrs(): TabsAttributes {
        return {
            id: `${TABS_ROOT_KEY}-${this.#id}`,
            // Data attributs
            [`data-${TABS_ROOT_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation
        } as const;
    }

    /**
     * Tabs trigger list attributes
     */
    get triggerListAttrs(): TabsTriggerListAttributes {
        return {
            id: `${TABS_LIST_KEY}-${this.#id}`,
            // Data attributs
            [`data-${TABS_LIST_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation,
            // ARIA attributs
            role: 'tablist',
            // Attachments
            [this.#attachmentKey]: rovingFocus({
                loop: this.loop,
                orientation: this.orientation,
                activateOnFocus: this.activateOnFocus,
                target: `[data-${TABS_TRIGGER_KEY}]`
            })
        } as const;
    }

    getTrigger(value: Value, options?: TabsTriggerOptions): TabsTriggerReturn {
        const id = options?.id ?? useId();
        const triggerId = `${TABS_TRIGGER_KEY}-${id}`;
        this.#registerTrigger(value, triggerId);

        const active = this.isActive(value);
        const disabled = this.disabled || options?.disabled === true;

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
                // Data attributs
                [`data-${TABS_TRIGGER_KEY}`]: '',
                'data-state': active ? 'active' : 'inactive',
                'data-orientation': this.orientation,
                'data-disabled': this.disabled ? '' : undefined,
                // ARIA attributs
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

    getContent(value: Value, options?: TabsContentOptions): TabsContentReturn {
        const id = options?.id ?? useId();
        const contentId = `${TABS_CONTENT_KEY}-${id}`;
        this.#registerContent(value, contentId);

        const active = this.isActive(value);
        const disabled = this.disabled || options?.disabled === true;

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
                // Data attributs
                [`data-${TABS_CONTENT_KEY}`]: '',
                'data-state': active ? 'active' : 'inactive',
                'data-orientation': this.orientation,
                'data-disabled': disabled ? '' : undefined,
                // ARIA attributs
                role: 'tabpanel',
                'aria-selected': active ? 'true' : 'false',
                'aria-labelledby': this.#valueToTriggerId.get(value)
            } as const
        };
    }
}
