<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { FlexProps } from '../types.js';

    let {
        ref = $bindable(),
        as = 'div' as ElementTag,
        display = 'flex',
        direction = undefined,
        justify = undefined,
        align = undefined,
        alignContent = undefined,
        wrap = undefined,
        gap = undefined,
        rowGap = undefined,
        colGap = undefined,
        fullWidth = false,
        fullHeight = false,
        children,
        ...rest
    }: FlexProps<ElementTag> = $props();

    let cssClass = $derived([
        rest.class,
        display,
        {
            [`flex-${direction}`]: direction,
            [`flex-justify-${justify}`]: justify,
            [`flex-items-${align}`]: align,
            [`flex-content-${alignContent}`]: alignContent,
            [`flex-${wrap}`]: wrap,
            [`flex-gap-${gap}`]: gap,
            [`flex-row-gap-${rowGap}`]: rowGap,
            [`flex-col-gap-${colGap}`]: colGap,
            'flex-full-width': fullWidth,
            'flex-full-height': fullHeight
        }
    ]);
</script>

<svelte:element this={as} {...rest} bind:this={ref} class={cssClass}>
    {@render children?.()}
</svelte:element>

<style>
    .none {
        display: none;
    }
    .inline-flex {
        display: inline-flex;
    }
    .flex {
        display: flex;
    }
    .flex-row {
        flex-direction: row;
    }
    .flex-row-reverse {
        flex-direction: row-reverse;
    }
    .flex-column {
        flex-direction: column;
    }
    .flex-column-reverse {
        flex-direction: column-reverse;
    }
    .flex-justify-start {
        justify-content: flex-start;
    }
    .flex-justify-center {
        justify-content: center;
    }
    .flex-justify-end {
        justify-content: flex-end;
    }
    .flex-justify-around {
        justify-content: space-around;
    }
    .flex-justify-between {
        justify-content: space-between;
    }
    .flex-justify-evenly {
        justify-content: space-evenly;
    }
    .flex-justify-baseline {
        justify-content: baseline;
    }
    .flex-justify-stretch {
        justify-content: stretch;
    }
    .flex-justify-normal {
        justify-content: normal;
    }
    .flex-content-normal {
        align-content: normal;
    }
    .flex-content-center {
        align-content: center;
    }
    .flex-content-start {
        align-content: flex-start;
    }
    .flex-content-end {
        align-content: flex-end;
    }
    .flex-content-between {
        align-content: space-between;
    }
    .flex-content-around {
        align-content: space-around;
    }
    .flex-content-evenly {
        align-content: space-evenly;
    }
    .flex-content-baseline {
        align-content: baseline;
    }
    .flex-content-stretch {
        align-content: stretch;
    }
    .flex-items-start {
        align-items: flex-start;
    }
    .flex-items-center {
        align-items: center;
    }
    .flex-items-end {
        align-items: flex-end;
    }
    .flex-items-baseline {
        align-items: baseline;
    }
    .flex-items-stretch {
        align-items: stretch;
    }
    .flex-items-normal {
        align-items: normal;
    }
    .flex-wrap {
        flex-wrap: wrap;
    }
    .flex-nowrap {
        flex-wrap: nowrap;
    }
    .flex-wrap-reverse {
        flex-wrap: wrap-reverse;
    }
    .flex-gap-0 {
        gap: 0px;
    }
    .flex-gap-1 {
        gap: var(--space-1);
    }
    .flex-gap-2 {
        gap: var(--space-2);
    }
    .flex-gap-3 {
        gap: var(--space-3);
    }
    .flex-gap-4 {
        gap: var(--space-4);
    }
    .flex-gap-5 {
        gap: var(--space-5);
    }
    .flex-gap-6 {
        gap: var(--space-6);
    }
    .flex-gap-7 {
        gap: var(--space-7);
    }
    .flex-gap-8 {
        gap: var(--space-8);
    }
    .flex-gap-9 {
        gap: var(--space-9);
    }
    .flex-row-gap-0 {
        row-gap: 0px;
    }
    .flex-row-gap-1 {
        row-gap: var(--space-1);
    }
    .flex-row-gap-2 {
        row-gap: var(--space-2);
    }
    .flex-row-gap-3 {
        row-gap: var(--space-3);
    }
    .flex-row-gap-4 {
        row-gap: var(--space-4);
    }
    .flex-row-gap-5 {
        row-gap: var(--space-5);
    }
    .flex-row-gap-6 {
        row-gap: var(--space-6);
    }
    .flex-row-gap-7 {
        row-gap: var(--space-7);
    }
    .flex-row-gap-8 {
        row-gap: var(--space-8);
    }
    .flex-row-gap-9 {
        row-gap: var(--space-9);
    }
    .flex-col-gap-0 {
        column-gap: 0px;
    }
    .flex-col-gap-1 {
        column-gap: var(--space-1);
    }
    .flex-col-gap-2 {
        column-gap: var(--space-2);
    }
    .flex-col-gap-3 {
        column-gap: var(--space-3);
    }
    .flex-col-gap-4 {
        column-gap: var(--space-4);
    }
    .flex-col-gap-5 {
        column-gap: var(--space-5);
    }
    .flex-col-gap-6 {
        column-gap: var(--space-6);
    }
    .flex-col-gap-7 {
        column-gap: var(--space-7);
    }
    .flex-col-gap-8 {
        column-gap: var(--space-8);
    }
    .flex-col-gap-9 {
        column-gap: var(--space-9);
    }
    .flex-full-width {
        width: 100%;
    }
    .flex-full-height {
        height: 100%;
    }
</style>
