<script lang="ts">
    import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
    import { onMount } from 'svelte';
    import { Flex, Panel, Text } from 'svxui';

    let { onclick }: { onclick: () => void } = $props();

    let isMac = $state(false);
    onMount(() => {
        isMac = navigator.platform.toUpperCase().includes('MAC');
    });
</script>

<Panel
    variant="clear"
    outline
    color="neutral"
    p="0"
    as="button"
    {onclick}
    aria-label="Search docs"
    class="search-desktop"
>
    <Flex align="center" gap="2" px="3" py="1" width="19rem">
        <SearchIcon size="16px" />
        <Text size="2" class="flex-auto">Search</Text>
        <Flex gap="0">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
        </Flex>
    </Flex>
</Panel>

<style>
    kbd {
        font-size: var(--font-size-1);
        padding: 1px 5px;
        border-radius: var(--radius-1);
        background: var(--neutral-a2);
        border: 1px solid var(--neutral-a5);
        line-height: normal;
    }

    :global(.search-desktop) {
        display: none;
    }
    @media (min-width: 769px) {
        :global(.search-desktop) {
            display: inline;
        }
    }
</style>
