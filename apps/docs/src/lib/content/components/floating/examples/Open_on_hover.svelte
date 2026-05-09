<script lang="ts">
    import { Floating, Button } from 'svxui';

    let open = $state(false);
    const openFloating = () => (open = true);
    const closeFloating = () => (open = false);
</script>

<Floating bind:open>
    {#snippet trigger()}
        <Button onmouseenter={openFloating} onmouseleave={closeFloating}>Hover</Button>
    {/snippet}
    {#snippet content()}
        Floating content
    {/snippet}
</Floating>
