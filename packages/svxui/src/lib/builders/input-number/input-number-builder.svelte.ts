import { longpress } from '$lib/attachments/longpress/index.js';
import { isNil } from '$lib/internals/is.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { createAttachmentKey } from 'svelte/attachments';
import {
    INPUT_NUMBER_DECREMENT_KEY,
    INPUT_NUMBER_INCREMENT_KEY,
    INPUT_NUMBER_INPUT_KEY
} from './internals/keys.ts';
import type {
    InputNumberBuilderOptions,
    InputNumberDecrementAttributes,
    InputNumberIncrementAttributes,
    InputNumberInputAttributes
} from './types.ts';

/**
 * Builder class for creating input number component with increment/decrement buttons.
 */
export class InputNumberBuilder {
    #id!: string;
    #options!: InputNumberBuilderOptions;

    #intervalId: ReturnType<typeof setInterval> | undefined = undefined;
    readonly #decrementAttachmentKey = createAttachmentKey();
    readonly #incrementAttachmentKey = createAttachmentKey();

    readonly canDecrement = $derived.by(
        () =>
            !this.#options.disabled &&
            (isNil(this.#options.min) || isNil(this.#options.value)
                ? true
                : this.#options.value > this.#options.min)
    );
    readonly canIncrement = $derived.by(
        () =>
            !this.#options.disabled &&
            (isNil(this.#options.max) || isNil(this.#options.value)
                ? true
                : this.#options.value < this.#options.max)
    );

    constructor(options: InputNumberBuilderOptions = { value: 0 }) {
        this.#id = useId();
        this.#options = options;
        if (!isNil(this.#options.value)) {
            this.#options.value = this.#round(this.#options.value);
        }
    }

    get value(): number | undefined | null {
        return this.#options.value;
    }

    get min(): number | undefined | null {
        return this.#options.min;
    }

    get max(): number | undefined | null {
        return this.#options.max;
    }

    get step(): number | undefined | null {
        return this.#options.step ?? 1;
    }

    get decimals(): number | undefined {
        return this.#options.decimals;
    }

    /** Formatted value (string) for display */
    get formatted(): string {
        if (isNil(this.#options.value)) {
            return '';
        }
        if (isNil(this.#options.decimals)) {
            return String(this.#options.value);
        }

        return this.#options.value.toFixed(this.#options.decimals);
    }

    increment = (): void => {
        if (!this.canIncrement) return;
        const value = this.#options.value ?? 0;
        const step = this.#options.step ?? 1;
        this.#set(value + step);
    };

    decrement = (): void => {
        if (!this.canDecrement) return;
        const value = this.#options.value ?? 0;
        const step = this.#options.step ?? 1;
        this.#set(value - step);
    };

    reset = (to?: number): void => {
        this.#set(to ?? this.#clamp(0));
    };

    /**
     * InputNumber input attributes
     */
    get inputAttrs(): InputNumberInputAttributes {
        return {
            id: `${INPUT_NUMBER_INPUT_KEY}-${this.#id}`,
            type: 'number' as const,
            value: this.#options.value,
            min: isNil(this.#options.min) ? undefined : this.#options.min,
            max: isNil(this.#options.max) ? undefined : this.#options.max,
            step: isNil(this.#options.step) ? undefined : this.#options.step,
            // Data attributes
            [`data-${INPUT_NUMBER_INPUT_KEY}`]: '',
            // Events
            oninput: (e: Event) => this.#handleInput(e)
        } as const;
    }

    /**
     * InputNumber decrement button attributes
     */
    get decrementAttrs(): InputNumberDecrementAttributes {
        return {
            id: `${INPUT_NUMBER_DECREMENT_KEY}-${this.#id}`,
            type: 'button' as const,
            disabled: !this.canDecrement,
            // ARIA attributes
            'aria-label': 'Decrement',
            // Data attributes
            [`data-${INPUT_NUMBER_DECREMENT_KEY}`]: '',
            // Events
            onclick: () => this.decrement(),
            // Attachments
            [this.#decrementAttachmentKey]: longpress({
                onLongpressStart: this.#decrementLongpress,
                onLongpressEnd: this.#clearIntervalId
            })
        } as const;
    }

    /**
     * InputNumber increment button attributes
     */
    get incrementAttrs(): InputNumberIncrementAttributes {
        return {
            id: `${INPUT_NUMBER_INCREMENT_KEY}-${this.#id}`,
            type: 'button' as const,
            disabled: !this.canIncrement,
            // ARIA attributes
            'aria-label': 'Increment',
            // Data attributes
            [`data-${INPUT_NUMBER_INCREMENT_KEY}`]: '',
            // Events
            onclick: () => this.increment(),
            // Attachments
            [this.#incrementAttachmentKey]: longpress({
                onLongpressStart: this.#incrementLongpress,
                onLongpressEnd: this.#clearIntervalId
            })
        } as const;
    }

    /**
     * Handle input change event
     * @param event
     */
    #handleInput = (event: Event): void => {
        const el = event.target as HTMLInputElement;
        const parsed = parseFloat(el.value);
        if (!isNaN(parsed)) {
            this.#set(parsed);
        }
    };

    /**
     * Updates the value based on min/max and decimals
     * @param v
     */
    #set = (v: number): void => {
        const clamped = this.#clamp(this.#round(v));
        if (clamped !== this.#options.value) {
            this.#options.value = clamped;
            this.#options.onValueChange?.(clamped);
        }
    };

    /**
     * bound the value between min and max
     * @param v
     * @returns
     */
    #clamp = (v: number): number => {
        if (!isNil(this.#options.min)) v = Math.max(this.#options.min, v);
        if (!isNil(this.#options.max)) v = Math.min(this.#options.max, v);
        return v;
    };

    /**
     * Rounding of the value to the number of decimal places
     * @param v
     * @returns
     */
    #round = (v: number): number => {
        if (isNil(this.#options.decimals)) return v;
        const factor = Math.pow(10, this.#options.decimals);
        return Math.round(v * factor) / factor;
    };

    /**
     * Clear longpress interval
     */
    #clearIntervalId = (): void => {
        clearInterval(this.#intervalId);
        this.#intervalId = undefined;
    };

    /**
     * Longpress decrement button
     */
    #decrementLongpress = (): void => {
        this.#clearIntervalId();
        this.#intervalId = setInterval(() => {
            this.decrement();
        }, 100);
    };

    /**
     * Longpress increment button
     */
    #incrementLongpress = (): void => {
        this.#clearIntervalId();
        this.#intervalId = setInterval(() => {
            this.increment();
        }, 100);
    };
}
