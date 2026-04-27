<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
    import { toSpaceVar } from '$lib/internals/to-space-var.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { PanelProps } from '../types.js';

    let {
        ref = $bindable(),
        as = 'div' as ElementTag,
        color = undefined,
        radius = undefined,
        variant = 'solid',
        outline = false,
        fullWidth = false,
        fullHeight = false,
        p = '3',
        px = undefined,
        py = undefined,
        pt = undefined,
        pr = undefined,
        pb = undefined,
        pl = undefined,
        children,
        ...rest
    }: PanelProps<ElementTag> = $props();

    const cssStyle = $derived.by(() => {
        const paddingStyle = styleObjectToString({
            'padding-top': toSpaceVar(pt ?? py ?? p),
            'padding-right': toSpaceVar(pr ?? px ?? p),
            'padding-bottom': toSpaceVar(pb ?? py ?? p),
            'padding-left': toSpaceVar(pl ?? px ?? p)
        });
        const callerStyle = rest.style as string | undefined;
        return [paddingStyle, callerStyle].filter(Boolean).join(' ') || undefined;
    });

    let cssClass = $derived([
        rest.class,
        'panel',
        {
            [`panel-variant-${variant}`]: variant,
            'panel-outline': outline,
            'panel-full-width': fullWidth,
            'panel-full-height': fullHeight,
            'panel-button': as === 'button',
            'panel-link': as === 'a',
            'panel-label': as === 'label'
        }
    ]);
</script>

<svelte:element
    this={as}
    {...rest}
    bind:this={ref}
    class={cssClass}
    style={cssStyle}
    aria-disabled={rest.disabled ? 'true' : undefined}
    data-color={color}
    data-radius={radius}
>
    {@render children?.()}
</svelte:element>

<style>
    .panel {
        position: relative;
        box-sizing: border-box;
        border-radius: var(--panel-border-radius, var(--radius-3));
        background-color: var(--panel-background);
        border: none;

        --panel-box-shadow: inset 0 0 0 1px var(--accent-7);
        --panel-box-shadow-hover: inset 0 0 0 1px var(--accent-8);

        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            inset: 0;
            border-radius: var(--panel-border-radius, var(--radius-3));
        }

        &.panel-outline {
            &::after {
                box-shadow: var(--panel-box-shadow);
            }
        }

        &.panel-full-width {
            width: 100%;
        }

        &.panel-full-height {
            height: 100%;
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
        &.panel-variant-surface {
            --panel-background: var(--accent-1);
            --panel-background-hover: var(--accent-2);
        }
        &.panel-variant-clear {
            --panel-background: transparent;
            --panel-background-hover: var(--accent-2);
        }

        /* Render as button, link or label */
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
