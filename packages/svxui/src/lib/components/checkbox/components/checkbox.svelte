<script lang="ts">
    import { isNil } from '$lib/internals/is.js';
    import type { CheckboxProps } from '../types.js';

    let {
        ref = $bindable(),
        group = $bindable(),
        checked = $bindable(),
        indeterminate = $bindable(),
        onCheckedChange = undefined,
        value = undefined,
        color = undefined,
        size = '2',
        radius = undefined,
        ...rest
    }: CheckboxProps = $props();

    // Update group when checkbox changes
    function onChange(event: Event & { currentTarget: HTMLInputElement }) {
        if (!isNil(group) && !isNil(value)) {
            group = group.includes(value)
                ? // Remove value
                  group.filter((v: string | number) => v !== value)
                : // Add value
                  [...group, value];
        }

        rest.onchange?.(event);
        onCheckedChange?.(checked === true);
    }

    // Update checked when group change
    $effect(() => {
        if (!isNil(group)) {
            checked = group?.includes(value);
        }
    });

    let cssClass = $derived([
        rest.class,
        'checkbox',
        {
            [`checkbox-size-${size}`]: size
        }
    ]);

    let dataState = $derived(
        indeterminate //
            ? 'indeterminate'
            : checked
              ? 'checked'
              : 'unchecked'
    );
</script>

<input
    {...rest}
    bind:this={ref}
    bind:checked
    bind:indeterminate
    onchange={onChange}
    {value}
    class={cssClass}
    type="checkbox"
    data-color={color}
    data-radius={radius}
    data-state={dataState}
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

        --checkbox-background: var(--accent-surface);
        --checkbox-background-checked: var(--accent-track);
        --checkbox-check-color: var(--accent-contrast);

        &:after {
            content: '';
            position: absolute;
            width: var(--check-width);
            height: var(--check-height);
            top: 50%;
            left: 50%;
            border: solid var(--checkbox-check-color);
            transform: translate(-50%, -60%) rotate(45deg);
            border-width: 0 2px 2px 0;
        }

        /* States */
        &:not(:checked),
        &[data-state='unchecked'] {
            background-color: var(--checkbox-background);
            box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);

            &:after {
                display: none;
            }
        }
        &:checked,
        &[data-state='checked'] {
            background-color: var(--checkbox-background-checked);
            box-shadow: none;

            &:after {
                display: block;
            }
        }

        &:indeterminate,
        &[data-state='indeterminate'] {
            background-color: var(--checkbox-background-checked);
            box-shadow: none;

            &:after {
                display: block;
                transform: translate(-50%, -80%) rotate(0);
                border-width: 0 0 2px 0;
                width: calc(var(--space-4) / 2.5);
            }
        }

        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: 1px;
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
