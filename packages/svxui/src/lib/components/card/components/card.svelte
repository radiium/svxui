<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultCardProps } from '../props.js';
    import type { CardProps } from '../types.js';

    let {
        elementRef = $bindable(),
        color = defaultCardProps.color,
        size = defaultCardProps.size,
        radius = defaultCardProps.radius,
        variant = defaultCardProps.variant,
        translucent = defaultCardProps.translucent,
        fullWidth = defaultCardProps.fullWidth,
        children,
        ...rest
    }: CardProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Card', {
            [`Card-size-${size}`]: size,
            [`Card-${variant}`]: variant,
            [`Card-translucent`]: translucent,
            'Card-full-width': fullWidth
        })
    );
</script>

<div {...rest} data-color={color} data-size={size} data-radius={radius} class={cssClass}>
    {@render children?.()}
</div>

<style lang="scss">
    .Card {
        position: relative;

        padding: var(--card-padding);
        border-radius: var(--card-border-radius);
        background-color: var(--card-background);
        backdrop-filter: var(--card-backdrop-filter);

        --card-backdrop-filter: none;

        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            inset: 0;
            border-radius: var(--card-border-radius);
            box-shadow: var(--card-box-shadow);
        }

        &.Card-full-width {
            width: 100%;
        }

        // Sizes
        &.Card-size-0 {
            --card-padding: var(--space-0);
            --card-border-radius: var(--radius-3);
        }
        &.Card-size-1 {
            --card-padding: var(--space-3);
            --card-border-radius: var(--radius-4);
        }
        &.Card-size-2 {
            --card-padding: var(--space-4);
            --card-border-radius: var(--radius-4);
        }
        &.Card-size-3 {
            --card-padding: var(--space-5);
            --card-border-radius: var(--radius-5);
        }
        &.Card-size-4 {
            --card-padding: var(--space-6);
            --card-border-radius: var(--radius-5);
        }
        &.Card-size-5 {
            --card-padding: var(--space-8);
            --card-border-radius: var(--radius-6);
        }

        &.Card-translucent {
            --card-backdrop-filter: blur(64px);
        }

        // Variants
        &.Card-solid {
            --card-box-shadow: none;
            --card-background: var(--accent-5);
        }
        &.Card-soft {
            --card-box-shadow: none;
            --card-background: var(--accent-a3);
        }
        &.Card-surface {
            --card-box-shadow: inset 0 0 0 1px var(--accent-a6);
            --card-background: var(--accent-a2);
        }
        &.Card-outline {
            --card-box-shadow: inset 0 0 0 1px var(--accent-a7);
            --card-background: none;
        }
    }
</style>
