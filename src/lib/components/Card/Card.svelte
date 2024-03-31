<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultCardProps } from './Card.props.js';
    import type { CardProps } from './Card.types.js';

    type $$Props = CardProps;
    export let elementRef: $$Props['elementRef'] = defaultCardProps.elementRef;
    export let size: $$Props['size'] = defaultCardProps.size;

    $: cssClass = clsx($$restProps.class, 'Card', {
        [`Card-size-${size}`]: size
    });
</script>

<div {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}>
    <slot />
</div>

<style lang="scss">
    .Card {
        padding: var(--card-padding);
        border-radius: var(--card-border-radius);
        background-color: var(--background-level-2);
        box-shadow: var(--input-box-shadow);
        position: relative;
        overflow: hidden;

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
    }
</style>
