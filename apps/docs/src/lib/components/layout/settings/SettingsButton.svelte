<script lang="ts">
    import FadersIcon from '$lib/components/icons/FadersIcon.svelte';
    import { Button, Floating } from 'svxui';
    import SettingsMenu from './SettingsMenu.svelte';

    let open = $state(false);
</script>

<Floating
    bind:open
    placement="bottom-end"
    outline
    size="4"
    color="neutral"
    variant="soft"
    autoUpdate
    shift
    arrow
    offset={24}
    closeOnOutsideClick
    closeOnEscape
    transitionDuration={0}
>
    {#snippet trigger()}
        <Button size="2" variant="clear" iconOnly onclick={() => (open = !open)}>
            <FadersIcon />
        </Button>
    {/snippet}

    {#snippet content()}
        <SettingsMenu />
    {/snippet}
</Floating>
