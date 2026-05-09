<script lang="ts">
    import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
    import { onMount } from 'svelte';
    import { Button, Flex, Panel, Text } from 'svxui';
    import SearchModal from './SearchModal.svelte';

    let open = $state(false);
    let isMac = $state(false);

    onMount(() => {
        isMac = navigator.platform.toUpperCase().includes('MAC');
    });

    function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            open = true;
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<Panel
    variant="clear"
    outline
    color="neutral"
    p="0"
    as="button"
    onclick={() => (open = true)}
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
<div class="search-desktop-spacer flex-auto"></div>

<Button variant="clear" iconOnly onclick={() => (open = true)} aria-label="Search docs" class="search-mobile">
    <SearchIcon size="20px" />
</Button>

<SearchModal bind:open onClose={() => (open = false)} />

<style>
    kbd {
        font-size: var(--font-size-1);
        padding: 1px 5px;
        border-radius: var(--radius-1);
        background: var(--neutral-a2);
        border: 1px solid var(--neutral-a5);
        line-height: normal;
    }

    :global(.search-desktop),
    .search-desktop-spacer {
        display: none;
    }

    :global(.search-mobile) {
        display: inline;
    }

    @media (min-width: 769px) {
        :global(.search-desktop),
        .search-desktop-spacer {
            display: inline;
        }

        :global(.search-mobile) {
            display: none !important;
        }
    }
</style>
