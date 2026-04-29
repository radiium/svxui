<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Flex } from 'svxui';
    import { tabsContext } from './context.svelte';

    let { children }: { children: Snippet } = $props();

    const tabs = tabsContext.get();
</script>

<Flex justify="start" gap="1" {...tabs.triggerListAttrs} class="-mb-5 py-1 mt-4">
    {@render children?.()}
</Flex>
