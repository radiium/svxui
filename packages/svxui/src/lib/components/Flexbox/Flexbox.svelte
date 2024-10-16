<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultFlexboxProps } from './Flexbox.props.js';
    import type { FlexboxProps } from './Flexbox.types.js';

    type $$Props = FlexboxProps;
    export let elementRef: $$Props['elementRef'] = defaultFlexboxProps.elementRef;
    export let as: $$Props['as'] = defaultFlexboxProps.as;
    export let display: $$Props['display'] = defaultFlexboxProps.display;
    export let direction: $$Props['direction'] = defaultFlexboxProps.direction;
    export let justify: $$Props['justify'] = defaultFlexboxProps.justify;
    export let align: $$Props['align'] = defaultFlexboxProps.align;
    export let wrap: $$Props['wrap'] = defaultFlexboxProps.wrap;
    export let gap: $$Props['gap'] = defaultFlexboxProps.gap;
    export let grow: $$Props['grow'] = defaultFlexboxProps.grow;
    export let shrink: $$Props['shrink'] = defaultFlexboxProps.shrink;

    $: cssClass = clsx($$restProps.class, {
        [`display-${display}`]: display,
        [`flex-direction-${direction}`]: direction,
        [`flex-align-items-${align}`]: align,
        [`flex-justify-content-${justify}`]: justify,
        [`flex-${wrap}`]: wrap,
        [`gap-${gap}`]: gap,
        [`flex-grow-${grow}`]: grow === '0' || grow === '1',
        [`flex-shrink-${shrink}`]: shrink === '0' || shrink === '1'
    });
</script>

<svelte:element this={as} {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}>
    <slot />
</svelte:element>
