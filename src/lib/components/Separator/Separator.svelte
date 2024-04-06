<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultSeparatorProps } from './Separator.props.js';
    import type { SeparatorProps } from './Separator.types.js';

    type $$Props = SeparatorProps;
    export let elementRef: $$Props['elementRef'] = defaultSeparatorProps.elementRef;
    export let size: $$Props['size'] = defaultSeparatorProps.size;
    export let orientation: $$Props['orientation'] = defaultSeparatorProps.orientation;

    $: cssClass = clsx($$restProps.class, 'Separator', {
        [`Separator-size-${size}`]: size,
        [`Separator-orientation-${orientation}`]: orientation
    });
</script>

<div {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}></div>

<style lang="scss">
    .Separator {
        display: block;
        background-color: var(--slate-a8);
        flex-shrink: 0;

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
            width: var(--separator-size);
            height: 1px;
        }
        &.Separator-orientation-vertical {
            width: 1px;
            height: var(--separator-size);
        }
    }
</style>
