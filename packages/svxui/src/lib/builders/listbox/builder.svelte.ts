import { rovingfocus } from '$lib/attachments/rovingfocus/index.js';
import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection/core.svelte.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { createAttachmentKey } from 'svelte/attachments';
import { LISTBOX_ITEM_KEY, LISTBOX_ROOT_KEY } from './internals/keys.js';
import type {
    ListboxBuilderOptions,
    ListboxItem,
    ListboxItemOptions,
    ListboxRootAttributes
} from './types.js';

/**
 *
 */
export class ListboxBuilder<Value, Multiple extends boolean> {
    #id!: string;
    #options!: ListboxBuilderOptions<Value, Multiple>;
    #selection!: SelectionState<Value, Multiple>;
    #attachmentKey = createAttachmentKey();

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
     * Listbox is globaly disabled
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
     * @param value
     * @returns
     */
    isSelected(value: Value) {
        return this.#selection.has(value);
    }

    /**
     * Select listbox item
     * @param value
     * @returns
     */
    select(value: Value) {
        if (this.disabled) return;
        this.#selection.select(value);
    }

    /**
     * Deselect listbox item
     * @param value
     * @returns
     */
    deselect(value: Value) {
        if (this.disabled) return;
        this.#selection.deselect(value);
    }

    /**
     * Toggle select/deselect item
     * @param value
     * @returns
     */
    toggle(value: Value) {
        if (this.disabled) return;
        this.#selection.toggle(value);
    }

    /**
     * Listbox root attributes
     */
    get attrs(): ListboxRootAttributes {
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
     * Buil listbox item state
     * @param value
     * @param options
     * @returns
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
                'data-selected': selected ? '' : undefined,
                'data-disabled': disabled ? '' : undefined,
                'data-orientation': orientation,
                // ARIA attributes
                tabindex: 0,
                role: 'option',
                'aria-selected': selected,
                'aria-disabled': disabled,
                disabled: disabled,
                // Events
                onclick: (e: MouseEvent) => {
                    if (disabled) return;
                    if (e.button !== 0) return e.preventDefault();
                    this.toggle(value);
                }
            }
        } as const;
    };
}
