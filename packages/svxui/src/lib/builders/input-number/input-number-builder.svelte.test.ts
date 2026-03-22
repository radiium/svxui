import { describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { InputNumberBuilder } from './input-number-builder.svelte.js';

describe('InputNumberBuilder — initial state', () => {
    itWithEffect('value reflects initial option', () => {
        const builder = new InputNumberBuilder({ value: 5 });
        expect(builder.value).toBe(5);
    });

    itWithEffect('value can be null', () => {
        const builder = new InputNumberBuilder({ value: null });
        expect(builder.value).toBeNull();
    });

    itWithEffect('min / max / step reflect options', () => {
        const builder = new InputNumberBuilder({ value: 0, min: -10, max: 10, step: 2 });
        expect(builder.min).toBe(-10);
        expect(builder.max).toBe(10);
        expect(builder.step).toBe(2);
    });

    itWithEffect('step defaults to 1 when not provided', () => {
        const builder = new InputNumberBuilder({ value: 0 });
        expect(builder.step).toBe(1);
    });
});

describe('InputNumberBuilder — increment / decrement', () => {
    itWithEffect('increment increases value by step', () => {
        const opts = { value: 0 };
        const builder = new InputNumberBuilder(opts);
        builder.increment();
        expect(builder.value).toBe(1);
    });

    itWithEffect('decrement decreases value by step', () => {
        const opts = { value: 5 };
        const builder = new InputNumberBuilder(opts);
        builder.decrement();
        expect(builder.value).toBe(4);
    });

    itWithEffect('increment respects custom step', () => {
        const opts = { value: 0, step: 5 };
        const builder = new InputNumberBuilder(opts);
        builder.increment();
        expect(builder.value).toBe(5);
    });

    itWithEffect('increment does nothing when at max', () => {
        const opts = { value: 10, max: 10 };
        const builder = new InputNumberBuilder(opts);
        builder.increment();
        expect(builder.value).toBe(10);
    });

    itWithEffect('decrement does nothing when at min', () => {
        const opts = { value: 0, min: 0 };
        const builder = new InputNumberBuilder(opts);
        builder.decrement();
        expect(builder.value).toBe(0);
    });
});

describe('InputNumberBuilder — canIncrement / canDecrement', () => {
    itWithEffect('canIncrement is false at max', () => {
        const builder = new InputNumberBuilder({ value: 10, max: 10 });
        expect(builder.canIncrement).toBe(false);
    });

    itWithEffect('canIncrement is true below max', () => {
        const builder = new InputNumberBuilder({ value: 5, max: 10 });
        expect(builder.canIncrement).toBe(true);
    });

    itWithEffect('canDecrement is false at min', () => {
        const builder = new InputNumberBuilder({ value: 0, min: 0 });
        expect(builder.canDecrement).toBe(false);
    });

    itWithEffect('canDecrement is true above min', () => {
        const builder = new InputNumberBuilder({ value: 5, min: 0 });
        expect(builder.canDecrement).toBe(true);
    });

    itWithEffect('canIncrement and canDecrement are false when disabled', () => {
        const builder = new InputNumberBuilder({ value: 5, disabled: true });
        expect(builder.canIncrement).toBe(false);
        expect(builder.canDecrement).toBe(false);
    });
});

describe('InputNumberBuilder — reset', () => {
    itWithEffect('reset sets value to 0 by default', () => {
        const opts = { value: 42 };
        const builder = new InputNumberBuilder(opts);
        builder.reset();
        expect(builder.value).toBe(0);
    });

    itWithEffect('reset sets value to provided target', () => {
        const opts = { value: 42 };
        const builder = new InputNumberBuilder(opts);
        builder.reset(10);
        expect(builder.value).toBe(10);
    });

    itWithEffect('reset clamps to min', () => {
        const opts = { value: 42, min: 5 };
        const builder = new InputNumberBuilder(opts);
        builder.reset(0);
        expect(builder.value).toBe(5);
    });
});

describe('InputNumberBuilder — formatted', () => {
    itWithEffect('formatted returns empty string for null value', () => {
        const builder = new InputNumberBuilder({ value: null });
        expect(builder.formatted).toBe('');
    });

    itWithEffect('formatted returns string representation of value', () => {
        const builder = new InputNumberBuilder({ value: 42 });
        expect(builder.formatted).toBe('42');
    });

    itWithEffect('formatted respects decimals', () => {
        const builder = new InputNumberBuilder({ value: 3.1, decimals: 2 });
        expect(builder.formatted).toBe('3.10');
    });
});

describe('InputNumberBuilder — onValueChange', () => {
    itWithEffect('onValueChange is called on increment', () => {
        const onValueChange = vi.fn();
        const opts = { value: 0, onValueChange };
        const builder = new InputNumberBuilder(opts);
        builder.increment();
        expect(onValueChange).toHaveBeenCalledWith(1);
    });

    itWithEffect('onValueChange is not called when value does not change', () => {
        const onValueChange = vi.fn();
        const opts = { value: 10, max: 10, onValueChange };
        const builder = new InputNumberBuilder(opts);
        builder.increment(); // blocked by max
        expect(onValueChange).not.toHaveBeenCalled();
    });
});

describe('InputNumberBuilder — attrs', () => {
    itWithEffect('inputAttrs has type number', () => {
        const builder = new InputNumberBuilder({ value: 0 });
        expect(builder.inputAttrs.type).toBe('number');
    });

    itWithEffect('decrementAttrs has aria-label Decrement', () => {
        const builder = new InputNumberBuilder({ value: 0 });
        expect(builder.decrementAttrs['aria-label']).toBe('Decrement');
    });

    itWithEffect('incrementAttrs has aria-label Increment', () => {
        const builder = new InputNumberBuilder({ value: 0 });
        expect(builder.incrementAttrs['aria-label']).toBe('Increment');
    });

    itWithEffect('decrementAttrs disabled reflects canDecrement', () => {
        const builder = new InputNumberBuilder({ value: 0, min: 0 });
        expect(builder.decrementAttrs.disabled).toBe(true);
    });

    itWithEffect('incrementAttrs disabled reflects canIncrement', () => {
        const builder = new InputNumberBuilder({ value: 10, max: 10 });
        expect(builder.incrementAttrs.disabled).toBe(true);
    });
});
