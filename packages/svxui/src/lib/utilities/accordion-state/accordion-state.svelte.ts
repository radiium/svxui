import type { Orientation } from '$lib/shared.types.js';
import { SelectionState } from '$lib/utilities/selection-state/selection-state.svelte.js';
import { useId } from '$lib/utilities/use-id.js';
import type {
    AccordionGetItemOptions,
    AccordionGetItemReturn,
    AccordionRootAttributes,
    AccordionStateOptions
} from './types.js';

export const ACCORDION_ROOT_KEY = 'accordion-root' as const;
export const ACCORDION_ITEM_KEY = 'accordion-item' as const;
export const ACCORDION_HEADING_KEY = 'accordion-heading' as const;
export const ACCORDION_TRIGGER_KEY = 'accordion-trigger' as const;
export const ACCORDION_CONTENT_KEY = 'accordion-content' as const;

/**
 * @description Manage accordion state
 */
export class AccordionState<Value, Multiple extends boolean> {
    #id!: string;
    #options!: AccordionStateOptions<Value, Multiple>;
    #selection!: SelectionState<Value, Multiple>;

    constructor(options: AccordionStateOptions<Value, Multiple>) {
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

    isExpanded(value: Value) {
        return this.#selection.has(value);
    }

    expand(value: Value) {
        if (this.disabled) return;
        this.#selection.select(value);
    }

    collapse(value: Value) {
        if (this.disabled) return;
        this.#selection.deselect(value);
    }

    toggle(value: Value) {
        if (this.disabled) return;
        this.#selection.toggle(value);
    }

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

    getItem = (value: Value, props?: AccordionGetItemOptions): AccordionGetItemReturn => {
        const id = props?.id ?? useId();
        const itemId = `${ACCORDION_ITEM_KEY}-${id}`;
        const headingId = `${ACCORDION_HEADING_KEY}-${id}`;
        const triggerId = `${ACCORDION_TRIGGER_KEY}-${id}`;
        const contentId = `${ACCORDION_CONTENT_KEY}-${this.#id}`;

        const expanded = this.isExpanded(value);
        const disabled = this.disabled || props?.disabled === true;
        const orientation = this.orientation;
        const headingLevel = props?.headingLevel ?? 1;

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
