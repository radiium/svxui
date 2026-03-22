<script lang="ts">
    import { Floating, Button, Flexbox } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Floating bind:isOpen>
    {#snippet trigger()}
        <Button onclick={open}>Open</Button>
    {/snippet}
    {#snippet content()}
        <Flexbox align="center" gap="3">
            <div>Floating content</div>
            <Button size="1" radius="full" variant="outline" iconOnly onclick={close}>x</Button>
        </Flexbox>
    {/snippet}
</Floating>
