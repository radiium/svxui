<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { getTabContext } from './Tab.context.js';
    import { defaultTabPanelProps } from './Tab.props.js';
    import type { TabPanelProps } from './Tab.types.js';

    type $$Props = TabPanelProps;
    export let value: $$Props['value'] = defaultTabPanelProps.value;

    const { current, registerPanel, unregisterPanel } = getTabContext();

    onMount(() => {
        registerPanel(value);
    });

    onDestroy(() => {
        unregisterPanel(value);
    });
</script>

{#if value === $current}
    <slot />
{/if}
