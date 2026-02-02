<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = $state(false);
</script>

<Floating bind:isOpen>
    {#snippet trigger()}
        <Button onmouseenter={() => (isOpen = true)} onmouseleave={() => (isOpen = false)}>Hover</Button>
    {/snippet}
    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
</Floating>
