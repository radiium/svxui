import { rovingfocus } from '$lib/attachments/rovingfocus/index.js';
import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection-state/selection-state.svelte.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { createAttachmentKey } from 'svelte/attachments';
import { LISTBOX_ITEM_KEY, LISTBOX_ROOT_KEY } from './internals/keys.ts';
import type {
    ListboxBuilderOptions,
    ListboxItem,
    ListboxItemOptions,
    ListboxRootAttributes
} from './types.ts';

/**
 * Builder class for creating accessible Listbox components. Manages focus, selection state, keyboard interactions, and ARIA roles.
 */
export class ListboxBuilder<Value, Multiple extends boolean> {
    #id!: string;
    #options!: ListboxBuilderOptions<Value, Multiple>;
    #selection!: SelectionState<Value, Multiple>;
    #attachmentKey = createAttachmentKey();

    /**
     * @param options - Listbox configuration options.
     */
    constructor(options: ListboxBuilderOptions<Value, Multiple>) {
        this.#id = useId();
        this.#options = options;

        this.#selection = new SelectionState<Value, Multiple>({
            get value() {
                return options.value;
            },
            set value(newValue) {
                options.value = newValue;
            },
            get onValueChange() {
                return options.onValueChange;
            },
            get compare() {
                return options.compare;
            },
            get multiple() {
                return options.multiple;
            }
        });
    }

    /**
     * Listbox instance id
     */
    get id(): string {
        return this.#id;
    }

    /**
     * Can select single or multiple listbox item at time
     */
    get multiple(): boolean {
        return this.#options.multiple === true;
    }

    /**
     * Listbox orientation
     */
    get orientation(): Orientation {
        return this.#options.orientation ?? 'vertical';
    }

    /**
     * Listbox is globally disabled
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
     * Select item or not on focus
     */
    get activateOnFocus(): boolean {
        return this.#options.activateOnFocus === true;
    }

    /**
     * Check if item is selected or not
     * @param value The item value to check
     */
    isSelected = (value: Value): boolean => {
        return this.#selection.has(value);
    };

    /**
     * Select listbox item
     * @param value The item value to select
     */
    select = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.select(value);
    };

    /**
     * Deselect listbox item
     * @param value The item value to deselect
     */
    deselect = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.deselect(value);
    };

    /**
     * Toggle select/deselect item
     * @param value The item value to toggle
     */
    toggle = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.toggle(value);
    };

    /**
     * Listbox root element attributes
     */
    get rootAttrs(): ListboxRootAttributes {
        return {
            id: `${LISTBOX_ROOT_KEY}-${this.#id}`,
            // Data attributes
            [`data-${LISTBOX_ROOT_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation,
            // ARIA attributes
            tabindex: -1,
            role: 'listbox',
            'aria-multiselectable': this.multiple,
            // Attachments
            [this.#attachmentKey]: rovingfocus({
                loop: this.loop,
                orientation: this.orientation,
                activateOnFocus: this.activateOnFocus,
                target: `[data-${LISTBOX_ITEM_KEY}]`
            })
        } as const;
    }

    /**
     * Build listbox item state
     * @param value The item value
     * @param options Optional per-item configuration overrides
     * @returns The listbox item instance
     */
    getItem = (value: Value, options?: ListboxItemOptions): ListboxItem => {
        const id = options?.id ?? useId();
        const itemId = `${LISTBOX_ITEM_KEY}-${id}`;

        const selected = this.isSelected(value);
        const disabled = this.disabled || options?.disabled === true;
        const orientation = this.orientation;

        return {
            get selected() {
                return selected;
            },
            get disabled() {
                return disabled;
            },
            attrs: {
                id: itemId,
                // Data attributes
                [`data-${LISTBOX_ITEM_KEY}`]: '',
                'data-state': selected ? 'selected' : 'unselected',
                'data-disabled': disabled ? '' : undefined,
                'data-orientation': orientation,
                // ARIA attributes
                tabindex: 0,
                role: 'option',
                'aria-selected': disabled ? undefined : selected,
                'aria-disabled': disabled,
                disabled: disabled,
                // Events
                onclick: (e: MouseEvent) => {
                    if (disabled) return;
                    if (e.button !== 0) {
                        e.preventDefault();
                        return;
                    }
                    this.toggle(value);
                }
            }
        } as const;
    };
}
