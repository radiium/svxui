<script lang="ts">
    import { Floating, Button, Flexbox } from 'svxui';

    let isOpen = $state(false);
</script>

<Floating bind:isOpen>
    {#snippet trigger()}
        <Button onclick={() => (isOpen = true)}>Open</Button>
    {/snippet}
    {#snippet content()}
        <Flexbox align="center" gap="3">
            <div>Floating content</div>
            <Button size="1" radius="full" variant="outline" iconOnly onclick={() => (isOpen = false)}>
                x
            </Button>
        </Flexbox>
    {/snippet}
</Floating>
