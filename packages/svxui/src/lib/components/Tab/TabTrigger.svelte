<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { derived } from 'svelte/store';
    import { defaultTabTriggerProps } from './Tab.props.js';
    import type { TabTriggerProps } from './Tab.types.js';
    import { getTabContext } from './Tab.context.js';

    type $$Props = TabTriggerProps;
    export let value: $$Props['value'] = defaultTabTriggerProps.value;

    const { current, selectTab, registerTab, unregisterTab } = getTabContext();
    const isActive = derived(current, (val) => val === value);
    const select = () => selectTab(value);

    onMount(() => {
        registerTab(value);
    });

    onDestroy(() => {
        unregisterTab(value);
    });
</script>

{#if value}
    <slot isActive={$isActive} {select} />
{/if}
