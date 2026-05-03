<script lang="ts">
    import { Button } from 'svxui';
    import ListIcon from '../icons/ListIcon.svelte';
    import XIcon from '../icons/XIcon.svelte';

    type Props = {
        mobileMenuOpen: boolean;
        onclick: () => void;
    };
    let { mobileMenuOpen, onclick }: Props = $props();
</script>

<Button iconOnly color="neutral" radius="full" {onclick} class="menu-button-mobile">
    {#if mobileMenuOpen}
        <XIcon />
    {:else}
        <ListIcon />
    {/if}
</Button>

<style>
    :global(.menu-button-mobile) {
        display: flex;
    }
    @media (min-width: 769px) {
        :global(.menu-button-mobile) {
            display: none !important;
        }
    }
</style>
