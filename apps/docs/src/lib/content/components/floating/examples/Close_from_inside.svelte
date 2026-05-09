<script lang="ts">
    import { Floating, Button, Flex } from 'svxui';

    let open = $state(false);
    const openFloating = () => (open = true);
    const closeFloating = () => (open = false);
</script>

<Floating bind:open>
    {#snippet trigger()}
        <Button onclick={openFloating}>Open</Button>
    {/snippet}
    {#snippet content()}
        <Flex justify="start" align="center" gap="3">
            Floating content
            <Button size="1" radius="full" variant="outline" iconOnly onclick={closeFloating}>X</Button>
        </Flex>
    {/snippet}
</Floating>
