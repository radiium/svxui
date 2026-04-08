<script lang="ts">
    import { Button, Dialog, Flex, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Button onclick={open}>Open alert</Button>

<Dialog bind:isOpen closeOnBackdropClick={false} closeOnEscape={false} blurBackdrop>
    <Panel size="4" color="yellow" style="width: 400px; max-width: 90vw">
        <Flex justify="start" direction="column" gap="3">
            <Flex justify="start" as="header">
                <h2 class="m-0">Alert title</h2>
            </Flex>
            <p class="m-0">Alert description</p>
            <Flex as="footer" align="center" justify="end" gap="3">
                <Button onclick={close} variant="soft" color="neutral">Cancel</Button>
                <Button onclick={close}>Confirm</Button>
            </Flex>
        </Flex>
    </Panel>
</Dialog>
