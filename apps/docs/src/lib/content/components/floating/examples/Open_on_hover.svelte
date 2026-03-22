<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Floating bind:isOpen>
    {#snippet trigger()}
        <Button onmouseenter={open} onmouseleave={close}>Hover</Button>
    {/snippet}
    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
</Floating>
