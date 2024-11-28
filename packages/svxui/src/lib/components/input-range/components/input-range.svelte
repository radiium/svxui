<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultInputRangeProps } from '../props.js';
    import type { InputRangeProps } from '../types.js';

    let {
        elementRef = $bindable(),
        value = $bindable(),
        size = defaultInputRangeProps.size,
        radius = defaultInputRangeProps.radius,
        color = defaultInputRangeProps.color,
        fullWidth = defaultInputRangeProps.fullWidth,
        ...rest
    }: InputRangeProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'InputRange', {
            [`InputRange-size-${size}`]: size,
            [`InputRange-color-${color}`]: color,
            'InputRange-full-width': fullWidth
        })
    );
</script>

<input
    {...rest}
    class={cssClass}
    type="range"
    data-color={color}
    data-size={size}
    data-radius={radius}
    bind:this={elementRef}
    bind:value
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
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        border-width: 0;
        outline: none;
        font-family: inherit;
        text-overflow: ellipsis;
        touch-action: none;
        cursor: pointer;

        margin: 0;
        padding: 0 var(--space-2);
        min-width: calc(var(--input-size-m) * 2);
        gap: var(--space-2);
        height: var(--input-size-m);
        min-width: calc(var(--input-size-m) * 3);
        border-radius: max(var(--radius-3), var(--radius-full));
        background: var(--color-surface);
        height: var(--input-range-height);
        color: var(--color);
        background: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);

        --thumb-radius: max(var(--radius-2), var(--radius-full));
        --thumb-border: 1px solid var(--accent-12);
        --thumb-background: white;
        --track-radius: max(var(--radius-2), var(--radius-full));
        --track-background: var(--accent-9);

        // accent-color: var(--track-background);
        // &.Input-range-orientation-vertical {
        //     writing-mode: vertical-lr;
        // }

        // States
        &:active,
        &:focus,
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: -1px;
        }

        &[disabled] {
            @include disabled;
        }

        &.InputRange-full-width {
            width: 100%;
        }

        // Sizes
        &.InputRange-size-1 {
            --input-range-height: var(--space-5);
            --input-range-thumb-width: var(--space-2);
            --input-range-thumb-height: calc(var(--space-5) - var(--space-2));
            --input-range-thumb-margin-top: calc(
                -1 * ((var(--input-range-thumb-height) - var(--space-2)) / 2)
            );
            --input-range-track-height: var(--space-2);
        }
        &.InputRange-size-2 {
            --input-range-height: var(--space-6);
            --input-range-thumb-width: var(--space-3);
            --input-range-thumb-height: calc(var(--space-6) - var(--space-2));
            --input-range-thumb-margin-top: calc(
                -1 * ((var(--input-range-thumb-height) - var(--space-3)) / 2)
            );
            --input-range-track-height: var(--space-3);
        }
        &.InputRange-size-3 {
            --input-range-height: var(--space-7);
            --input-range-thumb-width: var(--space-4);
            --input-range-thumb-height: calc(var(--space-7) - var(--space-2));
            --input-range-thumb-margin-top: calc(
                -1 * ((var(--input-range-thumb-height) - var(--space-3)) / 2)
            );
            --input-range-track-height: var(--space-3);
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
            height: var(--input-range-thumb-height);
            width: var(--input-range-thumb-width);
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            margin-top: var(--input-range-thumb-margin-top);
            cursor: pointer;
        }
        &::-moz-range-thumb {
            height: var(--input-range-thumb-height);
            width: var(--input-range-thumb-width);
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            margin-top: var(--input-range-thumb-margin-top);
            cursor: pointer;
        }
        &::-ms-thumb {
            height: var(--input-range-thumb-height);
            width: var(--input-range-thumb-width);
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            margin-top: var(--input-range-thumb-margin-top);
            cursor: pointer;
        }

        /// track
        &::-webkit-slider-runnable-track {
            width: 100%;
            height: var(--input-range-track-height);
            background: var(--track-background);
            border-radius: var(--track-radius);
            border: 0.2px solid #010101;
            cursor: pointer;
        }
        &::-moz-range-track {
            width: 100%;
            height: var(--input-range-track-height);
            background: var(--track-background);
            border-radius: var(--track-radius);
            border-radius: var(--radius-2);
            cursor: pointer;
        }
        &::-ms-track {
            width: 100%;
            height: var(--input-range-track-height);
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
