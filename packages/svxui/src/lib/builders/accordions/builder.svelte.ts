import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection-state/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import {
    ACCORDION_CONTENT_KEY,
    ACCORDION_HEADING_KEY,
    ACCORDION_ITEM_KEY,
    ACCORDION_ROOT_KEY,
    ACCORDION_TRIGGER_KEY
} from './internals/keys.js';
import type {
    AccordionItem,
    AccordionItemOptions,
    AccordionRootAttributes,
    AccordionsBuilderOptions
} from './types.js';

/**
 * Builder class for creating accessible Accordions components. Handles keyboard navigation, ARIA attributes, and panel toggling.
 */
export class AccordionsBuilder<Value, Multiple extends boolean> {
    #id!: string;
    #options!: AccordionsBuilderOptions<Value, Multiple>;
    #selection!: SelectionState<Value, Multiple>;

    constructor(options: AccordionsBuilderOptions<Value, Multiple>) {
        this.#id = useId();
        this.#options = options;

        this.#selection = new SelectionState<Value, Multiple>({
            get value() {
                return options.value;
            },
            set value(newValue) {
                options.onValueChange?.(newValue as Value);
                options.value = newValue;
            },
            get multiple() {
                return options.multiple;
            }
        });
    }

    /**
     * Accordions instance id
     */
    get id(): string {
        return this.#id;
    }

    /**
     * Can open single or multiple accordions item at time
     */
    get multiple(): boolean {
        return this.#options.multiple === true;
    }

    /**
     * Accordions orientation
     */
    get orientation(): Orientation {
        return this.#options.orientation ?? 'vertical';
    }

    /**
     * Accordions is globaly disabled
     */
    get disabled(): boolean {
        return this.#options.disabled === true;
    }

    /**
     * Check if an accordions item is expanded
     * @param value
     * @returns
     */
    isExpanded = (value: Value): boolean => {
        return this.#selection.has(value);
    };

    /**
     * Expand an accordions item
     * @param value
     */
    expand = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.select(value);
    };

    /**
     * Collapse an accordions item
     * @param value
     */
    collapse = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.deselect(value);
    };

    /**
     * Toggle expand/collapse an accordions item
     * @param value
     */
    toggle = (value: Value): void => {
        if (this.disabled) return;
        this.#selection.toggle(value);
    };

    /**
     * Accordions root attributes
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
     * Build an accordions item state
     * @param value
     * @param props
     * @returns The accordions item instance
     */
    getItem = (value: Value, itemOptions?: AccordionItemOptions): AccordionItem => {
        const id = itemOptions?.id ?? useId();
        const itemId = `${ACCORDION_ITEM_KEY}-${id}`;
        const headingId = `${ACCORDION_HEADING_KEY}-${id}`;
        const triggerId = `${ACCORDION_TRIGGER_KEY}-${id}`;
        const contentId = `${ACCORDION_CONTENT_KEY}-${this.#id}`;

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
                // ARIA atrributs
                'aria-expanded': expanded,
                'aria-disabled': disabled,
                'aria-controls': contentId,
                // Events
                onclick: (e: MouseEvent) => {
                    if (disabled) return;
                    if (e.button !== 0) return e.preventDefault();
                    this.toggle(value);
                },
                // Common attributes
                ...commonAttrs
            } as const,
            contentAttrs: {
                id: contentId,
                // Data attributes
                [`data-${ACCORDION_CONTENT_KEY}`]: '',
                // ARIA atrributs
                role: 'region',
                'aria-labelledby': headingId,
                // Common attributes
                ...commonAttrs
            } as const
        } as const;
    };
}
