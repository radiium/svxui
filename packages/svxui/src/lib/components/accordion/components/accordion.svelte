<script lang="ts">
    import { useGroupItem } from '$lib/hooks/group/index.js';
    import { wrap } from '$lib/utils/wrap.svelte.js';
    import { onDestroy, onMount, untrack } from 'svelte';
    import { getAccordionContext } from '../context.svelte.js';
    import { defaultAccordionProps } from '../props.js';
    import type { AccordionProps } from '../types.js';

    let {
        value,
        expanded = defaultAccordionProps.expanded,
        disabled = defaultAccordionProps.disabled,
        trigger,
        children
    }: AccordionProps = $props();

    const group = getAccordionContext();
    const item = useGroupItem({
        value: wrap(() => value),
        disabled: wrap(() => disabled),
        attributsBuilder: ({ id, value, disabled, active }) => {
            const triggerId = `trigger-${id}`;
            const contentId = `content-${id}`;
            return {
                trigger: {
                    id: triggerId,
                    tabindex: disabled ? -1 : 0,
                    'aria-controls': active ? contentId : undefined,
                    'aria-expanded': active,
                    'aria-disabled': disabled,
                    'data-active': active || undefined
                },
                content: {
                    id: contentId,
                    role: 'region',
                    'aria-labelledby': triggerId
                }
            };
        }
    });

    onMount(() => group.registerItem(item));
    onDestroy(() => group.unregisterItem(item));

    let isExpanded = $derived(item.active);
    const toggle = () => group.toggleItem(item);

    $effect(() => {
        if (expanded === true && !untrack(() => isExpanded)) {
            group.toggleItem(item);
        }
    });
</script>

{@render trigger?.({
    expanded: isExpanded,
    attrs: item.attributs.trigger,
    toggle
})}

{#if item.active}
    {@render children?.({
        expanded: isExpanded,
        attrs: item.attributs.content,
        toggle
    })}
{/if}
