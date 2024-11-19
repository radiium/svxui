<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultButtonProps } from '../props.js';
    import type { ButtonProps } from '../types.js';

    let {
        elementRef = $bindable(),
        size = defaultButtonProps.size,
        variant = defaultButtonProps.variant,
        color = defaultButtonProps.color,
        radius = defaultButtonProps.radius,
        transform = defaultButtonProps.transform,
        align = defaultButtonProps.align,
        active = defaultButtonProps.active,
        iconOnly = defaultButtonProps.iconOnly,
        fullWidth = defaultButtonProps.fullWidth,
        children,
        ...rest
    }: ButtonProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Button', {
            [`Button-${variant}`]: variant,
            [`Button-size-${size}`]: size,
            [`Button-${color}`]: color,
            [`Button-align-${align}`]: align,
            [`Button-transform-${transform}`]: transform,
            'Button-full-width': fullWidth,
            'Button-active': active,
            'Button-icon-only': iconOnly
        })
    );
</script>

<button
    tabindex="0"
    {...rest}
    data-color={color}
    data-size={size}
    data-radius={radius}
    class={cssClass}
    bind:this={elementRef}
>
    {@render children?.()}
</button>

<style lang="scss">
    button.Button {
        // CSS Vars
        --button-min-width: calc(var(--space-5) * 2);
        --button-width: unset;
        --button-height: var(--space-5);
        --button-padding: 0 var(--space-2);
        --button-border: none;
        --button-border-radius: var(--radius-3);
        --button-background: transparent;
        --button-background-hover: var(--accent-6);
        --button-background-active: var(--accent-7);
        --button-color: var(--accent-12);
        --button-font-size: var(--font-size-1);
        --button-line-height: var(--line-height-1);
        --button-letter-spacing: var(--letter-spacing-1);
        --button-gap: var(--space-1);
        --button-icon-height: 60%;

        // Customizable
        min-width: var(--button-min-width);
        width: var(--button-width);
        height: var(--button-height);
        padding: var(--button-padding);
        box-shadow: var(--button-box-shadow);
        border-radius: var(--button-border-radius);
        background-color: var(--button-background);
        color: var(--button-color);
        font-size: var(--button-font-size);
        line-height: var(--button-line-height);
        letter-spacing: var(--button-letter-spacing);
        gap: var(--button-gap);
        justify-content: var(--button-justify-content);
        text-align: var(--button-text-align);
        text-transform: var(--button-text-transform);

        // Common
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        flex-shrink: 0;
        text-decoration: none;
        white-space: nowrap;
        border: none;
        user-select: none;
        font-weight: 500;
        transition: background-color linear 80ms;

        :global(svg) {
            width: auto;
            height: var(--button-icon-height);
            fill: var(--button-color);
        }

        // Sizes
        &.Button-size-1 {
            --button-height: var(--space-5);
            --button-min-width: calc(var(--space-5) * 2);
            --button-padding: 0 var(--space-2);
            --button-border-radius: max(var(--radius-3), var(--radius-full));
            --button-gap: var(--space-1);

            --button-font-size: var(--font-size-1);
            --button-line-height: var(--line-height-1);
            --button-letter-spacing: var(--letter-spacing-1);

            &.Button-icon-only {
                --button-min-width: var(--space-5);
                --button-width: var(--space-5);
                --button-padding: calc(var(--space-1) / 2);
                --button-icon-height: 80%;
            }
        }
        &.Button-size-2 {
            --button-height: var(--space-6);
            --button-min-width: calc(var(--space-6) * 2);
            --button-padding: 0 var(--space-2);
            --button-border-radius: max(var(--radius-3), var(--radius-full));
            --button-gap: var(--space-1);

            --button-font-size: var(--font-size-2);
            --button-line-height: var(--line-height-2);
            --button-letter-spacing: var(--letter-spacing-2);

            &.Button-icon-only {
                --button-min-width: var(--space-6);
                --button-width: var(--space-6);
                --button-padding: calc(var(--space-1) / 2);
            }
        }
        &.Button-size-3 {
            --button-height: var(--space-7);
            --button-min-width: calc(var(--space-7) * 2);
            --button-padding: 0 var(--space-3);
            --button-border-radius: max(var(--radius-3), var(--radius-full));
            --button-gap: var(--space-3);

            --button-font-size: var(--font-size-3);
            --button-line-height: var(--line-height-3);
            --button-letter-spacing: var(--letter-spacing-3);

            &.Button-icon-only {
                --button-min-width: var(--space-7);
                --button-width: var(--space-7);
                --button-padding: var(--space-1);
            }
        }
        &.Button-size-4 {
            --button-height: var(--space-8);
            --button-min-width: calc(var(--space-8) * 2);
            --button-padding: 0 var(--space-4);
            --button-border-radius: max(var(--radius-3), var(--radius-full));
            --button-gap: var(--space-3);

            --button-font-size: var(--font-size-4);
            --button-line-height: var(--line-height-4);
            --button-letter-spacing: var(--letter-spacing-4);

            &.Button-icon-only {
                --button-min-width: var(--space-8);
                --button-width: var(--space-8);
                --button-padding: var(--space-1);
            }
        }

        // Variants
        &.Button-solid {
            --button-box-shadow: none;
            --button-color: var(--accent-contrast);
            --button-background: var(--accent-9);
            --button-background-hover: var(--accent-10);
            --button-background-active: var(--accent-10);
            --button-active-filter: brightness(0.92) saturate(1.1);
        }
        &.Button-soft {
            --button-box-shadow: none;
            --button-color: var(--accent-12);
            --button-background: var(--accent-4);
            --button-background-hover: var(--accent-5);
            --button-background-active: var(--accent-6);
            --button-active-filter: none;
        }
        &.Button-surface {
            --button-box-shadow: inset 0 0 0 1px var(--accent-9);
            --button-color: var(--accent-11);
            --button-background: var(--accent-3);
            --button-background-hover: var(--accent-4);
            --button-background-active: var(--accent-5);
            --button-active-filter: none;
        }
        &.Button-outline {
            --button-box-shadow: inset 0 0 0 1px var(--accent-9);
            --button-color: var(--accent-11);
            --button-background: transparent;
            --button-background-hover: var(--accent-3);
            --button-background-active: var(--accent-4);
            --button-active-filter: none;
        }
        &.Button-clear {
            --button-box-shadow: none;
            --button-color: var(--accent-11);
            --button-background: transparent;
            --button-background-hover: var(--accent-3);
            --button-background-active: var(--accent-4);
            --button-active-filter: none;
        }

        // Transform
        & {
            --button-text-transform: none;
        }
        &.Button-transform-lowercase {
            --button-text-transform: lowercase;
        }
        &.Button-transform-uppercase {
            --button-text-transform: uppercase;
        }
        &.Button-transform-capitalize {
            --button-text-transform: capitalize;
        }

        // Icon only
        &.Button-icon-only {
            --button-justify-content: center;
            --button-text-align: center;
        }

        // Alignment
        &:not(.Button-icon-only) {
            &.Button-align-start {
                --button-justify-content: flex-start;
                --button-text-align: start;
            }
            &.Button-align-center {
                --button-justify-content: center;
                --button-text-align: center;
            }
            &.Button-align-end {
                --button-justify-content: flex-end;
                --button-text-align: end;
            }
            &.Button-full-width {
                --button-width: 100%;
            }
        }

        // States
        &:hover {
            background: var(--button-background-hover);
        }
        &:active,
        &.Button-active {
            background: var(--button-background-active);
            filter: var(--button-active-filter);
        }
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: 0px;
        }
        &:disabled {
            @include disabled;
        }
    }
</style>
