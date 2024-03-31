<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultRadioProps } from './Radio.props.js';
    import type { RadioProps } from './Radio.types.js';

    type $$Props = RadioProps;
    export let elementRef: $$Props['elementRef'] = defaultRadioProps.elementRef;
    export let group: $$Props['group'] = defaultRadioProps.group;
    export let value: $$Props['value'] = defaultRadioProps.value;
    export let size: $$Props['size'] = defaultRadioProps.size;
    export let color: $$Props['color'] = defaultRadioProps.color;

    $: cssClass = clsx($$restProps.class, 'Radio', {
        [`Radio-size-${size}`]: size,
        [`Radio-color-${color}`]: color
    });
</script>

<input
    {...$$restProps}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
    type="radio"
    {value}
    bind:group
    bind:this={elementRef}
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
/>

<style lang="scss">
    .Radio {
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        border: none;
        position: relative;
        border-radius: 100%;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--radio-size);
        height: var(--radio-size);
        background: var(--input-background);
        box-shadow: var(--input-box-shadow);
        transition:
            background-color ease 0.2s,
            box-shadow ease 0.2s;

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

        // States
        &[data-checked] {
            background-color: var(--checkbox-background-checked);
            box-shadow: none;

            &:after {
                display: block;
            }
        }

        &[disabled] {
            @include disabled;
        }

        &:checked {
            background-color: var(--radio-background-checked);
            box-shadow: none;

            &:after {
                background-color: var(--check-color);
            }
        }

        &:focus-visible {
            outline: var(--input-outline);
            outline-offset: inherit;
        }

        // Colors
        --radio-background: var(--gray-a3);
        --radio-background-checked: var(--accent-9);
        --check-color: white;

        // Sizes
        &.Radio-size-1 {
            --radio-size: calc(var(--space-4) * 0.875);
            --check-width: calc(var(--radio-size) / 3.5);
            --check-height: calc(var(--radio-size) / 2.5);
        }
        &.Radio-size-2 {
            --radio-size: var(--space-4);
            --check-width: calc(var(--radio-size) / 3.5);
            --check-height: calc(var(--radio-size) / 2.5);
        }
        &.Radio-size-3 {
            --radio-size: calc(var(--space-4) * 1.25);
            --check-width: calc(var(--radio-size) / 3.5);
            --check-height: calc(var(--radio-size) / 2.5);
        }
    }
</style>
