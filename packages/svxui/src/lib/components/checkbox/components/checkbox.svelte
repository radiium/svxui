<script lang="ts">
    import type { ChangeEventHandler } from 'svelte/elements';
    import { clsx } from '../../../utils/clsx.js';
    import { defaultCheckboxProps } from '../props.js';
    import type { CheckboxProps } from '../types.js';

    let {
        elementRef = $bindable(),
        group = $bindable(),
        value = defaultCheckboxProps.value,
        checked = $bindable(),
        indeterminate = $bindable(),
        size = defaultCheckboxProps.size,
        color = defaultCheckboxProps.color,
        radius = defaultCheckboxProps.radius,
        ...rest
    }: CheckboxProps = $props();

    function isValid<T>(val: T): val is NonNullable<T> {
        return value !== null && value !== undefined;
    }

    function groupCheck() {
        if (value !== null && value !== undefined) {
            checked = group?.includes(value);
        }
    }

    // Update group when checkbox changes
    function onChange(event: Parameters<ChangeEventHandler<HTMLInputElement>>[0]) {
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

        rest.onchange?.(event);
    }
    let cssClass = $derived(
        clsx(rest.class, 'Checkbox', {
            [`Checkbox-size-${size}`]: size,
            [`Checkbox-color-${color}`]: color
        })
    );

    $effect(() => {
        if (isValid(group)) {
            groupCheck();
        }
    });
</script>

<input
    autocomplete="off"
    {...rest}
    type="checkbox"
    class={cssClass}
    data-color={color}
    data-size={size}
    data-radius={radius}
    data-checked={checked || undefined}
    data-indeterminate={indeterminate || undefined}
    {value}
    onchange={onChange}
    bind:checked
    bind:indeterminate
    bind:this={elementRef}
/>

<style lang="scss">
    .Checkbox {
        position: relative;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        flex-shrink: 0;
        outline: none;
        border: none;

        height: var(--checkbox-size);
        width: var(--checkbox-size);
        border-radius: calc(var(--radius-3) / 1.5);
        background-color: var(--checkbox-background);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);

        --checkbox-background: var(--input-background);
        --checkbox-background-checked: var(--accent-9);
        --check-color: white;

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

        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: 1px;
        }

        // States
        &[data-checked='true'] {
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
