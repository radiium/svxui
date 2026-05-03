<script lang="ts">
    import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
    import { Button } from 'svxui';

    let { onclick }: { onclick: () => void } = $props();
</script>

<Button {onclick} variant="clear" iconOnly aria-label="Search docs" class="search-mobile">
    <SearchIcon size="20px" />
</Button>

<style>
    :global(.search-mobile) {
        display: inline;
    }
    @media (min-width: 769px) {
        :global(.search-mobile) {
            display: none !important;
        }
    }
</style>
