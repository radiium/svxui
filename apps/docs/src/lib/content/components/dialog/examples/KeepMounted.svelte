<script lang="ts">
    import { Button, Dialog, Flex, Input, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Button onclick={open}>Open dialog</Button>

<Dialog bind:isOpen blurBackdrop keepMounted>
    <Panel size="5" variant="soft" outline>
        <Flex justify="start" direction="column" gap="3">
            <h2>Dialog title</h2>
            <Input />
            <Flex as="footer" gap="3" justify="end">
                <Button variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
                <Button onclick={close}>Confirm</Button>
            </Flex>
        </Flex>
    </Panel>
</Dialog>
