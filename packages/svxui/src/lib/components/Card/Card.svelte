<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultCardProps } from './Card.props.js';
    import type { CardProps } from './Card.types.js';

    type $$Props = CardProps;
    export let elementRef: $$Props['elementRef'] = defaultCardProps.elementRef;
    export let color: $$Props['color'] = defaultCardProps.color;
    export let size: $$Props['size'] = defaultCardProps.size;
    export let radius: $$Props['radius'] = defaultCardProps.radius;
    export let variant: $$Props['variant'] = defaultCardProps.variant;
    export let translucent: $$Props['translucent'] = defaultCardProps.translucent;

    $: cssClass = clsx($$restProps.class, 'Card', {
        [`Card-size-${size}`]: size,
        [`Card-${variant}`]: variant,
        [`Card-translucent`]: translucent
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
    <slot />
</div>

<style lang="scss">
    .Card {
        position: relative;
        overflow: hidden;
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

        & {
            --card-backdrop-filter: none;
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
