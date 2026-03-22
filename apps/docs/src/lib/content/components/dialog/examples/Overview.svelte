<script lang="ts">
    import { Button, Dialog, Panel } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);
</script>

<Button onclick={open}>Open dialog</Button>

<Dialog bind:isOpen>
    <Panel>Dialog content</Panel>
</Dialog>
