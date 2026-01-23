<script lang="ts" generics="E extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { PanelProps } from '../types.js';

    let {
        ref = $bindable(),
        as = 'div' as E,
        color = undefined,
        size = '3',
        radius = undefined,
        variant = 'solid',
        outline = false,
        fullWidth = false,
        children,
        ...rest
    }: PanelProps<E> = $props();

    let cssClass = $derived([
        rest.class,
        'panel',
        {
            [`panel-size-${size}`]: size,
            [`panel-color-${color}`]: color,
            [`panel-variant-${variant}`]: variant,
            'panel-outline': outline,
            'panel-full-width': fullWidth,
            'panel-button': as === 'button',
            'panel-link': as === 'a',
            'panel-label': as === 'label'
        }
    ]);
</script>

<svelte:element
    this={as}
    {...rest}
    data-color={color}
    data-size={size}
    data-radius={radius}
    class={cssClass}
    bind:this={ref}
>
    {@render children?.()}
</svelte:element>

<style>
    .panel {
        display: block;
        position: relative;
        box-sizing: border-box;
        padding: var(--panel-padding);
        border-radius: var(--panel-border-radius);
        background-color: var(--panel-background);
        border: none;

        --panel-box-shadow: inset 0 0 0 1px var(--accent-7);
        --panel-box-shadow-hover: inset 0 0 0 1px var(--accent-8);

        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            inset: 0;
            border-radius: var(--panel-border-radius);
        }

        &.panel-outline {
            &::after {
                box-shadow: var(--panel-box-shadow);
            }
        }

        &.panel-full-width {
            width: 100%;
        }

        /* Sizes */
        &.panel-size-0 {
            --panel-padding: var(--space-0);
            --panel-border-radius: var(--radius-3);
        }
        &.panel-size-1 {
            --panel-padding: var(--space-1);
            --panel-border-radius: var(--radius-3);
        }
        &.panel-size-2 {
            --panel-padding: var(--space-2);
            --panel-border-radius: var(--radius-3);
        }
        &.panel-size-3 {
            --panel-padding: var(--space-3);
            --panel-border-radius: var(--radius-3);
        }
        &.panel-size-4 {
            --panel-padding: var(--space-4);
            --panel-border-radius: var(--radius-5);
        }
        &.panel-size-5 {
            --panel-padding: var(--space-5);
            --panel-border-radius: var(--radius-5);
        }
        &.panel-size-6 {
            --panel-padding: var(--space-6);
            --panel-border-radius: var(--radius-5);
        }
        &.panel-size-7 {
            --panel-padding: var(--space-7);
            --panel-border-radius: var(--radius-6);
        }
        &.panel-size-8 {
            --panel-padding: var(--space-8);
            --panel-border-radius: var(--radius-6);
        }
        &.panel-size-9 {
            --panel-padding: var(--space-9);
            --panel-border-radius: var(--radius-6);
        }

        /* Variants */
        &.panel-variant-solid {
            --panel-background: var(--accent-5);
            --panel-background-hover: var(--accent-6);
        }
        &.panel-variant-soft {
            --panel-background: var(--accent-2);
            --panel-background-hover: var(--accent-3);
        }
        &.panel-variant-clear {
            --panel-background: var(--color-background-0);
            --panel-background-hover: var(--accent-2);
        }

        /* Renderd as button, link or label */
        &.panel-button {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
        }

        &.panel-button:not(:disabled),
        &.panel-link {
            color: var(--color);
            text-decoration: none;
            cursor: default;

            &:focus-visible {
                outline: 2px solid var(--accent-7);
                outline-offset: -1px;
            }

            &:hover {
                background-color: var(--panel-background-hover);

                &.panel-outline {
                    &::after {
                        box-shadow: var(--panel-box-shadow-hover);
                    }
                }
            }
        }

        &.panel-label {
            /* Hover only if input is present */
            &:global(:has(input[type='radio'], input[type='checkbox'])):hover {
                background-color: var(--panel-background-hover);

                &.panel-outline {
                    &::after {
                        box-shadow: var(--panel-box-shadow-hover);
                    }
                }
            }

            /* The label focuses when an internal input is focus-visible */
            &:focus-within {
                &::after {
                    outline: 2px solid var(--accent-8);
                    outline-offset: -1px;
                }
            }

            /* Remove the native outline from the input */
            :global(input:focus-visible) {
                outline: none !important;
            }
        }
    }
</style>
