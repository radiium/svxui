<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { FlexProps } from '../../flex/types.js';
    import type { ClusterProps } from '../types.js';
    import Flex from '../../flex/components/flex.svelte';

    let {
        ref = $bindable(),
        as = 'div' as ClusterProps<ElementTag>['as'],
        gap = '2' as ClusterProps<ElementTag>['gap'],
        justify = 'start' as ClusterProps<ElementTag>['justify'],
        align = 'center' as ClusterProps<ElementTag>['align'],
        children,
        ...rest
    }: ClusterProps<ElementTag> = $props();
</script>

<!-- Cluster: groups inline elements that wrap naturally. -->
<Flex {as} bind:ref wrap="wrap" {gap} {justify} {align} {...rest as FlexProps<ElementTag>}>
    {@render children?.()}
</Flex>
