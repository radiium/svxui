<script lang="ts">
    import { getTabContext } from '../context.svelte.js';
    import type { TabPanelProps } from '../types.js';

    let { value, children }: TabPanelProps = $props();

    const group = getTabContext();
    const item = $derived(group.getItem(value));
    const active = $derived(item?.active);

    const triggerId: string = $derived(`trigger-${item?.id}`);
    const contentId: string = $derived(`content-${item?.id}`);
    const attrs = $derived.by(
        () =>
            ({
                id: contentId,
                role: 'tabpanel',
                'aria-labelledby': triggerId
            }) as const
    );
</script>

{#if active && item}
    {@render children?.({
        attrs: item?.attributs.content ?? {}
    })}
{/if}
