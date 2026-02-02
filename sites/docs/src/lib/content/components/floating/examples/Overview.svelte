<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = $state(false);
</script>

<Floating bind:isOpen closeOnClickOutside>
    {#snippet trigger()}
        <Button onclick={() => (isOpen = true)}>Open</Button>
    {/snippet}
    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
</Floating>
