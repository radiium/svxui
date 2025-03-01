import type { Orientation } from '$lib/shared.types.js';
import { SelectionState, type SelectionStateProps, type SelectionStateValue } from '$lib/utils/index.js';
import { useId } from '$lib/utils/use-id.js';
import type { AccordionSelectionValue, AccordionValue } from '../types.js';
import type { AccordionRootAttributs, AccordionRootStateProps } from './types.js';

/**
 * Accordion root
 */

export const ACCORDION_ROOT_KEY = 'accordion-root' as const;

export class AccordionRootState {
    #id!: string;
    #props!: AccordionRootStateProps;
    #selection!: SelectionState<AccordionValue, boolean>;

    #multiple = $derived(this.#props.multiple?.() === true);
    #orientation = $derived(this.#props.orientation?.() ?? 'vertical');
    #disabled = $derived(this.#props.disabled?.() === true);
    #loop = $derived(this.#props.loop?.() === true);

    constructor(props: AccordionRootStateProps) {
        this.#id = useId();
        this.#props = props;
        this.#selection = new SelectionState<AccordionValue, boolean>({
            value: props.value,
            onValueChange: props.onValueChange,
            multiple: props.multiple
        } as SelectionStateProps<AccordionValue, boolean>);
    }

    get value(): AccordionSelectionValue {
        return this.#selection.current as AccordionSelectionValue;
    }

    set value(value: AccordionSelectionValue) {
        this.#selection.current = value as SelectionStateValue<string | number, boolean>;
    }

    get id(): string {
        return this.#id;
    }

    get multiple(): boolean {
        return this.#multiple;
    }

    get orientation(): Orientation {
        return this.#orientation;
    }

    get disabled(): boolean {
        return this.#disabled;
    }

    get loop(): boolean {
        return this.#loop;
    }

    isExpanded(value: AccordionValue) {
        return this.#selection.has(value);
    }

    expand(value: AccordionValue) {
        if (this.disabled) return;
        this.#selection.add(value);
    }

    collapse(value: AccordionValue) {
        if (this.disabled) return;
        this.#selection.remove(value);
    }

    toggle(value: AccordionValue) {
        if (this.disabled) return;
        this.#selection.toggle(value);
    }

    /**
     * Accordion root attributs
     */
    get rootAttrs(): AccordionRootAttributs {
        return {
            id: `${ACCORDION_ROOT_KEY}-${this.#id}`,
            // Data attributs
            [`data-${ACCORDION_ROOT_KEY}`]: '',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.orientation
        } as const;
    }
}
