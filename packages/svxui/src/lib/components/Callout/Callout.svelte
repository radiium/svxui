<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import Text from '../Text/Text.svelte';
    import { defaultCalloutProps } from './Callout.props.js';
    import type { CalloutProps } from './Callout.types.js';

    type $$Props = CalloutProps;
    export let elementRef: $$Props['elementRef'] = defaultCalloutProps.elementRef;
    export let color: $$Props['color'] = defaultCalloutProps.color;
    export let size: $$Props['size'] = defaultCalloutProps.size;
    export let radius: $$Props['radius'] = defaultCalloutProps.radius;
    export let variant: $$Props['variant'] = defaultCalloutProps.variant;
    export let fullWidth: $$Props['fullWidth'] = defaultCalloutProps.fullWidth;

    $: cssClass = clsx($$restProps.class, 'Callout', {
        [`Callout-size-${size}`]: size,
        [`Callout-color-${color}`]: color,
        [`Callout-variant-${variant}`]: variant,
        'Callout-full-width': fullWidth
    });
</script>

<div
    {...$$restProps}
    data-color={color}
    data-size={size}
    data-radius={radius}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
>
    {#if $$slots.icon}
        <div class="Callout-icon">
            <slot name="icon" />
        </div>
    {/if}

    <p class="Callout-text">
        <slot />
    </p>
</div>

<style lang="scss">
    .Callout {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;
        color: var(--callout-color);
        background-color: var(--callout-background-color);
        box-shadow: var(--callout-box-shadow);
        row-gap: var(--callout-row-gap);
        column-gap: var(--callout-column-gap);
        padding: var(--callout-padding);
        border-radius: var(--callout-border-radius);

        // Icon
        .Callout-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            height: var(--callout-icon-height);
            padding-top: var(--callout-icon-margin);

            :global(svg) {
                width: auto;
                fill: var(--accent-a11);
            }
        }

        .Callout-text {
            color: var(--callout-color);
            font-size: var(--callout-font-size);
        }

        &.Callout-full-width {
            width: 100%;
        }

        // Variants
        &.Callout-variant-soft {
            --callout-box-shadow: none;
            --callout-background-color: var(--accent-a3);
            --callout-color: var(--accent-a11);
        }
        &.Callout-variant-surface {
            --callout-box-shadow: inset 0 0 0 1px var(--accent-a6);
            --callout-background-color: var(--accent-a2);
            --callout-color: var(--accent-a11);
        }
        &.Callout-variant-outline {
            --callout-box-shadow: inset 0 0 0 1px var(--accent-a7);
            --callout-background-color: none;
            --callout-color: var(--accent-a11);
        }

        // Sizes
        &.Callout-size-1 {
            --callout-row-gap: var(--space-2);
            --callout-column-gap: var(--space-2);
            --callout-padding: var(--space-3);
            --callout-border-radius: var(--radius-3);
            --callout-icon-height: var(--line-height-2);
            --callout-icon-margin: calc((var(--line-height-2) - var(--font-size-2)) / 2);
            --callout-font-size: var(--font-size-2);
        }
        &.Callout-size-2 {
            --callout-row-gap: var(--space-2);
            --callout-column-gap: var(--space-3);
            --callout-padding: var(--space-4);
            --callout-border-radius: var(--radius-4);
            --callout-icon-height: var(--line-height-2);
            --callout-icon-margin: calc((var(--line-height-2) - var(--font-size-2)) / 2);
            --callout-font-size: var(--font-size-2);
        }
        &.Callout-size-3 {
            --callout-row-gap: var(--space-3);
            --callout-column-gap: var(--space-4);
            --callout-padding: var(--space-5);
            --callout-border-radius: var(--radius-5);
            --callout-icon-height: var(--line-height-3);
            --callout-icon-margin: calc((var(--line-height-3) - var(--font-size-3)) / 2);
            --callout-font-size: var(--font-size-3);
        }
    }
</style>
