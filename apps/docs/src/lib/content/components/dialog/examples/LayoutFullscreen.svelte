<script lang="ts">
    import { Button, Dialog, Flex, Panel } from 'svxui';

    let open = $state(false);
    const openDialog = () => (open = true);
    const closeDialog = () => (open = false);
</script>

<Button onclick={openDialog}>Open fullscreen dialog</Button>

<Dialog bind:open layout="fullscreen">
    <Panel p="5" fullWidth fullHeight>
        <Flex justify="start" direction="column" gap="3">
            <h2>Dialog title</h2>
            <p>Dialog content</p>
            <Button onclick={closeDialog} fullWidth>Close</Button>
        </Flex>
    </Panel>
</Dialog>
