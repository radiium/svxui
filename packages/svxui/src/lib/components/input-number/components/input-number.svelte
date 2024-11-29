<script lang="ts">
    import { longpressAction } from '$lib/actions/longpress/index.js';
    import { clsx } from '$lib/utils/clsx.js';
    import { onMount } from 'svelte';
    import { Button } from '../../button/index.js';
    import InputGroup from '../../input-group/components/input-group.svelte';
    import Input from '../../input/components/input.svelte';
    import { defaultInputNumberProps } from '../props.js';
    import type { InputNumberProps } from '../types.js';
    import { on } from 'svelte/events';

    let {
        elementRef = $bindable(),
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

    let cssClass = $derived(
        clsx(rest.class, 'InputNumber', {
            [`InputNumber-color-${color}`]: color,
            [`InputNumber-size-${size}`]: size,
            'input-disabled': disabled,
            'input-required': required,
            'input-readonly': readonly
        })
    );

    function parseValue(val: string | number | undefined): number {
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

    let decrementRef: HTMLButtonElement | undefined = $state();
    let incrementRef: HTMLButtonElement | undefined = $state();

    onMount(() => {
        if (decrementRef && incrementRef) {
            const subscriptions = [
                longpressAction(decrementRef).destroy,
                on(decrementRef, 'startlongpress', decrementMouseDown),
                on(decrementRef, 'endlongpress', mouseUp),
                longpressAction(incrementRef).destroy,
                on(incrementRef, 'startlongpress', incrementMouseDown),
                on(incrementRef, 'endlongpress', mouseUp)
            ];

            return () => {
                subscriptions.filter(Boolean).forEach((cb) => cb?.());
            };
        }
    });
</script>

<InputGroup {...rest} class={cssClass} bind:elementRef>
    <Button
        bind:elementRef={decrementRef}
        onclick={decrement}
        {variant}
        {size}
        {radius}
        {color}
        {disabled}
        iconOnly>-</Button
    >
    <Input
        type="number"
        inputmode="numeric"
        class="InputNumber-input"
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
        bind:elementRef={incrementRef}
        onclick={increment}
        {variant}
        {size}
        {radius}
        {color}
        {disabled}
        iconOnly>+</Button
    >
</InputGroup>

<style lang="scss" global>
    .InputNumber-input {
        width: 6em; // TODO make it overridable
        background: transparent !important;
    }

    .InputNumber-input::-webkit-inner-spin-button,
    .InputNumber-input::-webkit-outer-spin-button {
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: textfield !important;
        margin: 0;
    }
</style>
