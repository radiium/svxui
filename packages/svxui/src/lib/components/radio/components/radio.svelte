<script lang="ts">
    import { defaultRadioProps } from '../props.js';
    import type { RadioProps } from '../types.js';

    let {
        elementRef = $bindable(),
        group = $bindable(),
        size = defaultRadioProps.size,
        color = defaultRadioProps.color,
        ...rest
    }: RadioProps = $props();

    let cssClass = $derived([
        rest.class,
        'radio',
        {
            [`radio-size-${size}`]: size,
            [`radio-color-${color}`]: color
        }
    ]);
</script>

<input
    {...rest}
    data-color={color}
    data-size={size}
    class={cssClass}
    data-checked={group === rest.value ? 'true' : undefined}
    type="radio"
    bind:group
    bind:this={elementRef}
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
        background-color: var(--radio-background);
        box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);

        --radio-background: var(--accent-surface);
        --radio-background-checked: var(--accent-track);
        --check-color: var(--accent-contrast);

        &:after {
            width: var(--radio-size);
            height: var(--radio-size);
            content: '';
            transform: scale(0.4);
            position: absolute;
            border-radius: 100%;
            background-color: transparent;
            transition: background-color ease 0.2s;
        }

        /* States */
        &:checked {
            background-color: var(--radio-background-checked);
            box-shadow: none;

            &:after {
                background-color: var(--check-color);
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
