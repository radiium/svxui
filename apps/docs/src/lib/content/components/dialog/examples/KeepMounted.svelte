<script lang="ts">
    import { Button, Dialog, Flex, Input, Panel } from 'svxui';

    let open = $state(false);
    const openDialog = () => (open = true);
    const closeDialog = () => (open = false);
</script>

<Button onclick={openDialog}>Open dialog</Button>

<Dialog bind:open blurBackdrop keepMounted>
    <Panel p="5" variant="soft" outline>
        <Flex justify="start" direction="column" gap="3">
            <h2>Dialog title</h2>
            <Input />
            <Flex as="footer" gap="3" justify="end">
                <Button onclick={closeDialog} variant="outline">Cancel</Button>
                <Button onclick={closeDialog}>Confirm</Button>
            </Flex>
        </Flex>
    </Panel>
</Dialog>
