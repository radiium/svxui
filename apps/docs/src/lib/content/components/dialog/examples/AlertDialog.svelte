<script lang="ts">
    import { Box, Button, Dialog, Flex, Panel } from 'svxui';

    let open = $state(false);
    const openDialog = () => (open = true);
    const closeDialog = () => (open = false);
</script>

<Button onclick={openDialog}>Open alert</Button>

<Dialog bind:open closeOnBackdropClick={false} closeOnEscape={false} blurBackdrop>
    <Box width="400px" maxWidth="90vw">
        <Panel p="4" color="yellow" fullWidth>
            <Flex justify="start" direction="column" gap="3">
                <h2>Alert title</h2>
                <p>Alert description</p>
                <Flex as="footer" align="center" justify="end" gap="3">
                    <Button onclick={closeDialog} variant="soft" color="neutral">Cancel</Button>
                    <Button onclick={closeDialog}>Confirm</Button>
                </Flex>
            </Flex>
        </Panel>
    </Box>
</Dialog>
