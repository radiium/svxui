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
        overflow: hidden;
        box-sizing: border-box;
        contain: paint;
        padding: var(--card-padding);
        border-radius: var(--card-border-radius);
        background-color: var(--card-background);
        backdrop-filter: var(--card-backdrop-filter);

        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            inset: 0;
            border-radius: var(--card-border-radius);
            box-shadow: var(--card-box-shadow);
        }

        // Sizes
        &.Panel-size-0 {
            --card-padding: var(--space-0);
        }
        &.Panel-size-1 {
            --card-padding: var(--space-1);
        }
        &.Panel-size-2 {
            --card-padding: var(--space-2);
        }
        &.Panel-size-3 {
            --card-padding: var(--space-3);
        }
        &.Panel-size-4 {
            --card-padding: var(--space-4);
        }
        &.Panel-size-5 {
            --card-padding: var(--space-5);
        }
        &.Panel-size-6 {
            --card-padding: var(--space-6);
        }
        &.Panel-size-7 {
            --card-padding: var(--space-7);
        }
        &.Panel-size-8 {
            --card-padding: var(--space-8);
        }
        &.Panel-size-9 {
            --card-padding: var(--space-9);
        }

        & {
            --card-backdrop-filter: none;
        }
        &.Panel-translucent {
            --card-backdrop-filter: blur(64px);
        }

        &.Panel-full-width {
            width: 100%;
        }

        // Variants
        &.Panel-solid {
            --card-box-shadow: none;
            --card-background: var(--accent-5);
        }
        &.Panel-soft {
            --card-box-shadow: none;
            --card-background: var(--accent-3);
        }
        &.Panel-surface {
            --card-box-shadow: inset 0 0 0 1px var(--accent-6);
            --card-background: var(--accent-2);
        }
        &.Panel-outline {
            --card-box-shadow: inset 0 0 0 1px var(--accent-7);
            --card-background: none;
        }
    }
</style>
