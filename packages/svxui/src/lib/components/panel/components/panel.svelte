<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultPanelProps } from '../props.js';
    import type { PanelProps } from '../types.js';

    let {
        elementRef = $bindable(),
        color = defaultPanelProps.color,
        size = defaultPanelProps.size,
        radius = defaultPanelProps.radius,
        variant = defaultPanelProps.variant,
        translucent = defaultPanelProps.translucent,
        fullWidth = defaultPanelProps.fullWidth,
        children,
        ...rest
    }: PanelProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Panel', {
            [`Panel-size-${size}`]: size,
            [`Panel-${variant}`]: variant,
            [`Panel-translucent`]: translucent,
            'Panel-full-width': fullWidth
        })
    );
</script>

<div {...rest} data-color={color} data-size={size} data-radius={radius} class={cssClass}>
    {@render children?.()}
</div>

<style lang="scss">
    .Panel {
        display: block;
        position: relative;
        box-sizing: border-box;
        // overflow: hidden;
        // contain: paint;
        padding: var(--panel-padding);
        border-radius: var(--panel-border-radius);
        background-color: var(--panel-background);
        backdrop-filter: var(--panel-backdrop-filter);

        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            inset: 0;
            border-radius: var(--panel-border-radius);
            box-shadow: var(--panel-box-shadow);
        }

        &.Panel-full-width {
            width: 100%;
        }

        // Sizes
        &.Panel-size-0 {
            --panel-padding: var(--space-0);
        }
        &.Panel-size-1 {
            --panel-padding: var(--space-1);
            --panel-border-radius: var(--radius-3);
        }
        &.Panel-size-2 {
            --panel-padding: var(--space-2);
            --panel-border-radius: var(--radius-3);
        }
        &.Panel-size-3 {
            --panel-padding: var(--space-3);
            --panel-border-radius: var(--radius-3);
        }
        &.Panel-size-4 {
            --panel-padding: var(--space-4);
            --panel-border-radius: var(--radius-5);
        }
        &.Panel-size-5 {
            --panel-padding: var(--space-5);
            --panel-border-radius: var(--radius-5);
        }
        &.Panel-size-6 {
            --panel-padding: var(--space-6);
            --panel-border-radius: var(--radius-5);
        }
        &.Panel-size-7 {
            --panel-padding: var(--space-7);
            --panel-border-radius: var(--radius-6);
        }
        &.Panel-size-8 {
            --panel-padding: var(--space-8);
            --panel-border-radius: var(--radius-6);
        }
        &.Panel-size-9 {
            --panel-padding: var(--space-9);
            --panel-border-radius: var(--radius-6);
        }

        & {
            --panel-backdrop-filter: none;
        }
        &.Panel-translucent {
            --panel-backdrop-filter: blur(64px);
        }

        // Variants
        &.Panel-solid {
            --panel-box-shadow: none;
            --panel-background: var(--accent-5);
        }
        &.Panel-soft {
            --panel-box-shadow: none;
            --panel-background: var(--accent-3);
        }
        &.Panel-surface {
            --panel-box-shadow: inset 0 0 0 1px var(--accent-6);
            --panel-background: var(--accent-2);
        }
        &.Panel-outline {
            --panel-box-shadow: inset 0 0 0 1px var(--accent-7);
            --panel-background: none;
        }
    }
</style>
