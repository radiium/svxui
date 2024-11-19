<script lang="ts">
    import Text from '$lib/components/text/components/text.svelte';
    import { clsx } from '../../../utils/clsx.js';
    import { defaultLinkProps } from '../props.js';
    import type { LinkProps } from '../types.js';

    let {
        elementRef = $bindable(),
        underline = defaultLinkProps.underline,
        children,
        ...rest
    }: LinkProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Text-Link', {
            [`Text-Link-underline-${underline}`]: underline
        })
    );
</script>

<Text {...rest} as="a" class={cssClass} bind:elementRef>
    {@render children?.()}
</Text>
