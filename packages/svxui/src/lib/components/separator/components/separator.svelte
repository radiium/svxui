<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultSeparatorProps } from '../props.js';
    import type { SeparatorProps } from '../types.js';

    let {
        elementRef = $bindable(),
        color = defaultSeparatorProps.color,
        size = defaultSeparatorProps.size,
        orientation = defaultSeparatorProps.orientation,
        ...rest
    }: SeparatorProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Separator', {
            [`Separator-size-${size}`]: size,
            [`Separator-orientation-${orientation}`]: orientation
        })
    );
</script>

<div
    {...rest}
    class={cssClass}
    role="separator"
    aria-orientation={orientation}
    data-color={color}
    data-size={size}
    bind:this={elementRef}
></div>

<style lang="scss">
    .Separator {
        display: block;
        background-color: var(--accent-8);
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
