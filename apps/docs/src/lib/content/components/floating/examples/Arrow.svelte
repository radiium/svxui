<script lang="ts">
    import { Floating, Button } from 'svxui';

    let open = $state(false);
    const openFloating = () => (open = true);
</script>

<Floating bind:open outline autoUpdate closeOnOutsideClick arrow offset={10}>
    {#snippet trigger()}
        <Button onclick={openFloating}>Open</Button>
    {/snippet}
    {#snippet content()}
        Floating content
    {/snippet}
</Floating>
