<script lang="ts">
    import { Button, Dialog, Flex, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Button onclick={open}>Open fixed dialog</Button>

<Dialog bind:isOpen layout="fixed">
    <Panel p="5" variant="soft" outline>
        <Flex justify="start" direction="column" gap="3">
            <h2>Dialog title</h2>
            <p>Dialog content</p>
            <Button onclick={close} fullWidth>Close</Button>
        </Flex>
    </Panel>
</Dialog>
