<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import Flex from '../../flex/components/flex.svelte';
    import type { FlexProps } from '../../flex/types.js';
    import type { StackProps } from '../types.js';

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
