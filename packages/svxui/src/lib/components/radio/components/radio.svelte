<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultRadioProps } from '../props.js';
    import type { RadioProps } from '../types.js';

    let {
        elementRef = $bindable(),
        group = $bindable(),
        value = defaultRadioProps.value,
        size = defaultRadioProps.size,
        color = defaultRadioProps.color,
        ...rest
    }: RadioProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Radio', {
            [`Radio-size-${size}`]: size,
            [`Radio-color-${color}`]: color
        })
    );
</script>

<input
    {...rest}
    data-color={color}
    data-size={size}
    class={cssClass}
    type="radio"
    {value}
    bind:group
    bind:this={elementRef}
/>

<style lang="scss">
    .Radio {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        outline: none;
        border: none;
        position: relative;
        border-radius: 100%;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition:
            background-color ease 0.2s,
            box-shadow ease 0.2s;

        width: var(--radio-size);
        height: var(--radio-size);
        background-color: var(--radio-background);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);

        --radio-background: var(--input-background);
        --radio-background-checked: var(--accent-9);
        --check-color: white;

        &:after {
            width: var(--radio-size);
            height: var(--radio-size);
            content: '';
            transform: scale(0.4);
            position: absolute;
            border-radius: 100%;
            background-color: transparent;
            transition: background-color ease 0.2s;
            /* border: solid var(--check-color); */
        }

        // States
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
            @include disabled;
        }

        // Sizes
        &.Radio-size-1 {
            --radio-size: calc(var(--space-4) * 0.875);
            --radio-check-width: calc(var(--radio-size) / 3.5);
            --radio-check-height: calc(var(--radio-size) / 2.5);
        }
        &.Radio-size-2 {
            --radio-size: var(--space-4);
            --radio-check-width: calc(var(--radio-size) / 3.5);
            --radio-check-height: calc(var(--radio-size) / 2.5);
        }
        &.Radio-size-3 {
            --radio-size: calc(var(--space-4) * 1.25);
            --radio-check-width: calc(var(--radio-size) / 3.5);
            --radio-check-height: calc(var(--radio-size) / 2.5);
        }
    }
</style>
