<script lang="ts">
    import { useGroupItem } from '$lib/hooks/group/index.js';
    import { wrap } from '$lib/utils/wrap.svelte.js';
    import { onDestroy, onMount } from 'svelte';
    import { getTabContext } from '../context.svelte.js';
    import { defaultTabTriggerProps } from '../props.js';
    import type { TabTriggerProps } from '../types.js';

    let { value, disabled = defaultTabTriggerProps.disabled, children }: TabTriggerProps = $props();

    const group = getTabContext();
    const item = useGroupItem({
        value: wrap(() => value),
        disabled: wrap(() => disabled),
        attributsBuilder: ({ id, value, disabled, active }) => {
            const triggerId = `trigger-${id}`;
            const contentId = `content-${id}`;
            return {
                trigger: {
                    id: triggerId,
                    value: value,
                    tabindex: disabled ? -1 : 0,
                    role: 'tab',
                    'aria-controls': active ? contentId : undefined,
                    'aria-disabled': disabled
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

    const active = $derived(item.active);
    const select = () => group.selectItem(item);
</script>

{@render children?.({
    active,
    select,
    attrs: item.attributs.trigger
})}
