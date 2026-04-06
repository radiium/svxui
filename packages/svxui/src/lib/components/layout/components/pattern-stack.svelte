<script lang="ts">
    import type { FlexAlign, FlexProps, LayoutSpacing, StackProps } from '../types.js';
    import Flex from './primitive-flex.svelte';

    let {
        as = 'div',
        ref = $bindable(),
        gap = '4' as LayoutSpacing,
        align = undefined as FlexAlign | undefined,
        children,
        ...rest
    }: StackProps = $props();
</script>

<!--
  Stack: vertically stacks children with consistent spacing.
  No media queries — purely compositional.
-->
<Flex {as} bind:ref direction="column" {gap} {align} {...rest as FlexProps}>
    {@render children?.()}
</Flex>
