<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultInputRangeProps } from './InputRange.props.js';
    import type { InputRangeProps } from './InputRange.types.js';

    type $$Props = InputRangeProps;
    export let elementRef: $$Props['elementRef'] = defaultInputRangeProps.elementRef;
    export let value: $$Props['value'] = defaultInputRangeProps.value;
    export let size: $$Props['size'] = defaultInputRangeProps.size;
    export let radius: $$Props['radius'] = defaultInputRangeProps.radius;
    export let color: $$Props['color'] = defaultInputRangeProps.color;
    export let fullWidth: $$Props['fullWidth'] = defaultInputRangeProps.fullWidth;

    $: cssClass = clsx($$restProps.class, 'InputRange', {
        [`InputRange-size-${size}`]: size,
        [`InputRange-color-${color}`]: color,
        'InputRange-full-width': fullWidth
    });
</script>

<input
    {...$$restProps}
    type="range"
    data-color={color}
    data-size={size}
    data-radius={radius}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
    bind:value
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
/>

<style lang="scss">
    .InputRange {
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        min-width: calc(var(--input-size-m) * 2);
        gap: var(--space-2);
        height: var(--input-size-m);
        min-width: calc(var(--input-size-m) * 3);
        margin: 0;
        padding: 0 var(--space-2);
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        border-width: 0;
        outline: none;
        font-family: inherit;
        text-overflow: ellipsis;
        cursor: pointer;
        border-radius: max(var(--radius-3), var(--radius-full));
        background: var(--color-surface);
        height: var(--input-height);
        color: var(--color);
        background: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);
        touch-action: none;

        // accent-color: var(--track-background);
        // &.Input-range-orientation-vertical {
        //     writing-mode: vertical-lr;
        // }

        & {
            --thumb-radius: max(var(--radius-2), var(--radius-full));
            --thumb-border: 1px solid var(--accent-12);
            --thumb-background: white;
            --track-radius: max(var(--radius-2), var(--radius-full));
            --track-background: var(--accent-9);
        }

        &.InputRange-full-width {
            width: 100%;
        }

        // Sizes
        &.InputRange-size-1 {
            --input-height: var(--space-5);
            --thumb-width: var(--space-2);
            --thumb-height: calc(var(--space-5) - var(--space-2));
            --thumb-margin-top: calc(-1 * ((var(--thumb-height) - var(--space-2)) / 2));
            --track-height: var(--space-2);
        }
        &.InputRange-size-2 {
            --input-height: var(--space-6);
            --thumb-width: var(--space-3);
            --thumb-height: calc(var(--space-6) - var(--space-2));
            --thumb-margin-top: calc(-1 * ((var(--thumb-height) - var(--space-3)) / 2));
            --track-height: var(--space-3);
        }
        &.InputRange-size-3 {
            --input-height: var(--space-7);
            --thumb-width: var(--space-4);
            --thumb-height: calc(var(--space-7) - var(--space-2));
            --thumb-margin-top: calc(-1 * ((var(--thumb-height) - var(--space-3)) / 2));
            --track-height: var(--space-3);
        }

        // States
        &[disabled] {
            @include disabled;
        }

        &:active,
        &:focus,
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: -1px;
        }

        &::-ms-track {
            width: 100%;
            cursor: pointer;
            /* Hides the slider so custom styles can be added */
            background: transparent;
            border-color: transparent;
            color: transparent;
        }
        /// thumb
        &::-webkit-slider-thumb {
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            height: var(--thumb-height);
            width: var(--thumb-width);
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            margin-top: var(--thumb-margin-top);
            cursor: pointer;
        }
        &::-moz-range-thumb {
            height: var(--thumb-height);
            width: var(--thumb-width);
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            margin-top: var(--thumb-margin-top);
            cursor: pointer;
        }
        &::-ms-thumb {
            height: var(--thumb-height);
            width: var(--thumb-width);
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            margin-top: var(--thumb-margin-top);
            cursor: pointer;
        }

        /// track
        &::-webkit-slider-runnable-track {
            width: 100%;
            height: var(--track-height);
            background: var(--track-background);
            border-radius: var(--track-radius);
            border: 0.2px solid #010101;
            cursor: pointer;
        }
        &::-moz-range-track {
            width: 100%;
            height: var(--track-height);
            background: var(--track-background);
            border-radius: var(--track-radius);
            border-radius: var(--radius-2);
            cursor: pointer;
        }
        &::-ms-track {
            width: 100%;
            height: var(--track-height);
            background: transparent;
            border-color: transparent;
            border-width: 16px 0;
            color: transparent;
            cursor: pointer;
        }
        &::-ms-fill-lower {
            background: var(--track-background);
            border-radius: var(--track-radius);
        }
        &::-ms-fill-upper {
            background: var(--track-background);
            border-radius: var(--track-radius);
        }
    }
</style>
