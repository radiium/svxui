<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { FlexProps, StackProps } from '../types.js';
    import Flex from './primitive-flex.svelte';

    let {
        ref = $bindable(),
        as = 'div' as StackProps<ElementTag>['as'],
        gap = '4' as StackProps<ElementTag>['gap'],
        align = undefined as StackProps<ElementTag>['align'],
        children,
        ...rest
    }: StackProps<ElementTag> = $props();
</script>

<!-- Stack: vertically stacks children with consistent spacing. -->
<Flex {as} bind:ref direction="column" {gap} {align} {...rest as FlexProps<ElementTag>}>
    {@render children?.()}
</Flex>
