import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection-state/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import {
    ACCORDION_CONTENT_KEY,
    ACCORDION_HEADING_KEY,
    ACCORDION_ITEM_KEY,
    ACCORDION_ROOT_KEY,
    ACCORDION_TRIGGER_KEY
} from './internals/keys.ts';
import type {
    AccordionBuilderOptions,
    AccordionItem,
    AccordionItemOptions,
    AccordionRootAttributes
} from './types.ts';

/**
 * Builder class for creating accessible Accordion components. Handles keyboard navigation, ARIA attributes, and panel toggling.
 */
export class AccordionBuilder<Value, Multiple extends boolean> {
    #id!: string;
    #options!: AccordionBuilderOptions<Value, Multiple>;
    #selection!: SelectionState<Value, Multiple>;

    /**
     * @param options - Accordion configuration options.
     *
     * **Lifecycle note:** `AccordionBuilder` internally uses `SelectionState` which holds a reactive
     * `$effect.root()`. Call `destroy()` when the builder is instantiated outside a Svelte component
     * to avoid memory leaks.
     */
    constructor(options: AccordionBuilderOptions<Value, Multiple>) {
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
            get multiple() {
                return options.multiple;
            }
        });
    }

    /**
     * Accordion instance id
     */
    get id(): string {
        return this.#id;
    }

    /**
     * Can open single or multiple accordion items at a time
     */
    get multiple(): boolean {
        return this.#options.multiple === true;
    }

    /**
     * Accordion orientation
     */
    get orientation(): Orientation {
        return this.#options.orientation ?? 'vertical';
    }

    /**
     * Accordion is globally disabled
     */
    get disabled(): boolean {
        return this.#options.disabled === true;
    }

    /**
     * Check if an accordion item is expanded
     * @param value The accordion item value to check
     * @returns `true` if the item is currently expanded
     */
    isExpanded = (value: Value): boolean => {
        return this.#selection.has(value);
    };

    /**
     * Expand an accordion item
     * @param value The accordion item value to expand
     */
    expand = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.select(value);
    };

    /**
     * Collapse an accordion item
     * @param value The accordion item value to collapse
     */
    collapse = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.deselect(value);
    };

    /**
     * Toggle expand/collapse an accordion item
     * @param value The accordion item value to toggle
     */
    toggle = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.toggle(value);
    };

    /**
     * Accordion root attributes
     */
    get rootAttrs(): AccordionRootAttributes {
        return {
            id: `${ACCORDION_ROOT_KEY}-${this.#id}`,
            // Data attributes
            [`data-${ACCORDION_ROOT_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation,
            tabindex: -1
        } as const;
    }

    /**
     * Build an accordion item state
     * @param value The accordion item value
     * @param itemOptions Optional per-item configuration overrides
     * @returns The accordion item instance
     */
    getItem = (value: Value, itemOptions?: AccordionItemOptions): AccordionItem => {
        const id = itemOptions?.id ?? useId();
        const itemId = `${ACCORDION_ITEM_KEY}-${id}`;
        const headingId = `${ACCORDION_HEADING_KEY}-${id}`;
        const triggerId = `${ACCORDION_TRIGGER_KEY}-${id}`;
        const contentId = `${ACCORDION_CONTENT_KEY}-${id}`;

        const expanded = this.isExpanded(value);
        const disabled = this.disabled || itemOptions?.disabled === true;
        const orientation = this.orientation;
        const headingLevel = itemOptions?.headingLevel ?? 1;

        const commonAttrs = {
            'data-state': expanded ? 'open' : 'closed',
            'data-disabled': disabled ? '' : undefined,
            'data-orientation': orientation
        } as const;

        return {
            get expanded() {
                return expanded;
            },
            get disabled() {
                return disabled;
            },
            itemAttrs: {
                id: itemId,
                // Data attributes
                [`data-${ACCORDION_ITEM_KEY}`]: '',
                // Common attributes
                ...commonAttrs
            } as const,
            headingAttrs: {
                id: headingId,
                // Data attributes
                [`data-${ACCORDION_HEADING_KEY}`]: '',
                'data-heading-level': headingLevel,
                // ARIA attributes
                'aria-level': headingLevel,
                role: 'heading',
                // Common attributes
                ...commonAttrs
            } as const,
            triggerAttrs: {
                id: triggerId,
                tabindex: disabled ? -1 : 0,
                disabled: disabled,
                // Data attributes
                [`data-${ACCORDION_TRIGGER_KEY}`]: '',
                // ARIA attributes
                'aria-expanded': expanded,
                'aria-disabled': disabled,
                'aria-controls': contentId,
                // Events
                onclick: (e: MouseEvent) => {
                    if (disabled) return;
                    if (e.button !== 0) {
                        e.preventDefault();
                        return;
                    }
                    this.toggle(value);
                },
                // Common attributes
                ...commonAttrs
            } as const,
            contentAttrs: {
                id: contentId,
                // Data attributes
                [`data-${ACCORDION_CONTENT_KEY}`]: '',
                // ARIA attributes
                role: 'region',
                'aria-labelledby': headingId,
                // Common attributes
                ...commonAttrs
            } as const
        } as const;
    };
}
