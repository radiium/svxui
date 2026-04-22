<script lang="ts">
    import { Box, Button, Dialog, Flex, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Button onclick={open}>Open alert</Button>

<Dialog bind:isOpen closeOnBackdropClick={false} closeOnEscape={false} blurBackdrop>
    <Box width="400px" maxWidth="90vw">
        <Panel size="4" color="yellow" fullWidth>
            <Flex justify="start" direction="column" gap="3">
                <h2>Alert title</h2>
                <p>Alert description</p>
                <Flex as="footer" align="center" justify="end" gap="3">
                    <Button onclick={close} variant="soft" color="neutral">Cancel</Button>
                    <Button onclick={close}>Confirm</Button>
                </Flex>
            </Flex>
        </Panel>
    </Box>
</Dialog>
