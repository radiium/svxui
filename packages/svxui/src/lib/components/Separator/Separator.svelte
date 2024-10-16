<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultSeparatorProps } from './Separator.props.js';
    import type { SeparatorProps } from './Separator.types.js';

    type $$Props = SeparatorProps;
    export let elementRef: $$Props['elementRef'] = defaultSeparatorProps.elementRef;
    export let color: $$Props['color'] = defaultSeparatorProps.color;
    export let size: $$Props['size'] = defaultSeparatorProps.size;
    export let orientation: $$Props['orientation'] = defaultSeparatorProps.orientation;

    $: cssClass = clsx($$restProps.class, 'Separator', {
        [`Separator-size-${size}`]: size,
        [`Separator-orientation-${orientation}`]: orientation
    });
</script>

<div
    {...$$restProps}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
></div>

<style lang="scss">
    .Separator {
        display: block;
        background-color: var(--accent-a8);
        flex-shrink: 0;
        width: var(--separator-width);
        height: var(--separator-height);

        // Sizes
        &.Separator-size-1 {
            --separator-size: var(--space-4);
        }
        &.Separator-size-2 {
            --separator-size: var(--space-6);
        }
        &.Separator-size-3 {
            --separator-size: var(--space-9);
        }
        &.Separator-size-4 {
            --separator-size: 100%;
        }

        // Orientations
        &.Separator-orientation-horizontal {
            --separator-width: var(--separator-size);
            --separator-height: 1px;
        }
        &.Separator-orientation-vertical {
            --separator-width: 1px;
            --separator-height: var(--separator-size);
        }
    }
</style>
