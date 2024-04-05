<script lang="ts">
    import { clsx } from '$lib/utils/clsx.js';
    import { longpress } from '../../actions/longpress.js';
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
    export let color: $$Props['color'] = defaultInputNumberProps.color;
    export let variant: $$Props['variant'] = defaultInputNumberProps.variant;
    export let align: $$Props['align'] = defaultInputNumberProps.align;
    export let fullWidth: $$Props['fullWidth'] = defaultInputNumberProps.fullWidth;
    export let disabled: $$Props['disabled'] = defaultInputNumberProps.disabled;
    export let required: $$Props['required'] = defaultInputNumberProps.required;
    export let readonly: $$Props['readonly'] = defaultInputNumberProps.readonly;

    // Input css classes
    let cssClass = '';
    $: cssClass = clsx($$restProps.class, 'InputNumber', {
        [`InputNumber-color-${color}`]: color,
        [`InputNumber-size-${size}`]: size,
        'input-disabled': disabled,
        'input-required': required,
        'input-readonly': readonly
    });

    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    function decrement(): void {
        if (disabled) {
            return;
        }
        initValue();
        if (typeof value === 'number' && typeof step === 'number') {
            if (typeof min === 'number') {
                value = Math.max(value - step, min);
            } else {
                value = value - step;
            }
        }
    }

    function decrementMouseDown() {
        clearIntervalId();
        intervalId = setInterval(() => {
            decrement();
        }, 100);
    }

    function increment(): void {
        if (disabled) {
            return;
        }
        initValue();
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

    function mouseUp() {
        clearIntervalId();
    }

    function initValue(): void {
        if (!value) {
            value = 0;
        }
    }
    function clearIntervalId(): void {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    }
</script>

<!-- TODO implement longpress -->
<InputGroup class={cssClass} bind:elementRef>
    <Button on:click={decrement} {variant} {size} {color} {disabled} iconOnly>-</Button>
    <Input
        type="number"
        inputmode="numeric"
        class="InputNumber-input"
        {size}
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
    />
    <Button on:click={increment} {variant} {size} {color} {disabled} iconOnly>+</Button>
</InputGroup>

<style lang="scss">
    :global(.InputNumber-input) {
        width: 6em; // TODO make it overridable
        background: transparent !important;
    }

    :global(.InputNumber-input::-webkit-inner-spin-button),
    :global(.InputNumber-input::-webkit-outer-spin-button) {
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: textfield !important;
        margin: 0;
    }
</style>
