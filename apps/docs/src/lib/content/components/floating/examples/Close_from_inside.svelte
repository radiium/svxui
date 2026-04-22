<script lang="ts">
    import { Floating, Button, Flex } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Floating bind:isOpen>
    {#snippet trigger()}
        <Button onclick={open}>Open</Button>
    {/snippet}
    {#snippet content()}
        <Flex justify="start" align="center" gap="3">
            Floating content
            <Button size="1" radius="full" variant="outline" iconOnly onclick={close}>X</Button>
        </Flex>
    {/snippet}
</Floating>
