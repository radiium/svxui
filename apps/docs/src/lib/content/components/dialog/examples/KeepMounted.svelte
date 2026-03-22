<script lang="ts">
    import { Button, Dialog, Flexbox, Input, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);
</script>

<Button onclick={open}>Open dialog</Button>

<Dialog bind:isOpen blurBackdrop keepMounted>
    <Panel size="5" variant="soft" outline>
        <Flexbox direction="column" gap="5">
            <Flexbox as="header">
                <h2 class="m-0">Dialog title</h2>
            </Flexbox>

            <Input />

            <Flexbox as="footer" gap="3" justify="end">
                <Button variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
                <Button onclick={close}>Confirm</Button>
            </Flexbox>
        </Flexbox>
    </Panel>
</Dialog>
