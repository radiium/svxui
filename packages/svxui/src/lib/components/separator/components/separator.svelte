<script lang="ts">
    import { defaultSeparatorProps } from '../props.js';
    import type { SeparatorProps } from '../types.js';

    let {
        elementRef = $bindable(),
        color = defaultSeparatorProps.color,
        size = defaultSeparatorProps.size,
        orientation = defaultSeparatorProps.orientation,
        ...rest
    }: SeparatorProps = $props();

    let cssClass = $derived([
        rest.class,
        'separator',
        {
            [`separator-size-${size}`]: size,
            [`separator-color-${color}`]: color,
            [`separator-orientation-${orientation}`]: orientation
        }
    ]);
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

<style>
    .separator {
        display: block;
        background-color: var(--accent-8);
        flex-shrink: 0;
        min-width: var(--separator-width);
        min-height: var(--separator-height);

        /* Sizes */
        &.separator-size-1 {
            --separator-size: var(--space-4);
        }
        &.separator-size-2 {
            --separator-size: var(--space-6);
        }
        &.separator-size-3 {
            --separator-size: var(--space-9);
        }
        &.separator-size-4 {
            --separator-size: 100%;
        }

        /* Orientations */
        &.separator-orientation-horizontal {
            --separator-width: var(--separator-size);
            --separator-height: 1px;
        }
        &.separator-orientation-vertical {
            --separator-width: 1px;
            --separator-height: var(--separator-size);
        }
    }
</style>
