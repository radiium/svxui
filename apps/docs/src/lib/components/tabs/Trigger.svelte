<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Button } from 'svxui';
    import { tabsContext } from './context.svelte';

    let { value, children }: { value: string; children: Snippet } = $props();

    const tabs = tabsContext.get();
    const trigger = $derived(tabs.getTrigger(value));
</script>

<Button variant={trigger.active ? 'soft' : 'clear'} size="3" {...trigger.attrs}>
    {@render children?.()}
</Button>
