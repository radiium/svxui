<script lang="ts">
    import type { RadioProps } from '../types.js';

    let {
        ref = $bindable(),
        group = $bindable(),
        size = '2',
        color = undefined,
        ...rest
    }: RadioProps = $props();

    let cssClass = $derived([
        rest.class,
        'radio',
        {
            [`radio-size-${size}`]: size
        }
    ]);

    let dataState = $derived(group === rest.value ? 'checked' : 'unchecked');
</script>

<input
    {...rest}
    bind:this={ref}
    bind:group
    type="radio"
    class={cssClass}
    data-color={color}
    data-size={size}
    data-state={dataState}
/>

<style>
    .radio {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        outline: none;
        border: none;
        position: relative;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition:
            background-color ease 0.2s,
            box-shadow ease 0.2s;

        width: var(--radio-size);
        height: var(--radio-size);

        --radio-background: var(--accent-surface);
        --radio-background-checked: var(--accent-track);
        --radio-check-color: var(--accent-contrast);

        &:after {
            width: var(--radio-size);
            height: var(--radio-size);
            content: '';
            transform: scale(0.4);
            position: absolute;
            border-radius: 100%;
            transition: background-color ease 0.2s;
        }

        /* States */
        &:not(:checked),
        &[data-state='unchecked'] {
            background-color: var(--radio-background);
            box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);

            &:after {
                background-color: transparent;
            }
        }
        &:checked,
        &[data-state='checked'] {
            background-color: var(--radio-background-checked);
            box-shadow: none;

            &:after {
                background-color: var(--radio-check-color);
                display: block;
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
        &.radio-size-1 {
            --radio-size: calc(var(--space-4) * 0.875);
            --radio-check-width: calc(var(--radio-size) / 3.5);
            --radio-check-height: calc(var(--radio-size) / 2.5);
        }
        &.radio-size-2 {
            --radio-size: var(--space-4);
            --radio-check-width: calc(var(--radio-size) / 3.5);
            --radio-check-height: calc(var(--radio-size) / 2.5);
        }
        &.radio-size-3 {
            --radio-size: calc(var(--space-4) * 1.25);
            --radio-check-width: calc(var(--radio-size) / 3.5);
            --radio-check-height: calc(var(--radio-size) / 2.5);
        }
    }
</style>
