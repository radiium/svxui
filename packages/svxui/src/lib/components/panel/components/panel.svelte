<script lang="ts">
    import { defaultPanelProps } from '../props.js';
    import type { PanelProps } from '../types.js';

    let {
        elementRef = $bindable(),
        color = defaultPanelProps.color,
        size = defaultPanelProps.size,
        radius = defaultPanelProps.radius,
        variant = defaultPanelProps.variant,
        fullWidth = defaultPanelProps.fullWidth,
        children,
        ...rest
    }: PanelProps = $props();

    let cssClass = $derived([
        rest.class,
        'panel',
        {
            [`panel-size-${size}`]: size,
            [`panel-color-${color}`]: color,
            [`panel-variant-${variant}`]: variant,
            'panel-full-width': fullWidth
        }
    ]);
</script>

<div {...rest} data-color={color} data-size={size} data-radius={radius} class={cssClass}>
    {@render children?.()}
</div>

<style>
    .panel {
        display: block;
        position: relative;
        box-sizing: border-box;
        /* overflow: hidden; */
        /* contain: paint; */
        padding: var(--panel-padding);
        border-radius: var(--panel-border-radius);
        background-color: var(--panel-background);

        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            inset: 0;
            border-radius: var(--panel-border-radius);
            box-shadow: var(--panel-box-shadow);
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
            --panel-box-shadow: none;
            --panel-background: var(--accent-5);
        }
        &.panel-variant-soft {
            --panel-box-shadow: none;
            --panel-background: var(--accent-1);
        }
        &.panel-variant-outline {
            --panel-box-shadow: inset 0 0 0 1px var(--accent-7);
            --panel-background: var(--color-background-0);
        }
    }
</style>
