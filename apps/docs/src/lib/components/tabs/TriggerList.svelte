<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Flexbox } from 'svxui';
    import { tabsContext } from './context.svelte';

    let { children }: { children: Snippet } = $props();

    const tabs = tabsContext.get();
</script>

<Flexbox gap="1" class="py-1 mt-4 -mb-5" {...tabs.triggerListAttrs}>
    {@render children?.()}
</Flexbox>
