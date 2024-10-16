<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultCheckboxProps } from './Checkbox.props.js';
    import type { CheckboxProps } from './Checkbox.types.js';

    type $$Props = CheckboxProps;
    export let elementRef: $$Props['elementRef'] = defaultCheckboxProps.elementRef;
    export let group: $$Props['group'] = defaultCheckboxProps.group;
    export let value: $$Props['value'] = defaultCheckboxProps.value;
    export let checked: $$Props['checked'] = defaultCheckboxProps.checked;
    export let indeterminate: $$Props['indeterminate'] = defaultCheckboxProps.indeterminate;
    export let size: $$Props['size'] = defaultCheckboxProps.size;
    export let color: $$Props['color'] = defaultCheckboxProps.color;
    export let radius: $$Props['radius'] = defaultCheckboxProps.radius;

    $: cssClass = clsx($$restProps.class, 'Checkbox', {
        [`Checkbox-size-${size}`]: size,
        [`Checkbox-color-${color}`]: color
    });

    const isValid = <T,>(val: T): val is NonNullable<T> => value !== null && value !== undefined;

    $: if (isValid(group)) {
        groupCheck();
    }
    function groupCheck() {
        if (value !== null && value !== undefined) {
            checked = group?.includes(value);
        }
    }

    // Update group when checkbox changes
    function onChange() {
        if (isValid(group) && isValid(value)) {
            let inGroup = group.includes(value);
            if (!inGroup) {
                // Add to group
                group = [...group, value];
            } else {
                // Remove from group
                group = group.filter((v) => v != value);
            }
        }
    }
</script>

<input
    {...$$restProps}
    class={cssClass}
    style={$$restProps.style}
    data-color={color}
    data-size={size}
    data-radius={radius}
    data-checked={checked || undefined}
    data-indeterminate={indeterminate || undefined}
    type="checkbox"
    autocomplete="off"
    {value}
    bind:checked
    bind:indeterminate
    bind:this={elementRef}
    on:input
    on:change
    on:change={onChange}
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
/>

<style lang="scss">
    .Checkbox {
        position: relative;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        outline: none;
        border: none;
        height: var(--checkbox-size);
        width: var(--checkbox-size);
        border-radius: calc(var(--radius-3) / 1.5);
        background-color: var(--checkbox-background);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);

        &:after {
            display: none;
            position: absolute;
            content: '';
            width: var(--check-width);
            height: var(--check-height);
            top: 50%;
            left: 50%;
            border: solid var(--check-color);
            transform: translate(-50%, -60%) rotate(45deg);
            border-width: 0 2px 2px 0;
        }

        // States
        &:checked {
            background-color: var(--checkbox-background-checked);
            box-shadow: none;

            &:after {
                display: block;
            }

            &[data-indeterminate='true'] {
                &:after {
                    transform: translate(-50%, -80%) rotate(0);
                    border-width: 0 0 2px 0;
                    width: calc(var(--space-4) / 2.5);
                }
            }
        }

        &[disabled] {
            @include disabled;
        }

        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: 1px;
        }

        // Color
        & {
            --checkbox-background: var(--input-background);
            --checkbox-background-checked: var(--accent-9);
            --check-color: white;
        }

        // Sizes
        &.Checkbox-size-1 {
            --checkbox-size: calc(var(--space-4) * 0.875); // var(--space-4);
            --check-width: calc(var(--checkbox-size) / 3.5);
            --check-height: calc(var(--checkbox-size) / 2.5);
        }
        &.Checkbox-size-2 {
            --checkbox-size: var(--space-4); // var(--space-5);
            --check-width: calc(var(--checkbox-size) / 3.5);
            --check-height: calc(var(--checkbox-size) / 2.5);
        }
        &.Checkbox-size-3 {
            --checkbox-size: calc(var(--space-4) * 1.25); // var(--space-6);
            --check-width: calc(var(--checkbox-size) / 3.5);
            --check-height: calc(var(--checkbox-size) / 2.5);
        }
    }
</style>
