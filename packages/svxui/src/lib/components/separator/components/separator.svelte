<script lang="ts">
    import type { SeparatorProps } from '../types.js';

    let {
        ref = $bindable(),
        color = undefined,
        size = '2',
        orientation = 'horizontal',
        ...rest
    }: SeparatorProps = $props();

    let cssClass = $derived([
        rest.class,
        'separator',
        {
            [`separator-size-${size}`]: size,
            [`separator-orientation-${orientation}`]: orientation
        }
    ]);
</script>

<div
    {...rest}
    bind:this={ref}
    role="separator"
    aria-orientation={orientation}
    class={cssClass}
    data-color={color}
></div>

<style>
    .separator {
        display: inline-block;
        background-color: var(--accent-7);
        min-width: var(--separator-width);
        min-height: var(--separator-height);
        flex-shrink: 0;

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
