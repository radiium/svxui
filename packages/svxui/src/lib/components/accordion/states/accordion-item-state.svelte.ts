import { kbd } from '$lib/utils/kbd.js';
import { useId } from '$lib/utils/use-id.js';
import type { AccordionValue } from '../types.js';
import type { AccordionRootState } from './accordion-root-state.svelte.js';
import type {
    AccordionContentAttributs,
    AccordionHeadingAttributs,
    AccordionItemAttributs,
    AccordionItemStateProps,
    AccordionTriggerAttributs
} from './types.js';

/**
 * Accordion Item
 */

export const ACCORDION_ITEM_KEY = 'accordion-item' as const;
export const ACCORDION_HEADING_KEY = 'accordion-heading' as const;
export const ACCORDION_TRIGGER_KEY = 'accordion-trigger' as const;
export const ACCORDION_CONTENT_KEY = 'accordion-content' as const;

export class AccordionItemState {
    #id!: string;
    #props!: AccordionItemStateProps;
    #rootState!: AccordionRootState;

    #value = $derived(this.#props.value());
    #expanded = $derived(this.#rootState.isExpanded(this.value));
    #disabled = $derived(this.#rootState.disabled || this.#props.disabled?.() === true || false);

    constructor(rootState: AccordionRootState, props: AccordionItemStateProps) {
        this.#id = useId();
        this.#rootState = rootState;
        this.#props = props;
    }

    get value(): AccordionValue {
        return this.#value;
    }

    get expanded(): boolean {
        return this.#expanded;
    }

    get disabled(): boolean {
        return this.#disabled;
    }

    expand(): void {
        this.#rootState.expand(this.value);
    }

    collapse() {
        this.#rootState.collapse(this.value);
    }

    toggle(): void {
        this.#rootState.toggle(this.value);
    }

    /**
     * Common attributs
     */
    get #commonAttrs() {
        return {
            'data-state': this.expanded ? 'open' : 'closed',
            'data-disabled': this.disabled ? '' : undefined,
            'data-orientation': this.#rootState.orientation,
            'data-value': this.value
        } as const;
    }

    /**
     * Accordion item attributs
     */
    get itemAttrs(): AccordionItemAttributs {
        return {
            id: `${ACCORDION_ITEM_KEY}-${this.#id}`,
            // Data attributs
            [`data-${ACCORDION_ITEM_KEY}`]: '',
            // Common attributs
            ...this.#commonAttrs
        } as const;
    }

    /**
     * Accordion item heading attributs
     */
    get headingAttrs(): AccordionHeadingAttributs {
        return {
            id: `${ACCORDION_HEADING_KEY}-${this.#id}`,
            // Data attributs
            [`data-${ACCORDION_HEADING_KEY}`]: '',
            'data-heading-level': this.#props.headingLevel?.(),
            // ARIA attributs
            'aria-level': this.#props.headingLevel?.(),
            // Common attributs
            ...this.#commonAttrs
        } as const;
    }

    /**
     * Accordion item trigger attributs
     */
    get triggerAttrs(): AccordionTriggerAttributs {
        return {
            id: `${ACCORDION_TRIGGER_KEY}-${this.#id}`,
            tabindex: this.disabled ? -1 : 0,
            disabled: this.disabled,
            // Data attributs
            [`data-${ACCORDION_TRIGGER_KEY}`]: '',
            // ARIA atrributs
            'aria-disabled': this.disabled,
            'aria-expanded': this.expanded,
            'aria-controls': 'accordion-content-' + this.#id,
            // Events
            onclick: (e: MouseEvent) => {
                if (this.disabled) return;
                if (e.button !== 0) return e.preventDefault();
                this.toggle();
            },
            onkeydown: (e: KeyboardEvent) => {
                const key = e.key;

                const prevKey = this.#rootState.orientation === 'vertical' ? kbd.ARROW_UP : kbd.ARROW_LEFT;
                const nextKey = this.#rootState.orientation === 'vertical' ? kbd.ARROW_DOWN : kbd.ARROW_RIGHT;
                const allowedKeys = (
                    this.#rootState.orientation === 'vertical'
                        ? [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END]
                        : [kbd.ARROW_LEFT, kbd.ARROW_RIGHT, kbd.HOME, kbd.END]
                ) as string[];

                if (!allowedKeys.includes(key)) {
                    return;
                }

                e.preventDefault();

                if (key === kbd.SPACE || key === kbd.ENTER) {
                    if (this.disabled) return;
                    this.toggle();
                }

                const el = e.target;
                const rootEl = document.getElementById(this.#rootState.rootAttrs.id);
                if (!rootEl || !(el instanceof HTMLElement)) return;

                const items = Array.from(rootEl.querySelectorAll(`[data-${ACCORDION_TRIGGER_KEY}]`));
                const triggers = items.filter((item): item is HTMLElement => {
                    if (!(item instanceof HTMLElement)) return false;
                    return !('disabled' in item.dataset);
                });

                if (!triggers.length) return;
                const currIndex = triggers.indexOf(el);
                let next = el as Element | undefined;

                switch (e.key) {
                    case prevKey: {
                        next = this.#rootState.loop
                            ? triggers.at(currIndex - 1)
                            : triggers.at(Math.max(currIndex - 1, 0));
                        break;
                    }
                    case nextKey: {
                        next = this.#rootState.loop
                            ? triggers.at((currIndex + 1) % triggers.length)
                            : triggers.at(currIndex + 1);
                        break;
                    }
                    case 'Home': {
                        next = triggers[0];
                        break;
                    }
                    case 'End': {
                        next = triggers.at(-1);
                        break;
                    }
                }

                if (!(next instanceof HTMLElement)) return;
                next.focus();

                /*
                if (e.key === prevKey) {
                    triggers[(currIndex - 1 + triggers.length) % triggers.length]?.focus();
                }
                if (e.key === nextKey) {
                    triggers[(currIndex + 1) % triggers.length]?.focus();
                }
                if (e.key === kbd.HOME) {
                    triggers[0]?.focus();
                }
                if (e.key === kbd.END) {
                    triggers[triggers.length - 1]?.focus();
                }
                */
            },
            // Common attributs
            ...this.#commonAttrs
        } as const;
    }

    /**
     * Accordion item content attributs
     */
    get contentAttrs(): AccordionContentAttributs {
        return {
            id: `${ACCORDION_CONTENT_KEY}-${this.#id}`,
            // Data attributs
            [`data-${ACCORDION_CONTENT_KEY}`]: '',
            // ARIA atrributs
            role: 'region',
            'aria-labelledby': 'accordion-trigger-' + this.#id,
            // Common attributs
            ...this.#commonAttrs
        } as const;
    }
}
