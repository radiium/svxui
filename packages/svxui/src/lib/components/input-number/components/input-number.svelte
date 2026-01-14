<script lang="ts">
    import { longpress } from '$lib/attachments/longpress/attachment.svelte.js';
    import { Button } from '../../button/index.js';
    import InputGroup from '../../input-group/components/input-group.svelte';
    import Input from '../../input/components/input.svelte';
    import { defaultInputNumberProps } from '../props.js';
    import type { InputNumberProps } from '../types.js';

    let {
        ref = $bindable(),
        value = $bindable(),
        step = defaultInputNumberProps.step,
        min = defaultInputNumberProps.min,
        max = defaultInputNumberProps.max,
        size = defaultInputNumberProps.size,
        radius = defaultInputNumberProps.radius,
        color = defaultInputNumberProps.color,
        variant = defaultInputNumberProps.variant,
        align = defaultInputNumberProps.align,
        fullWidth = defaultInputNumberProps.fullWidth,
        disabled = defaultInputNumberProps.disabled,
        required = defaultInputNumberProps.required,
        readonly = defaultInputNumberProps.readonly,
        ...rest
    }: InputNumberProps = $props();

    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    // Input css classes
    let cssClass = $derived([
        rest.class,
        'input-number',
        {
            [`input-number-size-${size}`]: size,
            [`input-number-color-${color}`]: color,
            'input-disabled': disabled,
            'input-required': required,
            'input-readonly': readonly
        }
    ]);

    function parseValue(val: string | number | undefined | null): number {
        if (!val) {
            val = 0;
        }

        return parseFloat(`${val}`);
    }

    function decrement(): void {
        if (disabled) {
            return;
        }

        value = parseValue(value);
        if (typeof value === 'number' && typeof step === 'number') {
            if (typeof min === 'number') {
                value = Math.max(value - step, min);
            } else {
                value = value - step;
            }
        }
    }

    function increment(): void {
        if (disabled) {
            return;
        }
        value = parseValue(value);
        if (typeof value === 'number' && typeof step === 'number') {
            if (typeof max === 'number') {
                value = Math.min(value + step, max);
            } else {
                value = value + step;
            }
        }
    }

    function incrementMouseDown() {
        clearIntervalId();
        intervalId = setInterval(() => {
            increment();
        }, 100);
    }

    function decrementMouseDown() {
        clearIntervalId();
        intervalId = setInterval(() => {
            decrement();
        }, 100);
    }

    function mouseUp() {
        clearIntervalId();
    }

    function clearIntervalId(): void {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    }
</script>

<InputGroup {...rest} class={cssClass} aria-disabled={disabled ? 'true' : undefined} bind:ref>
    <Button
        onclick={decrement}
        {@attach longpress({ onLongpressStart: decrementMouseDown, onLongpressEnd: mouseUp })}
        {variant}
        {size}
        {radius}
        {color}
        {disabled}
        iconOnly
    >
        -
    </Button>
    <Input
        type="number"
        inputmode="numeric"
        class="input-number-in-group"
        {color}
        {size}
        {radius}
        {align}
        {fullWidth}
        {disabled}
        {required}
        {readonly}
        {step}
        {min}
        {max}
        bind:value
    />
    <Button
        onclick={increment}
        {@attach longpress({ onLongpressStart: incrementMouseDown, onLongpressEnd: mouseUp })}
        {variant}
        {size}
        {radius}
        {color}
        {disabled}
        iconOnly
    >
        +
    </Button>
</InputGroup>
