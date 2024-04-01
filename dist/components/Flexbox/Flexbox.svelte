<script>import { clsx } from '../../utils/clsx.js';
import { defaultFlexboxProps } from './Flexbox.props.js';
export let elementRef = defaultFlexboxProps.elementRef;
export let as = defaultFlexboxProps.as;
export let display = defaultFlexboxProps.display;
export let direction = defaultFlexboxProps.direction;
export let justify = defaultFlexboxProps.justify;
export let alignItems = defaultFlexboxProps.alignItems;
export let wrap = defaultFlexboxProps.wrap;
export let gap = defaultFlexboxProps.gap;
export let grow = defaultFlexboxProps.grow;
export let shrink = defaultFlexboxProps.shrink;
$: cssClass = clsx($$restProps.class, {
    [`display-${display}`]: display,
    [`flex-direction-${direction}`]: direction,
    [`flex-align-items-${alignItems}`]: alignItems,
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
