<script lang="ts">
    import FadersIcon from '$lib/icons/FadersIcon.svelte';
    import { Button, Floating } from 'svxui';
    import SettingsMenu from './SettingsMenu.svelte';

    let isOpen = $state(false);
</script>

<Floating
    bind:isOpen
    placement="bottom-end"
    outline
    size="4"
    autoUpdate
    shift
    arrow
    offset={24}
    radius="small"
    closeOnClickOutside
    closeOnEscape
    closeOnScroll
    transitionDuration={0}
    portal
>
    {#snippet trigger()}
        <Button size="2" variant="clear" iconOnly onclick={() => (isOpen = !isOpen)}>
            <FadersIcon />
        </Button>
    {/snippet}

    {#snippet content()}
        <SettingsMenu />
    {/snippet}
</Floating>
