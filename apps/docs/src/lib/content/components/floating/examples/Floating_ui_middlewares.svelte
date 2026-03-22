<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
</script>

<Floating bind:isOpen closeOnOutsideClick autoUpdate shift flip>
    {#snippet trigger()}
        <Button onclick={open}>Open</Button>
    {/snippet}
    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
</Floating>
