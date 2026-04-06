<script lang="ts">
    import type { ClusterProps, FlexProps, LayoutSpacing } from '../types.js';
    import Flex from './primitive-flex.svelte';

    let {
        as = 'div',
        ref = $bindable(),
        gap = '2' as LayoutSpacing,
        justify = 'start',
        align = 'center',
        children,
        ...rest
    }: ClusterProps = $props();
</script>

<!--
  Cluster: groups inline elements that wrap naturally.
  Perfect for tags, badges, buttons, nav items.
-->
<Flex {as} bind:ref wrap="wrap" {gap} {justify} {align} {...rest as Partial<FlexProps>}>
    {@render children?.()}
</Flex>
