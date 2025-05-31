<script lang="ts">
    import { defaultFlexboxProps } from '../props.js';
    import type { FlexboxProps } from '../types.js';

    let {
        elementRef = $bindable(),
        as = defaultFlexboxProps.as,
        display = defaultFlexboxProps.display,
        direction = defaultFlexboxProps.direction,
        justify = defaultFlexboxProps.justify,
        align = defaultFlexboxProps.align,
        wrap = defaultFlexboxProps.wrap,
        gap = defaultFlexboxProps.gap,
        fullWidth = defaultFlexboxProps.fullWidth,
        children,
        ...rest
    }: FlexboxProps = $props();

    let cssClass = $derived([
        rest.class,
        display,
        {
            [`flexbox-${direction}`]: direction,
            [`flexbox-justify-${justify}`]: justify,
            [`flexbox-items-${align}`]: align,
            [`flexbox-${wrap}`]: wrap,
            [`flexbox-gap-${gap}`]: gap,
            'flexbox-full-width': fullWidth
        }
    ]);
</script>

<svelte:element this={as} {...rest} class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</svelte:element>

<style>
    /* Flex direction */
    .flexbox-row {
        flex-direction: row;
    }
    .flexbox-row-reverse {
        flex-direction: row-reverse;
    }
    .flexbox-column {
        flex-direction: column;
    }
    .flexbox-column-reverse {
        flex-direction: column-reverse;
    }

    /* Justify Content */
    .flexbox-justify-start {
        justify-content: flex-start;
    }
    .flexbox-justify-center {
        justify-content: center;
    }
    .flexbox-justify-end {
        justify-content: flex-end;
    }
    .flexbox-justify-around {
        justify-content: space-around;
    }
    .flexbox-justify-between {
        justify-content: space-between;
    }
    .flexbox-justify-evenly {
        justify-content: space-evenly;
    }
    .flexbox-justify-baseline {
        justify-content: baseline;
    }
    .flexbox-justify-stretch {
        justify-content: stretch;
    }
    .flexbox-justify-ormal {
        justify-content: normal;
    }

    /* Align Content */
    .flexbox-content-normal {
        align-content: normal;
    }
    .flexbox-content-center {
        align-content: center;
    }
    .flexbox-content-start {
        align-content: flex-start;
    }
    .flexbox-content-end {
        align-content: flex-end;
    }
    .flexbox-content-between {
        align-content: space-between;
    }
    .flexbox-content-around {
        align-content: space-around;
    }
    .flexbox-content-evenly {
        align-content: space-evenly;
    }
    .flexbox-content-baseline {
        align-content: baseline;
    }
    .flexbox-content-stretch {
        align-content: stretch;
    }

    /* Align Items */
    .flexbox-items-start {
        align-items: flex-start;
    }
    .flexbox-items-center {
        align-items: center;
    }
    .flexbox-items-end {
        align-items: flex-end;
    }
    .flexbox-items-baseline {
        align-items: baseline;
    }
    .flexbox-items-stretch {
        align-items: stretch;
    }
    .flexbox-items-normal {
        align-items: normal;
    }

    /* Flex Wrap */
    .flexbox-wrap {
        flex-wrap: wrap;
    }
    .flexbox-nowrap {
        flex-wrap: nowrap;
    }
    .flexbox-wrap-reverse {
        flex-wrap: wrap-reverse;
    }

    /* Gap */
    .flexbox-gap-0 {
        gap: 0px;
    }
    .flexbox-gap-1 {
        gap: var(--space-1);
    }
    .flexbox-gap-2 {
        gap: var(--space-2);
    }
    .flexbox-gap-3 {
        gap: var(--space-3);
    }
    .flexbox-gap-4 {
        gap: var(--space-4);
    }
    .flexbox-gap-5 {
        gap: var(--space-5);
    }
    .flexbox-gap-6 {
        gap: var(--space-6);
    }
    .flexbox-gap-7 {
        gap: var(--space-7);
    }
    .flexbox-gap-8 {
        gap: var(--space-8);
    }
    .flexbox-gap-9 {
        gap: var(--space-9);
    }

    /* Others */
    .flexbox-full-width {
        width: 100%;
    }
</style>
