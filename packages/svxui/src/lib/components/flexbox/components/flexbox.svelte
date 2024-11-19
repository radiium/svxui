<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
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
        grow = defaultFlexboxProps.grow,
        shrink = defaultFlexboxProps.shrink,
        children,
        ...rest
    }: FlexboxProps = $props();

    let cssClass = $derived(
        clsx(rest.class, {
            [`display-${display}`]: display,
            [`flex-direction-${direction}`]: direction,
            [`flex-align-items-${align}`]: align,
            [`flex-justify-content-${justify}`]: justify,
            [`flex-${wrap}`]: wrap,
            [`gap-${gap}`]: gap,
            [`flex-grow-${grow}`]: grow === '0' || grow === '1',
            [`flex-shrink-${shrink}`]: shrink === '0' || shrink === '1'
        })
    );
</script>

<svelte:element this={as} {...rest} class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</svelte:element>
