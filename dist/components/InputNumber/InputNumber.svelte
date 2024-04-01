<script>import { clsx } from '../../utils/clsx.js';
import { longpress } from '../../actions/longpress.js';
import Button from '../Button/Button.svelte';
import Input from '../Input/Input.svelte';
import InputGroup from '../InputGroup/InputGroup.svelte';
import { defaultInputNumberProps } from './InputNumber.props.js';
export let elementRef = defaultInputNumberProps.elementRef;
export let value = defaultInputNumberProps.value;
export let step = defaultInputNumberProps.step;
export let min = defaultInputNumberProps.min;
export let max = defaultInputNumberProps.max;
export let size = defaultInputNumberProps.size;
export let color = defaultInputNumberProps.color;
export let variant = defaultInputNumberProps.variant;
export let align = defaultInputNumberProps.align;
export let fullWidth = defaultInputNumberProps.fullWidth;
export let disabled = defaultInputNumberProps.disabled;
export let required = defaultInputNumberProps.required;
export let readonly = defaultInputNumberProps.readonly;
// Input css classes
let cssClass = '';
$: cssClass = clsx($$restProps.class, 'InputNumber', {
    [`InputNumber-color-${color}`]: color,
    [`InputNumber-size-${size}`]: size,
    'input-disabled': disabled,
    'input-required': required,
    'input-readonly': readonly
});
let intervalId = undefined;
function decrement() {
    if (disabled) {
        return;
    }
    initValue();
    if (typeof value === 'number' && typeof step === 'number') {
        if (typeof min === 'number') {
            value = Math.max(value - step, min);
        }
        else {
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
function increment() {
    if (disabled) {
        return;
    }
    initValue();
    if (typeof value === 'number' && typeof step === 'number') {
        if (typeof max === 'number') {
            value = Math.min(value + step, max);
        }
        else {
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
function initValue() {
    if (!value) {
        value = 0;
    }
}
function clearIntervalId() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
    }
}
</script>

<!--  class={cssClass} -->
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

<style>:global(.InputNumber-input::-webkit-outer-spin-button) {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: textfield !important;
  margin: 0;
  outline: 1px solid red;
}

:global(.InputNumber-input) {
  width: 6em;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: textfield !important;
  margin: 0;
}</style>
