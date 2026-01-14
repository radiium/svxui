import { rovingFocus } from '$lib/attachments/index.js';
import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection-state/selection-state.svelte.js';
import { useId } from '$lib/utilities/use-id.js';
import { createAttachmentKey } from 'svelte/attachments';
import type {
    ListboxGetItemOptions,
    ListboxGetItemReturn,
    ListboxRootAttributes,
    ListboxStateOptions
} from './types.js';

export const LISTBOX_ROOT_KEY = 'listbox-root' as const;
export const LISTBOX_ITEM_KEY = 'listbox-item' as const;

/**
 *
 */
export class ListboxState<Value, Multiple extends boolean> {
    #id!: string;
    #options!: ListboxStateOptions<Value, Multiple>;
    #selection!: SelectionState<Value, Multiple>;
    #attachmentKey = createAttachmentKey();

    constructor(options: ListboxStateOptions<Value, Multiple>) {
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

    get id(): string {
        return this.#id;
    }

    get multiple(): boolean {
        return this.#options.multiple === true;
    }

    get orientation(): Orientation {
        return this.#options.orientation ?? 'vertical';
    }

    get disabled(): boolean {
        return this.#options.disabled === true;
    }

    get loop(): boolean {
        return this.#options.loop === true;
    }

    get activateOnFocus(): boolean {
        return this.#options.activateOnFocus === true;
    }

    isSelected(value: Value) {
        return this.#selection.has(value);
    }

    select(value: Value) {
        if (this.disabled) return;
        this.#selection.select(value);
    }

    deselect(value: Value) {
        if (this.disabled) return;
        this.#selection.deselect(value);
    }

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
            [this.#attachmentKey]: rovingFocus({
                loop: this.loop,
                orientation: this.orientation,
                activateOnFocus: this.activateOnFocus,
                target: `[data-${LISTBOX_ITEM_KEY}]`
            })
        } as const;
    }

    getItem = (value: Value, options?: ListboxGetItemOptions): ListboxGetItemReturn => {
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
