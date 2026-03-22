<script lang="ts">
    import { Button, Flexbox, Input, Panel, focustrap } from 'svxui';

    let dialogRef: HTMLDialogElement | undefined = $state(undefined);
    const open = () => dialogRef?.showModal();
    const close = () => dialogRef?.close();
</script>

<Button onclick={open}>Open dialog</Button>

<Panel as="dialog" bind:ref={dialogRef} size="5" {@attach focustrap()}>
    <Flexbox direction="column" gap="3">
        <h2 class="mt-0">Navigate using the tab key</h2>
        <Input placeholder="Input 1" />
        <Input placeholder="Input 2" />
        <Button variant="soft" onclick={close}>close</Button>
    </Flexbox>
</Panel>

<style>
    :global(dialog.panel) {
        position: fixed !important;
    }
</style>
