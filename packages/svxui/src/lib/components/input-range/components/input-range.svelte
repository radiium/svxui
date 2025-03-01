<script lang="ts">
    import { defaultInputRangeProps } from '../props.js';
    import type { InputRangeProps } from '../types.js';

    let {
        elementRef = $bindable(),
        value = $bindable(),
        size = defaultInputRangeProps.size,
        radius = defaultInputRangeProps.radius,
        color = defaultInputRangeProps.color,
        fullWidth = defaultInputRangeProps.fullWidth,
        orientation = defaultInputRangeProps.orientation,
        ...rest
    }: InputRangeProps = $props();

    let cssClass = $derived([
        rest.class,
        'input-range',
        {
            [`input-range-orientation-${orientation}`]: orientation,
            [`input-range-size-${size}`]: size,
            [`input-range-color-${color}`]: color,
            'input-range-full-width': fullWidth
        }
    ]);
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

<style>
    .input-range {
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
        gap: var(--space-2);
        border-radius: max(var(--radius-3), var(--radius-full));
        background: var(--color-surface);
        color: var(--color);
        background-color: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);

        --thumb-radius: max(var(--radius-2), var(--radius-full));
        --thumb-border: 1px solid var(--accent-12);
        --thumb-background: white;
        --track-radius: max(var(--radius-2), var(--radius-full));
        --track-background: var(--accent-9);

        &.input-range-orientation-horizontal {
            padding: 0 var(--space-2);
            height: var(--input-range-height);
            min-width: calc(var(--input-range-height) * 3);

            &.input-range-full-width {
                width: 100%;
            }

            /* Thumb */
            &::-webkit-slider-thumb {
                height: var(--input-range-thumb-height);
                width: var(--input-range-thumb-width);
                margin-top: var(--input-range-thumb-margin-top);
            }
            &::-moz-range-thumb {
                height: var(--input-range-thumb-height);
                width: var(--input-range-thumb-width);
                margin-top: var(--input-range-thumb-margin-top);
            }
            &::-ms-thumb {
                height: var(--input-range-thumb-height);
                width: var(--input-range-thumb-width);
                margin-top: var(--input-range-thumb-margin-top);
            }

            /* Track */
            &::-webkit-slider-runnable-track {
                width: 100%;
                height: var(--input-range-track-height);
            }
            &::-moz-range-track {
                width: 100%;
                height: var(--input-range-track-height);
            }
            &::-ms-track {
                width: 100%;
                height: var(--input-range-track-height);
            }
        }
        &.input-range-orientation-vertical {
            writing-mode: vertical-lr;
            padding: var(--space-2) 0;
            height: calc(var(--input-range-height) * 3);
            min-width: var(--input-range-height);

            &.input-range-full-width {
                height: 100%;
            }

            /* Thumb */
            &::-webkit-slider-thumb {
                width: var(--input-range-thumb-height);
                height: var(--input-range-thumb-width);
                margin-top: inherit;
                margin-left: var(--input-range-thumb-margin-top);
            }
            &::-moz-range-thumb {
                width: var(--input-range-thumb-height);
                height: var(--input-range-thumb-width);
                margin-top: inherit;
                margin-left: var(--input-range-thumb-margin-top);
            }
            &::-ms-thumb {
                height: var(--input-range-thumb-height);
                width: var(--input-range-thumb-width);
                margin-top: inherit;
                margin-left: var(--input-range-thumb-margin-top);
            }

            /* Track */
            &::-webkit-slider-runnable-track {
                height: 100%;
                width: var(--input-range-track-height);
            }
            &::-moz-range-track {
                height: 100%;
                width: var(--input-range-track-height);
            }
            &::-ms-track {
                height: 100%;
                width: var(--input-range-track-height);
            }
        }

        /* States */
        &:active,
        &:focus,
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: -1px;
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
        &.input-range-size-1 {
            --input-range-height: var(--space-5);
            --input-range-thumb-width: var(--space-2);
            --input-range-thumb-height: calc(var(--space-5) - var(--space-2));
            --input-range-thumb-margin-top: calc(
                -1 * ((var(--input-range-thumb-height) - var(--space-2)) / 2)
            );
            --input-range-track-height: var(--space-2);
        }
        &.input-range-size-2 {
            --input-range-height: var(--space-6);
            --input-range-thumb-width: var(--space-3);
            --input-range-thumb-height: calc(var(--space-6) - var(--space-2));
            --input-range-thumb-margin-top: calc(
                -1 * ((var(--input-range-thumb-height) - var(--space-3)) / 2)
            );
            --input-range-track-height: var(--space-3);
        }
        &.input-range-size-3 {
            --input-range-height: var(--space-7);
            --input-range-thumb-width: var(--space-4);
            --input-range-thumb-height: calc(var(--space-7) - var(--space-2));
            --input-range-thumb-margin-top: calc(
                -1 * ((var(--input-range-thumb-height) - var(--space-3)) / 2)
            );
            --input-range-track-height: var(--space-3);
        }

        /* thumb */
        &::-webkit-slider-thumb {
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            cursor: pointer;
            box-shadow: 0 0 0 1px var(--black-a4);
        }
        &::-moz-range-thumb {
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            cursor: pointer;
            box-shadow: 0 0 0 1px var(--black-a4);
        }
        &::-ms-thumb {
            border-radius: var(--thumb-radius);
            border: var(--thumb-border);
            background: var(--thumb-background);
            cursor: pointer;
            box-shadow: 0 0 0 1px var(--black-a4);
        }

        /* track */
        &::-webkit-slider-runnable-track {
            background: var(--track-background);
            border-radius: var(--track-radius);
            border: 0.2px solid #010101;
            cursor: pointer;
        }
        &::-moz-range-track {
            background: var(--track-background);
            border-radius: var(--track-radius);
            border-radius: var(--radius-2);
            cursor: pointer;
        }
        &::-ms-track {
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
