<script lang="ts">
    import type { ChangeEventHandler } from 'svelte/elements';
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

    function isNil<T>(val: T | null | undefined): val is null | undefined {
        return val === null || val === undefined;
    }

    // Update group when checkbox changes
    function onChange(event: Parameters<ChangeEventHandler<HTMLInputElement>>[0]) {
        if (!isNil(group) && !isNil(value)) {
            group = group.includes(value)
                ? group.filter((v: string | number) => v != value) // Remove
                : [...group, value]; // Add
        }

        rest.onchange?.(event);
    }

    $effect(() => {
        if (!isNil(group)) {
            checked = group?.includes(value);
        }
    });

    let cssClass = $derived([
        rest.class,
        'checkbox',
        {
            [`checkbox-size-${size}`]: size,
            [`checkbox-color-${color}`]: color
        }
    ]);
</script>

<input
    autocomplete="off"
    {...rest}
    type="checkbox"
    class={cssClass}
    data-checked={checked || undefined}
    data-indeterminate={indeterminate || undefined}
    data-color={color}
    data-size={size}
    data-radius={radius}
    {value}
    onchange={onChange}
    bind:checked
    bind:indeterminate
    bind:this={elementRef}
/>

<style>
    .checkbox {
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
        box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);

        --checkbox-background: var(--accent-surface);
        --checkbox-background-checked: var(--accent-track);
        --check-color: var(--accent-contrast);

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

        /* States */
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
            cursor: default !important;
            opacity: 0.5 !important;
            outline: none !important;
            pointer-events: none;

            &:focus,
            &:focus-visible {
                box-shadow: none !important;
                outline: none !important;
            }
        }

        /* Sizes */
        &.checkbox-size-1 {
            --checkbox-size: calc(var(--space-4) * 0.875);
            --check-width: calc(var(--checkbox-size) / 3.5);
            --check-height: calc(var(--checkbox-size) / 2.5);
        }
        &.checkbox-size-2 {
            --checkbox-size: var(--space-4);
            --check-width: calc(var(--checkbox-size) / 3.5);
            --check-height: calc(var(--checkbox-size) / 2.5);
        }
        &.checkbox-size-3 {
            --checkbox-size: calc(var(--space-4) * 1.25);
            --check-width: calc(var(--checkbox-size) / 3.5);
            --check-height: calc(var(--checkbox-size) / 2.5);
        }
    }
</style>
