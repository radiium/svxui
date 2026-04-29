<script lang="ts">
    import { Button, Flex, Input, Panel, focustrap } from 'svxui';

    let dialogRef: HTMLDialogElement | undefined = $state(undefined);
    const open = () => dialogRef?.showModal();
    const close = () => dialogRef?.close();
</script>

<Button onclick={open}>Open dialog</Button>

<Panel as="dialog" bind:ref={dialogRef} p="5" {@attach focustrap()} style="position: fixed">
    <Flex justify="start" direction="column" gap="3">
        <h2>Navigate using the tab key</h2>
        <Input placeholder="Input 1" />
        <Input placeholder="Input 2" />
        <Button variant="soft" onclick={close}>close</Button>
    </Flex>
</Panel>
