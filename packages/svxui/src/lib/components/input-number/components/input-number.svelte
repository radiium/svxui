<script lang="ts">
    import { InputNumberBuilder } from '$lib/builders/input-number/input-number-builder.svelte.js';
    import { Button } from '../../button/index.js';
    import { InputGroup } from '../../input-group/index.js';
    import { Input } from '../../input/index.js';
    import type { InputNumberProps } from '../types.js';

    let {
        ref = $bindable(),
        value = $bindable(),
        onValueChange = undefined,
        step = 1,
        min = undefined,
        max = undefined,
        decimals = undefined,
        size = '2',
        radius = undefined,
        color = undefined,
        variant = 'clear',
        align = 'end',
        fullWidth = false,
        disabled = false,
        required = false,
        readonly = undefined,
        ...rest
    }: InputNumberProps = $props();

    const inputNumber = new InputNumberBuilder({
        get value() {
            return value;
        },
        set value(newValue) {
            value = newValue;
        },
        get onValueChange() {
            return onValueChange;
        },
        get min() {
            return min;
        },
        get max() {
            return max;
        },
        get step() {
            return step;
        },
        get decimals() {
            return decimals;
        }
    });

    // Input css classes
    let cssClass = $derived([
        rest.class,
        'input-number',
        {
            [`input-number-size-${size}`]: size,
            'input-disabled': disabled,
            'input-required': required,
            'input-readonly': readonly
        }
    ]);
</script>

<InputGroup {...rest} class={cssClass} aria-disabled={disabled ? 'true' : undefined} bind:ref>
    <Button {...inputNumber.decrementAttrs} {variant} {size} {radius} {color} {disabled} iconOnly>-</Button>
    <Input
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
        {...inputNumber.inputAttrs}
    />
    <Button {...inputNumber.incrementAttrs} {variant} {size} {radius} {color} {disabled} iconOnly>+</Button>
</InputGroup>
