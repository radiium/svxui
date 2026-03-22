<script lang="ts">
    import type { Snippet } from 'svelte';
    import { tabsContext } from './context.svelte';

    let { value, children }: { value: string; children: Snippet } = $props();

    const tabs = tabsContext.get();
    const content = $derived(tabs.getContent(value));
</script>

{#if content.active}
    <div {...content.attrs}>
        {@render children?.()}
    </div>
{/if}
