<script lang="ts">
    import { Button, Dialog, Flex, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Button onclick={open}>Open fullscreen dialog</Button>

<Dialog bind:isOpen layout="fullscreen">
    <Panel size="5" fullWidth fullHeight>
        <Flex justify="start" direction="column" gap="3">
            <h2>Dialog title</h2>
            <p>Dialog content</p>
            <Button onclick={close} fullWidth>Close</Button>
        </Flex>
    </Panel>
</Dialog>
