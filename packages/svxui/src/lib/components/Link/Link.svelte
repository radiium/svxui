<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import Text from '../Text/Text.svelte';
    import { defaultLinkProps } from './Link.props.js';
    import type { LinkProps } from './Link.types.js';

    type $$Props = LinkProps;
    export let elementRef: $$Props['elementRef'] = defaultLinkProps.elementRef;
    export let href: $$Props['href'] = defaultLinkProps.href;
    export let target: $$Props['target'] = defaultLinkProps.target;
    export let rel: $$Props['rel'] = defaultLinkProps.rel;
    export let color: $$Props['color'] = defaultLinkProps.color;
    export let size: $$Props['size'] = defaultLinkProps.size;
    export let weight: $$Props['weight'] = defaultLinkProps.weight;
    export let transform: $$Props['transform'] = defaultLinkProps.transform;
    export let align: $$Props['align'] = defaultLinkProps.align;
    export let underline: $$Props['underline'] = defaultLinkProps.underline;
    export let wrap: $$Props['wrap'] = defaultLinkProps.wrap;
    export let truncate: $$Props['truncate'] = defaultLinkProps.truncate;
    export let disabled: $$Props['disabled'] = defaultLinkProps.disabled;

    $: cssClass = clsx($$restProps.class, 'Text-Link', {
        [`Text-Link-underline-${underline}`]: underline
    });
</script>

<Text
    as="a"
    {...$$restProps}
    {href}
    {target}
    {rel}
    {color}
    {size}
    {weight}
    {transform}
    {align}
    {wrap}
    {truncate}
    {disabled}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
>
    <slot />
</Text>
