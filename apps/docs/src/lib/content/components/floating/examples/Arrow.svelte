<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
</script>

<Floating bind:isOpen outline autoUpdate closeOnOutsideClick arrow offset={10}>
    {#snippet trigger()}
        <Button onclick={open}>Open</Button>
    {/snippet}
    {#snippet content()}
        Floating content
    {/snippet}
</Floating>
