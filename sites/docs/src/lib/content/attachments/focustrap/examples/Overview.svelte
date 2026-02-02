<script lang="ts">
    import { Button, Dialog, Flexbox, Input, focustrap } from 'svxui';

    let isOpen: boolean = $state(false);
</script>

<Button onclick={() => (isOpen = !isOpen)}>Open dialog</Button>

<Dialog bind:isOpen closeOnBackdropClick>
    <Flexbox direction="column" gap="3" {@attach focustrap()}>
        Navigate using the tab key.
        <Input placeholder="Input 1" />
        <Input placeholder="Input 2" />
        <Button variant="soft" onclick={() => (isOpen = false)}>close</Button>
    </Flexbox>
</Dialog>
