<script lang="ts">
    import { longpressAction } from '$lib/actions/longpress.action.js';
    import { clsx } from '$lib/utils/clsx.js';
    import { listen } from '$lib/utils/listen.js';
    import { onMount } from 'svelte';
    import Button from '../Button/Button.svelte';
    import Input from '../Input/Input.svelte';
    import InputGroup from '../InputGroup/InputGroup.svelte';
    import { defaultInputNumberProps } from './InputNumber.props.js';
    import type { InputNumberProps } from './InputNumber.types.js';

    type $$Props = InputNumberProps;
    export let elementRef: $$Props['elementRef'] = defaultInputNumberProps.elementRef;
    export let value: $$Props['value'] = defaultInputNumberProps.value;
    export let step: $$Props['step'] = defaultInputNumberProps.step;
    export let min: $$Props['min'] = defaultInputNumberProps.min;
    export let max: $$Props['max'] = defaultInputNumberProps.max;
    export let size: $$Props['size'] = defaultInputNumberProps.size;
    export let radius: $$Props['radius'] = defaultInputNumberProps.radius;
    export let color: $$Props['color'] = defaultInputNumberProps.color;
    export let variant: $$Props['variant'] = defaultInputNumberProps.variant;
    export let align: $$Props['align'] = defaultInputNumberProps.align;
    export let fullWidth: $$Props['fullWidth'] = defaultInputNumberProps.fullWidth;
    export let disabled: $$Props['disabled'] = defaultInputNumberProps.disabled;
    export let required: $$Props['required'] = defaultInputNumberProps.required;
    export let readonly: $$Props['readonly'] = defaultInputNumberProps.readonly;

    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    // Input css classes
    let cssClass = '';
    $: cssClass = clsx($$restProps.class, 'InputNumber', {
        [`InputNumber-color-${color}`]: color,
        [`InputNumber-size-${size}`]: size,
        'input-disabled': disabled,
        'input-required': required,
        'input-readonly': readonly
    });

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

    let decrementRef: HTMLButtonElement | undefined;
    let incrementRef: HTMLButtonElement | undefined;

    onMount(() => {
        if (decrementRef && incrementRef) {
            const subscriptions = [
                longpressAction(decrementRef).destroy,
                listen(decrementRef, 'startlongpress', decrementMouseDown),
                listen(decrementRef, 'endlongpress', mouseUp),
                longpressAction(incrementRef).destroy,
                listen(incrementRef, 'startlongpress', incrementMouseDown),
                listen(incrementRef, 'endlongpress', mouseUp)
            ];

            return () => {
                subscriptions.filter(Boolean).forEach((cb) => cb?.());
            };
        }
    });
</script>

<InputGroup class={cssClass} bind:elementRef>
    <Button
        bind:elementRef={decrementRef}
        on:click={decrement}
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
        {size}
        {color}
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
        on:input
        on:change
        on:focus
        on:blur
        on:keydown
        on:keypress
        on:keyup
    />
    <Button
        bind:elementRef={incrementRef}
        on:click={increment}
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
